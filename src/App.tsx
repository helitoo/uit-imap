import { useCallback, useMemo } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { ModeProvider } from "@/contexts/modeContext";
import { HotspotsProvider, useHotspots } from "@/contexts/hotspotsContext";
import {
  RoomsProvider,
  useRooms,
  useSyncRoomsWithEvents,
} from "@/contexts/roomContext";

import LoadingScreen from "@/components/main/LoadingScreen";
import HomePage from "@/pages/HomePage";
import { EventProvider, useEvent } from "@/contexts/eventContext";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { WindowProvider } from "@/contexts/windowContext";
import { WeatherProvider } from "@/contexts/weatherContext";
import { PanoProvider, usePano } from "@/contexts/tourContext";
import TourViewer from "@/components/main/TourViewer";

function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const { loading: hotspotsLoading, error: hotspotsError } = useHotspots();
  const { loading: roomsLoading, error: roomsError } = useRooms();
  const { loading: eventLoading, getTodayEventsByRoomName } = useEvent();
  const { isReady: tourReady } = usePano();

  useSyncRoomsWithEvents(getTodayEventsByRoomName, eventLoading);

  const sceneId = useMemo(() => {
    const match = location.pathname.match(/^\/scene\/([^/]+)$/);
    return match?.[1] ? decodeURIComponent(match[1]) : undefined;
  }, [location.pathname]);

  const previousPath =
    typeof location.state === "object" &&
    location.state &&
    "from" in location.state &&
    typeof location.state.from === "string"
      ? location.state.from
      : "/";

  const handleSceneChange = useCallback(
    (nextSceneId: string) => {
      navigate(`/scene/${nextSceneId}`, {
        state: {
          from: previousPath.startsWith("/scene/") ? "/" : previousPath,
        },
      });
    },
    [navigate, previousPath],
  );

  const handleExitTour = useCallback(() => {
    navigate(previousPath.startsWith("/scene/") ? "/" : previousPath, {
      replace: true,
    });
  }, [navigate, previousPath]);

  const isTourRoute = Boolean(sceneId);
  const isLoading =
    hotspotsLoading ||
    roomsLoading ||
    eventLoading ||
    (isTourRoute && !tourReady);
  const hasError = hotspotsError || roomsError;

  return (
    <ModeProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotspot/:id" element={<HomePage />} />
        <Route path="/hotspot/:id/:roomId" element={<HomePage />} />
        <Route path="/uit" element={<HomePage />} />
        <Route path="/imap" element={<HomePage />} />
        <Route path="/transport" element={<HomePage />} />
        <Route path="/schedule" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <TourViewer
        sceneId={sceneId}
        isOpen={isTourRoute && !isLoading && !hasError}
        onExit={handleExitTour}
        onSceneChange={handleSceneChange}
      />
      {isLoading && <LoadingScreen />}
      {hasError && (
        <LoadingScreen message={`Loi: ${hotspotsError} ${roomsError}`} />
      )}
      <Toaster position="top-center" richColors />
    </ModeProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <WindowProvider>
        <TooltipProvider delayDuration={100}>
          <HotspotsProvider>
            <RoomsProvider>
              <WeatherProvider>
                <EventProvider>
                  <PanoProvider>
                    <AppRoutes />
                  </PanoProvider>
                </EventProvider>
              </WeatherProvider>
            </RoomsProvider>
          </HotspotsProvider>
        </TooltipProvider>
      </WindowProvider>
    </BrowserRouter>
  );
}
