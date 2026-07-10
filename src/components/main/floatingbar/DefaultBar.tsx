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
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-row items-center justify-between gap-3 mx-5">
      <div className="flex flex-col md:flex-row gap-1 md:gap-3">
        <SearchInput
          className="bg-white shadow-md rounded-full pl-3 pr-1 py-2 w-80 h-10 items-center border border-gray-100 flex-shrink-0"
          onClickRes={onClickRes}
        />
        <WeatherBar className="bg-white shadow-md rounded-full px-5 py-2 w-80 h-10 border border-gray-100 flex-shrink-0" />
      </div>
      <ShowTourButton />
    </div>
  );
}
