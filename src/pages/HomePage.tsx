import FloatingBar from "@/components/main/floatingbar/FloatingBar";
import HotspotDetail from "@/components/main/hotspot/HotspotDetail";
import ModelViewer, {
  type ModelViewerHandle,
} from "@/components/main/ModelViewer";
import Navbar from "@/components/main/navbar/Navbar";
import { useHotspots } from "@/contexts/hotspotsContext";
import { useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const mvRef = useRef<ModelViewerHandle>(null);

  const hotspotId = useMemo(() => {
    const match = location.pathname.match(/^\/hotspot\/([^/]+)/);
    return match?.[1] ? decodeURIComponent(match[1]) : undefined;
  }, [location.pathname]);

  const {
    hotspots,
    selectedHotspot,
    setSelectedHotspot,
    directionPath,
    getHotspotById,
  } = useHotspots();

  // Handle /hotspot/:id route
  useEffect(() => {
    if (!hotspotId) return;
    if (hotspots.length === 0) return; // wait for data

    const found = getHotspotById(hotspotId);
    if (!found) {
      toast.error("Không tìm thấy địa điểm này.");
      navigate("/", { replace: true });
      return;
    }
    setSelectedHotspot(found);
  }, [hotspotId, hotspots, getHotspotById, setSelectedHotspot, navigate]);

  return (
    <>
      <div className="relative w-full h-full overflow-hidden">
        <FloatingBar />

        {/* ── Full-screen 3D model ── */}
        <ModelViewer
          ref={mvRef}
          selectedHotspot={selectedHotspot}
          directionPath={directionPath}
        />

        <Navbar />

        {selectedHotspot && <HotspotDetail hotspot={selectedHotspot} />}
      </div>
    </>
  );
}
