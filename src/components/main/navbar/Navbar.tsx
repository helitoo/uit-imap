import { cn } from "@/lib/utils";
import { CalendarDays, Info, School, Bus } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EventSheet } from "@/components/main/navbar/event/EventSheet";
import { TransportSheet } from "@/components/main/navbar/transport/TransportSheet";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import WebIntroContent from "@/components/main/navbar/content/WebIntroContent";
import UitIntroContent from "@/components/main/navbar/content/UitIntroContent";
import { useEvent } from "@/contexts/eventContext";
import { Skeleton } from "@/components/ui/skeleton";
import { useDriver } from "@/contexts/driverContext";
import { useWeather } from "@/contexts/weatherContext";

function NavbarLogo({
  src,
  alt,
  className,
  skeletonClassName,
}: {
  src: string;
  alt: string;
  className: string;
  skeletonClassName: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Skeleton className={skeletonClassName} />}
      <img
        src={src}
        alt={alt}
        className={cn(className, !loaded && "hidden")}
        draggable={false}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        ref={(el) => {
          if (el?.complete) setLoaded(true);
        }}
      />
    </>
  );
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { loading: eventLoading } = useEvent();
  const { loading: weatherLoading } = useWeather();
  const { start } = useDriver();

  const isImapOpen = location.pathname === "/imap";
  const isUitOpen = location.pathname === "/uit";
  const isScheduleOpen = location.pathname === "/schedule";
  const isTransportOpen = location.pathname === "/transport";

  const handleToggleRoute = (path: string, isOpen: boolean) => {
    if (isOpen) {
      navigate("/", { replace: true });
    } else {
      navigate(path);
    }
  };

  const navItems = (
    <>
      {/* Container Logo: Giữ tỉ lệ hợp lý giữa mobile và desktop */}
      <div className="hidden sm:flex md:flex-col items-center gap-2 justify-center mb-1 md:mb-2 ml-5 md:ml-0">
        <NavbarLogo
          src="uit-logo.png"
          alt="UIT 20th"
          className="h-5 md:w-12 md:h-auto object-contain"
          skeletonClassName="h-5 w-10 md:w-12 md:h-12 rounded-lg"
        />
        <NavbarLogo
          src="/logo.png"
          alt="UIT iMAP"
          className="h-5 md:w-12 md:h-auto object-contain"
          skeletonClassName="h-5 w-10 md:w-12 md:h-12 rounded-lg"
        />
      </div>

      {/* Các Action Buttons */}
      <div className="flex flex-row md:flex-col items-center justify-center gap-1 md:gap-3">
        {/* Mở hướng dẫn */}
        <div
          id="driver-trigger"
          className="w-14 h-14 md:w-16 md:h-16 aspect-square shrink-0"
        >
          {weatherLoading ? (
            <Skeleton className="w-full h-full rounded-xl" />
          ) : (
            <Button
              variant="ghost"
              onClick={start}
              className={cn(
                "w-full h-full flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-colors",
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5 md:size-6 text-slate-600 mb-0.5"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
              <span className="text-[10px] font-medium leading-none">
                Hướng dẫn
              </span>
            </Button>
          )}
        </div>

        {/* Giới thiệu iMap */}
        <Button
          id="imap-button"
          variant="ghost"
          onClick={() => handleToggleRoute("/imap", isImapOpen)}
          className={cn(
            "w-14 h-14 md:w-16 md:h-16 aspect-square shrink-0 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-colors",
            isImapOpen && "bg-blue-50 text-main",
          )}
        >
          <Info
            className={cn(
              "size-5 md:size-6 mb-0.5",
              isImapOpen ? "text-main" : "text-slate-600",
            )}
          />
          <span className="text-[10px] font-medium leading-none">Về iMap</span>
        </Button>

        {/* Giới thiệu UIT */}
        <Button
          id="uit-button"
          variant="ghost"
          onClick={() => handleToggleRoute("/uit", isUitOpen)}
          className={cn(
            "w-14 h-14 md:w-16 md:h-16 aspect-square shrink-0 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-colors",
            isUitOpen && "bg-blue-50 text-main",
          )}
        >
          <School
            className={cn(
              "size-5 md:size-6 mb-0.5",
              isUitOpen ? "text-main" : "text-slate-600",
            )}
          />
          <span className="text-[10px] font-medium leading-none">Về UIT</span>
        </Button>

        {/* Lịch Sự Kiện */}
        <div
          id="schedule-button"
          className="w-14 h-14 md:w-16 md:h-16 aspect-square shrink-0"
        >
          {eventLoading ? (
            <Skeleton className="w-full h-full rounded-xl" />
          ) : (
            <Button
              onClick={() => handleToggleRoute("/schedule", isScheduleOpen)}
              variant="ghost"
              className={cn(
                "w-full h-full flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all",
                isScheduleOpen && "bg-blue-50 text-main",
              )}
            >
              <CalendarDays
                className={cn(
                  "size-5 md:size-6 mb-0.5",
                  isScheduleOpen ? "text-main" : "text-slate-600",
                )}
              />
              <span className="text-[10px] font-medium leading-none">Lịch</span>
            </Button>
          )}
        </div>

        {/* Tuyến Xe / Di Chuyển */}
        <Button
          id="transport-button"
          onClick={() => handleToggleRoute("/transport", isTransportOpen)}
          variant="ghost"
          className={cn(
            "w-14 h-14 md:w-16 md:h-16 aspect-square shrink-0 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all",
            isTransportOpen && "bg-blue-50 text-main",
          )}
        >
          <Bus
            className={cn(
              "size-5 md:size-6 mb-0.5",
              isTransportOpen ? "text-main" : "text-slate-600",
            )}
          />
          <span className="text-[10px] font-medium leading-none">Tuyến xe</span>
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Navigation Bar: Responsive (Mobile Bottom Bar / Desktop Sidebar) */}
      <nav className="fixed z-40 bg-white flex items-center bottom-0 left-0 right-0 h-16 flex-row justify-around px-2 border-t border-slate-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] md:top-0 md:bottom-auto md:left-auto md:right-0 md:h-full md:w-20 md:flex-col md:justify-start md:py-8 md:px-0 md:gap-6 md:border-l md:border-t-0 md:shadow-sm">
        {navItems}
      </nav>

      {/* Dialogs / Sheets dựa trên route */}
      <Dialog
        open={isImapOpen}
        onOpenChange={(open) => {
          if (!open && location.pathname === "/imap") {
            navigate("/", { replace: true });
          }
        }}
      >
        <WebIntroContent />
      </Dialog>

      <Dialog
        open={isUitOpen}
        onOpenChange={(open) => {
          if (!open && location.pathname === "/uit") {
            navigate("/", { replace: true });
          }
        }}
      >
        <UitIntroContent />
      </Dialog>

      {!eventLoading && (
        <EventSheet
          open={isScheduleOpen}
          onOpenChange={(open) => {
            if (!open && location.pathname === "/schedule") {
              navigate("/", { replace: true });
            }
          }}
        />
      )}

      {!eventLoading && (
        <TransportSheet
          open={isTransportOpen}
          onOpenChange={(open) => {
            if (!open && location.pathname === "/transport") {
              navigate("/", { replace: true });
            }
          }}
        />
      )}
    </>
  );
}
