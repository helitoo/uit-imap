import type { Hotspot } from "../types/hotspot";
import type { Filter } from "../types/filter";
import { jaccardSimilarity } from "../utils";

const JACCARD_THRESHOLD = 0.08; // minimum similarity for name matching

/**
 * Returns hotspots that satisfy the given filter.
 * - name: approximate match against concat(name, description) via Jaccard bigram similarity
 * - category: exact match
 * - floor: exact match
 * - belongs_to: matched against the name of the building hotspot with matching id
 * - capacity: minimum capacity filter
 */
export function getFilteredHotspots(
  filter: Filter,
  hotspots: Hotspot[]
): Hotspot[] {
  // Build a map of building id -> building name for belongs_to matching
  const buildingNames: Record<string, string> = {};
  hotspots.forEach((h) => {
    if (h.categories.includes("building")) {
      buildingNames[h.id] = h.name;
    }
  });

  return hotspots.filter((h) => {
    // Exclude supporting hotspots from search results
    if (h.categories.includes("supporting")) return false;

    // Category filter
    if (filter.category && !h.categories.includes(filter.category)) return false;

    // Floor filter
    if (filter.floor !== "" && h.floor !== Number(filter.floor)) return false;

    // Capacity filter (minimum)
    if (filter.capacity !== "" && h.capacity < Number(filter.capacity)) return false;

    // belongs_to filter: compare filter.belongs_to (building name) against
    // the name of the building whose id matches hotspot.belongs_to
    if (filter.belongs_to.trim()) {
      const buildingName = buildingNames[h.belongs_to] ?? "";
      const sim = jaccardSimilarity(
        filter.belongs_to.toLowerCase(),
        buildingName.toLowerCase()
      );
      if (sim < JACCARD_THRESHOLD) return false;
    }

    // Name filter (approximate match against name + joined descriptions)
    if (filter.name.trim()) {
      const corpus = `${h.name} ${h.description.join(" ")}`;
      const sim = jaccardSimilarity(
        filter.name.toLowerCase(),
        corpus.toLowerCase()
      );
      if (sim < JACCARD_THRESHOLD) return false;
    }

    return true;
  });
}
