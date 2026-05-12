import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Hotspot } from "@/lib/types/hotspot";
import { AdjacencyGraph } from "@/lib/types/adjacencyGraph";
import { euclideanDistance } from "@/lib/helpers/math/euclideanDistance";
import { DEFAULT_HOTSPOT_IDS } from "@/lib/consts/defaultHotspots";

interface HotspotsContextValue {
  hotspots: Hotspot[];
  adjacencyGraph: AdjacencyGraph;

  loading: boolean;
  error: string | null;

  selectedHotspot: Hotspot | null;
  setSelectedHotspot: (h: Hotspot | null) => void;

  // For direction mode
  destHotspot: Hotspot | null;
  setDestHotspot: (h: Hotspot | null) => void;

  directionPath: Hotspot[];
  setDirectionPath: (path: Hotspot[]) => void;

  getHotspotById: (id: string) => Hotspot | undefined;
  getDefaultHotspots: () => Hotspot[] | undefined;
}

const HotspotsContext = createContext<HotspotsContextValue | null>(null);

export function HotspotsProvider({ children }: { children: ReactNode }) {
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [adjacencyGraph, setAdjacencyGraph] = useState<AdjacencyGraph>(
    new Map(),
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  const [destHotspot, setDestHotspot] = useState<Hotspot | null>(null);

  const [directionPath, setDirectionPath] = useState<Hotspot[]>([]);

  useEffect(() => {
    fetch("/data/hotspots.json")
      .then((r) => {
        if (!r.ok) throw new Error("Can't fetch hotspots data");
        return r.json();
      })
      .then((raw) => {
        setHotspots(raw);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!hotspots.length) return;

    fetch("/data/hotspot-edges.json")
      .then((r) => {
        if (!r.ok) throw new Error("Can't fetch hotspot edges data");
        return r.json();
      })
      .then((raw) => {
        const edges: [string, string][] = raw;
        const hotspotMap = new Map<string, Hotspot>(
          hotspots.map((h) => [h.id, h]),
        );

        // Xây dựng danh sách kề: id -> [(neighborId, weight)]
        const adjacency = new Map<string, { id: string; weight: number }[]>();

        for (const [aId, bId] of edges) {
          const a = hotspotMap.get(aId);
          const b = hotspotMap.get(bId);
          if (!a || !b) continue;

          const weight = euclideanDistance(a, b);

          if (!adjacency.has(aId)) adjacency.set(aId, []);
          if (!adjacency.has(bId)) adjacency.set(bId, []);

          adjacency.get(aId)!.push({ id: bId, weight });
          adjacency.get(bId)!.push({ id: aId, weight });
        }

        setAdjacencyGraph(adjacency);
        console.log(adjacency);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [hotspots]);

  const getHotspotById = useCallback(
    (id: string) => hotspots.find((h) => h.id === id),
    [hotspots],
  );

  const getDefaultHotspots = useCallback(
    () => hotspots.filter((h) => DEFAULT_HOTSPOT_IDS.includes(h.id)),
    [hotspots],
  );

  return (
    <HotspotsContext.Provider
      value={{
        hotspots,
        adjacencyGraph,
        loading,
        error,
        selectedHotspot,
        setSelectedHotspot,
        destHotspot,
        setDestHotspot,
        directionPath,
        setDirectionPath,
        getHotspotById,
        getDefaultHotspots,
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
