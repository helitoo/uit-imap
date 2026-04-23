import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import WMO_CODES from "@/lib/wmoCodes";
import { useSchedule } from "@/contexts/scheduleContext";

interface WeatherSlot {
  time: string; // e.g. "07:00"
  code: number;
  isDay: boolean;
}

interface CrowdInfo {
  density: number;
  label: string;
  bg: string;
  text: string;
}

function getLabelNColorFormDensity(density: number) {
  if (density <= 0.1)
    return { label: "Vắng vẻ", bg: "bg-cyan-500", text: "text-cyan-500" };
  else if (density <= 0.25)
    return { label: "Thư giãn", bg: "bg-green-500", text: "text-green-500" };
  else if (density <= 0.5)
    return { label: "Bình thường", bg: "bg-lime-500", text: "text-lime-500" };
  else if (density <= 0.75)
    return { label: "Đông đúc", bg: "bg-amber-500", text: "text-amber-500" };
  else return { label: "Rất đông", bg: "bg-red-500", text: "text-red-500" };
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

export default function SummaryBar() {
  const [slots, setSlots] = useState<WeatherSlot[]>([]);
  const [crowdInfo, setCrowdInfo] = useState<CrowdInfo | undefined>(undefined);
  const { getCrowdDensity, completedInit } = useSchedule();

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
      }
    };

    fetchWeather();
  }, []);

  useEffect(() => {
    if (!completedInit) return;

    const now = new Date();
    const density = getCrowdDensity({ start: now, end: now });
    const { label, bg, text } = getLabelNColorFormDensity(density);
    setCrowdInfo({ density, label, bg, text });
  }, [completedInit]);

  return (
    <>
      {slots.length && (
        <div
          className={cn(
            "fixed top-0 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 w-auto",
          )}
        >
          <div className="bg-white/85 text-muted-foreground px-4 py-2 flex items-center justify-between gap-3 shrink-0 rounded-b-2xl w-full">
            {slots.map((slot) => {
              const info = getWeatherInfo(slot.code, slot.isDay);
              return (
                <div
                  key={slot.time}
                  className="flex items-center gap-1"
                  title={info.description}
                >
                  <img
                    src={info.image}
                    alt={info.description}
                    className="w-5 h-5 object-contain"
                    draggable={false}
                  />
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-xs font-semibold">{slot.time}</span>
                    <span className="text-[5px]">{info.description}</span>
                  </div>
                </div>
              );
            })}

            {crowdInfo && (
              <div className="flex items-center gap-1" title="Độ đông đúc">
                <div className={`size-3 rounded-full ${crowdInfo.bg}`}></div>
                <span className={`text-xs font-semibold ${crowdInfo.text}`}>
                  {crowdInfo.label}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
