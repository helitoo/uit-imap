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
import SearchSheet from "@/components/main/search/SearchSheet";
import { useEvent } from "@/contexts/eventContext";
import { Skeleton } from "@/components/ui/skeleton";

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
  const { loading } = useEvent();

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
      <div className="flex md:flex-col gap-1 items-center justify-center mb-1 md:mb-2 ml-5 md:ml-0">
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
      <div className="flex flex-row md:flex-col items-center justify-center gap-1 md:gap-4 w-full md:w-auto">
        {/* Giới thiệu iMap */}
        <Button
          variant="ghost"
          onClick={() => handleToggleRoute("/imap", isImapOpen)}
          className={cn(
            "flex flex-col items-center justify-center h-auto py-2 px-3 md:w-full transition-colors",
            isImapOpen && "bg-blue-50 text-main",
          )}
        >
          <Info
            className={cn(
              "size-6",
              isImapOpen ? "text-main" : "text-slate-600",
            )}
          />
          <span className="text-[10px] md:text-xs font-medium">Về iMap</span>
        </Button>

        {/* Giới thiệu UIT */}
        <Button
          variant="ghost"
          onClick={() => handleToggleRoute("/uit", isUitOpen)}
          className={cn(
            "flex flex-col items-center justify-center h-auto py-2 px-3 md:w-full transition-colors",
            isUitOpen && "bg-blue-50 text-main",
          )}
        >
          <School
            className={cn("size-6", isUitOpen ? "text-main" : "text-slate-600")}
          />
          <span className="text-[10px] md:text-xs font-medium">Về UIT</span>
        </Button>

        {/* Lịch Sự Kiện */}
        {!loading && (
          <Button
            onClick={() => handleToggleRoute("/schedule", isScheduleOpen)}
            variant="ghost"
            className={cn(
              "flex flex-col items-center justify-center h-auto py-2 px-3 md:w-full transition-all",
              isScheduleOpen && "bg-blue-50 text-main",
            )}
          >
            <CalendarDays
              className={cn(
                "size-6",
                isScheduleOpen ? "text-main" : "text-slate-600",
              )}
            />
            <span className="text-[10px] md:text-xs font-medium">Lịch</span>
          </Button>
        )}

        {/* Tuyến Xe / Di Chuyển */}
        {!loading && (
          <Button
            onClick={() => handleToggleRoute("/transport", isTransportOpen)}
            variant="ghost"
            className={cn(
              "flex flex-col items-center justify-center h-auto py-2 px-3 md:w-full transition-all",
              isTransportOpen && "bg-blue-50 text-main",
            )}
          >
            <Bus
              className={cn(
                "size-6",
                isTransportOpen ? "text-main" : "text-slate-600",
              )}
            />
            <span className="text-[10px] md:text-xs font-medium">Tuyến xe</span>
          </Button>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar: Căn chỉnh w-20 và gap phù hợp với icon lớn hơn */}
      <nav className="hidden md:flex fixed right-0 top-0 h-full z-40 flex-col items-center bg-white border-l border-slate-200 w-20 py-8 gap-5 shadow-sm">
        {navItems}
      </nav>

      {/* Mobile Bottom Bar: h-16 đủ không gian cho icon size-6 */}
      <nav className="flex md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 h-16 items-center justify-around px-2 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
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

      {!loading && (
        <EventSheet
          open={isScheduleOpen}
          onOpenChange={(open) => {
            if (!open && location.pathname === "/schedule") {
              navigate("/", { replace: true });
            }
          }}
        />
      )}

      {!loading && (
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
