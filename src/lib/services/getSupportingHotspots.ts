import type { Hotspot } from "../types/hotspot";

/** Returns all hotspots with category "supporting" */
export function getSupportingHotspots(hotspots: Hotspot[]): Hotspot[] {
  return hotspots.filter((h) => h.categories.includes("supporting"));
}
