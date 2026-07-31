import type { Room } from "@/lib/types/room";
import type { Filter } from "../types/filter";
import { compareTwoStrings } from "../utils";

const JACCARD_THRESHOLD = 0.08;

export function getFilteredRooms(filter: Filter, rooms: Room[]): Room[] {
  // Build a map of building id -> building name for belongsTo matching
  const buildingNames: Record<string, string> = {};
  rooms.forEach((h) => {
    if ((h as any).categories?.includes("building") || (h.category as string) === "building") {
      buildingNames[h.id] = h.name;
    }
  });

  return rooms.filter((h) => {
    // Category filter
    if (filter.category && h.category !== filter.category)
      return false;

    // Floor filter
    if (filter.floor !== "" && h.floor !== Number(filter.floor)) return false;

    // belongsTo filter: compare filter.belongsTo (building name) against
    // the name of the building whose id matches hotspot.belongsTo
    if (filter.belongsTo.trim()) {
      const buildingName = buildingNames[h.belongsTo] ?? "";
      const sim = compareTwoStrings(
        filter.belongsTo.toLowerCase(),
        buildingName.toLowerCase(),
      );
      if (sim < JACCARD_THRESHOLD) return false;
    }

    // Name filter (approximate match against name + joined descriptions)
    if (filter.name.trim()) {
      const corpus = `${h.name} ${h.description && h.description}`;
      const sim = compareTwoStrings(
        filter.name.toLowerCase(),
        corpus.toLowerCase(),
      );
      if (sim < JACCARD_THRESHOLD) return false;
    }

    return true;
  });
}
