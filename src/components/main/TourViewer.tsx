import Marzipano from "marzipano";
import { LinkHotspot, MarzipanoScene } from "@/lib/types/pano";
import { useEffect, useMemo, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePano } from "@/contexts/tourContext";
import { cn, getSceneShareUrl } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  List,
  MapPinned,
  Minus,
  Plus,
  Share2,
  X,
} from "lucide-react";
import { toast } from "sonner";

const stopTouchAndScrollEvents = (element: HTMLElement) => {
  ["touchstart", "touchmove", "touchend", "touchcancel", "wheel"].forEach(
    (eventName) => {
      element.addEventListener(eventName, (event) => event.stopPropagation());
    },
  );
};

interface TourViewerProps {
  sceneId?: string;
  isOpen: boolean;
  onExit: () => void;
  onSceneChange: (sceneId: string) => void;
}

export default function TourViewer({
  sceneId,
  isOpen,
  onExit,
  onSceneChange,
}: TourViewerProps) {
  const panoRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<{ destroy: () => void } | null>(null);
  const hotspotRootsRef = useRef<Root[]>([]);
  const selectedSceneRef = useRef<HTMLButtonElement | null>(null);
  const hasShownMissingSceneToast = useRef<string | null>(null);
  const [isSceneMenuOpen, setIsSceneMenuOpen] = useState(false);
  // const [isRoadmapOpen, setIsRoadmapOpen] = useState(true);
  const {
    currentSceneId,
    currentScene,
    tourScenes,
    registerScenes,
    clearScenes,
    setScene,
    getScene,
  } = usePano();

  const sceneById = useMemo(
    () => new Map(tourScenes.map((scene) => [scene.id, scene])),
    [tourScenes],
  );

  useEffect(() => {
    if (!sceneId) {
      hasShownMissingSceneToast.current = null;
      clearScenes();
      return;
    }

    if (tourScenes.length === 0) {
      return;
    }

    if (!sceneById.has(sceneId)) {
      if (hasShownMissingSceneToast.current !== sceneId) {
        toast.error("Không tìm thấy cảnh 360 này.");
        hasShownMissingSceneToast.current = sceneId;
      }
      onExit();
      return;
    }

    if (!panoRef.current) {
      return;
    }

    hasShownMissingSceneToast.current = null;

    const viewer = new Marzipano.Viewer(panoRef.current, {
      controls: { mouseViewMode: "drag" },
    });
    viewerRef.current = viewer;

    const sceneMap = new Map<string, MarzipanoScene>();

    const createLinkHotspot = (hotspot: LinkHotspot) => {
      const element = document.createElement("div");
      const hotspotName = sceneById.get(hotspot.target)?.name ?? "Next scene";
      const handleClick = () => onSceneChange(hotspot.target);
      const root = createRoot(element);

      root.render(
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={handleClick}
                className={cn(
                  "group relative grid size-8 place-items-center rounded-full border-2 border-white/85 bg-sky-500/50 text-white shadow-[0_10px_26px_rgba(0,0,0,0.28)] transition hover:scale-105 hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                )}
                style={{ transform: `rotate(${hotspot.rotation}rad)` }}
                aria-label={`Go to ${hotspotName}`}
              >
                <ChevronUp />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[200px] text-center">
              {hotspotName}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>,
      );

      hotspotRootsRef.current.push(root);
      stopTouchAndScrollEvents(element);

      return element;
    };

    tourScenes
      .filter((sceneData) => sceneData.id === sceneId)
      .forEach((sceneData) => {
        const source = Marzipano.ImageUrlSource.fromString(
          `/tiles/${sceneData.id}/{z}/{f}/{y}/{x}.jpg`,
          { cubeMapPreviewUrl: `/tiles/${sceneData.id}/preview.jpg` },
        );
        const geometry = new Marzipano.CubeGeometry(sceneData.levels);
        const limiter = Marzipano.RectilinearView.limit.traditional(
          sceneData.faceSize * 2,
          Math.PI / 2,
          (Math.PI * 160) / 180,
        );
        const view = new Marzipano.RectilinearView(
          sceneData.initialViewParameters,
          limiter,
        );
        const scene = viewer.createScene({
          source,
          geometry,
          view,
          pinFirstLevel: true,
        });

        sceneData.linkHotspots.forEach((hotspot) => {
          scene.hotspotContainer().createHotspot(createLinkHotspot(hotspot), {
            yaw: hotspot.yaw,
            pitch: hotspot.pitch,
          });
        });

        sceneMap.set(sceneData.id, { data: sceneData, scene, view });
      });

    registerScenes(sceneMap);
    setScene(sceneId);

    return () => {
      hotspotRootsRef.current.forEach((root) => {
        window.setTimeout(() => root.unmount(), 0);
      });
      hotspotRootsRef.current = [];
      viewer.destroy();
      viewerRef.current = null;
      clearScenes();
    };
  }, [
    clearScenes,
    onExit,
    onSceneChange,
    registerScenes,
    sceneById,
    sceneId,
    setScene,
  ]);

  useEffect(() => {
    const targetScene = getScene(currentSceneId);
    if (!targetScene) {
      return;
    }

    targetScene.view.setParameters(targetScene.data.initialViewParameters);
    targetScene.scene.switchTo();
  }, [currentSceneId]);

  useEffect(() => {
    if (isSceneMenuOpen && selectedSceneRef.current) {
      selectedSceneRef.current.scrollIntoView({
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [isSceneMenuOpen, currentSceneId]);

  const goToAdjacentScene = (direction: "next" | "prev") => {
    const index = tourScenes.findIndex((scene) => scene.id === currentSceneId);
    const offset = direction === "next" ? 1 : -1;
    const next =
      tourScenes[(index + offset + tourScenes.length) % tourScenes.length];

    if (next) onSceneChange(next.id);
  };

  const handleShare = () => {
    const url = getSceneShareUrl(currentSceneId);

    navigator.clipboard
      .writeText(url)
      .then(() => toast.success("Đã sao chép đường dẫn!"))
      .catch(() => toast.error("Không thể sao chép đường dẫn."));
  };

  return (
    <main
      className={cn(
        "fixed inset-0 z-50 overflow-hidden bg-slate-950 text-white transition-opacity duration-300",
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      )}
      aria-hidden={!isOpen}
    >
      <div
        ref={panoRef}
        className="fixed inset-0 bg-slate-950"
        aria-label="UIT 360 panorama"
      />

      <header className="fixed top-0 left-0 right-0 z-10 w-full flex min-h-16 items-stretch justify-end sm:justify-between gap-3">
        <div className="hidden sm:flex flex-1 min-w-0 flex-col justify-center px-5 sm:pr-36 bg-gradient-to-r from-slate-950/70 via-slate-950/40 to-transparent">
          <p className="text-[11px] font-semibold uppercase leading-tight text-sky-200">
            UIT 360 Tour
          </p>
          <h1 className="truncate font-bold leading-tight text-white text-xl">
            {currentScene?.name}
          </h1>
        </div>

        {/* Khối Buttons điều khiển: Sát mép phải, thêm pr-4 để các nút không bị dính chặt vào cạnh màn hình */}
        <div
          className="flex shrink-0 items-center gap-2 pr-4"
          aria-label="Scene controls"
        >
          <Button
            className="size-10 rounded-full border border-white/15 bg-slate-950/60 text-white hover:bg-slate-950/80"
            onClick={handleShare}
            aria-label="Share"
            title="Chia sẻ"
          >
            <Share2 />
          </Button>
          <Button
            className="size-10 rounded-full border border-white/15 bg-slate-950/60 text-white hover:bg-slate-950/80"
            onClick={() => setIsSceneMenuOpen((open) => !open)}
            aria-label="Toggle scene list"
            title="Mở/Đóng danh sách cảnh"
          >
            <List />
          </Button>
          <Button
            className="size-10 rounded-full border border-white/15 bg-slate-950/60 text-white hover:bg-slate-950/80"
            onClick={() => goToAdjacentScene("prev")}
            aria-label="Previous scene"
            title="Cảnh trước đó"
          >
            <ChevronLeft />
          </Button>
          <Button
            className="size-10 rounded-full border border-white/15 bg-slate-950/60 text-white hover:bg-slate-950/80"
            onClick={() => goToAdjacentScene("next")}
            aria-label="Next scene"
            title="Cảnh tiếp theo"
          >
            <ChevronRight />
          </Button>
          <Button
            className="size-10 rounded-full border border-white/15 bg-slate-950/60 text-white hover:bg-slate-950/80"
            onClick={onExit}
            aria-label="Exit tour"
            title="Thoát"
          >
            <X />
          </Button>
        </div>
      </header>

      <nav
        className={cn(
          "fixed left-0 top-1/2 z-10 w-full sm:w-64 -translate-y-1/2 max-h-[40vh] flex flex-col overflow-hidden rounded-r-lg border border-l-0 border-white/15 bg-slate-950/60 p-1.5 shadow-xl backdrop-blur-sm transition-[transform,opacity] duration-300 ease-out will-change-transform",
          isSceneMenuOpen
            ? "translate-x-0 opacity-100"
            : "pointer-events-none -translate-x-full opacity-0",
        )}
        aria-label="Scenes"
      >
        <div className="overflow-y-auto pr-0.5 space-y-1 custom-scrollbar">
          {tourScenes.map((scene) => {
            const isSelected = scene.id === currentSceneId;
            return (
              <Button
                key={scene.id}
                ref={isSelected ? selectedSceneRef : null}
                variant="ghost"
                className={cn(
                  "flex h-9 w-full items-center justify-center sm:justify-start rounded-md border border-transparent px-2.5 text-white hover:bg-white/10 hover:text-white",
                  isSelected &&
                    "border-sky-300/70 bg-sky-500/90 hover:bg-sky-500/90 hover:text-white",
                )}
                onClick={() => onSceneChange(scene.id)}
              >
                <span className="truncate">{scene.name}</span>
              </Button>
            );
          })}
        </div>
      </nav>
    </main>
  );
}
