import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { ModeProvider } from "@/contexts/modeContext";
import { HotspotsProvider, useHotspots } from "@/contexts/hotspotsContext";
import { GraphProvider } from "@/contexts/graphContext";
import LoadingScreen from "@/components/main/LoadingScreen";
import HomePage from "@/pages/HomePage";
import { ScheduleProvider } from "@/contexts/scheduleContext";

/** Inner tree – rendered after hotspots are loaded */
function AppRoutes() {
  return <LoadingScreen message="Đang tải dữ liệu bản đồ..." />;
  // const { hotspots, loading, error } = useHotspots();

  // if (loading) return <LoadingScreen message="Đang tải dữ liệu bản đồ..." />;
  // if (error) return <LoadingScreen message={`Lỗi: ${error}`} />;

  // return (
  //   <GraphProvider hotspots={hotspots}>
  //     <ModeProvider>
  //       <Routes>
  //         <Route path="/" element={<HomePage />} />
  //         <Route path="/hotspot/:id" element={<HomePage />} />
  //         <Route path="*" element={<HomePage />} />
  //       </Routes>
  //       <Toaster position="top-center" richColors />
  //     </ModeProvider>
  //   </GraphProvider>
  // );
}

/** Root – BrowserRouter must be outermost */
export default function App() {
  return (
    <BrowserRouter>
      <HotspotsProvider>
        <ScheduleProvider>
          <AppRoutes />
        </ScheduleProvider>
      </HotspotsProvider>
    </BrowserRouter>
  );
}
