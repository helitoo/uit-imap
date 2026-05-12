import DefaultBar from "@/components/main/floatingbar/DefaultBar";
import DirectionBar from "@/components/main/floatingbar/DirectionBar";
import { useMode } from "@/contexts/modeContext";

export default function FloatingBar() {
  const { usingMode } = useMode();
  return <>{usingMode === "default" ? <DefaultBar /> : <DirectionBar />}</>;
}
