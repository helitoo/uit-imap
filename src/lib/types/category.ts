export type Category =
  | "classroom"
  | "computer_room"
  | "lab"
  | "office"
  | "public"
  | "hall"
  | "parking"
  | "building"
  | "elevator"
  | "stairs"
  | "canteen"
  | "sport"
  | "wc"
  | "gate"
  | "supporting";

export const CATEGORY_LABELS: Record<Category, string> = {
  classroom: "Phòng học",
  computer_room: "Phòng máy",
  lab: "Lab",
  office: "Văn phòng",
  public: "Khu công cộng",
  hall: "Hội trường",
  parking: "Bãi xe",
  building: "Tòa nhà",
  elevator: "Thang máy",
  stairs: "Thang bộ",
  canteen: "Căng tin",
  sport: "Khu thể thao",
  wc: "Nhà vệ sinh",
  gate: "Cổng",
  supporting: "?",
};

// export const CATEGORY_ABBR: Record<Category, string> = {
//   classroom: "CL",
//   computer_room: "CR",
//   lab: "LB",
//   office: "OF",
//   public: "PB",
//   hall: "HL",
//   parking: "PK",
//   building: "BD",
//   elevator: "EL",
//   stairs: "ST",
//   canteen: "CN",
//   sport: "SP",
//   wc: "WC",
//   gate: "GT",
//   supporting: "SU",
// };

export const CATEGORY_COLORS: Record<Category, string> = {
  classroom: "bg-blue-100 text-blue-800",
  computer_room: "bg-indigo-100 text-indigo-800",
  lab: "bg-purple-100 text-purple-800",
  office: "bg-gray-100 text-gray-800",
  public: "bg-green-100 text-green-800",
  hall: "bg-yellow-100 text-yellow-800",
  parking: "bg-orange-100 text-orange-800",
  building: "bg-main/10 text-main",
  elevator: "bg-sky-100 text-sky-800",
  stairs: "bg-cyan-100 text-cyan-800",
  canteen: "bg-amber-100 text-amber-800",
  sport: "bg-lime-100 text-lime-800",
  wc: "bg-teal-100 text-teal-800",
  gate: "bg-rose-100 text-rose-800",
  supporting: "bg-slate-100 text-slate-600",
};

export const FILTER_CATEGORIES: Exclude<Category, "supporting">[] = [
  "classroom",
  "computer_room",
  "lab",
  "office",
  "public",
  "hall",
  "parking",
  "building",
  "elevator",
  "stairs",
  "canteen",
  "sport",
  "wc",
  "gate",
];
