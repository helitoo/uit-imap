import HotspotMap from "@/components/main/roomsMap/hotspotMap";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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

import { useEffect, useState } from "react";
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
        showOverlay={false}
        className="w-full md:w-1/2 sm:w-3/4 p-0 gap-0 flex flex-col border-r border-border/50"
      >
        {/* HEADER */}
        <div className="bg-main text-white px-3 py-3 shrink-0">
          <SheetHeader className="text-left space-y-1">
            <SheetTitle className="text-base md:text-lg leading-snug text-white">
              {hotspot.name}
            </SheetTitle>
          </SheetHeader>
        </div>

        {/* MAP AREA */}
        <ScrollArea className="flex-1 min-h-0">
          {hotspot.description && (
            <div className="flex items-start gap-1.5 text-xs text-main px-5 py-2">
              <Info className="w-3.5 h-3.5 mt-[1px] shrink-0" />

              <p className="line-clamp-3 leading-relaxed text-justify">
                {Array.isArray(hotspot.description)
                  ? hotspot.description.join(" ")
                  : hotspot.description}
              </p>
            </div>
          )}
          <div className="h-full flex flex-col">
            {/* Map section */}
            <div className="flex-1 min-h-[320px] p-1 md:p-2 h-full rounded-xl overflow-hidden">
              <HotspotMap rooms={rooms} />
            </div>
          </div>
        </ScrollArea>

        {/* FOOTER */}
        <div
          className="
            shrink-0
            border-t
            border-border/50
            p-2
            grid
            grid-cols-2
            gap-2
            bg-background/80
            backdrop-blur
          "
        >
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={handleShare}
          >
            <Share2 className="w-3.5 h-3.5" />
            Chia sẻ
          </Button>

          <Button size="sm" className="gap-1.5" onClick={handleDirection}>
            <Navigation className="w-3.5 h-3.5" />
            Dẫn đường
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
