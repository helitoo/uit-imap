import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import type { Hotspot } from "@/lib/types/hotspot";
import HotspotButton from "@/components/main/hotspot/HotspotButton";
import HotspotDirection from "@/components/main/direction/HotspotDirection";

export interface ModelViewerHandle {
  zoomTo: (hotspot: Hotspot) => void;
  reset: () => void;
}

interface ModelViewerProps {
  /** Hotspots to render as interactive buttons on the model */
  visibleHotspots: Hotspot[];
  /** Currently selected hotspot */
  selectedHotspot: Hotspot | null;
  /** Direction path (empty = not in direction mode) */
  directionPath: Hotspot[];
}

const INITIAL_ORBIT = "-131deg 68.84deg 19.4m";
const INITIAL_FOV = "13.71deg";

const ModelViewer = forwardRef<ModelViewerHandle, ModelViewerProps>(
  ({ visibleHotspots, selectedHotspot, directionPath }, ref) => {
    const mvRef = useRef<
      HTMLElement & {
        cameraOrbit: string;
        fieldOfView: string;
        cameraTarget: string;
        resetTurntableRotation?: (deg?: number) => void;
        jumpCameraToGoal?: () => void;
        queryHotspot?: (
          name: string,
        ) => { canvasPosition: { x: number; y: number } } | null;
      }
    >(null);

    useImperativeHandle(ref, () => ({
      zoomTo: (hotspot: Hotspot) => {
        const mv = mvRef.current;
        if (!mv) return;
        const [x, y, z] = hotspot.model_position;
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
      const [x, y, z] = selectedHotspot.model_position;
      mv.cameraTarget = `${x}m ${y}m ${z}m`;
      mv.cameraOrbit = `-131deg 68.84deg 8m`;
      mv.fieldOfView = "8deg";
    }, [selectedHotspot]);

    const pathIds = new Set(directionPath.map((h) => h.id));
    const isDirectionMode = directionPath.length > 0;

    // In direction mode, only render path hotspots; otherwise render visible ones
    const hotspotsToRender = isDirectionMode ? directionPath : visibleHotspots;

    return (
      <div className="relative w-full h-full overflow-hidden">
        {/* @ts-expect-error model-viewer is a custom element */}
        <model-viewer
          ref={mvRef}
          src="/models/map.glb"
          camera-controls
          tone-mapping="neutral"
          shadow-intensity="0"
          exposure="1"
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
          {/* Render hotspot buttons as slots */}
          {hotspotsToRender.map((h) => (
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
          {/* @ts-expect-error closing tag */}
        </model-viewer>
      </div>
    );
  },
);

ModelViewer.displayName = "ModelViewer";
export default ModelViewer;
