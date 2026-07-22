export interface Hotspot {
  id: string;
  name?: string;
  description?: string;
  dataPosition: [number, number, number];
  dataNormal: [number, number, number];
}
