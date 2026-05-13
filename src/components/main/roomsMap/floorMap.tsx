// FloorMap.tsx
import { useMemo, useState } from "react";

import { Room } from "@/lib/types/room";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/lib/types/category";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useWindow } from "@/contexts/windowContext";

interface FloorMapProps {
  rooms: Room[];
}

export default function FloorMap({ rooms }: FloorMapProps) {
  const { isMobile } = useWindow();

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  /**
   * Không render nếu không có room
   */
  if (rooms.length === 0) return null;

  /**
   * Layout constants
   */
  const CONTAINER_PADDING = isMobile ? 8 : 16;
  const GAP = 1;

  /**
   * Tính số hàng / cột lớn nhất
   */
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

  /**
   * Grid dimensions
   */
  const gridWidth = maxCol * CELL_SIZE + (maxCol - 1) * GAP;

  const gridHeight = maxRow * CELL_SIZE + (maxRow - 1) * GAP;

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
                onClick={() => setSelectedRoom(room)}
                className={`
                  flex items-center justify-center
                  rounded-md border
                  p-1
                  text-center
                  font-medium
                  shadow-sm
                  transition-all
                  hover:opacity-80
                  active:scale-95
                  overflow-hidden
                  break-words
                  leading-tight
                  ${isMobile ? "text-[8px]" : "text-[11px]"}
                  ${
                    CATEGORY_COLORS[room.category] ??
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
        onOpenChange={(open) => {
          if (!open) {
            setSelectedRoom(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thông tin chi tiết: {selectedRoom?.name}</DialogTitle>
          </DialogHeader>

          {selectedRoom && (
            <div className="space-y-3 py-4">
              <div className="flex justify-between border-b pb-2 gap-3">
                <span className="font-semibold">Loại phòng:</span>

                <span
                  className={`
                    rounded px-2 py-0.5 text-sm
                    ${
                      selectedRoom.category
                        ? CATEGORY_COLORS[selectedRoom.category]
                        : "bg-gray-100 text-gray-700"
                    }
                  `}
                >
                  {selectedRoom.category
                    ? CATEGORY_LABELS[selectedRoom.category]
                    : "N/A"}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2 gap-3">
                <span className="font-semibold">Thuộc:</span>

                <span className="text-right">{selectedRoom.belongsTo}</span>
              </div>

              <div className="flex justify-between border-b pb-2 gap-3">
                <span className="font-semibold">Tầng:</span>

                <span>{selectedRoom.floor ?? "N/A"}</span>
              </div>

              {selectedRoom.description && (
                <div className="pt-2">
                  <p className="font-semibold mb-1">Mô tả:</p>

                  <p className="text-sm text-gray-600 break-words">
                    {selectedRoom.description}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
