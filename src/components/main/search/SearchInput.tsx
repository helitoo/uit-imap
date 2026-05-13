import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMode } from "@/contexts/modeContext";
import { useRooms } from "@/contexts/roomContext";
import { Room } from "@/lib/types/room";
import { cn, compareTwoStrings } from "@/lib/utils";
import { CornerUpRight, Search, Waypoints } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

export default function SearchInput({
  showDirectionIcon = true,
  className = "",
  onClickRes = (room: Room) => {},
  defaultRoom = null,
  initText = "",
  placeholder = "Tìm phòng hoặc địa điểm...",
}: {
  showDirectionIcon?: boolean;
  className?: string;
  onClickRes?: (room: Room) => void;
  defaultRoom?: Room | null;
  initText?: string;
  placeholder?: string;
}) {
  const [searchQuery, setSearchQuery] = useState(
    initText || defaultRoom?.name || "",
  );
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(defaultRoom);
  const [showDropdown, setShowDropdown] = useState(false);
  const { rooms } = useRooms();
  const { setUsingMode } = useMode();
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate top 5 matching rooms based on search query
  const topMatches = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const scored = rooms
      .map((r) => {
        // Calculate similarity score based on name and description
        const nameScore = compareTwoStrings(searchQuery, r.name || "");
        const descScore = compareTwoStrings(searchQuery, r.description || "");

        const score = nameScore * 0.5 + descScore * 0.5;

        return { r, score };
      })
      .filter(({ score }) => score > 0.3)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    return scored;
  }, [searchQuery, rooms]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectRoom = (r: Room) => {
    setSearchQuery(r.name || "");
    setSelectedRoom(r);
    setShowDropdown(false);
    if (r.belongsTo) onClickRes(r);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative flex items-center", className)}
    >
      {/* Input chiếm toàn bộ không gian còn lại */}
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setShowDropdown(e.target.value.trim().length > 0);
        }}
        onFocus={() => {
          if (searchQuery.trim().length > 0) {
            setShowDropdown(true);
          }
        }}
        className="border-none bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 h-full w-full p-0 text-base"
      />

      {/* Cụm Icon bên phải */}
      <div className="flex items-center gap-2 ml-2 pl-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-main rounded-full transition-colors"
          title="Tìm kiếm"
        >
          <Search className="w-5 h-5" />
        </Button>
        {showDirectionIcon && (
          <Button
            variant="ghost"
            size="sm"
            className="hover:text-main rounded-full transition-colors text-main"
            title="Dẫn đường"
            onClick={() => setUsingMode("direction")}
          >
            <CornerUpRight className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Dropdown Results (Giữ nguyên logic cũ) */}
      {showDropdown && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-y-auto overflow-x-hidden">
          {topMatches.length > 0
            ? topMatches.map(({ r, score }) => (
                <button
                  key={r.id}
                  onClick={() => handleSelectRoom(r)}
                  className="w-full px-5 py-3 text-left hover:bg-slate-50 transition-colors border-b border-gray-50 last:border-b-0"
                >
                  <div className="font-semibold text-gray-900">{r.name}</div>
                  {r.description && (
                    <div className="text-sm text-gray-500 truncate">
                      {r.description}
                    </div>
                  )}
                  {r.belongsTo &&
                    r.floor &&
                    ["A", "B", "C", "D", "E"].includes(r.belongsTo) && (
                      <div className="font-sm text-gray-400 truncate">
                        Tòa nhà {r.belongsTo} • Tầng {r.floor}
                      </div>
                    )}
                </button>
              ))
            : searchQuery.trim() && (
                <div className="p-4 text-center text-gray-400 text-sm">
                  Không tìm thấy kết quả
                </div>
              )}
        </div>
      )}
    </div>
  );
}
