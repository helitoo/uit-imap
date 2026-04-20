import type { Hotspot } from "../types/hotspot";

type Adj = Record<string, Record<string, number>>;

/**
 * Returns the shortest path from start to end as an ordered Hotspot[].
 * Uses Dijkstra's algorithm on the adjacency list.
 * Returns [] if no path exists.
 */
export function getDirection(
  start: Hotspot,
  end: Hotspot,
  adj: Adj,
  hotspots: Hotspot[]
): Hotspot[] {
  if (start.id === end.id) return [start];

  const hotspotMap = new Map<string, Hotspot>(hotspots.map((h) => [h.id, h]));

  const dist: Record<string, number> = {};
  const prev: Record<string, string | null> = {};
  const visited = new Set<string>();

  // Min-heap using a simple array (sufficient for typical campus graph sizes)
  const queue: { id: string; cost: number }[] = [];

  const push = (id: string, cost: number) => {
    dist[id] = cost;
    prev[id] = prev[id] ?? null;
    queue.push({ id, cost });
    queue.sort((a, b) => a.cost - b.cost);
  };

  // Initialize
  Object.keys(adj).forEach((id) => {
    dist[id] = Infinity;
    prev[id] = null;
  });

  push(start.id, 0);

  while (queue.length > 0) {
    const { id: u } = queue.shift()!;
    if (visited.has(u)) continue;
    visited.add(u);

    if (u === end.id) break;

    const neighbors = adj[u] ?? {};
    for (const [v, w] of Object.entries(neighbors)) {
      if (visited.has(v)) continue;
      const alt = (dist[u] ?? Infinity) + w;
      if (alt < (dist[v] ?? Infinity)) {
        prev[v] = u;
        push(v, alt);
      }
    }
  }

  // Reconstruct path
  if (dist[end.id] === Infinity) return [];

  const path: string[] = [];
  let cur: string | null = end.id;
  while (cur !== null) {
    path.unshift(cur);
    cur = prev[cur] ?? null;
  }

  return path
    .map((id) => hotspotMap.get(id))
    .filter((h): h is Hotspot => h !== undefined);
}
