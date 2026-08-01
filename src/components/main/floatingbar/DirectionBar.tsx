import SearchInput from "@/components/main/search/SearchInput";
import { Button } from "@/components/ui/button";
import { useHotspots } from "@/contexts/hotspotsContext";
import { useMode } from "@/contexts/modeContext";
import { getDirection } from "@/lib/services/getDirection";
import { Hotspot } from "@/lib/types/hotspot";
import { Room } from "@/lib/types/room";
import { ArrowDown, ArrowRight, MapPin, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";

export default function DirectionBar() {
  const { setUsingMode } = useMode();

  const {
    hotspots,
    adjacencyGraph,
    setDirectionPath,
    setDestHotspot,
    destHotspot,
    getHotspotById,
  } = useHotspots();

  const [sourceHotspot, setSourceHotspot] = useState<Hotspot | null>(null);
  const startInputRef = useRef<HTMLInputElement>(null);
  const destInputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);

  // Auto focus control based on render and hotspot selection status
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      const timer = setTimeout(() => {
        startInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }

    if (destHotspot) {
      startInputRef.current?.blur();
      destInputRef.current?.blur();
    } else if (sourceHotspot) {
      const timer = setTimeout(() => {
        destInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [sourceHotspot, destHotspot]);

  // Recalculate direction whenever start/end change
  useEffect(() => {
    if (sourceHotspot && destHotspot) {
      const path = getDirection(
        sourceHotspot,
        destHotspot,
        hotspots,
        adjacencyGraph,
      );
      setDirectionPath(path);
      if (path.length === 0) {
        toast.error("Không tìm thấy đường đi giữa hai địa điểm này!");
      }
    }
  }, [sourceHotspot, destHotspot, hotspots, setDirectionPath]);

  const handleChooseSourceHotspot = (r: Room) => {
    setSourceHotspot(getHotspotById(r?.belongsTo ?? "") ?? null);
  };

  const handleChooseDestHotspot = (r: Room) => {
    setDestHotspot(getHotspotById(r?.belongsTo ?? "") ?? null);
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 w-[90%] md:w-fit bg-white p-3 rounded-2xl shadow-lg">
      {/* Container cho 2 Inputs và Arrows */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-3 flex-grow">
        {/* Input 1 + Arrow Down (Mobile) */}
        <div className="flex items-center gap-2">
          <div className="md:hidden text-gray-500">
            {" "}
            <ArrowDown />{" "}
          </div>
          <SearchInput
            ref={startInputRef}
            className="bg-white shadow-md rounded-full pl-4 pr-1.5 w-full md:w-80 h-10 border border-gray-100"
            placeholder="Chọn điểm đầu"
            onClickRes={handleChooseSourceHotspot}
            showDirectionIcon={false}
          />
        </div>

        {/* Arrow Right (Chỉ hiện trên Desktop) */}
        <div className="hidden md:block text-gray-500">
          <ArrowRight />
        </div>

        {/* Input 2 + Arrow Down (Mobile) */}
        <div className="flex items-center gap-2">
          <div className="md:hidden text-gray-500">
            {" "}
            <MapPin />{" "}
          </div>
          <SearchInput
            ref={destInputRef}
            className="bg-white shadow-md rounded-full pl-4 pr-1.5 w-full md:w-80 h-10 border border-gray-100"
            placeholder="Chọn điểm đến"
            onClickRes={handleChooseDestHotspot}
            initText={destHotspot?.name}
            showDirectionIcon={false}
          />
        </div>
      </div>

      {/* Nút Close (X) - Luôn nằm bên phải và căn giữa theo chiều dọc của cụm input */}
      <Button
        variant="ghost"
        size="icon"
        className="flex-shrink-0 text-rose-500 hover:text-rose-500 hover:bg-rose-100 rounded-full"
        onClick={() => {
          setUsingMode("default");
          setDirectionPath([]);
          setDestHotspot(null);
        }}
        title="Thoát chế độ dẫn đường"
      >
        <X />
      </Button>
    </div>
  );
}
