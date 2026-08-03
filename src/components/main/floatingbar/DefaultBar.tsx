import WeatherBar from "@/components/main/floatingbar/WeatherBar";
import SearchInput from "@/components/main/search/SearchInput";
import { useHotspots } from "@/contexts/hotspotsContext";
import { Room } from "@/lib/types/room";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import ShowTourButton from "@/components/main/floatingbar/ShowTourButton";

export default function DefaultBar() {
  const { getHotspotById } = useHotspots();
  const navigate = useNavigate();

  const onClickRes = (room: Room) => {
    const belongsToId = getHotspotById(room.belongsTo);

    if (!belongsToId) {
      toast.error("Chưa có dữ liệu về địa điểm này!");
    } else {
      navigate(`/hotspot/${room.belongsTo}/${room.id}`);
    }
  };

  return (
    <div className="fixed top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:right-auto md:w-auto z-50 flex flex-row items-center justify-between gap-2 md:gap-3">
      <div className="flex flex-col lg:flex-row gap-1 md:gap-3 flex-1 min-w-0 md:flex-initial">
        <SearchInput
          className="bg-white shadow-md rounded-full pl-4 pr-1.5 w-full lg:w-80 h-10 items-center border border-slate-50 flex-shrink-0"
          onClickRes={onClickRes}
        />
        <WeatherBar className="bg-white shadow-md rounded-full px-5 py-2 w-full lg:w-80 h-10 border border-slate-50 flex-shrink-0" />
      </div>
      <ShowTourButton />
    </div>
  );
}
