"use client";

import EventCell from "@/components/main/navbar/event/EventCell";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useEvent } from "@/contexts/eventContext";
import { useHotspots } from "@/contexts/hotspotsContext";
import { useRooms } from "@/contexts/roomContext";
import type { Event } from "@/lib/types/event";
import { CalendarX } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ───────────────── helpers ───────────────── */

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

/* ───────────────── constants ───────────────── */

const CELL_W = 150;
const CELL_H = 150;
const GRID_GAP = 12;

/* ───────────────── types ───────────────── */

interface EventSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/* ───────────────── main component ───────────────── */

export function EventSheet({ open, onOpenChange }: EventSheetProps) {
  const { getTodayEvents } = useEvent();

  const [selectedBuilding, setSelectedBuilding] = useState<string>("A");

  const [eventMap, setEventMap] = useState<Map<string, Map<string, Event[]>>>(
    new Map(),
  );

  const [now, setNow] = useState(() => ({
    date: formatNow(),
    time: formatTime(),
  }));

  /* realtime clock */
  useEffect(() => {
    const interval = setInterval(() => {
      setNow({
        date: formatNow(),
        time: formatTime(),
      });
    }, 1000 * 30);

    return () => clearInterval(interval);
  }, []);

  /* fetch events */
  useEffect(() => {
    const events = getTodayEvents();

    const map = new Map<string, Map<string, Event[]>>();

    for (const ev of events) {
      const buildingKey = ev.building_id ?? "";
      const roomKey = ev.room_name ?? "";

      if (!map.has(buildingKey)) {
        map.set(buildingKey, new Map());
      }

      const roomMap = map.get(buildingKey)!;

      if (!roomMap.has(roomKey)) {
        roomMap.set(roomKey, []);
      }

      roomMap.get(roomKey)!.push(ev);
    }

    /* sort events inside each room */
    for (const roomMap of map.values()) {
      for (const [key, arr] of roomMap) {
        roomMap.set(
          key,
          arr.sort((a, b) => a.start.getTime() - b.start.getTime()),
        );
      }
    }

    setEventMap(map);
  }, [getTodayEvents]);

  /* derive UI data */
  const { morningCols, afternoonCols } = useMemo(() => {
    const roomMap =
      eventMap.get(selectedBuilding) ?? new Map<string, Event[]>();

    const rooms = [...roomMap.keys()].sort();

    const morningCols: {
      name: string;
      cells: Event[];
    }[] = [];

    const afternoonCols: {
      name: string;
      cells: Event[];
    }[] = [];

    for (const roomId of rooms) {
      const events = roomMap.get(roomId)!;

      const displayName = events[0]?.room_name ?? roomId;

      const morning = events.filter((e) => toMin(e.start) < MORNING_CUT);

      const afternoon = events.filter((e) => toMin(e.start) >= AFTERNOON_START);

      if (morning.length) {
        morningCols.push({
          name: displayName,
          cells: morning,
        });
      }

      if (afternoon.length) {
        afternoonCols.push({
          name: displayName,
          cells: afternoon,
        });
      }
    }

    return {
      morningCols,
      afternoonCols,
    };
  }, [eventMap, selectedBuilding]);

  const isEmpty = morningCols.length === 0 && afternoonCols.length === 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showOverlay={false}
        className="
          p-0
          flex
          flex-col
          border-l
          border-border/50
          w-full
          overflow-hidden
        "
      >
        {/* ───────── Header ───────── */}
        <div
          className="
            shrink-0
            bg-white
            border-b
            border-border/50
            sticky
            top-0
            z-20
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              px-10
              py-2
              h-14
            "
          >
            {/* time */}
            <div className="flex flex-col min-w-0">
              <h2
                className="
                  text-[13px]
                  font-bold
                  text-foreground
                  leading-tight
                "
              >
                {now.date}
              </h2>

              <p
                className="
                  text-[11px]
                  text-muted-foreground
                  font-medium
                  tabular-nums
                "
              >
                {now.time}
              </p>
            </div>

            {/* building select */}
            <div className="flex items-center gap-3">
              <label
                className="
                  hidden
                  sm:block
                  text-[11px]
                  font-semibold
                  text-muted-foreground
                  uppercase
                  tracking-wider
                  whitespace-nowrap
                "
              >
                Tòa nhà
              </label>

              <div className="relative">
                <select
                  value={selectedBuilding}
                  onChange={(e) => setSelectedBuilding(e.target.value)}
                  className="
                    appearance-none
                    h-9
                    w-[140px]
                    sm:w-[180px]
                    rounded-lg
                    border
                    border-input
                    bg-muted/30
                    px-3
                    pr-8
                    text-sm
                    font-medium
                    outline-none
                    transition-all
                    cursor-pointer
                    hover:bg-muted/50
                    focus:ring-2
                    focus:ring-main/20
                  "
                >
                  {BUILDINGS.map((b) => (
                    <option key={b.value} value={b.value}>
                      {b.label}
                    </option>
                  ))}
                </select>

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    right-0
                    flex
                    items-center
                    px-2
                    text-muted-foreground
                  "
                >
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

        {/* ───────── Body ───────── */}
        <div className="flex-1 overflow-y-auto bg-white">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed rounded-xl bg-slate-50/50">
              <CalendarX className="w-8 h-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Trống lịch hôm nay
              </p>
            </div>
          ) : (
            <div
              className="
                flex
                flex-col
                divide-y
                divide-border/10
                pb-5
              "
            >
              <SessionSection
                label="Buổi Sáng"
                cols={morningCols}
                onOpenChange={onOpenChange}
              />

              <SessionSection
                label="Buổi Chiều"
                cols={afternoonCols}
                onOpenChange={onOpenChange}
              />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ───────────────── session section ───────────────── */

function SessionSection({
  label,
  cols,
  onOpenChange,
}: {
  label: string;
  cols: {
    name: string;
    cells: Event[];
  }[];
  onOpenChange: (open: boolean) => void;
}) {
  const navigate = useNavigate();

  const { getRoomByName } = useRooms();

  const { setSelectedHotspot, getHotspotById } = useHotspots();

  if (cols.length === 0) return null;

  const handleClick = (roomName: string) => {
    const room = getRoomByName(roomName);

    if (!room) return;

    const hotspot = getHotspotById(room.belongsTo) || null;

    if (!hotspot) return;

    onOpenChange(false);

    setSelectedHotspot(hotspot);

    navigate(`/hotspot/${hotspot.id}`, {
      replace: false,
    });
  };

  const contentWidth = cols.length * CELL_W + (cols.length - 1) * GRID_GAP;

  return (
    <section className="flex flex-col">
      {/* section label */}
      <div
        className="
          flex
          items-center
          gap-2
          px-4
          pt-4
          pb-2
        "
      >
        <span
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.15em]
            text-main
          "
        >
          {label}
        </span>
      </div>

      {/* horizontal scroll */}
      <ScrollArea
        className="
          w-full
          overflow-y-hidden
        "
      >
        <div className="min-w-max">
          <div
            className="
              grid
              px-4
              pb-4
              pt-2
            "
            style={{
              gridTemplateColumns: `repeat(${cols.length}, ${CELL_W}px)`,
              gap: `${GRID_GAP}px`,
              width: `${contentWidth}px`,
            }}
          >
            {cols.map(({ name, cells }) => (
              <div
                key={name}
                className="
                    flex
                    flex-col
                    gap-2
                  "
                style={{
                  width: CELL_W,
                }}
              >
                {/* room header */}
                <Button
                  className="
                      text-[10px]
                      font-bold
                      text-center
                      text-muted-foreground
                      bg-muted/50
                      rounded
                      py-1.5
                      px-2
                      truncate
                      border
                      border-border/40
                      hover:bg-muted
                    "
                  onClick={() => handleClick(cells[0].room_name)}
                >
                  {name}
                </Button>

                {/* event list */}
                {cells.map((ev, i) => (
                  <EventCell
                    key={i}
                    event={ev}
                    style={{
                      width: CELL_W,
                      height: CELL_H,
                    }}
                    className="overflow-hidden"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* identical behavior to FloorMap */}
        <ScrollBar orientation="horizontal" forceMount />
      </ScrollArea>
    </section>
  );
}
