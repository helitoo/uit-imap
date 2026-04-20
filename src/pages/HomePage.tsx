import { useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ModelViewer, {
  type ModelViewerHandle,
} from "@/components/main/ModelViewer";
import Navbar from "@/components/main/navbar/Navbar";
import HotspotDetail from "@/components/main/hotspot/HotspotDetail";
import DirectionBar from "@/components/main/direction/DirectionBar";
import DirectionSheet from "@/components/main/direction/DirectionSheet";
import { useHotspots } from "@/contexts/hotspotsContext";
import { useMode } from "@/contexts/modeContext";

export default function HomePage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const mvRef = useRef<ModelViewerHandle>(null);

  const {
    hotspots,
    visibleIds,
    selectedHotspot,
    setSelectedHotspot,
    directionPath,
    getHotspotById,
  } = useHotspots();
  const { usingMode } = useMode();

  // Handle /hotspot/:id route
  useEffect(() => {
    if (!id) return;
    if (hotspots.length === 0) return; // wait for data

    const found = getHotspotById(id);
    if (!found) {
      toast.error("Không tìm thấy địa điểm này.");
      navigate("/", { replace: true });
      return;
    }
    setSelectedHotspot(found);
  }, [id, hotspots, getHotspotById, setSelectedHotspot, navigate]);

  // Visible hotspots from the checkbox list
  const visibleHotspots = hotspots.filter((h) => visibleIds.has(h.id));

  const isDirectionMode = usingMode === "direction";

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* ── Full-screen 3D model ── */}
      <ModelViewer
        ref={mvRef}
        visibleHotspots={visibleHotspots}
        selectedHotspot={selectedHotspot}
        directionPath={directionPath}
      />

      {/* ── Default mode UI ── */}
      {!isDirectionMode && <Navbar />}

      {selectedHotspot && <HotspotDetail hotspot={selectedHotspot} />}

      {/* ── Direction mode UI ── */}
      {isDirectionMode && <DirectionSheet path={directionPath} />}
    </div>
  );
}
