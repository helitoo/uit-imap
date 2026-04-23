import {
  X,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Footprints,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Hotspot } from "@/lib/types/hotspot";
import { useMode } from "@/contexts/modeContext";
import { useHotspots } from "@/contexts/hotspotsContext";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import DirectionBar from "@/components/main/direction/DirectionBar";

interface DirectionSheetProps {
  path: Hotspot[];
}

export default function DirectionSheet({ path }: DirectionSheetProps) {
  const { setUsingMode } = useMode();
  const { setDirectionPath } = useHotspots();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!isMobile || collapsed) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setCollapsed(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, collapsed]);

  const handleExit = () => {
    setUsingMode("default");
    setDirectionPath([]);
  };

  //  Mobile layout
  if (isMobile) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-40 transition-all duration-300",
          collapsed ? "h-12" : "h-[80vh]", // ← bỏ h-auto
        )}
      >
        <div
          className="flex flex-col rounded-t-2xl border border-border/50 shadow-2xl overflow-hidden h-full bg-white/85"
          // overflow-hidden + h-full sẽ clip nội dung khi outer thu nhỏ
        >
          {/* Header — luôn hiển thị */}
          <div className="bg-main text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setCollapsed(!collapsed)}
                className="rounded-full p-2 bg-white text-main hover:text-white size-6 flex items-center justify-center shadow-md"
                title={collapsed ? "Mở rộng" : "Thu gọn"}
              >
                {collapsed ? (
                  <ChevronUp className="size-5" />
                ) : (
                  <ChevronDown className="size-5" />
                )}
              </Button>
              <span className="text-sm font-bold">Lộ trình</span>
              {path.length > 0 && (
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-semibold">
                  {path.length} bước
                </span>
              )}
            </div>
          </div>

          {/* Body — ẩn khi collapsed */}
          {!collapsed && (
            <>
              <button
                onClick={handleExit}
                className="w-full py-2 px-4 text-xs text-destructive font-semibold hover:bg-destructive/10 border-b border-border/40 text-left flex items-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" />
                Thoát khỏi chế độ dẫn đường
              </button>

              <DirectionBar />

              <ScrollArea className="flex-1">
                {path.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-2 py-8 px-4 text-center">
                    <Footprints className="w-8 h-8 text-muted-foreground/40" />
                    <p className="text-xs text-muted-foreground">
                      Chọn điểm bắt đầu và điểm đến
                    </p>
                  </div>
                ) : (
                  <div className="py-2">
                    {path.map((h, idx) => {
                      const isFirst = idx === 0;
                      const isLast = idx === path.length - 1;
                      return (
                        <div
                          key={`${h.id}-${idx}`}
                          className="flex items-start gap-3 px-4 py-2.5 relative"
                        >
                          {!isLast && (
                            <div className="absolute left-[27px] top-8 bottom-0 w-0.5 bg-main/20" />
                          )}
                          <div className="w-6 h-6 rounded-full border flex items-center justify-center text-[10px]">
                            {isFirst ? "S" : isLast ? "E" : idx + 1}
                          </div>
                          <div className="flex-1 text-xs">
                            <p className="font-semibold">{h.name}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>
            </>
          )}
        </div>
      </div>
    );
  }

  //  Desktop layout (giữ nguyên)
  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed top-1/2 right-0 -translate-y-1/2 z-40 transition-all duration-300",
        collapsed ? "w-12" : "w-[min(88vw,320px)]",
      )}
    >
      <div
        className={cn(
          "flex flex-col rounded-l-2xl border border-border/50 shadow-2xl overflow-hidden h-[80vh]",
          "bg-white/85",
          collapsed && "items-center justify-start",
        )}
      >
        {collapsed ? (
          <div className="bg-main text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setCollapsed(!collapsed)}
                className="rounded-full p-2 bg-white text-main hover:text-white size-6 flex items-center justify-center shadow-md"
                title="Mở rộng"
              >
                <ChevronLeft className="size-5" />
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-main text-white px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setCollapsed(!collapsed)}
                  className="rounded-full p-2 bg-white text-main hover:text-white size-6 flex items-center justify-center shadow-md"
                  title="Thu gọn"
                >
                  <ChevronRight className="size-5" />
                </Button>
                <span className="text-sm font-bold">Lộ trình</span>
                {path.length > 0 && (
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-semibold">
                    {path.length} bước
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={handleExit}
              className="w-full py-2 px-4 text-xs text-destructive font-semibold hover:bg-destructive/10 border-b border-border/40 text-left flex items-center gap-1.5"
            >
              <X className="w-3.5 h-3.5" />
              Thoát khỏi chế độ dẫn đường
            </button>

            <DirectionBar />

            <ScrollArea className="flex-1">
              {path.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 py-8 px-4 text-center">
                  <Footprints className="w-8 h-8 text-muted-foreground/40" />
                  <p className="text-xs text-muted-foreground">
                    Chọn điểm bắt đầu và điểm đến
                  </p>
                </div>
              ) : (
                <div className="py-2">
                  {path.map((h, idx) => {
                    const isFirst = idx === 0;
                    const isLast = idx === path.length - 1;
                    return (
                      <div
                        key={`${h.id}-${idx}`}
                        className="flex items-start gap-3 px-4 py-2.5 relative"
                      >
                        {!isLast && (
                          <div className="absolute left-[27px] top-8 bottom-0 w-0.5 bg-main/20" />
                        )}
                        <div className="w-6 h-6 rounded-full border flex items-center justify-center text-[10px]">
                          {isFirst ? "S" : isLast ? "E" : idx + 1}
                        </div>
                        <div className="flex-1 text-xs">
                          <p className="font-semibold">{h.name}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </>
        )}
      </div>
    </div>
  );
}
