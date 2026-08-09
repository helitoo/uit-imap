import { AdjacencyGraph } from "@/lib/types/adjacencyGraph";
import type { Hotspot } from "../types/hotspot";
import type { Room } from "../types/room";
import { toast } from "sonner";

function findSinglePath(
  startGateId: string,
  endGateId: string,
  hotspots: Hotspot[],
  adjacencyGraph: AdjacencyGraph,
  hotspotMap: Map<string, Hotspot>,
): { path: Hotspot[]; distance: number } {
  if (!hotspotMap.has(startGateId) || !hotspotMap.has(endGateId)) {
    return { path: [], distance: Infinity };
  }

  if (startGateId === endGateId) {
    const node = hotspotMap.get(startGateId);
    return { path: node ? [node] : [], distance: 0 };
  }

  const dist = new Map<string, number>();
  const prev = new Map<string, string | null>();
  const visited = new Set<string>();

  for (const h of hotspots) {
    dist.set(h.id, Infinity);
    prev.set(h.id, null);
  }
  dist.set(startGateId, 0);

  const queue = new Set<string>(hotspots.map((h) => h.id));

  while (queue.size > 0) {
    let u: string | null = null;
    let minDist = Infinity;
    for (const id of queue) {
      const d = dist.get(id) ?? Infinity;
      if (d < minDist) {
        minDist = d;
        u = id;
      }
    }

    if (u === null || minDist === Infinity) break;
    if (u === endGateId) break;

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

  const path: Hotspot[] = [];
  let current: string | null = endGateId;

  while (current !== null) {
    const hotspot = hotspotMap.get(current);
    if (!hotspot) break;
    path.unshift(hotspot);
    current = prev.get(current) ?? null;
  }

  if (path.length === 0 || path[0].id !== startGateId) {
    return { path: [], distance: Infinity };
  }

  const totalDistance = dist.get(endGateId) ?? Infinity;

  return { path, distance: totalDistance };
}

export function getDirection(
  start: Room | Hotspot | null | undefined,
  end: Room | Hotspot | null | undefined,
  hotspots: Hotspot[],
  adjacencyGraph: AdjacencyGraph,
): Hotspot[] {
  if (
    !start?.gates ||
    start.gates.length === 0 ||
    !end?.gates ||
    end.gates.length === 0
  ) {
    toast.error("Không thể tìm đường do chưa có thông tin cổng!");
    return [];
  }

  const hotspotMap = new Map<string, Hotspot>(hotspots.map((h) => [h.id, h]));

  let bestPath: Hotspot[] = [];
  let minPathLength = Infinity;

  for (const startGateId of start.gates) {
    for (const endGateId of end.gates) {
      const { path, distance } = findSinglePath(
        startGateId,
        endGateId,
        hotspots,
        adjacencyGraph,
        hotspotMap,
      );

      if (path.length > 0 && distance < minPathLength) {
        minPathLength = distance;
        bestPath = path;
      }
    }
  }

  if (bestPath.length === 0) {
    toast.error("Không thể tìm đường!");
  }

  return bestPath;
}
