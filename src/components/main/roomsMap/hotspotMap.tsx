// HotspotMap.tsx
import { Room } from "@/lib/types/room";
import FloorMap from "@/components/main/roomsMap/floorMap";

export default function HotspotMap({ rooms }: { rooms: Room[] }) {
  /**
   * Group rooms by floor
   */
  const roomsByFloor = rooms.reduce(
    (acc, room) => {
      if (room.floor == null || room.cols == null || room.rows == null) {
        return acc;
      }

      if (!acc[room.floor]) {
        acc[room.floor] = [];
      }

      acc[room.floor].push(room);

      return acc;
    },
    {} as Record<number, Room[]>,
  );

  /**
   * Sort floors descending
   */
  const sortedFloors = Object.keys(roomsByFloor)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="flex flex-col gap-6 p-4 w-full overflow-hidden">
      {sortedFloors.map((floor) => (
        <section key={floor} className="space-y-3 w-full">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-gray-700 whitespace-nowrap">
              Tầng {floor}
            </h2>

            <div className="h-px w-full bg-gray-200" />
          </div>

          <div className="w-full overflow-hidden rounded-xl border bg-gray-50 shadow-sm">
            <FloorMap rooms={roomsByFloor[floor]} />
          </div>
        </section>
      ))}
    </div>
  );
}
