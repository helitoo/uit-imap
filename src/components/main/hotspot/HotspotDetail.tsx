import { Share2, Navigation, X, Users, Layers, Info } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/types/category";
import type { Hotspot } from "@/lib/types/hotspot";
import { useHotspots } from "@/contexts/hotspotsContext";
import { useMode } from "@/contexts/modeContext";
import { getHotspotShareUrl } from "@/lib/utils";

interface HotspotDetailProps {
  hotspot: Hotspot;
}

export default function HotspotDetail({ hotspot }: HotspotDetailProps) {
  const { setSelectedHotspot } = useHotspots();
  const { setUsingMode } = useMode();
  const navigate = useNavigate();

  const handleClose = () => {
    setSelectedHotspot(null);
    navigate("/", { replace: true });
  };

  const handleShare = () => {
    const url = getHotspotShareUrl(hotspot.id);
    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("Đã sao chép đường dẫn!"))
      .catch(() => toast.error("Không thể sao chép đường dẫn."));
  };

  const handleDirection = () => {
    setUsingMode("direction");
  };

  const floorLabel =
    hotspot.floor < 0
      ? `Tầng B${Math.abs(hotspot.floor)}`
      : hotspot.floor === 0
        ? "Tầng trệt"
        : `Tầng ${hotspot.floor}`;

  return (
    <Sheet open onOpenChange={(open) => !open && handleClose()}>
      <SheetContent
        side="left"
        className="w-[340px] sm:w-[380px] p-0 flex flex-col glass-panel border-r border-border/50"
        showOverlay={false}
      >
        {/* Header strip with main color */}
        <div className="bg-main px-5 pt-5 pb-4 text-white">
          <div className="flex items-start justify-between gap-2 pr-6">
            <SheetHeader className="text-left">
              <SheetTitle className="text-white text-lg leading-tight">
                {hotspot.name}
              </SheetTitle>
              <p className="text-white/75 text-xs font-medium mt-0.5">
                {floorLabel}
              </p>
            </SheetHeader>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {hotspot.categories.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold text-white border border-white/30"
              >
                {CATEGORY_LABELS[cat]}
              </span>
            ))}
          </div>
        </div>

        {/* Body */}
        <ScrollArea className="flex-1 px-5 py-4">
          <div className="space-y-4">
            {/* Description */}
            {hotspot.description.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  <Info className="w-3.5 h-3.5" />
                  Mô tả
                </div>
                <ul className="space-y-1.5">
                  {hotspot.description.map((d, i) => (
                    <li
                      key={i}
                      className="text-sm text-foreground/80 leading-relaxed"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Separator />

            {/* Meta info */}
            <div className="space-y-2">
              {hotspot.capacity > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-main shrink-0" />
                  <span className="text-muted-foreground">Sức chứa:</span>
                  <span className="font-semibold">
                    {hotspot.capacity} người
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <Layers className="w-4 h-4 text-main shrink-0" />
                <span className="text-muted-foreground">Tầng:</span>
                <span className="font-semibold">{floorLabel}</span>
              </div>
            </div>

            {/* Category badges full */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Loại địa điểm
              </p>
              <div className="flex flex-wrap gap-1.5">
                {hotspot.categories.map((cat) => (
                  <span
                    key={cat}
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${CATEGORY_COLORS[cat]}`}
                  >
                    {CATEGORY_LABELS[cat]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer actions */}
        <div className="p-4 border-t border-border/50 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-1.5"
            onClick={handleShare}
          >
            <Share2 className="w-3.5 h-3.5" />
            Chia sẻ
          </Button>
          <Button
            size="sm"
            className="flex-1 gap-1.5"
            onClick={handleDirection}
          >
            <Navigation className="w-3.5 h-3.5" />
            Dẫn đường
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
