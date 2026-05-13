import { useMemo, useState } from "react";
import { Room } from "@/lib/types/room";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/lib/types/category";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface FloorMapProps {
  rooms: Room[];
}

const CELL_SIZE = 50;
const GAP = 1;
const PADDING = 16;

export default function FloorMap({ rooms }: FloorMapProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  /**
   * Tính toán layout grid
   */
  const { maxRow, maxCol, gridWidth, gridHeight } = useMemo(() => {
    const maxRow = Math.max(...rooms.map((r) => (r.rows ? r.rows[1] : 0)), 0);

    const maxCol = Math.max(...rooms.map((r) => (r.cols ? r.cols[1] : 0)), 0);

    return {
      maxRow,
      maxCol,
      gridWidth: maxCol * CELL_SIZE + (maxCol - 1) * GAP,
      gridHeight: maxRow * CELL_SIZE + (maxRow - 1) * GAP,
    };
  }, [rooms]);

  if (rooms.length === 0) return null;

  return (
    <>
      <ScrollArea className="w-full overflow-y-hidden">
        <div
          className="min-w-max"
          style={{
            height: gridHeight + PADDING * 2,
          }}
        >
          <div
            className="grid p-4"
            style={{
              gap: `${GAP}px`,
              gridTemplateColumns: `repeat(${maxCol}, ${CELL_SIZE}px)`,
              gridAutoRows: `${CELL_SIZE}px`,
              width: `${gridWidth}px`,
              height: `${gridHeight}px`,
            }}
          >
            {rooms.map((room) => (
              <button
                key={room.id}
                type="button"
                onClick={() => setSelectedRoom(room)}
                className={`
                  flex items-center justify-center
                  border rounded-md
                  cursor-pointer
                  transition-all
                  hover:opacity-80
                  active:scale-95
                  text-center
                  text-[10px] sm:text-xs
                  font-medium
                  p-1
                  shadow-sm
                  overflow-hidden
                  ${CATEGORY_COLORS[room.category] || "bg-gray-100 text-gray-700"}
                `}
                style={{
                  gridRowStart: room.rows?.[0] ?? "auto",
                  gridRowEnd: room.rows ? room.rows[1] + 1 : "auto",

                  gridColumnStart: room.cols?.[0] ?? "auto",
                  gridColumnEnd: room.cols ? room.cols[1] + 1 : "auto",
                }}
              >
                <span className="line-clamp-2">{room.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 
          forceMount:
          Luôn render scrollbar ngang kể cả chưa scroll
        */}
        <ScrollBar orientation="horizontal" forceMount />
      </ScrollArea>

      <Dialog
        open={!!selectedRoom}
        onOpenChange={(open) => !open && setSelectedRoom(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thông tin chi tiết: {selectedRoom?.name}</DialogTitle>
          </DialogHeader>

          {selectedRoom && (
            <div className="space-y-3 py-4">
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold">Loại phòng:</span>

                <span
                  className={`
                    px-2 py-0.5 rounded text-sm
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

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold">Thuộc:</span>

                <span>{selectedRoom.belongsTo}</span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold">Tầng:</span>

                <span>{selectedRoom.floor ?? "N/A"}</span>
              </div>

              {selectedRoom.description && (
                <div className="pt-2">
                  <p className="font-semibold">Mô tả:</p>

                  <p className="text-sm text-gray-600">
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
