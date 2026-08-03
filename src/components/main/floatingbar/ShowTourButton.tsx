import { useMode } from "@/contexts/modeContext";
import { cn } from "@/lib/utils";
import { Rotate3d } from "lucide-react";

export default function ShowTourButton({
  className = "",
}: {
  className?: string;
}) {
  const { showTourspots, setShowTourspots } = useMode();

  return (
    <button
      id="tour-button"
      onClick={() => setShowTourspots(!showTourspots)}
      className={cn(
        "btn-floating-bar",
        showTourspots && "btn-floating-bar-active",
        className,
      )}
      title="Bật/Tắt chế độ xem 360"
    >
      <Rotate3d className="size-5" />
    </button>
  );
}
