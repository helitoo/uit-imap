import { Hotspot } from "@/lib/types/hotspot";

export function euclideanDistance(a: Hotspot, b: Hotspot): number {
  const [x1, y1, z1] = a.dataPosition;
  const [x2, y2, z2] = b.dataPosition;
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
}
