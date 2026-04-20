import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Hotspot } from "@/lib/types/hotspot";
import { euclidean3D } from "@/lib/utils";

export type Adj = Record<string, Record<string, number>>;

interface Edge {
  start_id: string;
  end_id: string;
}

interface GraphContextValue {
  adj: Adj;
  graphReady: boolean;
}

const GraphContext = createContext<GraphContextValue | null>(null);

export function GraphProvider({
  children,
  hotspots,
}: {
  children: ReactNode;
  hotspots: Hotspot[];
}) {
  const [adj, setAdj] = useState<Adj>({});
  const [graphReady, setGraphReady] = useState(false);

  useEffect(() => {
    if (hotspots.length === 0) return;

    fetch("/edge-list.json")
      .then((r) => r.json())
      .then((edges: Edge[]) => {
        const hotspotMap = new Map(hotspots.map((h) => [h.id, h]));
        const graph: Adj = {};

        // Initialise nodes
        hotspots.forEach((h) => {
          graph[h.id] = {};
        });

        edges.forEach(({ start_id, end_id }) => {
          const a = hotspotMap.get(start_id);
          const b = hotspotMap.get(end_id);
          if (!a || !b) return;
          const dist = euclidean3D(a.model_position, b.model_position);
          if (!graph[start_id]) graph[start_id] = {};
          if (!graph[end_id]) graph[end_id] = {};
          graph[start_id][end_id] = dist;
          graph[end_id][start_id] = dist; // undirected
        });

        setAdj(graph);
        setGraphReady(true);
      })
      .catch(console.error);
  }, [hotspots]);

  return (
    <GraphContext.Provider value={{ adj, graphReady }}>
      {children}
    </GraphContext.Provider>
  );
}

export function useGraph() {
  const ctx = useContext(GraphContext);
  if (!ctx) throw new Error("useGraph must be used within GraphProvider");
  return ctx;
}
