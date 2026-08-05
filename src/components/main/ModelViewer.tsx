import {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

import type { Hotspot } from "@/lib/types/hotspot";
import type { Tourspot } from "@/lib/types/pano";
import HotspotButton from "@/components/main/hotspot/HotspotButton";
import { useHotspots } from "@/contexts/hotspotsContext";
import HotspotDirection from "@/components/main/hotspot/HotspotDirection";
import TourspotButton from "@/components/main/hotspot/TourspotButton";
import { useMode } from "@/contexts/modeContext";
import { useScreenMode } from "@/contexts/screenModeContext";
import TransparentLoadingScreen from "@/components/main/TransparentLoadingScreen";
import { httpClient } from "@/lib/httpClient";
import { API_BASE_URL } from "@/lib/apiConfig";
import { toast } from "sonner";

type CustomModelViewer = HTMLElement & {
  cameraOrbit: string;
  fieldOfView: string;
  cameraTarget: string;

  resetTurntableRotation: (deg?: number) => void;

  jumpCameraToGoal: () => void;

  queryHotspot: (name: string) => {
    canvasPosition: {
      x: number;
      y: number;
    };

    worldPosition: {
      x: number;
      y: number;
      z: number;
    };
  } | null;
};

export interface ModelViewerHandle {
  zoomTo: (hotspot: Hotspot) => void;
  reset: () => void;
}

interface ModelViewerProps {
  /** Currently selected hotspot */
  selectedHotspot: Hotspot | null;
  /** Direction path (empty = not in direction mode) */
  directionPath: Hotspot[];
}

const INITIAL_ORBIT = "-131.7deg 67.68deg 25.13m";
const INITIAL_FOV = "20.11deg";

const ModelViewer = forwardRef<ModelViewerHandle, ModelViewerProps>(
  ({ selectedHotspot, directionPath }, ref) => {
    const { getDefaultHotspots } = useHotspots();
    const { showTourspots } = useMode();
    const { resolvedMode } = useScreenMode();
    const [tourspots, setTourspots] = useState<Tourspot[]>([]);

    const environmentImage =
      resolvedMode === "dark" ? "aircraft_workshop_01_1k.hdr" : undefined;

    const [isLoadingEnv, setIsLoadingEnv] = useState<boolean>(() =>
      Boolean(environmentImage)
    );
    const hasLoadedEnvRef = useRef<boolean>(false);

    useEffect(() => {
      if (environmentImage && !hasLoadedEnvRef.current) {
        setIsLoadingEnv(true);
      }
    }, [environmentImage]);

    useEffect(() => {
      const viewer = mvRef.current;
      if (!viewer) return;

      const onLoad = () => {
        if (environmentImage) {
          hasLoadedEnvRef.current = true;
        }
        setIsLoadingEnv(false);
      };

      const onError = () => {
        setIsLoadingEnv(false);
      };

      viewer.addEventListener("load", onLoad);
      viewer.addEventListener("environment-change", onLoad);
      viewer.addEventListener("error", onError);

      return () => {
        viewer.removeEventListener("load", onLoad);
        viewer.removeEventListener("environment-change", onLoad);
        viewer.removeEventListener("error", onError);
      };
    }, [environmentImage]);

    useEffect(() => {
      httpClient
        .get<Tourspot[]>("/tourspots")
        .then((data: Tourspot[]) => setTourspots(data))
        .catch((err) => {
          console.error("Error loading tourspots data:", err);
          toast.error("Đã có lỗi, xin hãy thử lại");
        });
    }, []);

    const mvRef = useRef<CustomModelViewer | null>(null);

    useImperativeHandle(ref, () => ({
      zoomTo: (hotspot: Hotspot) => {
        const mv = mvRef.current;
        if (!mv) return;
        const [x, y, z] = hotspot.dataPosition;
        // Set camera target to hotspot position
        mv.cameraTarget = `${x}m ${y}m ${z}m`;
        // Zoom in
        mv.cameraOrbit = `-131deg 68.84deg 8m`;
        mv.fieldOfView = "8deg";
      },
      reset: () => {
        const mv = mvRef.current;
        if (!mv) return;
        mv.cameraOrbit = INITIAL_ORBIT;
        mv.fieldOfView = INITIAL_FOV;
        mv.cameraTarget = "0m 0m 0m";
      },
    }));

    // Auto-zoom when selectedHotspot changes
    useEffect(() => {
      if (!selectedHotspot || !mvRef.current) return;
      const mv = mvRef.current;
      const [x, y, z] = selectedHotspot.dataPosition;
      mv.cameraTarget = `${x}m ${y}m ${z}m`;
      mv.cameraOrbit = `-131deg 68.84deg 8m`;
      mv.fieldOfView = "8deg";
    }, [selectedHotspot]);

    const pathIds = new Set(directionPath.map((h) => h.id));
    const isDirectionMode = directionPath.length > 0;

    // In direction mode, only render path hotspots; otherwise render visible ones
    const hotspotsToRender = isDirectionMode
      ? directionPath
      : getDefaultHotspots();

    return (
      <div className="relative w-full h-full overflow-hidden" id="model-viewer">
        {isLoadingEnv && <TransparentLoadingScreen />}
        <model-viewer
          ref={mvRef}
          src={`${API_BASE_URL.replace(/\/$/, "")}/map.glb`}
          camera-controls
          tone-mapping="neutral"
          shadow-intensity="0"
          exposure="1"
          environment-image={environmentImage}
          min-camera-orbit="auto 0deg auto"
          max-camera-orbit="auto 88deg auto"
          camera-orbit={INITIAL_ORBIT}
          field-of-view={INITIAL_FOV}
          interaction-prompt="none"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            overflow: "hidden",
          }}
        >
          {/* Render tourspot buttons as slots */}
          {showTourspots &&
            tourspots.map((t) => <TourspotButton key={t.id} tourspot={t} />)}

          {/* Render hotspot buttons as slots */}
          {hotspotsToRender &&
            hotspotsToRender.map((h) => (
              <HotspotButton
                key={h.id}
                hotspot={h}
                isOnPath={isDirectionMode && pathIds.has(h.id)}
                isSelected={selectedHotspot?.id === h.id}
              />
            ))}

          {/* SVG direction lines inside model-viewer */}
          {isDirectionMode && (
            <HotspotDirection
              path={directionPath}
              modelViewerRef={mvRef as React.RefObject<HTMLElement>}
            />
          )}
        </model-viewer>
      </div>
    );
  },
);

ModelViewer.displayName = "ModelViewer";
export default ModelViewer;
