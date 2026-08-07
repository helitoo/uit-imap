import SearchInput from "@/components/main/search/SearchInput";
import { Button } from "@/components/ui/button";
import { useHotspots } from "@/contexts/hotspotsContext";
import { useMode } from "@/contexts/modeContext";
import { useRooms } from "@/contexts/roomContext";
import { getDirection } from "@/lib/services/getDirection";
import { Room } from "@/lib/types/room";
import { ArrowDown, ArrowRight, MapPin, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export default function DirectionBar() {
  const { setUsingMode } = useMode();

  const {
    hotspots,
    adjacencyGraph,
    setDirectionPath,
    setDestHotspot,
  } = useHotspots();
  const { destRoom, setDestRoom } = useRooms();

  const [sourceRoom, setSourceRoom] = useState<Room | null>(null);
  const startInputRef = useRef<HTMLInputElement>(null);
  const destInputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);

  // Auto focus control based on render and room selection status
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      const timer = setTimeout(() => {
        startInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }

    if (destRoom) {
      startInputRef.current?.blur();
      destInputRef.current?.blur();
    } else if (sourceRoom) {
      const timer = setTimeout(() => {
        destInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [sourceRoom, destRoom]);

  // Recalculate direction whenever start/end change
  useEffect(() => {
    if (sourceRoom && destRoom) {
      const path = getDirection(
        sourceRoom,
        destRoom,
        hotspots,
        adjacencyGraph,
      );
      setDirectionPath(path);
    }
  }, [sourceRoom, destRoom, hotspots, adjacencyGraph, setDirectionPath]);

  const handleChooseSourceRoom = (r: Room) => {
    setSourceRoom(r);
  };

  const handleChooseDestRoom = (r: Room) => {
    setDestRoom(r);
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
            placeholder="Chọn điểm đầu"
            onClickRes={handleChooseSourceRoom}
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
            placeholder="Chọn điểm đến"
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
        onClick={() => {
          setUsingMode("default");
          setDirectionPath([]);
          setDestHotspot(null);
          setDestRoom(null);
        }}
        title="Thoát chế độ dẫn đường"
      >
        <X />
      </Button>
    </div>
  );
}
