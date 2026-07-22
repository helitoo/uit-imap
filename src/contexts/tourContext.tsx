import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { MarzipanoScene, TourScene } from "@/lib/types/pano";

interface PanoContextValue {
  currentSceneId: string;
  currentScene?: TourScene;
  tourScenes: TourScene[];
  isReady: boolean;
  setScene: (sceneId: string) => void;
  nextScene: () => void;
  prevScene: () => void;
  registerScenes: (scenes: Map<string, MarzipanoScene>) => void;
  clearScenes: () => void;
  getScene: (id: string) => MarzipanoScene | undefined;
}

const PanoContext = createContext<PanoContextValue | null>(null);

export function PanoProvider({ children }: { children: React.ReactNode }) {
  const sceneRefs = useRef<Map<string, MarzipanoScene>>(new Map());

  const [tourScenes, setTourScenes] = useState<TourScene[]>([]);
  const [currentSceneId, setCurrentSceneId] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    fetch("/data/tourScenes.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tour scenes data");
        return res.json();
      })
      .then((data: TourScene[]) => {
        setTourScenes(data);
        if (data.length > 0) {
          setCurrentSceneId((prev) => prev || data[0].id);
        }
      })
      .catch((err) => {
        console.error("Error loading tour scenes data:", err);
      });
  }, []);

  const sceneById = useMemo(
    () => new Map(tourScenes.map((scene) => [scene.id, scene])),
    [tourScenes],
  );

  const registerScenes = useCallback((scenes: Map<string, MarzipanoScene>) => {
    sceneRefs.current = scenes;
    setIsReady(scenes.size > 0);
  }, []);

  const clearScenes = useCallback(() => {
    sceneRefs.current.clear();
    setIsReady(false);
  }, []);

  const setScene = useCallback((sceneId: string) => {
    const target = sceneRefs.current.get(sceneId);

    if (!target) return;

    target.view.setParameters(target.data.initialViewParameters);
    target.scene.switchTo();

    setCurrentSceneId(sceneId);
  }, []);

  const nextScene = useCallback(() => {
    if (tourScenes.length === 0) return;
    const index = tourScenes.findIndex((s) => s.id === currentSceneId);

    const next = tourScenes[(index + 1) % tourScenes.length];

    setScene(next.id);
  }, [currentSceneId, setScene, tourScenes]);

  const prevScene = useCallback(() => {
    if (tourScenes.length === 0) return;
    const index = tourScenes.findIndex((s) => s.id === currentSceneId);

    const prev =
      tourScenes[(index - 1 + tourScenes.length) % tourScenes.length];

    setScene(prev.id);
  }, [currentSceneId, setScene, tourScenes]);

  const value = {
    currentSceneId,
    currentScene: sceneById.get(currentSceneId),
    tourScenes,
    isReady,
    setScene,
    nextScene,
    prevScene,
    registerScenes,
    clearScenes,
    getScene: (id: string) => sceneRefs.current.get(id),
  };

  return <PanoContext.Provider value={value}>{children}</PanoContext.Provider>;
}

export function usePano() {
  const context = useContext(PanoContext);

  if (!context) {
    throw new Error("usePano must be used inside PanoProvider");
  }

  return context;
}
