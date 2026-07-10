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
      onClick={(e) => setShowTourspots(!showTourspots)}
      className={cn(
        "flex items-center justify-center",
        "bg-white shadow-md rounded-full p-2 size-10 border border-gray-100 flex-shrink-0",
        showTourspots && "bg-sky-500 text-white ring-8 ring-sky-500/20",
        "transition-all duration-300 ease-out",
        className,
      )}
      title="Bật/Tắt chế độ xem 360"
    >
      <Rotate3d />
    </button>
  );
}
