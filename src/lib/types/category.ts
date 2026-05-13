export type Category =
  | "classroom"
  | "computer_room"
  | "hall"
  | "lab"
  | "library"
  | "office"
  | "stairs"
  | "warehouse"
  | "wc"
  | "tech";

export const CATEGORY_LABELS: Record<Category, string> = {
  classroom: "Phòng học",
  computer_room: "Phòng máy tính",
  hall: "Hội trường",
  lab: "Phòng thí nghiệm",
  library: "Thư viện",
  office: "Văn phòng",
  stairs: "Thang",
  warehouse: "Kho",
  wc: "WC",
  tech: "Phòng thiết bị",
};

export const CATEGORY_COLORS: Record<Category, string> = {
  classroom: "bg-blue-100 text-blue-700",
  computer_room: "bg-teal-100 text-teal-700",
  hall: "bg-amber-100 text-amber-700",
  lab: "bg-purple-100 text-purple-700",
  library: "bg-green-100 text-green-700",
  office: "bg-indigo-100 text-indigo-700",
  stairs: "bg-slate-200 text-slate-700",
  warehouse: "bg-stone-200 text-stone-700",
  wc: "bg-rose-100 text-rose-700",
  tech: "bg-orange-100 text-orange-700",
};
