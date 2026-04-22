import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CATEGORY_COLORS } from "@/lib/types/category";
import type { Hotspot } from "@/lib/types/hotspot";
import { useHotspots } from "@/contexts/hotspotsContext";
import { cn } from "@/lib/utils";

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

  const primaryCategory = hotspot.categories[0];
  const abbr = primaryCategory ? hotspot.id : "?";
  const colorClass = primaryCategory
    ? CATEGORY_COLORS[primaryCategory]
    : "bg-gray-100 text-gray-800";

  const handleClick = () => {
    setSelectedHotspot(hotspot);
    // Update URL without losing current view state - use replace to avoid cluttering history
    navigate(`/hotspot/${hotspot.id}`, { replace: false });
  };

  return (
    <div
      slot={`hotspot-${hotspot.id}`}
      data-position={hotspot.model_position.join(" ")}
      data-normal="0 1 0"
      data-visibility-attribute="visible"
      className="hotspot-btn"
    >
      <TooltipProvider delayDuration={150}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleClick}
              className={cn(
                "relative flex items-center justify-center size-6 rounded-full border-2 font-bold text-[7px] shadow-lg transition-all duration-200",
                "hover:scale-110 hover:shadow-xl",
                isOnPath
                  ? "bg-red-500 text-white scale-110 shadow-red-300"
                  : isSelected
                    ? "bg-main text-white scale-110"
                    : cn(colorClass, "border-white/70"),
                "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              )}
              aria-label={hotspot.name}
            >
              {abbr}
              {/* Pulse ring for selected/path */}
              {(isSelected || isOnPath) && (
                <span
                  className={cn(
                    "absolute inset-0 rounded-full animate-ping",
                    isOnPath ? "bg-red-400/40" : "bg-main/30",
                  )}
                />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-[200px] text-center">
            {hotspot.name}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
