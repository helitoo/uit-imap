import type { Category } from "./category";

export interface Filter {
  name: string;
  category: Exclude<Category, "supporting"> | "";
  floor: number | "" | "-";
  belongsTo: string; // match against building name
}

export const DEFAULT_FILTER: Filter = {
  name: "",
  category: "",
  floor: "",
  belongsTo: "",
};
