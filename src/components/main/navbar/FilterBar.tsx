import { useState } from "react";
import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FILTER_CATEGORIES, CATEGORY_LABELS } from "@/lib/types/category";
import { DEFAULT_FILTER, type Filter } from "@/lib/types/filter";

interface FilterBarProps {
  onSearch: (filter: Filter) => void;
}

export default function FilterBar({ onSearch }: FilterBarProps) {
  const [filter, setFilter] = useState<Filter>(DEFAULT_FILTER);
  const [errors, setErrors] = useState<Partial<Record<keyof Filter, string>>>(
    {},
  );

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Filter, string>> = {};
    if (filter.floor !== "" && isNaN(Number(filter.floor))) {
      newErrors.floor = "Tầng phải là số nguyên";
    }
    if (
      filter.capacity !== "" &&
      (isNaN(Number(filter.capacity)) || Number(filter.capacity) < 0)
    ) {
      newErrors.capacity = "Sức chứa phải là số không âm";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onSearch(filter);
  };

  const handleReset = () => {
    setFilter(DEFAULT_FILTER);
    setErrors({});
    onSearch(DEFAULT_FILTER);
  };

  const handleNumberInput = (field: "floor" | "capacity", value: string) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (value === "" || value === "-") {
      setFilter((prev) => ({ ...prev, [field]: value === "" ? "" : value }));
      return;
    }
    const num = Number(value);
    if (!isNaN(num)) setFilter((prev) => ({ ...prev, [field]: num }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4">
      {/* Name */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-muted-foreground">
          Tên địa điểm
        </label>
        <Input
          placeholder="VD: B102, WC, bãi giữ xe,..."
          value={filter.name}
          onChange={(e) => setFilter((p) => ({ ...p, name: e.target.value }))}
          className="h-9 text-sm"
        />
      </div>

      <div className="flex gap-2">
        {/* Category - Native Select */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">
            Loại địa điểm
          </label>
          <select
            value={filter.category}
            onChange={(e) =>
              setFilter((p) => ({
                ...p,
                category: e.target.value as Filter["category"],
              }))
            }
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">-- Tất cả --</option>
            {FILTER_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORY_LABELS[cat]}
              </option>
            ))}
          </select>
        </div>

        {/* Floor */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">
            Tầng
          </label>
          <Input
            placeholder="Ví dụ: 1, 2, -1 (tầng B1)..."
            value={filter.floor === "" ? "" : String(filter.floor)}
            onChange={(e) => handleNumberInput("floor", e.target.value)}
            className={`h-9 text-sm ${errors.floor ? "border-destructive" : ""}`}
          />
          {errors.floor && (
            <p className="text-xs text-destructive">{errors.floor}</p>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        {/* Belongs to */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">
            Thuộc tòa nhà
          </label>
          <Input
            placeholder="VD: A, B, ..."
            value={filter.belongs_to}
            onChange={(e) =>
              setFilter((p) => ({ ...p, belongs_to: e.target.value }))
            }
            className="h-9 text-sm"
          />
        </div>

        {/* Capacity */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">
            Sức chứa tối thiểu
          </label>
          <Input
            placeholder="VD: 30, 100..."
            value={filter.capacity === "" ? "" : String(filter.capacity)}
            onChange={(e) => handleNumberInput("capacity", e.target.value)}
            className={`h-9 text-sm ${errors.capacity ? "border-destructive" : ""}`}
          />
          {errors.capacity && (
            <p className="text-xs text-destructive">{errors.capacity}</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="flex-1 gap-1.5"
          onClick={handleReset}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Đặt lại
        </Button>
        <Button type="submit" size="sm" className="flex-1 gap-1.5">
          <Search className="w-3.5 h-3.5" />
          Tìm kiếm
        </Button>
      </div>
    </form>
  );
}
