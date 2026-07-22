export interface Transport {
  spot: "cA" | "cB";
  name: string;
  type: "bus" | "metro";
  providers: string[];
}
