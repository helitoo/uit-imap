import { useState, useEffect } from "react";
import {
  Navigation,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/types/category";
import type { Hotspot } from "@/lib/types/hotspot";
import { useHotspots } from "@/contexts/hotspotsContext";
import { useMode } from "@/contexts/modeContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 10;
const MAX_VISIBLE = 30;

interface FilterResultProps {
  results: Hotspot[];
}

export default function FilterResult({ results }: FilterResultProps) {
  const {
    visibleIds,
    toggleVisible,
    setSelectedHotspot,
    addVisible,
    removeVisible,
  } = useHotspots();
  const { setUsingMode } = useMode();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  // Reset to page 1 when results change
  useEffect(() => {
    setPage(1);
  }, [results]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const paged = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleHotspotClick = (h: Hotspot) => {
    setSelectedHotspot(h);
    navigate(`/hotspot/${h.id}`);
  };

  const handleDirection = (e: React.MouseEvent, h: Hotspot) => {
    e.stopPropagation();
    setSelectedHotspot(h);
    setUsingMode("direction");
    navigate("/");
  };

  const handleToggleVisible = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const isCurrentlyVisible = visibleIds.has(id);
    if (!isCurrentlyVisible && visibleIds.size >= MAX_VISIBLE) {
      toast.warning(
        `Chỉ có thể hiển thị tối đa ${MAX_VISIBLE} địa điểm trên bản đồ.`,
      );
      return;
    }
    toggleVisible(id);
  };

  // Toggle all hostpots visible
  const [isHideAll, setIsHideAll] = useState<boolean>(false);
  const [backupVisbleIds, setBackupVisbleIds] =
    useState<Set<string>>(visibleIds);

  useEffect(() => {
    if (isHideAll) {
      setBackupVisbleIds(visibleIds);
      visibleIds.forEach((id) => {
        removeVisible(id);
      });
    } else {
      backupVisbleIds.forEach((id) => {
        addVisible(id);
      });
    }
  }, [isHideAll]);

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12 px-4 text-center">
        <MapPin className="w-10 h-10 text-muted-foreground/40" />
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Không tìm thấy địa điểm
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Thử thay đổi bộ lọc tìm kiếm
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Result count + visible count */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/40">
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3" />
          <span className="font-semibold text-foreground">
            {results.length}
          </span>{" "}
          địa điểm
        </span>
        <Button
          onClick={() => setIsHideAll(!isHideAll)}
          variant={!isHideAll ? "outline" : "default"}
        >
          {!isHideAll ? "Ẩn toàn bộ" : "Hiện toàn bộ"}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="divide-y divide-border/40">
          {paged.map((h) => {
            const isVisible = visibleIds.has(h.id);
            return (
              <div
                key={h.id}
                className={cn(
                  "flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors",
                  "hover:bg-accent/50 active:bg-accent",
                  isVisible && "bg-main/5",
                )}
                onClick={() => handleHotspotClick(h)}
              >
                {/* Visibility checkbox */}
                <div
                  className="mt-0.5 shrink-0"
                  onClick={(e) => handleToggleVisible(e, h.id)}
                >
                  <Checkbox
                    checked={isVisible}
                    className="pointer-events-none"
                    aria-label={`Hiển thị ${h.name} trên bản đồ`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate leading-tight">
                    {h.name}
                  </p>

                  {/* Description preview */}
                  {h.description[0] && (
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {h.description[0]}
                    </p>
                  )}

                  {/* Floor + capacity */}
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground/70">
                    <span>
                      {h.floor < 0
                        ? `Tầng B${Math.abs(h.floor)}`
                        : h.floor === 0
                          ? "Tầng trệt"
                          : `Tầng ${h.floor} (không phải trệt)`}
                    </span>{" "}
                    • Sức chứa {h.capacity > 0 && <span>{h.capacity} chỗ</span>}
                  </div>
                </div>

                {/* Direction button */}
                <button
                  className="shrink-0 mt-0.5 p-1.5 rounded-full text-muted-foreground hover:text-main hover:bg-main/10 transition-colors"
                  onClick={(e) => handleDirection(e, h)}
                  title="Dẫn đường đến đây"
                >
                  <Navigation className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-2 border-t border-border/40">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-xs text-muted-foreground">
            Trang <span className="font-semibold text-foreground">{page}</span>{" "}
            / {totalPages}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
