import { cn } from "@/lib/utils";
import { CalendarDays, Info, School, Search } from "lucide-react";
import { useState } from "react";
import { EventSheet } from "@/components/main/navbar/event/EventSheet";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import WebIntroContent from "@/components/main/navbar/content/WebIntroContent";
import UitIntroContent from "@/components/main/navbar/content/UitIntroContent";
import SearchSheet from "@/components/main/search/SearchSheet";
import { useEvent } from "@/contexts/eventContext";

type ActivePanel = "search" | "event" | null;

export default function Navbar() {
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const { loading } = useEvent();

  const togglePanel = (panel: ActivePanel) => {
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  const navItems = (
    <>
      {/* Container Logo: Giữ tỉ lệ hợp lý giữa mobile và desktop */}
      <div className="flex md:flex-col gap-2 items-center justify-center mb-1 md:mb-2 ml-5 md:ml-0">
        <img
          src="uit-20-years-logo.png"
          alt="UIT 20th"
          className="h-9 md:w-12 object-contain rounded-lg"
          draggable={false}
        />
        <img
          src="/logo.png"
          alt="UIT iMAP"
          className="h-9 md:w-12 object-contain rounded-lg"
          draggable={false}
        />
      </div>

      {/* Các Action Buttons */}
      <div className="flex flex-row md:flex-col items-center justify-center gap-1 md:gap-4 w-full md:w-auto">
        {/* Giới thiệu iMap */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="flex flex-col items-center justify-center h-auto py-2 px-3 md:w-full hover:bg-slate-100 transition-colors"
            >
              {/* Tăng size-5 -> size-6, giảm mb-1 -> mb-0.5 */}
              <Info className="size-6 mb-0.5 text-slate-600" />
              <span className="text-[10px] md:text-xs font-medium">
                Về iMap
              </span>
            </Button>
          </DialogTrigger>
          <WebIntroContent />
        </Dialog>

        {/* Giới thiệu UIT */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="flex flex-col items-center justify-center h-auto py-2 px-3 md:w-full hover:bg-slate-100 transition-colors"
            >
              <School className="size-6 mb-0.5 text-slate-600" />
              <span className="text-[10px] md:text-xs font-medium">Về UIT</span>
            </Button>
          </DialogTrigger>
          <UitIntroContent />
        </Dialog>

        {/* Lịch Sự Kiện */}
        {!loading && (
          <Button
            onClick={() => togglePanel("event")}
            variant="ghost"
            className={cn(
              "flex flex-col items-center justify-center h-auto py-2 px-3 md:w-full transition-all",
              activePanel === "event"
                ? "bg-blue-50 text-main"
                : "text-slate-600",
            )}
          >
            <CalendarDays
              className={cn(
                "size-6 mb-0.5",
                activePanel === "event" ? "text-main" : "text-slate-600",
              )}
            />
            <span className="text-[10px] md:text-xs font-medium">Lịch</span>
          </Button>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar: Căn chỉnh w-20 và gap phù hợp với icon lớn hơn */}
      <nav className="hidden md:flex fixed right-0 top-0 h-full z-40 flex-col items-center bg-white border-l border-slate-200 w-20 py-8 gap-6 shadow-sm">
        {navItems}
      </nav>

      {/* Mobile Bottom Bar: h-16 đủ không gian cho icon size-6 */}
      <nav className="flex md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 h-16 items-center justify-around px-2 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        {navItems}
      </nav>

      {/* Các logic Sheets/Dialogs giữ nguyên */}
      <SearchSheet
        open={activePanel === "search"}
        onOpenChange={(open) => !open && setActivePanel(null)}
      />

      {!loading && (
        <EventSheet
          open={activePanel === "event"}
          onOpenChange={(open) => !open && setActivePanel(null)}
        />
      )}
    </>
  );
}
