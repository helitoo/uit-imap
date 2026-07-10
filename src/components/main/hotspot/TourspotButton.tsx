import { Tourspot } from "@/lib/types/pano";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";

export default function TourspotButton({ tourspot }: { tourspot: Tourspot }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(`/scene/${tourspot.sceneId}`, {
      state: { from: `${location.pathname}${location.search}` },
    });
  };

  return (
    <div
      slot={`hotspot-tourspot-${tourspot.id}`}
      data-position={tourspot.dataPosition.join("m ")}
      data-normal={tourspot.dataNormal.join(" ")}
      data-visibility-attribute="visible"
      className="hotspot-btn"
    >
      <button
        onClick={handleClick}
        className={cn(
          "relative flex items-center justify-center size-3 rounded-full shadow-lg transition-all duration-200",
          "hover:scale-110 hover:shadow-xl",
          "bg-sky-400 border-2 border-sky-100",
          "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        )}
      ></button>
    </div>
  );
}
