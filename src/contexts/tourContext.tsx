import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import { tourScenes } from "@/lib/consts/tourScenes";
import type { MarzipanoScene } from "@/lib/types/pano";

interface PanoContextValue {
  currentSceneId: string;
  currentScene?: (typeof tourScenes)[number];
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

  const [currentSceneId, setCurrentSceneId] = useState(tourScenes[0]?.id ?? "");
  const [isReady, setIsReady] = useState(false);

  const sceneById = useMemo(
    () => new Map(tourScenes.map((scene) => [scene.id, scene])),
    [],
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
    const index = tourScenes.findIndex((s) => s.id === currentSceneId);

    const next = tourScenes[(index + 1) % tourScenes.length];

    setScene(next.id);
  }, [currentSceneId, setScene]);

  const prevScene = useCallback(() => {
    const index = tourScenes.findIndex((s) => s.id === currentSceneId);

    const prev =
      tourScenes[(index - 1 + tourScenes.length) % tourScenes.length];

    setScene(prev.id);
  }, [currentSceneId, setScene]);

  const value = {
    currentSceneId,
    currentScene: sceneById.get(currentSceneId),
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
