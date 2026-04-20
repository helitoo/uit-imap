import type { Category } from "./category";

export interface Hotspot {
  id: string;
  name: string;
  categories: Category[];
  floor: number;
  belongs_to: string;
  description: string[];
  capacity: number;
  real_position: [number, number]; // [lat, lng]
  model_position: [number, number, number]; // [x, y, z] in 3D model space
}

// Raw JSON shape before parsing
export interface RawHotspot {
  id?: string;
  name?: string;
  categories?: string[];
  floor?: number | string | (number | string)[];
  belongs_to?: string;
  description?: string | string[];
  capacity?: number;
  real_position?: number[];
  model_position?: number[];
}

// Parse a raw hotspot JSON object into one or more Hotspot instances.
// Handles floor ranges for elevator/stairs.
export function parseRawHotspot(raw: RawHotspot): Hotspot[] {
  const id = raw.id ?? "";
  const name = raw.name ?? "";
  const categories = ((raw.categories ?? []) as string[]).filter(
    Boolean,
  ) as Category[];
  const belongs_to = raw.belongs_to ?? "";
  const description = Array.isArray(raw.description)
    ? raw.description
    : raw.description
      ? [raw.description]
      : [];
  const capacity = raw.capacity ?? 0;
  const real_position: [number, number] =
    Array.isArray(raw.real_position) && raw.real_position.length >= 2
      ? [raw.real_position[0], raw.real_position[1]]
      : [0, 0];
  const model_position: [number, number, number] =
    Array.isArray(raw.model_position) && raw.model_position.length >= 3
      ? [raw.model_position[0], raw.model_position[1], raw.model_position[2]]
      : [0, 0, 0];

  const isVertical =
    categories.includes("elevator") || categories.includes("stairs");

  // Handle floor range for elevator/stairs
  if (isVertical && Array.isArray(raw.floor)) {
    const floors: number[] = raw.floor.map((f) =>
      f === "B1" ? -1 : Number(f),
    );
    const minFloor = Math.min(...floors);
    const maxFloor = Math.max(...floors);
    return Array.from({ length: maxFloor - minFloor + 1 }, (_, i) => {
      const floor = minFloor + i;
      return {
        id: `${id}_${floor < 0 ? "B" + Math.abs(floor) : floor}`,
        name: `${name} – Tầng ${floor < 0 ? "B" + Math.abs(floor) : floor}`,
        categories,
        floor,
        belongs_to,
        description,
        capacity,
        real_position,
        model_position: [
          model_position[0],
          model_position[1] + i * 0.5,
          model_position[2],
        ],
      };
    });
  }

  const floorRaw = Array.isArray(raw.floor) ? raw.floor[0] : raw.floor;
  const floor =
    floorRaw === "B1"
      ? -1
      : floorRaw === undefined || floorRaw === null || floorRaw === ""
        ? 0
        : Number(floorRaw);

  return [
    {
      id,
      name,
      categories,
      floor,
      belongs_to,
      description,
      capacity,
      real_position,
      model_position,
    },
  ];
}
