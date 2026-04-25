"use client";

import EventCell from "@/components/main/navbar/event/EventCell";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useSchedule } from "@/contexts/scheduleContext";
import type { Schedule } from "@/lib/types/schedule";
import { Layers } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

/* ─── helpers ─── */
function startOfToday(): Date {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}

function formatNow() {
  return new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "numeric",
    year: "numeric",
  });
}

function formatTime() {
  return new Date().toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const toMin = (d: Date) => d.getHours() * 60 + d.getMinutes();

const MORNING_CUT = 11 * 60 + 30;

const AFTERNOON_START = 13 * 60;

const BUILDINGS = [
  { value: "A", label: "Tòa nhà A" },
  { value: "B", label: "Tòa nhà B" },
  { value: "C", label: "Tòa nhà C" },
  { value: "E", label: "Tòa nhà E" },
  { value: "Santap", label: "Sân tập thể thao" },
] as const;

const CELL_W = 150; // px
const CELL_H = 150; // px

/* ─── types ─── */
interface EventSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/* ─── component ─── */
export function EventSheet({ open, onOpenChange }: EventSheetProps) {
  const { getEvents, completedInit } = useSchedule();
  const [selectedBuilding, setSelectedBuilding] = useState<string>("A");
  const [eventMap, setEventMap] = useState<
    Map<string, Map<string, Schedule[]>>
  >(new Map());
  const [now, setNow] = useState(() => ({
    date: formatNow(),
    time: formatTime(),
  }));

  /* fetch once after init */
  useEffect(() => {
    if (!completedInit) return;
    const events = getEvents({ start: startOfToday() });

    const map = new Map<string, Map<string, Schedule[]>>();
    for (const ev of events) {
      const bKey = ev.building_id ?? "";
      const rKey = ev.room_name ?? ev.room_name ?? "";
      if (!map.has(bKey)) map.set(bKey, new Map());
      const rm = map.get(bKey)!;
      if (!rm.has(rKey)) rm.set(rKey, []);
      rm.get(rKey)!.push(ev);
    }
    /* sort schedules inside each room */
    for (const rm of map.values())
      for (const [k, arr] of rm)
        rm.set(
          k,
          arr.sort((a, b) => a.start.getTime() - b.start.getTime()),
        );

    setEventMap(map);
  }, [completedInit]);

  /* derive rows for selected building */
  const { morningCols, afternoonCols } = useMemo(() => {
    const rm = eventMap.get(selectedBuilding) ?? new Map<string, Schedule[]>();

    /* sort room_names but display room_name; assume room_name is on the schedule */
    const rooms = [...rm.keys()].sort();

    const morningCols: { name: string; cells: Schedule[] }[] = [];
    const afternoonCols: { name: string; cells: Schedule[] }[] = [];

    for (const roomId of rooms) {
      const schedules = rm.get(roomId)!;
      const displayName = schedules[0]?.room_name ?? roomId;
      const morning = schedules.filter((e) => toMin(e.start) < MORNING_CUT);
      const afternoon = schedules.filter(
        (e) => toMin(e.start) >= AFTERNOON_START,
      );
      if (morning.length)
        morningCols.push({ name: displayName, cells: morning });
      if (afternoon.length)
        afternoonCols.push({ name: displayName, cells: afternoon });
    }

    return { morningCols, afternoonCols };
  }, [eventMap, selectedBuilding]);

  if (!completedInit) return null;

  const isEmpty = morningCols.length === 0 && afternoonCols.length === 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showOverlay={false}
        className="p-0 flex flex-col border-l border-border/50 w-full overflow-hidden"
      >
        {/* ── Header ── */}
        <div className="shrink-0 bg-white border-b border-border/50 sticky top-0 z-20">
          <div className="flex items-center justify-between px-10 py-2 h-14">
            {/* Left: Time Info */}
            <div className="flex flex-col min-w-0">
              <h2 className="text-[13px] font-bold text-foreground leading-tight">
                {now.date}
              </h2>
              <p className="text-[11px] text-muted-foreground font-medium tabular-nums">
                {now.time}
              </p>
            </div>

            {/* Right: Building Select */}
            <div className="flex items-center gap-3">
              <label className="hidden sm:block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                Tòa nhà
              </label>
              <div className="relative">
                <select
                  value={selectedBuilding}
                  onChange={(e) => setSelectedBuilding(e.target.value)}
                  className="appearance-none h-9 w-[140px] sm:w-[180px] rounded-lg border border-input bg-muted/30 px-3 pr-8 text-sm font-medium focus:ring-2 focus:ring-main/20 outline-none transition-all cursor-pointer hover:bg-muted/50"
                >
                  {BUILDINGS.map((b) => (
                    <option key={b.value} value={b.value}>
                      {b.label}
                    </option>
                  ))}
                </select>
                {/* Custom Arrow Icon cho khoa học hơn */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto bg-white">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-64 gap-3 text-center px-6">
              <Layers className="w-10 h-10 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">
                Không tìm thấy sự kiện nào.
              </p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-border/10">
              <SessionSection label="Buổi Sáng" cols={morningCols} />
              <SessionSection label="Buổi Chiều" cols={afternoonCols} />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ─── SessionSection: horizontal scroll with scrollbar at TOP ─── */
function SessionSection({
  label,
  cols,
}: {
  label: string;
  cols: { name: string; cells: Schedule[] }[];
}) {
  if (cols.length === 0) return null;

  return (
    <div className="flex flex-col">
      {/* Section label */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-main">
          {label}
        </span>
      </div>

      <div className="overflow-x-auto" style={{ transform: "rotateX(180deg)" }}>
        <div
          className="px-4 pb-4 pt-2"
          style={{
            transform: "rotateX(180deg)",
            display: "grid",
            gridTemplateColumns: `repeat(${cols.length}, ${CELL_W}px)`,
            gap: "12px",
            width: "max-content",
          }}
        >
          {cols.map(({ name, cells }) => (
            <div
              key={name}
              className="flex flex-col gap-2"
              style={{ width: CELL_W }}
            >
              {/* Room header */}
              <div className="text-[10px] font-bold text-center text-muted-foreground bg-muted/50 rounded py-1.5 px-2 truncate border border-border/40">
                {name}
              </div>

              {/* Event cells */}
              {cells.map((ev, i) => (
                <EventCell
                  key={i}
                  schedule={ev}
                  style={{ width: CELL_W, height: CELL_H }}
                  className="overflow-hidden"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
