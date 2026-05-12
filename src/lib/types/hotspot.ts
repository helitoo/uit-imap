export interface Hotspot {
  id: string;
  name?: string;
  description?: string;
  belongsTo?: string;
  dataPosition: [number, number, number];
  dataNormal: [number, number, number];
}
