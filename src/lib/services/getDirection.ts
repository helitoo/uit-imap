import { AdjacencyGraph } from "@/lib/types/adjacencyGraph";
import type { Hotspot } from "../types/hotspot";

export function getDirection(
  start: Hotspot,
  end: Hotspot,
  hotspots: Hotspot[],
  adjacencyGraph: AdjacencyGraph,
): Hotspot[] {
  // Map id -> Hotspot để tra cứu nhanh
  const hotspotMap = new Map<string, Hotspot>(hotspots.map((h) => [h.id, h]));

  // Dijkstra
  const dist = new Map<string, number>();
  const prev = new Map<string, string | null>();
  const visited = new Set<string>();

  for (const h of hotspots) {
    dist.set(h.id, Infinity);
    prev.set(h.id, null);
  }
  dist.set(start.id, 0);

  // Min-heap đơn giản bằng Set (hoặc dùng priority queue thủ công)
  // Vì JS không có built-in heap, ta dùng mảng + sort (phù hợp graph nhỏ)
  const queue = new Set<string>(hotspots.map((h) => h.id));

  while (queue.size > 0) {
    // Lấy node có dist nhỏ nhất chưa visited
    let u: string | null = null;
    let minDist = Infinity;
    for (const id of queue) {
      const d = dist.get(id) ?? Infinity;
      if (d < minDist) {
        minDist = d;
        u = id;
      }
    }

    if (u === null || minDist === Infinity) break; // Không còn node nào reachable
    if (u === end.id) break; // Đã đến đích

    queue.delete(u);
    visited.add(u);

    for (const { id: vId, weight } of adjacencyGraph.get(u) ?? []) {
      if (visited.has(vId)) continue;

      const alt = (dist.get(u) ?? Infinity) + weight;
      if (alt < (dist.get(vId) ?? Infinity)) {
        dist.set(vId, alt);
        prev.set(vId, u);
      }
    }
  }

  // Truy vết đường đi từ end về start
  const path: Hotspot[] = [];
  let current: string | null = end.id;

  while (current !== null) {
    const hotspot = hotspotMap.get(current);
    if (!hotspot) break;
    path.unshift(hotspot);
    current = prev.get(current) ?? null;
  }

  // Nếu không tìm được đường đi hợp lệ
  if (path.length === 0 || path[0].id !== start.id) return [];

  return path;
}
