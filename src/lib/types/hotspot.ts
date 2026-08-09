export interface Hotspot {
  id: string;
  name?: string;
  showInDefault?: boolean;
  canBeSearch?: boolean;
  description?: string;
  gates?: string[];
  dataPosition: [number, number, number];
  dataNormal: [number, number, number];
}
