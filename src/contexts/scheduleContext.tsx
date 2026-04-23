import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Schedule = {
  start: Date;
  end: Date;
  building_id: string;
  room_name: string;
  capacity: number;
  number_of_members: number;
  event_title: string;
  event_description: string;
};

type ScheduleFilter = {
  start?: Date;
  end?: Date;
  building_id?: string;
  room_name?: string;
  capacity?: number;
  event_title?: string;
  event_description?: string;
};

interface ScheduleContextType {
  schedules: Schedule[];
  initSchedule: () => Promise<void>;
  completedInit: boolean;

  getEvents: (filter: ScheduleFilter) => Schedule[];
  getCrowdDensity: (filter: ScheduleFilter) => number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

/**
 * Maps slot index (0–11) to wall-clock start/end times.
 * Order matches the 12 rows per room in the schedule table:
 *   0  → Tiết 1   (07:30–08:15)
 *   1  → Tiết 2   (08:15–09:00)
 *   2  → Tiết 3   (09:00–09:45)
 *   3  → Tiết 4   (10:00–10:45)
 *   4  → Tiết 5   (10:45–11:30)
 *   5  → Tiết 6   (13:00–13:45)
 *   6  → Tiết 7   (13:45–14:30)
 *   7  → Tiết 8   (14:30–15:15)
 *   8  → Tiết 9   (15:30–16:15)
 *   9  → Tiết 10  (16:15–17:00)
 *   10 → 11h–13h  (11:00–13:00)
 *   11 → Sau 17h  (17:00–23:59)
 */
const SLOT_TIMES: Array<{ sh: number; sm: number; eh: number; em: number }> = [
  { sh: 7, sm: 30, eh: 8, em: 15 },
  { sh: 8, sm: 15, eh: 9, em: 0 },
  { sh: 9, sm: 0, eh: 9, em: 45 },
  { sh: 10, sm: 0, eh: 10, em: 45 },
  { sh: 10, sm: 45, eh: 11, em: 30 },
  { sh: 13, sm: 0, eh: 13, em: 45 },
  { sh: 13, sm: 45, eh: 14, em: 30 },
  { sh: 14, sm: 30, eh: 15, em: 15 },
  { sh: 15, sm: 30, eh: 16, em: 15 },
  { sh: 16, sm: 15, eh: 17, em: 0 },
  { sh: 11, sm: 0, eh: 13, em: 0 },
  { sh: 17, sm: 0, eh: 23, em: 59 },
];

const SLOTS_PER_ROOM = 12;

// ─── Parsing helpers ──────────────────────────────────────────────────────────

function makeDate(base: Date, h: number, m: number): Date {
  const d = new Date(base);
  d.setHours(h, m, 0, 0);
  return d;
}

/** Parse a Vietnamese date string like "20-04-2026" into a Date. */
function parseVnDate(text: string): Date | null {
  const m = text.match(/(\d{1,2})-(\d{1,2})-(\d{4})/);
  if (!m) return null;
  return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
}

/**
 * Reconstruct an HTML table body into a 2-D element grid that respects
 * rowspan and colspan attributes.
 *
 * grid[rowIndex][colIndex] → the <td>/<th> element that visually
 * occupies that cell (the same element appears in every cell it spans).
 */
function buildGrid(tbody: Element): (Element | null)[][] {
  const rows = Array.from(tbody.querySelectorAll(":scope > tr"));
  const grid: (Element | null)[][] = rows.map(() => []);

  // Maps "r_c" → element that is still spanning down into row r, col c.
  const pending = new Map<string, Element>();
  const key = (r: number, c: number) => `${r}_${c}`;

  for (let r = 0; r < rows.length; r++) {
    const cells = Array.from(rows[r].children).filter(
      (el) => el.tagName === "TD" || el.tagName === "TH",
    ) as Element[];

    let col = 0;
    let ci = 0;

    while (ci < cells.length || pending.has(key(r, col))) {
      // A previous cell's rowspan is still occupying this column.
      if (pending.has(key(r, col))) {
        grid[r][col] = pending.get(key(r, col))!;
        col++;
        continue;
      }

      if (ci >= cells.length) break;

      const td = cells[ci++];
      const rs = parseInt(td.getAttribute("rowspan") ?? "1", 10) || 1;
      const cs = parseInt(td.getAttribute("colspan") ?? "1", 10) || 1;

      for (let dc = 0; dc < cs; dc++) {
        grid[r][col + dc] = td;
        // Register future rowspan occupancy.
        for (let dr = 1; dr < rs; dr++) {
          pending.set(key(r + dr, col + dc), td);
        }
      }
      col += cs;
    }

    // Pick up any trailing pending columns for this row.
    while (pending.has(key(r, col))) {
      grid[r][col] = pending.get(key(r, col))!;
      col++;
    }
  }

  return grid;
}

/**
 * Parse one building tab's <table> element into Schedule entries.
 *
 * Table column layout (after grid reconstruction):
 *   col 0 → room info cell  (rowspan = 12, same element for all 12 slot rows)
 *   col 1 → slot label cell (e.g. "Tiết 1")
 *   col 2 → Monday
 *   col 3 → Tuesday
 *   …
 *   col 8 → Sunday
 */
function parseTabTable(table: Element, buildingId: string): Schedule[] {
  const schedules: Schedule[] = [];

  // ── Column dates from <thead> ────────────────────────────────────────────
  const theadRow = table.querySelector("thead tr");
  if (!theadRow) return schedules;

  const headerCells = Array.from(theadRow.children) as Element[];
  // headerCells[0] = "Phòng / Thứ", [1] = "Tiết", [2..8] = day columns
  const columnDates: (Date | null)[] = headerCells
    .slice(2)
    .map((th) => parseVnDate(th.textContent ?? ""));

  // ── Build grid from <tbody> ──────────────────────────────────────────────
  const tbody = table.querySelector("tbody");
  if (!tbody) return schedules;
  const grid = buildGrid(tbody);

  // ── Walk rooms (groups of SLOTS_PER_ROOM rows sharing the same col-0 cell)
  let rowIdx = 0;
  const seen = new Set<Element>(); // prevents double-counting rowspan cells

  while (rowIdx < grid.length) {
    const roomCell = grid[rowIdx]?.[0] ?? null;
    if (!roomCell) {
      rowIdx++;
      continue;
    }

    const room_name =
      roomCell.querySelector(".room_name")?.textContent?.trim() ?? "";
    const capacityText = roomCell.querySelector(".capacity")?.textContent ?? "";
    const capacity = parseInt(capacityText.match(/\d+/)?.[0] ?? "0", 10);

    // ── Iterate the 12 slot rows for this room ──────────────────────────
    for (
      let slot = 0;
      slot < SLOTS_PER_ROOM && rowIdx + slot < grid.length;
      slot++
    ) {
      const row = grid[rowIdx + slot];
      if (!row) continue;

      // Day columns start at grid index 2; dayOffset 0 = Monday, ..., 6 = Sunday
      for (let dayOffset = 0; dayOffset < columnDates.length; dayOffset++) {
        const cell = row[2 + dayOffset] ?? null;
        if (!cell) continue;
        if (!cell.classList.contains("testing")) continue;
        if (seen.has(cell)) continue; // already processed (rowspan duplicate)
        seen.add(cell);

        const date = columnDates[dayOffset];
        if (!date) continue;

        // Rowspan → number of consecutive slots covered by this event
        const rs = parseInt(cell.getAttribute("rowspan") ?? "1", 10) || 1;
        const endSlot = Math.min(slot + rs - 1, SLOTS_PER_ROOM - 1);

        const start = makeDate(date, SLOT_TIMES[slot].sh, SLOT_TIMES[slot].sm);
        const end = makeDate(
          date,
          SLOT_TIMES[endSlot].eh,
          SLOT_TIMES[endSlot].em,
        );

        // ── Parse event title & number_of_members ──────────────────────
        const titleEl = cell.querySelector("span.title");
        const rawTitle = titleEl?.textContent?.trim() ?? "";

        const memberMatch = rawTitle.match(/Sĩ số[:\s]*(\d+)/i);
        const number_of_members = memberMatch
          ? parseInt(memberMatch[1], 10)
          : 0;
        const event_title = rawTitle
          .replace(/\s*Sĩ số[:\s]*\d+/gi, "")
          .replace(/\s{2,}/g, " ")
          .trim();

        // ── Parse event description ─────────────────────────────────────
        const descEl = cell.querySelector("span.description");
        const event_description = descEl?.textContent?.trim() ?? "";

        schedules.push({
          start,
          end,
          building_id: buildingId,
          room_name,
          capacity,
          number_of_members,
          event_title,
          event_description,
        });
      }
    }

    rowIdx += SLOTS_PER_ROOM;
  }

  return schedules;
}

/**
 * Fetch https://daa.uit.edu.vn/lichphong, parse its HTML, and return
 * all Schedule entries from every building tab.
 *
 * Note: If the server does not send CORS headers the browser will block
 * this request.  In that case route the call through a server-side proxy
 * or a CORS proxy service.
 */
async function fetchSchedules(): Promise<Schedule[]> {
  const response = await fetch("/api/uit/lichphong", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch schedule: ${response.status} ${response.statusText}`,
    );
  }

  const html = await response.text();
  const doc = new DOMParser().parseFromString(html, "text/html");

  const schedules: Schedule[] = [];

  // Each building tab has id like "tab_A", "tab_B", "tab_C", …
  doc.querySelectorAll<HTMLElement>('[id^="tab_"]').forEach((tab) => {
    const tabId = tab.getAttribute("id") ?? "";
    const buildingId = tabId.replace("tab_", "");
    const table = tab.querySelector("table");
    if (table) schedules.push(...parseTabTable(table, buildingId));
  });

  return schedules;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ScheduleContext = createContext<ScheduleContextType | undefined>(
  undefined,
);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ScheduleProvider({ children }: { children: ReactNode }) {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  /** Fetch and hydrate schedule data from the UIT room-booking page. */
  const initSchedule = useCallback(async (): Promise<void> => {
    const data = await fetchSchedules();
    setSchedules(data);
    setCompletedInit(true);
  }, []);

  const [completedInit, setCompletedInit] = useState<boolean>(false);

  /**
   * Filter schedules by any combination of criteria.
   *
   * - start / end   : overlap check — returns events whose time range
   *                   intersects [start, end].
   * - building_id   : exact match.
   * - room_name     : substring match.
   * - capacity      : minimum room capacity (s.capacity >= capacity).
   * - event_title   : substring match.
   * - event_description : substring match.
   *
   * Omitting a parameter (or passing undefined) skips that filter.
   */
  const getEvents = useCallback(
    ({
      start,
      end,
      building_id,
      room_name,
      capacity,
      event_title,
      event_description,
    }: ScheduleFilter): Schedule[] => {
      if (!completedInit) return [];

      return schedules.filter((s) => {
        if (start !== undefined && s.end < start) return false;
        if (end !== undefined && s.start > end) return false;
        if (building_id !== undefined && s.building_id !== building_id)
          return false;
        if (room_name !== undefined && !s.room_name.includes(room_name))
          return false;
        if (capacity !== undefined && s.capacity < capacity) return false;
        if (event_title !== undefined && !s.event_title.includes(event_title))
          return false;
        if (
          event_description !== undefined &&
          !s.event_description.includes(event_description)
        )
          return false;

        return true;
      });
    },
    [completedInit],
  );

  const getCrowdDensity = useCallback(
    (filter: ScheduleFilter): number => {
      if (!completedInit) return 0;

      const filteredSchedules: Schedule[] = getEvents(filter);

      const numberOfMembers = filteredSchedules.reduce(
        (sum, s) => sum + s.number_of_members,
        0,
      );

      // Building A: 958
      // Building B: 5088
      // Building C: 1952
      // Building E: 722
      // Sport: 490

      return numberOfMembers / 9210;
    },
    [completedInit],
  );

  return (
    <ScheduleContext.Provider
      value={{
        schedules,
        initSchedule,
        completedInit,
        getEvents,
        getCrowdDensity,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useSchedule(): ScheduleContextType {
  const ctx = useContext(ScheduleContext);
  if (!ctx) {
    throw new Error("useSchedule must be used within a <ScheduleProvider>.");
  }
  return ctx;
}

export default ScheduleContext;
