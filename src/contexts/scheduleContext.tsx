import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

import {
  schedulesToString,
  stringToSchedules,
} from "@/lib/helpers/schedule/encodeDecodeSchedule";
import { fetchSchedules } from "@/lib/helpers/schedule/fetchSchedules";
import type { Schedule, ScheduleFilter } from "@/lib/types/schedule";

interface ScheduleContextType {
  schedules: Schedule[];
  initSchedule: () => Promise<void>;
  completedInit: boolean;

  getEvents: (filter: ScheduleFilter) => Schedule[];
  getCrowdDensity: (filter: ScheduleFilter) => number;
}

const LASTFETCH_KEY = "schedule-lastfetch";
const SCHEDULE_KEY = "schedule";

// ─── Context ──────────────────────────────────────────────────────────────────

const ScheduleContext = createContext<ScheduleContextType | undefined>(
  undefined,
);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ScheduleProvider({ children }: { children: ReactNode }) {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  /** Fetch and hydrate schedule data from the UIT room-booking page. */
  const initSchedule = useCallback(async (): Promise<void> => {
    let needFetch = false;

    try {
      const lastFetch = Number(localStorage.getItem(LASTFETCH_KEY));

      if (Date.now() - lastFetch > 6 * 60 * 60 * 1000)
        throw new Error("Cache expired");

      const scheduleRaw = localStorage.getItem(SCHEDULE_KEY);

      if (!scheduleRaw) throw new Error("No cached schedules");

      setSchedules(stringToSchedules(scheduleRaw));
      setCompletedInit(true);
    } catch (err) {
      // Lỗi... -> cần fetch lại
      needFetch = true;
      if (
        !(
          err instanceof Error &&
          ["Cache expired", "No cached schedules"].includes(err.message)
        )
      ) {
        console.error("Schedule cache error:", err);
      }
    }

    if (needFetch) {
      const data = await fetchSchedules();

      localStorage.setItem(LASTFETCH_KEY, Date.now().toString());
      localStorage.setItem(SCHEDULE_KEY, schedulesToString(data));

      setSchedules(data);
      setCompletedInit(true);
    }
  }, []);

  const [completedInit, setCompletedInit] = useState<boolean>(false);

  const getEvents = useCallback(
    ({
      start,
      end,
      building_id,
      room_name,
      capacity,
      event_title,
      event_description,
    }: ScheduleFilter): Schedule[] => {
      if (!completedInit) return [];

      return schedules.filter((s) => {
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
    [completedInit],
  );

  const getCrowdDensity = useCallback(
    (filter: ScheduleFilter): number => {
      if (!completedInit) return 0;

      const filteredSchedules: Schedule[] = getEvents(filter);

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
    },
    [completedInit],
  );

  return (
    <ScheduleContext.Provider
      value={{
        schedules,
        initSchedule,
        completedInit,
        getEvents,
        getCrowdDensity,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useSchedule(): ScheduleContextType {
  const ctx = useContext(ScheduleContext);
  if (!ctx) {
    throw new Error("useSchedule must be used within a <ScheduleProvider>.");
  }
  return ctx;
}

export default ScheduleContext;
