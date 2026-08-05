export interface Hotspot {
  id: string;
  name?: string;
  showInDefault?: boolean;
  description?: string;
  dataPosition: [number, number, number];
  dataNormal: [number, number, number];
}
