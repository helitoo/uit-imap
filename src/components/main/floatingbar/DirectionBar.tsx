import SearchInput from "@/components/main/search/SearchInput";
import { Button } from "@/components/ui/button";
import { useHotspots } from "@/contexts/hotspotsContext";
import { useMode } from "@/contexts/modeContext";
import { useRooms } from "@/contexts/roomContext";
import { getDirection } from "@/lib/services/getDirection";
import { Hotspot } from "@/lib/types/hotspot";
import { Room } from "@/lib/types/room";
import { ArrowDown, ArrowRight, MapPin, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function DirectionBar() {
  const { setUsingMode } = useMode();

  const { hotspots, adjacencyGraph, setDirectionPath } = useHotspots();
  const { sourceRoom, setSourceRoom, destRoom, setDestRoom } = useRooms();

  const startInputRef = useRef<HTMLInputElement>(null);
  const destInputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);

  // Auto focus control based on initial state and room selection
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      const timer = setTimeout(() => {
        if (!sourceRoom) {
          startInputRef.current?.focus();
        } else if (!destRoom) {
          destInputRef.current?.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    }

    if (sourceRoom && !destRoom) {
      const timer = setTimeout(() => {
        destInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    } else if (sourceRoom && destRoom) {
      startInputRef.current?.blur();
      destInputRef.current?.blur();
    }
  }, [sourceRoom, destRoom]);

  // Recalculate direction whenever start/end change
  useEffect(() => {
    if (sourceRoom && destRoom) {
      if (sourceRoom.id === destRoom.id) {
        toast.info("Điểm đầu và điểm đến là cùng một địa điểm!");
        setDirectionPath([]);
        return;
      }
      if (
        !sourceRoom.gates ||
        sourceRoom.gates.length === 0 ||
        !destRoom.gates ||
        destRoom.gates.length === 0
      ) {
        toast.error("Không thể tìm đường do chưa có thông tin cổng!");
        setDirectionPath([]);
        return;
      }

      const path = getDirection(
        sourceRoom,
        destRoom,
        hotspots,
        adjacencyGraph,
      );
      setDirectionPath(path);
    } else {
      setDirectionPath([]);
    }
  }, [sourceRoom, destRoom, hotspots, adjacencyGraph, setDirectionPath]);

  const handleChooseSourceRoom = (item: Room | Hotspot) => {
    if (!item.gates || item.gates.length === 0) {
      toast.error("Địa điểm này chưa có thông tin cổng để dẫn đường!");
      return;
    }
    setSourceRoom(item);
  };

  const handleChooseDestRoom = (item: Room | Hotspot) => {
    if (!item.gates || item.gates.length === 0) {
      toast.error("Địa điểm này chưa có thông tin cổng để dẫn đường!");
      return;
    }
    setDestRoom(item);
  };

  const handleExitDirection = () => {
    setUsingMode("default");
    setDirectionPath([]);
    setSourceRoom(null);
    setDestRoom(null);
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 w-[90%] md:w-fit bg-card text-card-foreground border border-border p-3 rounded-2xl shadow-lg">
      {/* Container cho 2 Inputs và Arrows */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-3 flex-grow">
        {/* Input 1 + Arrow Down (Mobile) */}
        <div className="flex items-center gap-2">
          <div className="md:hidden text-foreground">
            <ArrowDown />
          </div>
          <SearchInput
            ref={startInputRef}
            className="bg-card text-card-foreground shadow-md rounded-full pl-4 pr-1.5 w-full md:w-80 h-10 border border-border"
            placeholder="Chọn điểm đầu..."
            onClickRes={handleChooseSourceRoom}
            initText={sourceRoom?.name}
            showDirectionIcon={false}
          />
        </div>

        {/* Arrow Right (Chỉ hiện trên Desktop) */}
        <div className="hidden md:block text-foreground">
          <ArrowRight />
        </div>

        {/* Input 2 + Arrow Down (Mobile) */}
        <div className="flex items-center gap-2">
          <div className="md:hidden text-foreground">
            <MapPin />
          </div>
          <SearchInput
            ref={destInputRef}
            className="bg-card text-card-foreground shadow-md rounded-full pl-4 pr-1.5 w-full md:w-80 h-10 border border-border"
            placeholder="Chọn điểm đến..."
            onClickRes={handleChooseDestRoom}
            initText={destRoom?.name}
            showDirectionIcon={false}
          />
        </div>
      </div>

      {/* Nút Close (X) */}
      <Button
        variant="ghost"
        size="icon"
        className="flex-shrink-0 text-rose-500 hover:text-rose-500 hover:bg-rose-100 rounded-full"
        onClick={handleExitDirection}
        title="Thoát chế độ dẫn đường"
      >
        <X />
      </Button>
    </div>
  );
}
