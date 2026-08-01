import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import WMO_CODES from "@/lib/consts/wmoCodes";
import { useWeather } from "@/contexts/weatherContext";
import { useEvent } from "@/contexts/eventContext";
import { Skeleton } from "@/components/ui/skeleton";

interface CrowdInfo {
  density: number;
  label: string;
  bg: string;
  text: string;
}

function WeatherItemImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Skeleton className="size-10 rounded-md shrink-0" />}
      <img
        src={src}
        alt={alt}
        className={cn("size-10 object-contain", !loaded && "hidden")}
        draggable={false}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        ref={(el) => {
          if (el?.complete) setLoaded(true);
        }}
      />
    </>
  );
}

function getLabelNColorFormDensity(density: number) {
  if (density <= 0.1)
    return { label: "Vắng vẻ", bg: "bg-cyan-500", text: "text-cyan-500" };
  else if (density <= 0.25)
    return { label: "Thư giãn", bg: "bg-green-500", text: "text-green-500" };
  else if (density <= 0.5)
    return { label: "Nhộn nhịp", bg: "bg-lime-500", text: "text-lime-500" };
  else if (density <= 0.75)
    return { label: "Đông đúc", bg: "bg-amber-500", text: "text-amber-500" };
  else return { label: "Rất đông", bg: "bg-red-500", text: "text-red-500" };
}

function getWeatherInfo(code: number, isDay: boolean) {
  const entry = WMO_CODES[code];
  if (!entry) return { description: "Unknown", image: "" };
  return isDay ? entry.day : entry.night;
}

export default function WeatherBar({ className = "" }: { className?: string }) {
  const { slots, loading } = useWeather();
  const [crowdInfo, setCrowdInfo] = useState<CrowdInfo | undefined>(undefined);
  const { getCurrentDensity } = useEvent();

  useEffect(() => {
    const density = getCurrentDensity();
    const { label, bg, text } = getLabelNColorFormDensity(density);
    setCrowdInfo({ density, label, bg, text });
  }, [getCurrentDensity]);

  if (loading) {
    return (
      <div
        className={cn(
          "flex items-center justify-center gap-2 text-muted-foreground",
          className,
        )}
      >
        <div className="flex items-center shrink-0 gap-1">
          <Skeleton className="size-8 rounded-md shrink-0" />
          <Skeleton className="h-3 w-10 rounded" />
        </div>
        <div className="flex items-center shrink-0 gap-1">
          <Skeleton className="size-8 rounded-md shrink-0" />
          <Skeleton className="h-3 w-10 rounded" />
        </div>
        <div className="hidden lg:flex items-center gap-2 pl-3 shrink-0">
          <Skeleton className="size-3 rounded-full shrink-0" />
          <Skeleton className="h-3 w-14 rounded" />
        </div>
      </div>
    );
  }

  return (
    <>
      {slots.length > 0 && (
        <div
          className={cn(
            "flex items-center justify-center gap-2 text-muted-foreground", // Tăng gap lên 4 để thoáng hơn
            className,
          )}
        >
          {slots.map((slot) => {
            const info = getWeatherInfo(slot.code, slot.isDay);
            return (
              <div
                key={slot.time}
                className="flex items-center shrink-0"
                title={info.description}
              >
                <WeatherItemImage src={info.image} alt={info.description} />
                <div className="flex flex-col leading-tight">
                  {" "}
                  {/* leading-tight giúp khoảng cách dòng đẹp hơn */}
                  <span className="text-[10px] lg:text-xs font-bold text-gray-800">
                    {slot.time}
                  </span>
                </div>
              </div>
            );
          })}

          {crowdInfo && (
            <div
              className="flex items-center gap-2 pl-3 shrink-0"
              title="Độ đông đúc"
            >
              <div className={`size-3 rounded-full ${crowdInfo.bg}`}></div>
              <span
                className={`text-[10px] lg:text-xs font-bold ${crowdInfo.text}`}
              >
                {crowdInfo.label}
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
}
