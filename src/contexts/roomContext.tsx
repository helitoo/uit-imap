import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Room } from "@/lib/types/room";

interface RoomContextValue {
  rooms: Room[];
  loading: boolean;
  error: string | null;

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

  useEffect(() => {
    fetch("/data/rooms.json")
      .then((r) => {
        if (!r.ok) throw new Error("Can't fetch rooms data");
        return r.json();
      })
      .then((raw) => {
        setRooms(raw);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <RoomsContext.Provider
      value={{
        rooms,
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
