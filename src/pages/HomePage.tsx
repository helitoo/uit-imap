import FloatingBar from "@/components/main/floatingbar/FloatingBar";
import HotspotDetail from "@/components/main/hotspot/HotspotDetail";
import ModelViewer, {
  type ModelViewerHandle,
} from "@/components/main/ModelViewer";
import Navbar from "@/components/main/navbar/Navbar";
import { useHotspots } from "@/contexts/hotspotsContext";
import { useMode } from "@/contexts/modeContext";
import { useEvent } from "@/contexts/eventContext";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function HomePage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const mvRef = useRef<ModelViewerHandle>(null);

  const {
    hotspots,
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
