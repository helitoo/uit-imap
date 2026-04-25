import { cn } from "@/lib/utils";
import {
  CalendarDays,
  Info,
  MessageCircleQuestion,
  School,
  Search,
} from "lucide-react";
import { useState } from "react";
import FilterSheet from "@/components/main/navbar/filter/FilterSheet";
import { EventSheet } from "@/components/main/navbar/event/EventSheet";
import { useSchedule } from "@/contexts/scheduleContext";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import WebIntroContent from "@/components/main/navbar/content/WebIntroContent";
import WebDirectContent from "@/components/main/navbar/content/WebDirectContent";
import UitIntroContent from "@/components/main/navbar/content/UitIntroContent";

type ActivePanel = "search" | "schedule" | null;

export default function Navbar() {
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const { completedInit } = useSchedule();

  const togglePanel = (panel: ActivePanel) => {
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  const navItems = (
    <>
      <div className="flex md:flex-col gap-2 items-center justify-center">
        <img
          src="uit-20-years-logo.png"
          alt="UIT iMAP"
          className="w-10 object-contain rounded-lg"
          draggable={false}
        />
        <img
          src="/logo.png"
          alt="UIT iMAP"
          className="w-10 object-contain rounded-lg"
          draggable={false}
        />
      </div>

      {/* Giới thiệu */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="w-9 h-9 text-muted-foreground"
            title="Giới thiệu"
          >
            <Info className="size-5" />
          </Button>
        </DialogTrigger>
        <WebIntroContent />
      </Dialog>

      {/* Hướng dẫn */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="w-9 h-9 text-muted-foreground"
            title="Hướng dẫn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              stroke-linecap="round"
              strokeLinejoin="round"
              className="lucide lucide-circle-question-mark-icon lucide-circle-question-mark size-5"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
          </Button>
        </DialogTrigger>
        <WebDirectContent />
      </Dialog>

      {/* Giới thiệu trường */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="w-9 h-9 text-muted-foreground"
            title="UIT"
          >
            <School className="size-5" />
          </Button>
        </DialogTrigger>
        <UitIntroContent />
      </Dialog>

      <Button
        onClick={() => togglePanel("search")}
        className={cn(
          "flex flex-col items-center justify-center px-4 py-1 gap-0.5 rounded-lg transition-all",
          activePanel === "search" ? "text-main" : "text-muted-foreground",
        )}
        variant="ghost"
        size="icon"
        title="Tìm kiếm"
      >
        <Search className="w-5 h-5" />
      </Button>

      {completedInit && (
        <Button
          onClick={() => togglePanel("schedule")}
          className={cn(
            "flex flex-col items-center justify-center px-4 py-1 gap-0.5 rounded-lg transition-all",
            activePanel === "schedule" ? "text-main" : "text-muted-foreground",
          )}
          variant="ghost"
          size="icon"
          title="Xem lịch"
        >
          <CalendarDays className="w-5 h-5" />
        </Button>
      )}
    </>
  );

  return (
    <>
      {/* ── Desktop: right vertical sidebar ── */}
      <nav className="hidden md:flex fixed right-0 top-0 h-full z-40 flex-col items-center bg-white/85 border-l border-border/50 shadow-lg w-14 py-2 gap-2">
        {navItems}
      </nav>

      {/* ── Mobile: bottom horizontal bar ── */}
      <nav className="flex md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/85 shadow-lg h-14 items-center justify-center px-2">
        {navItems}
      </nav>

      <FilterSheet
        open={activePanel === "search"}
        onOpenChange={(open) => !open && setActivePanel(null)}
      />

      {completedInit && (
        <EventSheet
          open={activePanel === "schedule"}
          onOpenChange={(open) => !open && setActivePanel(null)}
        />
      )}
    </>
  );
}
