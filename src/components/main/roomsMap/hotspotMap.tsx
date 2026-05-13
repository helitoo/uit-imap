import { Room } from "@/lib/types/room";
import FloorMap from "@/components/main/roomsMap/floorMap";

export default function HotspotMap({ rooms }: { rooms: Room[] }) {
  // 1. Nhóm các phòng theo số tầng
  const roomsByFloor = rooms.reduce(
    (acc, room) => {
      if (room.floor == null || room.cols === null || room.rows === null)
        return acc;

      const floor = room.floor;

      if (!acc[floor]) acc[floor] = [];
      acc[floor].push(room);

      return acc;
    },
    {} as Record<number, Room[]>,
  );

  // 2. Lấy danh sách số tầng và sắp xếp giảm dần (tầng cao nhất lên đầu)
  const sortedFloors = Object.keys(roomsByFloor)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="flex flex-col gap-8 p-4">
      {sortedFloors.map((floor) => (
        <section key={floor} className="space-y-3">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-gray-700 whitespace-nowrap">
              Tầng {floor}
            </h2>
            <div className="h-[1px] w-full bg-gray-200"></div>
          </div>

          <div className="bg-gray-50 rounded-xl shadow-sm border overflow-hidden flex flex-col max-w-full">
            <FloorMap rooms={roomsByFloor[floor]} />
          </div>
        </section>
      ))}
    </div>
  );
}
