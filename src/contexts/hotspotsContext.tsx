import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Hotspot, RawHotspot } from "@/lib/types/hotspot";
import { parseRawHotspot } from "@/lib/types/hotspot";

const MAX_VISIBLE = 30;

interface HotspotsContextValue {
  hotspots: Hotspot[];
  loading: boolean;
  error: string | null;
  // Hotspots currently checked to render on the model
  visibleIds: Set<string>;
  setVisibleIds: (ids: Set<string>) => void;
  toggleVisible: (id: string) => void;
  // Currently selected / zoomed hotspot
  selectedHotspot: Hotspot | null;
  setSelectedHotspot: (h: Hotspot | null) => void;
  // Direction path
  directionPath: Hotspot[];
  setDirectionPath: (path: Hotspot[]) => void;
  // Helper
  getHotspotById: (id: string) => Hotspot | undefined;
  addVisible: (id: string) => void;
  removeVisible: (id: string) => void;
}

const HotspotsContext = createContext<HotspotsContextValue | null>(null);

export function HotspotsProvider({ children }: { children: ReactNode }) {
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [directionPath, setDirectionPath] = useState<Hotspot[]>([]);

  useEffect(() => {
    fetch("/hotspots.json")
      .then((r) => {
        if (!r.ok) throw new Error("Không tải được dữ liệu hotspot");
        return r.json();
      })
      .then((raw: RawHotspot[]) => {
        const parsed = raw.flatMap(parseRawHotspot);
        setHotspots(parsed);
        // Default visible: first MAX_VISIBLE non-supporting spots
        const defaultVisible = parsed
          .filter((h) => !h.categories.includes("supporting"))
          .slice(0, MAX_VISIBLE)
          .map((h) => h.id);
        setVisibleIds(new Set(defaultVisible));
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const toggleVisible = useCallback((id: string) => {
    setVisibleIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (next.size >= MAX_VISIBLE) return prev; // cap at 30
        next.add(id);
      }
      return next;
    });
  }, []);

  const getHotspotById = useCallback(
    (id: string) => hotspots.find((h) => h.id === id),
    [hotspots],
  );

  const addVisible = useCallback((id: string) => {
    setVisibleIds((prev) => {
      if (prev.has(id)) return prev;

      if (prev.size >= MAX_VISIBLE) return prev;

      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const removeVisible = useCallback((id: string) => {
    setVisibleIds((prev) => {
      if (!prev.has(id)) return prev; // không tồn tại → bỏ qua

      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  return (
    <HotspotsContext.Provider
      value={{
        hotspots,
        loading,
        error,
        visibleIds,
        setVisibleIds,
        toggleVisible,
        selectedHotspot,
        setSelectedHotspot,
        directionPath,
        setDirectionPath,
        getHotspotById,
        addVisible,
        removeVisible,
      }}
    >
      {children}
    </HotspotsContext.Provider>
  );
}

export function useHotspots() {
  const ctx = useContext(HotspotsContext);
  if (!ctx) throw new Error("useHotspots must be used within HotspotsProvider");
  return ctx;
}
