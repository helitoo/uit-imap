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
  classroom: "bg-blue-300 text-blue-700",
  computer_room: "bg-teal-300 text-teal-700",
  hall: "bg-amber-300 text-amber-700",
  lab: "bg-purple-300 text-purple-700",
  library: "bg-green-300 text-green-700",
  office: "bg-indigo-300 text-indigo-700",
  stairs: "bg-slate-300 text-slate-700",
  warehouse: "bg-stone-300 text-stone-700",
  wc: "bg-rose-300 text-rose-700",
  tech: "bg-orange-300 text-orange-700",
};
