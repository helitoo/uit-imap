// FloorMap.tsx
import { useEffect, useMemo, useState } from "react";

import { Room } from "@/lib/types/room";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/lib/types/category";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useWindow } from "@/contexts/windowContext";
import { useEvent } from "@/contexts/eventContext";
import { Event } from "@/lib/types/event";
import { CalendarX, Clock, Info, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FloorMap({ rooms }: { rooms: Room[] }) {
  // Calc layout

  const { isMobile } = useWindow();

  if (rooms.length === 0) return null;

  const CONTAINER_PADDING = isMobile ? 8 : 16;
  const GAP = 1;

  const { maxRow, maxCol } = useMemo(() => {
    const maxRow = Math.max(...rooms.map((r) => r.rows?.[1] ?? 1), 1);

    const maxCol = Math.max(...rooms.map((r) => r.cols?.[1] ?? 1), 1);

    return {
      maxRow,
      maxCol,
    };
  }, [rooms]);

  const CELL_SIZE = useMemo(() => {
    const availableWidth = isMobile ? 400 : 900;
    const usableWidth = availableWidth - CONTAINER_PADDING * 2;

    const calculated = (usableWidth - (maxCol - 1) * GAP) / maxCol;

    const MIN_SIZE = isMobile ? 30 : 40;

    const MAX_SIZE = isMobile ? 60 : 70;

    return Math.min(MAX_SIZE, Math.max(MIN_SIZE, calculated));
  }, [isMobile, maxCol]);

  const gridWidth = maxCol * CELL_SIZE + (maxCol - 1) * GAP;

  const gridHeight = maxRow * CELL_SIZE + (maxRow - 1) * GAP;

  // Event
  const { loading, getTodayEventsByRoomName } = useEvent();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  const handleSelectRoom = (room: Room) => {
    if (!["stairs", "warehouse", "wc", "tech"].includes(room.category))
      setSelectedRoom(room);
  };

  useEffect(() => {
    if (selectedRoom && !loading) {
      if (selectedRoom.hasEvent) {
        const data = getTodayEventsByRoomName(selectedRoom.name);
        setEvents(data);
      } else {
        setEvents([]);
      }
    } else {
      setEvents([]); // Reset khi đóng dialog
    }
  }, [selectedRoom, getTodayEventsByRoomName, loading]);

  return (
    <>
      <div
        className="w-full overflow-hidden"
        style={{
          padding: CONTAINER_PADDING,
        }}
      >
        <div
          className="overflow-hidden"
          style={{
            width: "100%",
          }}
        >
          <div
            className="grid"
            style={{
              gap: GAP,
              gridTemplateColumns: `repeat(${maxCol}, minmax(0, ${CELL_SIZE}px))`,
              gridAutoRows: `${CELL_SIZE}px`,
              width: "fit-content",
              minWidth: "100%",
              height: gridHeight,
              alignContent: "start",
              justifyContent: "start",
            }}
          >
            {rooms.map((room) => (
              <button
                key={room.id}
                type="button"
                onClick={() => handleSelectRoom(room)}
                className={`
                  flex items-center justify-center
                  rounded-md
                  p-1
                  text-center
                  font-medium
                  transition-all
                  hover:opacity-80
                  active:scale-95
                  overflow-hidden
                  break-words
                  leading-tight
                  ${room.hasEvent ? "border-2 border-green-500" : ""}
                  ${isMobile ? "text-[8px]" : "text-[11px]"}
                  ${CATEGORY_COLORS[room.category] ??
                  "bg-gray-100 text-gray-700"
                  }
                `}
                style={{
                  gridRowStart: room.rows?.[0] ?? "auto",
                  gridRowEnd: room.rows ? room.rows[1] + 1 : "auto",

                  gridColumnStart: room.cols?.[0] ?? "auto",

                  gridColumnEnd: room.cols ? room.cols[1] + 1 : "auto",
                }}
              >
                <span className="line-clamp-3">{room.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <Dialog
        open={!!selectedRoom}
        onOpenChange={(open) => !open && setSelectedRoom(null)}
      >
        <DialogContent className="max-w-md p-0 overflow-hidden gap-0">
          <div className="p-6 pb-4 bg-slate-50/50 border-b">
            <div className="flex flex-col gap-1">
              <div className="text-xl font-bold">{selectedRoom?.name}</div>
              {selectedRoom?.description && (
                <p className="line-clamp-3 leading-relaxed text-justify text-sm">
                  {selectedRoom?.description}
                </p>
              )}
            </div>
          </div>

          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Section: Thông tin phòng */}
            {selectedRoom && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground font-medium">
                    Loại phòng
                  </p>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${selectedRoom.category
                      ? CATEGORY_COLORS[selectedRoom.category]
                      : "bg-gray-100"
                      }`}
                  >
                    {selectedRoom.category
                      ? CATEGORY_LABELS[selectedRoom.category]
                      : "N/A"}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground font-medium">Vị trí</p>
                  <p className="font-semibold text-foreground">
                    Tầng {selectedRoom.floor ?? "N/A"} •{" "}
                    {selectedRoom.belongsTo}
                  </p>
                </div>
              </div>
            )}

            {/* Section: Danh sách sự kiện (Refactored theo mẫu) */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                Sự kiện hôm nay
                <span className="h-px flex-1 bg-border" />
              </h4>

              <div className="space-y-3">
                {events.length > 0 ? (
                  events.map((event, idx) => {
                    const isMorning = event.start.getHours() < 12;

                    return (
                      <div
                        key={idx}
                        className={cn(
                          "group relative flex gap-3 p-3 transition-all duration-200",
                          "hover:bg-accent/30 cursor-default border rounded-r-xl",
                          "border-l-4",
                          isMorning
                            ? "border-l-emerald-400"
                            : "border-l-amber-400",
                        )}
                      >
                        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                          {/* Title */}
                          <p className="text-sm font-bold text-foreground leading-snug line-clamp-2">
                            {event.event_title}
                          </p>

                          {/* Description */}
                          {event.event_description && (
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed text-justify">
                              {event.event_description.replace(
                                "Giảng viên",
                                "GV",
                              )}
                            </p>
                          )}

                          {/* Meta Info */}
                          <div className="flex items-center gap-4 mt-1">
                            <span className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                              <Clock className="w-3 h-3 shrink-0" />
                              {event.start.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}{" "}
                              -{" "}
                              {event.end.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>

                            <span className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
                              <Users className="w-3 h-3 shrink-0" />
                              {event.number_of_members}/{event.capacity}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed rounded-xl bg-slate-50/50">
                    <CalendarX className="w-8 h-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Trống lịch hôm nay
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
