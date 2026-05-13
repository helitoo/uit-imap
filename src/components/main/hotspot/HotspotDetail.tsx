import HotspotMap from "@/components/main/roomsMap/hotspotMap";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useHotspots } from "@/contexts/hotspotsContext";
import { useMode } from "@/contexts/modeContext";
import { useRooms } from "@/contexts/roomContext";
import type { Hotspot } from "@/lib/types/hotspot";
import { Room } from "@/lib/types/room";
import { getHotspotShareUrl } from "@/lib/utils";
import { Info, Navigation, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface HotspotDetailProps {
  hotspot: Hotspot;
}

export default function HotspotDetail({ hotspot }: HotspotDetailProps) {
  const { setSelectedHotspot, setDestHotspot } = useHotspots();
  const { getRoomsByBelongsTo } = useRooms();
  const { setUsingMode } = useMode();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    setRooms(getRoomsByBelongsTo(hotspot.id));
  }, [hotspot.id, getRoomsByBelongsTo]);

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
    setDestHotspot(hotspot);
    setSelectedHotspot(null);
    setUsingMode("direction");
  };

  return (
    <Sheet open onOpenChange={(open) => !open && handleClose()}>
      <SheetContent
        side="left"
        className="w-full sm:w-1/2 md:w-auto p-0 flex flex-col glass-panel border-r border-border/50"
        showOverlay={false}
      >
        {/* Header strip with main color */}
        <div className="bg-main px-5 pt-5 pb-4 text-white">
          <div className="flex items-start justify-between gap-2 pr-6">
            <SheetHeader className="text-left">
              <SheetTitle className="text-white text-lg leading-tight">
                {hotspot.name}
              </SheetTitle>
            </SheetHeader>
          </div>
        </div>

        {/* Body */}
        <ScrollArea className="flex-1 px-5 py-4">
          <div className="space-y-4">
            {/* Description */}
            {hotspot.description && (
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  <Info className="w-3.5 h-3.5" />
                  Mô tả
                </div>
                <ul className="space-y-1.5">{hotspot.description}</ul>
              </div>
            )}

            <Separator />

            <HotspotMap rooms={rooms} />
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
