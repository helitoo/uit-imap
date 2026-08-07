import type { Category } from "./category";

export interface Room {
  id: number;
  name: string;
  floor?: number;
  belongsTo: string;
  gates: string[];
  category: Category;
  description?: string;
  rows?: [number, number];
  cols?: [number, number];
  hasEvent?: boolean;
}
