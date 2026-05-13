import type { Category } from "./category";

export interface Room {
  id: number;
  name: string;
  floor?: number;
  belongsTo: string;
  category: Category;
  description?: string;
  rows?: [number, number];
  cols?: [number, number];
}
