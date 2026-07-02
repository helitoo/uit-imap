import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  events2String,
  string2Events,
} from "@/lib/helpers/event/encodeDecodeEvent";

import { fetchEvents } from "@/lib/helpers/event/fetchEvents";

import type { Event } from "@/lib/types/event";
import { useRooms } from "@/contexts/roomContext";
import { normalizeEvents } from "@/lib/helpers/event/normalizeEvents";
import getTodayInterval from "@/lib/helpers/event/getTodayInterval";
import { useHotspots } from "@/contexts/hotspotsContext";

interface EventContextType {
  events: Event[];
  loading: boolean;
  getTodayEvents: () => Event[];
  getTodayEventsByRoomName: (roomName: string) => Event[];
  getTodayEventsByHotspotId: (hotspotId: string) => Event[];
  getCurrentDensity: () => number;
}

const LASTFETCH_KEY = "event-lastfetch";
const SCHEDULE_KEY = "event";

// ─── Context ──────────────────────────────────────────────────────────────────

const EventContext = createContext<EventContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { rooms, getRoomByName } = useRooms();
  const { getHotspotById } = useHotspots();

  const roomsLength = rooms?.length || 0;
  useEffect(() => {
    if (roomsLength === 0) return;

    const initEvents = async () => {
      try {
        const lastFetch = Number(localStorage.getItem(LASTFETCH_KEY));

        if (Date.now() - lastFetch > 6 * 60 * 60 * 1000)
          throw new Error("Cache expired");

        const scheduleRaw = localStorage.getItem(SCHEDULE_KEY);

        if (!scheduleRaw) throw new Error("No cached events");

        const data = string2Events(scheduleRaw);
        const normalizedEvents = normalizeEvents(data, rooms);
        setEvents(normalizedEvents);
        setLoading(false);
      } catch (err) {
        // Lỗi... -> cần fetch lại
        const data = await fetchEvents();

        localStorage.setItem(LASTFETCH_KEY, Date.now().toString());
        localStorage.setItem(SCHEDULE_KEY, events2String(data));

        setEvents(data);
        setLoading(false);
      }
    };

    initEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomsLength]);

  const getTodayEvents = useCallback(() => {
    if (loading) return [];

    const { start, end } = getTodayInterval();

    return events.filter((event) => {
      if (event.end <= start) return false;
      if (event.start >= end) return false;
      return true;
    });
  }, [loading, events]);

  const getTodayEventsByRoomName = useCallback(
    (roomName: string) => {
      if (loading) return [];

      const { start, end } = getTodayInterval();

      return events.filter((event) => {
        if (event.end <= start) return false;
        if (event.start >= end) return false;
        if (event.room_name !== roomName) return false;
        return true;
      });
    },
    [loading, events],
  );

  const getTodayEventsByHotspotId = useCallback(
    (hotspotId: string) => {
      if (loading) return [];

      const { start, end } = getTodayInterval();

      return events.filter((event) => {
        if (event.end <= start) return false;
        if (event.start >= end) return false;

        const room = getRoomByName(event.room_name);
        if (!room) return false;

        const hotspot = getHotspotById(room.belongsTo);
        if (!hotspot) return false;

        if (hotspot.id !== hotspotId) return false;
        return true;
      });
    },
    [loading, events, getRoomByName, getHotspotById],
  );

  const getCurrentDensity = useCallback(() => {
    if (loading) return 0;

    const now = Date.now();
    const currentEvents: Event[] = events.filter((event) => {
      return event.start.getDate() <= now && now < event.end.getDate();
    });

    const numberOfMembers = currentEvents.reduce(
      (sum, s) => sum + s.number_of_members,
      0,
    );

    // Building A: 958
    // Building B: 5088
    // Building C: 1952
    // Building E: 722
    // Sport: 490

    return numberOfMembers / 9210;
  }, [loading, events]);

  return (
    <EventContext.Provider
      value={{
        events,
        loading,
        getTodayEvents,
        getTodayEventsByRoomName,
        getTodayEventsByHotspotId,
        getCurrentDensity,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useEvent(): EventContextType {
  const ctx = useContext(EventContext);
  if (!ctx) {
    throw new Error("useEvent must be used within a <EventProvider>.");
  }
  return ctx;
}

export default EventContext;
