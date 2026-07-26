import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bus, TramFront, Info, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useHotspots } from "@/contexts/hotspotsContext";
import type { Transport } from "@/lib/types/transport";

const getTransportInfo = (
  url: string,
): { url: string; name: string } => {
  if (url.includes("busmap.vn")) {
    return {
      url: "https://upload.wikimedia.org/wikipedia/vi/9/94/BusMap_Icon.png",
      name: "BusMap",
    };
  }
  if (url.includes("metro")) {
    return {
      url: "https://images.seeklogo.com/logo-png/45/1/hcmc-metro-logo-png_seeklogo-453926.png",
      name: "HCMC Metro",
    };
  }
  return {
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Google_Maps_icon_%282026%29.svg",
    name: "Google Map",
  };
};

function TransportProviderImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Skeleton className="w-full h-full rounded" />}
      <img
        src={src}
        alt={alt}
        draggable={false}
        className={cn("w-full h-full object-contain", !loaded && "hidden")}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        ref={(el) => {
          if (el?.complete) setLoaded(true);
        }}
      />
    </>
  );
}

interface TransportSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TransportSheet({ open, onOpenChange }: TransportSheetProps) {
  const navigate = useNavigate();
  const { getHotspotById, setSelectedHotspot } = useHotspots();
  const [transports, setTransports] = useState<Transport[]>([]);

  useEffect(() => {
    fetch("/data/transport.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch transport data");
        return res.json();
      })
      .then((data: Transport[]) => setTransports(data))
      .catch((err) => console.error("Error loading transport data:", err));
  }, []);

  const handleSpotClick = (spotId: string) => {
    const hotspot = getHotspotById(spotId);
    if (hotspot) {
      setSelectedHotspot(hotspot);
      onOpenChange(false);
      navigate(`/hotspot/${spotId}`);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showOverlay={false}
        className="p-0 flex flex-col glass-panel border-l border-border/50 w-full sm:w-1/2 h-dvh"
      >
        {/* Header */}
        <SheetHeader className="p-4 border-b border-border/50 shrink-0 bg-white">
          <SheetTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Bus className="w-5 h-5 text-main" />
            Tuyến đường & Di chuyển
          </SheetTitle>
        </SheetHeader>

        {/* List of transports */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-3 pb-6">
            {transports.map((item, idx) => {
              const hotspot = getHotspotById(item.spot);
              const spotName =
                hotspot?.name || (item.spot === "cA" ? "Cổng A" : "Cổng B");
              const TypeIcon = item.type === "metro" ? TramFront : Bus;

              return (
                <div
                  key={idx}
                  onClick={() => handleSpotClick(item.spot)}
                  className="group relative flex flex-col p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md hover:border-main/20 cursor-pointer transition-all duration-300 animate-fade-in"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-slate-50 text-slate-600 rounded-lg group-hover:bg-main/5 group-hover:text-main transition-colors">
                      <TypeIcon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-slate-800 group-hover:text-main transition-colors truncate">
                        {item.name}
                      </h3>

                      <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{spotName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Provider Icons */}
                  <div className="mt-4 flex items-center justify-end">
                    <div className="flex gap-2">
                      {item.providers.map((url, pIdx) => {
                        const info = getTransportInfo(url);
                        return (
                          <a
                            key={pIdx}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            title={info.name}
                            className="w-7 h-7 p-1 bg-white border border-slate-100 rounded-md hover:border-main/50 hover:shadow-sm transition-all duration-200 flex items-center justify-center"
                          >
                            <TransportProviderImage
                              src={info.url}
                              alt={info.name}
                            />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {/* Note section */}
        <div className="p-4 border-t border-border/50 bg-slate-50/80 space-y-3 shrink-0">
          <div className="flex gap-2.5 text-xs text-slate-600 leading-relaxed">
            <Info className="w-4 h-4 text-main shrink-0 mt-0.5" />
            <div>
              TP.HCM miễn phí 134 tuyến xe bus nội thành. Chi tiết tại{" "}
              <a
                href="https://thanhnien.vn/tphcm-mien-phi-134-tuyen-xe-buyt-tu-hom-nay-nhung-dieu-hanh-khach-can-biet-185260630230637782.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-main font-semibold hover:underline"
              >
                thanhnien.vn
              </a>
              .
            </div>
          </div>
          <div className="flex gap-2.5 text-xs text-slate-600 leading-relaxed text-justify">
            <Info className="w-4 h-4 text-main shrink-0 mt-0.5" />
            <div>
              Học sinh, sinh viên có thể nhận được ưu đãi giảm 150k khi đăng ký
              vé tháng HCMC Metro. Chi tiết tại{" "}
              <a
                href="https://ctsv.uit.edu.vn/bai-viet/cach-dang-ky-ve-thang-danh-cho-sinh-vien-khi-di-metro-so-1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-main font-semibold hover:underline"
              >
                ctsv.uit.edu.vn
              </a>
              .
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
