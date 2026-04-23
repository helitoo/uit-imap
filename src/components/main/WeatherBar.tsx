import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import WMO_CODES from "@/lib/wmoCodes";

interface WeatherSlot {
  time: string; // e.g. "07:00"
  code: number;
  isDay: boolean;
}

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

function getWeatherInfo(code: number, isDay: boolean) {
  const entry = WMO_CODES[code];
  if (!entry) return { description: "Unknown", image: "" };
  return isDay ? entry.day : entry.night;
}

export default function WeatherBar() {
  const [slots, setSlots] = useState<WeatherSlot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
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
      } catch (err) {
        console.error("Failed to fetch weather:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div
      className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 w-auto",
      )}
    >
      <div className="bg-white/85 text-muted-foreground px-4 py-2 flex items-center justify-between gap-3 shrink-0 rounded-b-lg">
        <span className="text-sm font-bold whitespace-nowrap">UIT Weather</span>
        {/* Collapsed inline preview */}
        {slots.length > 0 && (
          <div className="flex items-center gap-3 overflow-hidden">
            {slots.map((slot) => {
              const info = getWeatherInfo(slot.code, slot.isDay);
              return (
                <div key={slot.time} className="flex items-center gap-1">
                  <img
                    src={info.image}
                    alt={info.description}
                    className="w-5 h-5 object-contain"
                    draggable={false}
                  />
                  <span className="text-xs font-semibold">{slot.time}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
