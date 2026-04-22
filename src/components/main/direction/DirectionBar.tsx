import { useState, useEffect, useCallback } from "react";
import { MapPin, ArrowRight, Loader2, LocateFixed } from "lucide-react";
import { toast } from "sonner";
import type { Hotspot } from "@/lib/types/hotspot";
import { useHotspots } from "@/contexts/hotspotsContext";
import { useGraph } from "@/contexts/graphContext";
import { getDirection } from "@/lib/services/getDirection";
import { euclidean2D } from "@/lib/utils";

export default function DirectionBar() {
  const { hotspots, setDirectionPath, setSelectedHotspot, selectedHotspot } =
    useHotspots();
  const { adj } = useGraph();

  const [startHotspot, setStartHotspot] = useState<Hotspot | null>(null);
  const [endHotspot, setEndHotspot] = useState<Hotspot | null>(
    selectedHotspot ?? null,
  );
  const [locating, setLocating] = useState(false);

  // Update endHotspot when change selectedHotspot
  useEffect(() => {
    if (selectedHotspot) {
      setEndHotspot(selectedHotspot);
      setSelectedHotspot(null);
    }
  }, [selectedHotspot]);

  // Non-supporting hotspots for selects
  const selectableHotspots = hotspots.filter(
    (h) => !h.categories.includes("supporting"),
  );

  // Recalculate direction whenever start/end change
  useEffect(() => {
    if (startHotspot && endHotspot) {
      const path = getDirection(startHotspot, endHotspot, adj, hotspots);
      setDirectionPath(path);
      if (path.length === 0) {
        toast.error("Không tìm thấy đường đi giữa hai địa điểm này.");
      }
    }
  }, [startHotspot, endHotspot, adj, hotspots, setDirectionPath]);

  const locateUser = useCallback(() => {
    if (!navigator.geolocation) {
      toast.info(
        "Trình duyệt không hỗ trợ định vị GPS. Vui lòng chọn điểm bắt đầu thủ công.",
      );
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userPos: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];
        // Find nearest hotspot by real_position
        let nearest: Hotspot | null = null;
        let minDist = Infinity;
        selectableHotspots.forEach((h) => {
          const d = euclidean2D(userPos, h.real_position);
          if (d < minDist) {
            minDist = d;
            nearest = h;
          }
        });
        if (nearest) {
          setStartHotspot(nearest);
          toast.success(`Vị trí hiện tại: ${(nearest as Hotspot).name}`);
        }
        setLocating(false);
      },
      () => {
        toast.info(
          "Không lấy được vị trí GPS. Vui lòng chọn điểm bắt đầu thủ công.",
        );
        setLocating(false);
      },
      { timeout: 8000 },
    );
  }, [selectableHotspots]);

  const handleSelectStart = (id: string) => {
    const h = hotspots.find((x) => x.id === id) ?? null;
    setStartHotspot(h);
  };

  const handleSelectEnd = (id: string) => {
    const h = hotspots.find((x) => x.id === id) ?? null;
    setEndHotspot(h);
    if (h) setSelectedHotspot(null);
  };

  return (
    <div className="flex items-center gap-2 mt-2 w-full px-2">
      {/* Start point */}
      <div className="flex-1 flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-xl px-2.5 py-1.5">
        <MapPin className="w-3.5 h-3.5 text-green-600 shrink-0" />
        <select
          value={startHotspot?.id ?? ""}
          onChange={(e) => handleSelectStart(e.target.value)}
          className="flex-1 min-w-0 w-0 bg-transparent text-xs font-medium text-foreground focus:outline-none"
        >
          <option value="">Điểm đầu</option>
          {selectableHotspots.map((h) => (
            <option key={h.id} value={h.id}>
              {h.name}
            </option>
          ))}
        </select>
        <button
          onClick={locateUser}
          className="shrink-0 p-0.5 rounded-full text-green-600 hover:bg-green-100 transition-colors"
          title="Định vị vị trí hiện tại"
        >
          {locating ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <LocateFixed className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />

      {/* End point */}
      <div className="flex-1 flex items-center gap-1.5 bg-red-50 border border-red-200 rounded-xl px-2.5 py-1.5">
        <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
        <select
          value={endHotspot?.id ?? ""}
          onChange={(e) => handleSelectEnd(e.target.value)}
          className="flex-1 min-w-0 w-0 bg-transparent text-xs font-medium text-foreground focus:outline-none"
        >
          <option value="">Điểm đến</option>
          {selectableHotspots.map((h) => (
            <option key={h.id} value={h.id}>
              {h.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
