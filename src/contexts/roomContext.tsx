import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Room } from "@/lib/types/room";
import { httpClient } from "@/lib/httpClient";
import { toast } from "sonner";

interface RoomContextValue {
  rooms: Room[];
  setRooms: Dispatch<SetStateAction<Room[]>>;
  loading: boolean;
  error: string | null;
  getRoomsByBelongsTo: (belongsTo: string) => Room[];
  getRoomByName: (name: string) => Room | null;

  // For direction
  destRoom: Room | null;
  setDestRoom: (room: Room) => void;
}

const RoomsContext = createContext<RoomContextValue | null>(null);

export function RoomsProvider({ children }: { children: ReactNode }) {
  const [rooms, setRooms] = useState<Room[]>([]);
  // const [loading, setLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [destRoom, setDestRoom] = useState<Room | null>(null);

  const getRoomsByBelongsTo = useCallback(
    (belongsTo: string) => {
      if (!rooms.length) return [];
      return rooms.filter((r) => r.belongsTo === belongsTo);
    },
    [rooms],
  );

  const getRoomByName = useCallback(
    (name: string): Room | null => {
      if (!rooms.length) return null;
      return rooms.filter((r) => r.name === name)[0];
    },
    [rooms],
  );

  useEffect(() => {
    httpClient
      .get<Room[]>("/rooms")
      .then((raw) => {
        setRooms(raw);
      })
      .catch((e: Error) => {
        console.error("Error fetching rooms data:", e);
        toast.error("Đã có lỗi, xin hãy thử lại");
        setError(e.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <RoomsContext.Provider
      value={{
        rooms,
        setRooms,
        getRoomsByBelongsTo,
        getRoomByName,
        destRoom,
        setDestRoom,
        loading,
        error,
      }}
    >
      {children}
    </RoomsContext.Provider>
  );
}

export function useRooms() {
  const context = useContext(RoomsContext);
  if (!context) {
    throw new Error("useRooms must be used within RoomsProvider");
  }
  return context;
}

export function useSyncRoomsWithEvents(
  getTodayEventsByRoomName: (roomName: string) => any[],
  eventsLoading: boolean,
) {
  const { rooms, setRooms, loading: roomsLoading } = useRooms();

  useEffect(() => {
    if (!roomsLoading && !eventsLoading && rooms.length > 0) {
      const hasUndefined = rooms.some((r) => r.hasEvent === undefined);
      if (hasUndefined) {
        setRooms((prev) =>
          prev.map((r) => ({
            ...r,
            hasEvent: getTodayEventsByRoomName(r.name).length > 0,
          })),
        );
      }
    }
  }, [roomsLoading, eventsLoading, rooms, getTodayEventsByRoomName, setRooms]);
}
