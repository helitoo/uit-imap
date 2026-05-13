import { useState } from "react";
import { Room } from "@/lib/types/room";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/lib/types/category";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function FloorMap({ rooms }: { rooms: Room[] }) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // Tính toán grid layout động dựa trên max row/col
  const maxRow = Math.max(...rooms.map((r) => (r.rows ? r.rows[1] : 0)), 0);
  const maxCol = Math.max(...rooms.map((r) => (r.cols ? r.cols[1] : 0)), 0);

  // Số cột/hàng cần thiết (maxCol là chỉ số cuối cùng, không cần +1)
  const gridColumns = maxCol;
  const gridRows = maxRow;

  return (
    <>
      {rooms.length > 0 ? (
        <>
          <div
            className="grid gap-1 overflow-x-auto sm:overflow-x-auto md:overflow-visible"
            style={{
              gridTemplateColumns: `repeat(${gridColumns}, 50px)`,
              gridAutoRows: "50px",
            }}
          >
            {rooms.map((room) => (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room)} // Kích hoạt dialog bằng cách set state
                className={`flex items-center justify-center border rounded-md cursor-pointer transition-all hover:scale-95 active:opacity-70 text-center text-xs font-medium p-1 shadow-sm ${
                  CATEGORY_COLORS[room.category] || "bg-gray-100 text-gray-700"
                }`}
                style={{
                  gridRowStart: room.rows ? room.rows[0] : "auto",
                  gridRowEnd: room.rows ? room.rows[1] + 1 : "auto",
                  gridColumnStart: room.cols ? room.cols[0] : "auto",
                  gridColumnEnd: room.cols ? room.cols[1] + 1 : "auto",
                }}
              >
                {room.name}
              </div>
            ))}
          </div>
          <Dialog
            open={!!selectedRoom}
            onOpenChange={(open) => !open && setSelectedRoom(null)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Thông tin chi tiết: {selectedRoom?.name}
                </DialogTitle>
              </DialogHeader>

              {selectedRoom && (
                <div className="space-y-3 py-4">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-semibold">Loại phòng:</span>
                    <span
                      className={`px-2 py-0.5 rounded text-sm ${
                        selectedRoom.category
                          ? CATEGORY_COLORS[selectedRoom.category]
                          : "bg-gray-100 text-gray-700"
                      }`}
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
      ) : (
        <></>
      )}
    </>
  );
}
