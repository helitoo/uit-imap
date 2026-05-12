import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface WeatherSlot {
  time: string;
  code: number;
  isDay: boolean;
}

interface WeatherContextType {
  slots: WeatherSlot[];
  loading: boolean;
  error: string | null;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

function getHourMinute(isoTime: string): string {
  // "2026-04-23T07:00" hoặc "2026-04-23T07:00:00" → "07:00"
  const timePart = isoTime.split("T")[1] ?? "";
  const [hh, mm] = timePart.split(":");
  return `${hh ?? "00"}:${mm ?? "00"}`;
}

function isDaytime(isoTime: string): boolean {
  const hour = parseInt(isoTime.split("T")[1]?.slice(0, 2) ?? "12", 10);
  return hour >= 6 && hour < 18;
}

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [slots, setSlots] = useState<WeatherSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=10.87002&longitude=106.80305&current=weathercode&hourly=weathercode&forecast_hours=3&timezone=auto",
        );
        const data = await res.json();

        const times: string[] = data.hourly.time;
        const codes: number[] = data.hourly.weathercode;

        // Only render index 0 and 2
        const indices = [0, 2];
        const result: WeatherSlot[] = indices
          .filter((i) => times[i] !== undefined && codes[i] !== undefined)
          .map((i) => ({
            time: getHourMinute(times[i]),
            code: codes[i],
            isDay: isDaytime(times[i]),
          }));

        setSlots(result);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch weather:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <WeatherContext.Provider value={{ slots, loading, error }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
}
