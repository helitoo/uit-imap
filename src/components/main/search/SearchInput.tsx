import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHotspots } from "@/contexts/hotspotsContext";
import { useMode } from "@/contexts/modeContext";
import { useRooms } from "@/contexts/roomContext";
import { Room } from "@/lib/types/room";
import { cn, compareTwoStrings } from "@/lib/utils";
import { CornerUpRight, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState, forwardRef } from "react";

export interface SearchInputProps {
  showDirectionIcon?: boolean;
  className?: string;
  onClickRes?: (room: Room) => void;
  defaultRoom?: Room | null;
  initText?: string;
  placeholder?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      showDirectionIcon = true,
      className = "",
      onClickRes = (room: Room) => {},
      defaultRoom = null,
      initText = "",
      placeholder = "Tìm phòng hoặc địa điểm...",
    },
    ref,
  ) => {
    const [searchQuery, setSearchQuery] = useState(
      initText || defaultRoom?.name || "",
    );
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(defaultRoom);
    const [showDropdown, setShowDropdown] = useState(false);
    const { rooms } = useRooms();
    const { setUsingMode } = useMode();
    const containerRef = useRef<HTMLDivElement>(null);
    const { getHotspotById } = useHotspots();

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
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelectRoom = (r: Room) => {
      setSearchQuery(r.name || "");
      setSelectedRoom(r);
      setShowDropdown(false);
      if (r.belongsTo) onClickRes(r);
    };

    return (
      <div
        id="search-input"
        ref={containerRef}
        className={cn(
          "relative flex items-center transition-all duration-200 focus-within:border-main focus-within:ring-1 focus-within:ring-main",
          className,
        )}
      >
        {/* Input chiếm toàn bộ không gian còn lại */}
        <Input
          ref={ref}
          spellCheck={false}
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
        <div className="flex items-center gap-1 shrink-0">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-full text-slate-800 hover:text-main hover:bg-slate-50 transition-colors p-0 flex items-center justify-center shrink-0"
            title="Tìm kiếm"
          >
            <Search className="w-4 h-4" />
          </Button>
          {showDirectionIcon && (
            <Button
              id="direction-button"
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-full text-slate-800 hover:bg-main/10 hover:text-main transition-all duration-200 p-0 flex items-center justify-center shrink-0 shadow-xs"
              title="Dẫn đường"
              onClick={() => setUsingMode("direction")}
            >
              <CornerUpRight className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Dropdown Results (Giữ nguyên logic cũ) */}
        {showDropdown && (
          <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border border-slate-50 rounded-2xl shadow-xl z-50 overflow-y-auto overflow-x-hidden">
            {topMatches.length > 0
              ? topMatches.map(({ r, score }) => (
                  <button
                    key={r.id}
                    onClick={() => handleSelectRoom(r)}
                    className="w-full px-5 py-3 text-left hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-b-0"
                  >
                    <div className="font-semibold text-slate-800">{r.name}</div>
                    {r.description && (
                      <div className="text-sm text-slate-800 truncate">
                        {r.description}
                      </div>
                    )}
                    {r.belongsTo && r.floor && (
                      <div className="font-sm text-slate-800 truncate">
                        {getHotspotById(r.belongsTo)?.name} • Tầng {r.floor}
                      </div>
                    )}
                  </button>
                ))
              : searchQuery.trim() && (
                  <div className="p-4 text-center text-slate-800 text-sm">
                    Không tìm thấy kết quả
                  </div>
                )}
          </div>
        )}
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
