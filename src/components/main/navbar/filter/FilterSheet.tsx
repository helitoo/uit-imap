import FilterBar from "@/components/main/navbar/filter/FilterBar";
import FilterResult from "@/components/main/navbar/filter/FilterResult";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useHotspots } from "@/contexts/hotspotsContext";
import { getFilteredHotspots } from "@/lib/services/getFilteredHotspots";
import { DEFAULT_FILTER, Filter } from "@/lib/types/filter";
import { useMemo, useState } from "react";

interface FilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FilterSheet({ open, onOpenChange }: FilterSheetProps) {
  const { hotspots } = useHotspots();
  const [filter, setFilter] = useState<Filter>(DEFAULT_FILTER);

  const results = useMemo(
    () => getFilteredHotspots(filter, hotspots),
    [filter, hotspots],
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
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
  );
}
