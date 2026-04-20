import type { Category } from "./category";

export interface Filter {
  name: string;
  category: Exclude<Category, "supporting"> | "";
  floor: number | "";
  belongs_to: string; // match against building name
  capacity: number | ""; // minimum capacity
}

export const DEFAULT_FILTER: Filter = {
  name: "",
  category: "",
  floor: "",
  belongs_to: "",
  capacity: "",
};
