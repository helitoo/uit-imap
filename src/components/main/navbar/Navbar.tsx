import { useState, useMemo } from "react";
import { Search, Map } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Header from "./Header";
import FilterBar from "./FilterBar";
import FilterResult from "./FilterResult";
import { useHotspots } from "@/contexts/hotspotsContext";
import { getFilteredHotspots } from "@/lib/services/getFilteredHotspots";
import { DEFAULT_FILTER, type Filter } from "@/lib/types/filter";

type ActivePanel = "search" | null;

export default function Navbar() {
  const { hotspots } = useHotspots();
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const [filter, setFilter] = useState<Filter>(DEFAULT_FILTER);

  const results = useMemo(
    () => getFilteredHotspots(filter, hotspots),
    [filter, hotspots],
  );

  const togglePanel = (panel: ActivePanel) => {
    setActivePanel((prev) => (prev === panel ? null : panel));
  };

  return (
    <>
      {/* ── Desktop: right vertical sidebar ── */}
      <nav className="hidden md:flex fixed right-0 top-0 h-full z-40 flex-col items-center bg-white/90 backdrop-blur-sm border-l border-border/50 shadow-lg w-14 py-2 gap-1">
        <Header />
        <Separator className="my-1" />

        <button
          onClick={() => togglePanel("search")}
          className={cn(
            "flex flex-col items-center justify-center w-10 h-10 rounded-lg gap-0.5 transition-all text-[9px] font-semibold",
            activePanel === "search"
              ? "bg-main text-white shadow-md"
              : "text-muted-foreground hover:text-main hover:bg-main/10",
          )}
          title="Tìm kiếm"
        >
          <Search className="w-4 h-4" />
          <span>Tìm</span>
        </button>
      </nav>
      {/* ── Mobile: bottom horizontal bar ── */}
      <nav className="flex md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-sm border-t border-border/50 shadow-lg h-14 items-center justify-around px-2">
        {/* Logo area */}
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="UIT iMAP"
            className="w-7 h-7 object-contain rounded"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        <button
          onClick={() => togglePanel("search")}
          className={cn(
            "flex flex-col items-center justify-center px-4 py-1 gap-0.5 rounded-lg transition-all",
            activePanel === "search" ? "text-main" : "text-muted-foreground",
          )}
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Tìm kiếm</span>
        </button>

        <button
          onClick={() => {}}
          className="flex flex-col items-center justify-center px-4 py-1 gap-0.5 rounded-lg text-muted-foreground"
        >
          <Map className="w-5 h-5" />
          <span className="text-[10px] font-semibold">Bản đồ</span>
        </button>
      </nav>
      {/* ── Search / Filter Panel Sheet ── */}
      <Sheet
        open={activePanel === "search"}
        onOpenChange={(open) => !open && setActivePanel(null)}
      >
        <SheetContent
          side="right"
          showOverlay={false}
          className="p-0 flex flex-col glass-panel border-l border-border/50 w-[340px] sm:w-[380px] h-dvh"
        >
          <Accordion
            type="multiple"
            className="max-w-lg flex-1 overflow-y-auto"
            defaultValue={["filter", "result"]}
          >
            <AccordionItem value="filter">
              <AccordionTrigger>Bộ lọc tìm kiếm</AccordionTrigger>
              <AccordionContent>
                <div className="border-b border-border/40">
                  <FilterBar onSearch={setFilter} />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="result">
              <AccordionTrigger>Kết quả tìm kiếm</AccordionTrigger>
              <AccordionContent>
                <div className="flex-1 min-h-0 flex flex-col">
                  <FilterResult results={results} />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SheetContent>
      </Sheet>
    </>
  );
}
