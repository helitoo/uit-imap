import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useHotspots } from "@/contexts/hotspotsContext";
import { useMode } from "@/contexts/modeContext";
import { DEFAULT_HOTSPOT_IDS } from "@/lib/consts/defaultHotspots";
import type { Hotspot } from "@/lib/types/hotspot";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface HotspotButtonProps {
  hotspot: Hotspot;
  isOnPath?: boolean;
  isSelected?: boolean;
}

export default function HotspotButton({
  hotspot,
  isOnPath = false,
  isSelected = false,
}: HotspotButtonProps) {
  const navigate = useNavigate();
  const { setSelectedHotspot } = useHotspots();
  const { usingMode } = useMode();

  const handleClick = () => {
    if (usingMode === "default") {
      setSelectedHotspot(hotspot);
      if (["A", "B", "C", "D"].includes(hotspot.id))
        navigate(`/hotspot/${hotspot.id}`, { replace: false });
    }
  };

  // Render unnamed hotspot without tooltip and hover effects
  if (!hotspot.name) {
    return (
      <div
        slot={`hotspot-${hotspot.id}`}
        data-position={hotspot.dataPosition.join("m ")}
        data-normal={hotspot.dataNormal.join(" ")}
        data-visibility-attribute="visible"
        className="hotspot-btn"
      >
        <button
          className={cn(
            "pointer-events-none!",
            "relative flex items-center justify-center size-3 rounded-full border-2 font-bold text-[4px] shadow-lg",
            isOnPath
              ? "bg-red-500 text-white"
              : isSelected
                ? "bg-main text-white"
                : "border-white/70",
            "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          )}
        ></button>
      </div>
    );
  }

  return (
    <div
      slot={`hotspot-${hotspot.id}`}
      data-position={hotspot.dataPosition.join("m ")}
      data-normal={hotspot.dataNormal.join(" ")}
      data-visibility-attribute="visible"
      className="hotspot-btn"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleClick}
            className={cn(
              "relative flex items-center justify-center size-6 rounded-full border-2 font-bold text-[7px] shadow-lg transition-all duration-200",
              "hover:scale-110 hover:shadow-xl",
              isOnPath
                ? "bg-red-500 text-white scale-110"
                : isSelected
                  ? "bg-main text-white scale-110"
                  : "border-white/70",
              "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
            )}
          >
            {hotspot.id}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[200px] text-center">
          {hotspot.name}
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
