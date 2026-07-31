import SearchInput from "@/components/main/search/SearchInput";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface FilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchSheet({ open, onOpenChange }: FilterSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        title="Tìm kiếm địa điểm"
        description="Bộ công cụ tìm kiếm và lọc danh sách địa điểm trên bản đồ"
        visuallyHiddenTitle
        visuallyHiddenDescription
        side="right"
        showOverlay={false}
        className="p-0 flex flex-col glass-panel border-l border-border/50 w-[340px] sm:w-[380px] h-dvh"
      >
        <SearchInput className="mt-10 mx-5" />
      </SheetContent>
    </Sheet>
  );
}
