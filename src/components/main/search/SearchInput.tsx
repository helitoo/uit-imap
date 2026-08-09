import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHotspots } from "@/contexts/hotspotsContext";
import { useMode } from "@/contexts/modeContext";
import { useRooms } from "@/contexts/roomContext";
import { Hotspot } from "@/lib/types/hotspot";
import { Room } from "@/lib/types/room";
import { cn, compareTwoStrings } from "@/lib/utils";
import { CornerUpRight, Search } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useMemo, useRef, useState, forwardRef } from "react";

export interface SearchInputProps {
  showDirectionIcon?: boolean;
  className?: string;
  onClickRes?: (result: Room | Hotspot) => void;
  defaultRoom?: Room | Hotspot | null;
  initText?: string;
  placeholder?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      showDirectionIcon = true,
      className = "",
      onClickRes = (_res: Room | Hotspot) => {},
      defaultRoom = null,
      initText = "",
      placeholder = "Tìm phòng hoặc địa điểm...",
    },
    ref,
  ) => {
    const [searchQuery, setSearchQuery] = useState(
      initText || defaultRoom?.name || "",
    );
    const [showDropdown, setShowDropdown] = useState(false);
    const { rooms } = useRooms();
    const { hotspots, getHotspotById } = useHotspots();
    const { setUsingMode } = useMode();
    const containerRef = useRef<HTMLDivElement>(null);

    // Sync input text when initText or defaultRoom changes
    useEffect(() => {
      setSearchQuery(initText || defaultRoom?.name || "");
    }, [initText, defaultRoom]);

    // Combined searchable items: rooms having belongsTo and hotspots having canBeSearch
    const searchableItems = useMemo(() => {
      const validRooms: { item: Room; type: "room" }[] = rooms
        .filter((r) => Boolean(r.belongsTo))
        .map((r) => ({ item: r, type: "room" as const }));

      const validHotspots: { item: Hotspot; type: "hotspot" }[] = hotspots
        .filter((h) => Boolean(h.canBeSearch))
        .map((h) => ({ item: h, type: "hotspot" as const }));

      return [...validRooms, ...validHotspots];
    }, [rooms, hotspots]);

    // Calculate top 5 matching rooms and hotspots based on search query
    const topMatches = useMemo(() => {
      if (!searchQuery.trim()) return [];

      return searchableItems
        .map(({ item, type }) => {
          const nameScore = compareTwoStrings(searchQuery, item.name || "");
          const descScore = compareTwoStrings(
            searchQuery,
            item.description || "",
          );
          const score = nameScore * 0.5 + descScore * 0.5;

          return { item, type, score };
        })
        .filter(({ score }) => score > 0.3)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
    }, [searchQuery, searchableItems]);

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

    const handleSelectItem = (item: Room | Hotspot) => {
      setSearchQuery(item.name || "");
      setShowDropdown(false);
      onClickRes(item);
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
            className="h-7 w-7 rounded-full text-foreground hover:text-primary hover:bg-accent transition-colors p-0 flex items-center justify-center shrink-0"
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
              className="h-7 w-7 rounded-full text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200 p-0 flex items-center justify-center shrink-0 shadow-xs"
              title="Dẫn đường"
              onClick={() => setUsingMode("direction")}
            >
              <CornerUpRight className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Dropdown Results */}
        {showDropdown && (
          <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-popover text-popover-foreground border border-border rounded-2xl shadow-xl z-50 overflow-y-auto overflow-x-hidden">
            {topMatches.length > 0
              ? topMatches.map(({ item, type }) => {
                  const isRoom = type === "room";
                  const room = isRoom ? (item as Room) : null;
                  const descriptionText = item.description;

                  return (
                    <button
                      key={`${type}-${item.id}`}
                      onClick={() => handleSelectItem(item)}
                      className="w-full px-5 py-3 text-left hover:bg-accent transition-colors border-b border-border last:border-b-0"
                    >
                      <div className="font-semibold text-foreground">
                        {item.name || item.id}
                      </div>
                      {descriptionText && (
                        <div className="text-sm text-muted-foreground truncate">
                          {descriptionText}
                        </div>
                      )}
                      {isRoom && room && (
                        <div className="text-xs text-muted-foreground truncate mt-0.5">
                          {getHotspotById(room.belongsTo)?.name}
                          {room.floor ? ` • Tầng ${room.floor}` : ""}
                        </div>
                      )}
                    </button>
                  );
                })
              : searchQuery.trim() && (
                  <div className="p-4 text-center text-muted-foreground text-sm">
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

