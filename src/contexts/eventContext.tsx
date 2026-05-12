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

import type { Event, ScheduleFilter } from "@/lib/types/event";
import { useRooms } from "@/contexts/roomContext";
import { normalizeEvents } from "@/lib/helpers/event/normalizeEvents";

interface EventContextType {
  events: Event[];

  getEvents: (filter: ScheduleFilter) => Event[];
  getCrowdDensity: (filter: ScheduleFilter) => number;
}

const LASTFETCH_KEY = "event-lastfetch";
const SCHEDULE_KEY = "event";

// ─── Context ──────────────────────────────────────────────────────────────────

const EventContext = createContext<EventContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const { rooms } = useRooms();

  /** Fetch and hydrate event data from the UIT room page. */
  useEffect(() => {
    if (!rooms || !rooms.length) return;

    const initEvents = async () => {
      let data: Event[] = [];

      let needFetch = false;

      try {
        const lastFetch = Number(localStorage.getItem(LASTFETCH_KEY));

        if (Date.now() - lastFetch > 6 * 60 * 60 * 1000)
          throw new Error("Cache expired");

        const scheduleRaw = localStorage.getItem(SCHEDULE_KEY);

        if (!scheduleRaw) throw new Error("No cached events");

        data = string2Events(scheduleRaw);
      } catch (err) {
        // Lỗi... -> cần fetch lại
        needFetch = true;
        if (
          !(
            err instanceof Error &&
            ["Cache expired", "No cached events"].includes(err.message)
          )
        ) {
          console.error("Event cache error:", err);
        }
      }

      if (needFetch) {
        data = await fetchEvents();

        localStorage.setItem(LASTFETCH_KEY, Date.now().toString());
        localStorage.setItem(SCHEDULE_KEY, events2String(data));

        setEvents(data);
      }

      const normalizedEvents = normalizeEvents(data, rooms);
      setEvents(normalizedEvents);
    };

    initEvents();
  }, [rooms]);

  const getEvents = useCallback(
    ({
      start,
      end,
      building_id,
      room_name,
      capacity,
      event_title,
      event_description,
    }: ScheduleFilter): Event[] => {
      if (!events.length) return [];

      return events.filter((s) => {
        if (start !== undefined && s.end < start) return false;
        if (end !== undefined && s.start > end) return false;
        if (building_id !== undefined && s.building_id !== building_id)
          return false;
        if (room_name !== undefined && !s.room_name.includes(room_name))
          return false;
        if (capacity !== undefined && s.capacity < capacity) return false;
        if (event_title !== undefined && !s.event_title.includes(event_title))
          return false;
        if (
          event_description !== undefined &&
          !s.event_description.includes(event_description)
        )
          return false;

        return true;
      });
    },
    [],
  );

  const getCrowdDensity = useCallback((filter: ScheduleFilter): number => {
    if (!events.length) return 0;

    const filteredSchedules: Event[] = getEvents(filter);

    const numberOfMembers = filteredSchedules.reduce(
      (sum, s) => sum + s.number_of_members,
      0,
    );

    // Building A: 958
    // Building B: 5088
    // Building C: 1952
    // Building E: 722
    // Sport: 490

    return numberOfMembers / 9210;
  }, []);

  return (
    <EventContext.Provider
      value={{
        events,
        getEvents,
        getCrowdDensity,
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
