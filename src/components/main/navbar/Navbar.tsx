import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CalendarDays, Search } from "lucide-react";
import { useState } from "react";
import Header from "./Header";
import FilterSheet from "@/components/main/navbar/filter/FilterSheet";
import { EventSheet } from "@/components/main/navbar/event/EventSheet";
import { useSchedule } from "@/contexts/scheduleContext";

type ActivePanel = "search" | "schedule" | null;

export default function Navbar() {
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const { completedInit } = useSchedule();

  const togglePanel = (panel: ActivePanel) => {
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  const navItems = (
    <>
      <Header />

      <button
        onClick={() => togglePanel("search")}
        className={cn(
          "flex flex-col items-center justify-center px-4 py-1 gap-0.5 rounded-lg transition-all hover:text-main",
          activePanel === "search" ? "text-main" : "text-muted-foreground",
        )}
        title="Tìm kiếm"
      >
        <Search className="w-5 h-5" />
      </button>

      {completedInit && (
        <button
          onClick={() => togglePanel("schedule")}
          className={cn(
            "flex flex-col items-center justify-center px-4 py-1 gap-0.5 rounded-lg transition-all hover:text-main",
            activePanel === "schedule" ? "text-main" : "text-muted-foreground",
          )}
          title="Xem lịch"
        >
          <CalendarDays className="w-5 h-5" />
        </button>
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
      <nav className="flex md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/85 border-t border-border/50 shadow-lg h-14 items-center justify-center px-2">
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
