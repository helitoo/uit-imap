import type { Schedule } from "@/lib/types/schedule";

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

/** Make Date object from integer info **/
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
export function parseTabTable(table: Element, buildingId: string): Schedule[] {
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
