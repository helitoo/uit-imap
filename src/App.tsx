import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { ModeProvider } from "@/contexts/modeContext";
import { HotspotsProvider, useHotspots } from "@/contexts/hotspotsContext";
import { RoomsProvider, useRooms } from "@/contexts/roomContext";

import LoadingScreen from "@/components/main/LoadingScreen";
import HomePage from "@/pages/HomePage";
import { ScheduleProvider } from "@/contexts/scheduleContext";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { WindowProvider } from "@/contexts/windowContext";

/** Inner tree – rendered after hotspots are loaded */
function AppRoutes() {
  const { loading: hotspotsLoading, error: hotspotsError } = useHotspots();

  const { loading: roomsLoading, error: roomsError } = useRooms();

  if (hotspotsLoading && roomsLoading)
    return <LoadingScreen message="Đang tải dữ liệu bản đồ..." />;

  if (hotspotsError || roomsError)
    return <LoadingScreen message={`Lỗi: ${hotspotsError} ${roomsError}`} />;

  return (
    <ModeProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotspot/:id" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </ModeProvider>
  );
}

/** Root – BrowserRouter must be outermost */
export default function App() {
  return (
    <BrowserRouter>
      <WindowProvider>
        <TooltipProvider delayDuration={100}>
          <HotspotsProvider>
            <RoomsProvider>
              <ScheduleProvider>
                <AppRoutes />
              </ScheduleProvider>
            </RoomsProvider>
          </HotspotsProvider>
        </TooltipProvider>
      </WindowProvider>
    </BrowserRouter>
  );
}
