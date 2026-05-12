export type Category =
  | "classroom"
  | "computer_room"
  | "lab"
  | "office"
  | "public"
  | "hall"
  | "parking"
  | "building"
  | "stairs"
  | "canteen"
  | "sport"
  | "wc"
  | "gate"
  | "warehouse";

export const CATEGORY_LABELS: Record<Category, string> = {
  classroom: "Phòng học",
  computer_room: "Phòng máy",
  lab: "Lab",
  office: "Văn phòng",
  public: "Khu công cộng",
  hall: "Hội trường",
  parking: "Bãi xe",
  building: "Tòa nhà",
  stairs: "Thang",
  canteen: "Căng tin",
  sport: "Khu thể thao",
  wc: "Nhà vệ sinh",
  gate: "Cổng",
  warehouse: "Nhà kho",
};

export const CATEGORY_COLORS: Record<Category, string> = {
  classroom: "bg-blue-100 text-blue-800",
  computer_room: "bg-indigo-100 text-indigo-800",
  lab: "bg-purple-100 text-purple-800",
  office: "bg-gray-100 text-gray-800",
  public: "bg-green-100 text-green-800",
  hall: "bg-yellow-100 text-yellow-800",
  parking: "bg-orange-100 text-orange-800",
  building: "bg-main/10 text-main",
  stairs: "bg-cyan-100 text-cyan-800",
  canteen: "bg-amber-100 text-amber-800",
  sport: "bg-lime-100 text-lime-800",
  wc: "bg-teal-100 text-teal-800",
  gate: "bg-rose-100 text-rose-800",
  warehouse: "bg-mist-100 text-mist-800",
};

export const FILTER_CATEGORIES: Category[] = [
  "classroom",
  "computer_room",
  "lab",
  "office",
  "public",
  "hall",
  "parking",
  "building",
  "stairs",
  "canteen",
  "sport",
  "wc",
  "gate",
];
