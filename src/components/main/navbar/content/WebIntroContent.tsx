import { DialogContent } from "@/components/ui/dialog";
import { IntroImage } from "@/components/ui/intro-image";
import { cn } from "@/lib/utils";
import {
  MapPin,
  MousePointer,
  Smartphone,
  Laptop,
  Code2,
  CircleCheckBig,
  ExternalLink,
  Sparkles,
  Layers,
  Compass,
  Map,
} from "lucide-react";

export default function WebIntroContent() {
  return (
    <DialogContent
      title="Giới thiệu Hệ thống Bản đồ 3D Trực tuyến UIT iMap"
      visuallyHiddenTitle
      description="Hướng dẫn sử dụng và thông tin giới thiệu về dự án bản đồ 3D tương tác trường Đại học Công nghệ Thông tin ĐHQG-HCM."
      visuallyHiddenDescription
      className="max-w-xl bg-transparent border-none shadow-none p-2 sm:p-4 max-h-[90vh] overflow-y-auto pr-1.5 sm:pr-3 scrollbar-thin focus:outline-none"
    >
      <article className="space-y-6 pt-2 pb-4">
        {/* Banner */}
        <div className="py-2 w-full flex justify-center bg-[linear-gradient(90deg,_rgba(255,255,255,0)_0%,_rgba(255,255,255,1)_40%,_rgba(255,255,255,1)_60%,_rgba(255,255,255,0)_100%)]">
          <IntroImage
            src="logo.png"
            alt="UIT iMap Logo"
            className="h-10 object-contain"
            skeletonClassName="w-30 h-10 rounded-lg"
            stickerBorder
          />
        </div>

        {/* ================= SECTION 1: INTRODUCTION ================= */}
        <section
          aria-labelledby="imap-intro-heading"
          className="group transition-all duration-300"
        >
          {/* Header Card (Bento Banner) */}
          <div className="card-header text-white rounded-3xl p-5 shadow-lg relative overflow-hidden -rotate-1 group-hover:rotate-0 transition-transform duration-300">
            {/* Background Glow */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            {/* Floating Main Icon Sticker */}
            <div className="absolute right-4 top-4 -rotate-12 group-hover:-rotate-6 transition-transform duration-300 bg-white/20 backdrop-blur-md border border-white/30 p-2.5 rounded-2xl shadow-lg">
              <Map className="size-6 text-white drop-shadow-sm" />
            </div>

            <div className="pr-12">
              <h2
                id="imap-intro-heading"
                className="text-lg sm:text-xl font-bold tracking-tight text-white leading-snug pt-1"
              >
                Giới thiệu UIT iMap
              </h2>

              <p className="text-xs font-medium text-sky-100/90 flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-amber-300" />
                Bản đồ 3D của UIT
              </p>
            </div>
          </div>

          {/* Body Card (Overlapping White Box) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-xl border border-slate-100 dark:border-slate-800 -mt-1.5 relative z-10 rotate-[0.5deg] group-hover:rotate-0 transition-transform duration-300 space-y-4">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
              <strong className="text-main font-semibold">UIT iMap</strong> là
              bản đồ 3D trường Đại học Công nghệ thông tin (UIT), cung cấp trải
              nghiệm khám phá không gian học thuật hiện đại, trực quan dành cho
              học sinh, sinh viên và khách tham quan.
            </p>

            {/* List with Secondary Decorative CircleCheckBig Icons */}
            <div className="bg-sky-50/60 dark:bg-slate-800/50 rounded-2xl p-4 border border-sky-100 dark:border-slate-700/60 space-y-2.5">
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CircleCheckBig className="size-4 text-main shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900 dark:text-slate-100">
                      Mô hình 3D:
                    </strong>{" "}
                    Tái hiện chân thực toàn bộ kiến trúc campus UIT.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CircleCheckBig className="size-4 text-main shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900 dark:text-slate-100">
                      Ảnh 360:
                    </strong>{" "}
                    Khám qua không gian UIT thông qua hệ thống ảnh 360 ngay tại
                    trình duyệt web.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CircleCheckBig className="size-4 text-main shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900 dark:text-slate-100">
                      Tra cứu địa điểm & dẫn đường:
                    </strong>{" "}
                    Tìm kiếm nhanh chóng các giảng đường, phòng lab, hội trường
                    và các địa điểm khác.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CircleCheckBig className="size-4 text-main shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900 dark:text-slate-100">
                      Dịch vụ hỗ trợ sinh viên:
                    </strong>{" "}
                    Tra cứu nhanh lịch phòng và các tuyến bus / metro.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ================= SECTION 2: INTERACTION GUIDE ================= */}
        <section
          aria-labelledby="guide-heading"
          className="group transition-all duration-300"
        >
          {/* Header Card (Bento Banner) */}
          <div className="card-header text-white rounded-3xl p-5 shadow-lg relative overflow-hidden rotate-1 group-hover:rotate-0 transition-transform duration-300">
            {/* Background Glow */}
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            {/* Floating Main Icon Sticker */}
            <div className="absolute right-4 top-4 -rotate-12 group-hover:-rotate-6 transition-transform duration-300 bg-white/20 backdrop-blur-md border border-white/30 p-2.5 rounded-2xl shadow-lg">
              <MousePointer className="size-6 text-white drop-shadow-sm" />
            </div>

            <div className="pr-12">
              <h2
                id="guide-heading"
                className="text-lg sm:text-xl font-bold tracking-tight text-white leading-snug"
              >
                Hướng dẫn sử dụng
              </h2>

              <p className="text-xs font-medium text-sky-100/90 flex items-center gap-1.5">
                <Compass className="size-3.5 text-amber-300" />
                Thao tác mượt mà trên mọi thiết bị
              </p>
            </div>
          </div>

          {/* Body Card (Overlapping White Box) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-xl border border-slate-100 dark:border-slate-800 -mt-1.5 relative z-10 -rotate-[0.5deg] group-hover:rotate-0 transition-transform duration-300 space-y-4">
            {/* Demo GIF Preview Box */}
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 shadow-inner">
              <IntroImage
                src="demo.gif"
                alt="Video minh họa thao tác tương tác mô hình 3D UIT iMap"
                className="w-full h-auto object-cover"
                skeletonClassName="w-full h-44 rounded-2xl"
              />
            </div>

            {/* Device-specific Instructions with Secondary Icons */}
            <div className="space-y-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-sky-50/70 dark:bg-slate-800/50 border border-sky-100 dark:border-slate-700/60 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-xs text-slate-900 dark:text-slate-100">
                  <Smartphone className="size-4 text-main" />
                  <span>Đối với thiết bị Di động (Mobile / Tablet):</span>
                </div>
                <ul className="pl-6 space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-1.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="size-4 text-main shrink-0"
                    >
                      <path d="M8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v5.34l-1.2.24a1.5 1.5 0 0 0-1.196 1.636l.345 3.106a2.5 2.5 0 0 0 .405 1.11l1.433 2.15A1.5 1.5 0 0 0 6.035 16h6.385a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5 5 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716c-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642a2.6 2.6 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046z" />
                    </svg>
                    <span>
                      <strong className="text-slate-800 dark:text-slate-200">
                        1 ngón tay:
                      </strong>{" "}
                      Chạm và vuốt để xoay mô hình 3D.
                    </span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="size-4 text-main shrink-0"
                    >
                      <path d="M8.5 1.75v2.716l.047-.002c.312-.012.742-.016 1.051.046c.28.056.543.18.738.288c.273.152.456.385.56.642l.132-.012c.312-.024.794-.038 1.158.108c.37.148.689.487.88.716q.113.137.195.248h.582a2 2 0 0 1 1.99 2.199l-.272 2.715a3.5 3.5 0 0 1-.444 1.389l-1.395 2.441A1.5 1.5 0 0 1 12.42 16H6.118a1.5 1.5 0 0 1-1.342-.83l-1.215-2.43L1.07 8.589a1.517 1.517 0 0 1 2.373-1.852L5 8.293V1.75a1.75 1.75 0 0 1 3.5 0" />
                    </svg>
                    <span>
                      <strong className="text-slate-800 dark:text-slate-200">
                        2 ngón tay:
                      </strong>{" "}
                      Chụm / mở để thu phóng & di chuyển mô hình.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-50/70 dark:bg-slate-800/50 border border-sky-100 dark:border-slate-700/60 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-xs text-slate-900 dark:text-slate-100">
                  <Laptop className="size-4 text-main" />
                  <span>Đối với Máy tính (Laptop / Desktop):</span>
                </div>
                <ul className="pl-6 space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-1.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="size-4 text-main shrink-0"
                    >
                      <path d="M144 16h-32a64.07 64.07 0 0 0-64 64v96a64.07 64.07 0 0 0 64 64h32a64.07 64.07 0 0 0 64-64V80a64.07 64.07 0 0 0-64-64m48 64v24h-64V32h16a48.05 48.05 0 0 1 48 48m-48 144h-32a48.05 48.05 0 0 1-48-48v-56h128v56a48.05 48.05 0 0 1-48 48" />
                    </svg>
                    <span>
                      <strong className="text-slate-800 dark:text-slate-200">
                        Chuột trái:
                      </strong>{" "}
                      Giữ và kéo để xoay mô hình 3D.
                    </span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="size-4 text-main shrink-0"
                    >
                      <path d="M144 16h-32a64.07 64.07 0 0 0-64 64v96a64.07 64.07 0 0 0 64 64h32a64.07 64.07 0 0 0 64-64V80a64.07 64.07 0 0 0-64-64m48 64v24h-40V88a16 16 0 0 0-16-16V32h8a48.05 48.05 0 0 1 48 48m-80-48h8v40a16 16 0 0 0-16 16v16H64V80a48.05 48.05 0 0 1 48-48m32 192h-32a48.05 48.05 0 0 1-48-48v-56h40v16a16 16 0 0 0 16 16h16a16 16 0 0 0 16-16v-16h40v56a48.05 48.05 0 0 1-48 48" />
                    </svg>
                    <span>
                      <strong className="text-slate-800 dark:text-slate-200">
                        Cuộn chuột:
                      </strong>{" "}
                      Cuộn lên / xuống để phóng to hoặc thu nhỏ.
                    </span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="size-4 text-main shrink-0"
                    >
                      <path d="M144 16h-32a64.07 64.07 0 0 0-64 64v96a64.07 64.07 0 0 0 64 64h32a64.07 64.07 0 0 0 64-64V80a64.07 64.07 0 0 0-64-64m-32 16h16v72H64V80a48.05 48.05 0 0 1 48-48m32 192h-32a48.05 48.05 0 0 1-48-48v-56h128v56a48.05 48.05 0 0 1-48 48" />
                    </svg>
                    <span>
                      <strong className="text-slate-800 dark:text-slate-200">
                        Chuột phải:
                      </strong>{" "}
                      Giữ và kéo để di chuyển vị trí bản đồ.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 3: CREDITS & LINKS ================= */}
        <section
          aria-labelledby="credits-heading"
          className="group transition-all duration-300"
        >
          {/* Header Card (Bento Banner) */}
          <div className="card-header text-white rounded-3xl p-4 sm:p-5 shadow-md relative overflow-hidden -rotate-1 group-hover:rotate-0 transition-transform duration-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 backdrop-blur-md p-2 rounded-2xl border border-white/30 rotate-6">
                <Code2 className="size-5 text-white" />
              </div>
              <h3
                id="credits-heading"
                className="text-base sm:text-lg font-bold text-white tracking-tight"
              >
                Thông tin ứng dụng
              </h3>
            </div>
            <span className="text-[10px] font-semibold uppercase bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full text-white border border-white/30 hidden sm:inline-block">
              Open Source
            </span>
          </div>

          {/* Body Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-xl border border-slate-100 dark:border-slate-800 -mt-1.5 relative z-10 rotate-[0.5deg] group-hover:rotate-0 transition-transform duration-300">
            <nav
              aria-label="Thông tin phát triển và mã nguồn mở"
              className="grid grid-cols-1 gap-2 text-xs sm:text-sm font-medium"
            >
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-slate-800 dark:text-slate-200">
                <IntroImage
                  src="uit-logo.png"
                  alt="UIT logo icon"
                  className="w-5 h-5 object-contain rounded"
                  skeletonClassName="w-5 h-5 rounded shrink-0"
                />
                Phát triển bởi sinh viên Trường Đại học Công nghệ Thông tin
              </div>

              <a
                href="https://github.com/helitoo/uit-imap"
                target="_blank"
                rel="noopener noreferrer"
                title="Truy cập kho mã nguồn GitHub của dự án helitoo/uit-imap"
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-sky-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-main transition-all group/link border border-slate-200/60 dark:border-slate-700/60"
              >
                <span className="flex items-center gap-2">
                  <IntroImage
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
                    alt="Github icon"
                    className="size-4"
                    skeletonClassName="size-4 rounded shrink-0"
                  />
                  <span>GitHub Repository: helitoo/uit-imap</span>
                </span>
                <ExternalLink className="size-4 text-slate-400 group-hover/link:text-main group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://skfb.ly/pKtHO"
                target="_blank"
                rel="noopener noreferrer"
                title="Xem mô hình 3D UIT trên Sketchfab"
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-sky-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-main transition-all group/link border border-slate-200/60 dark:border-slate-700/60"
              >
                <span className="flex items-center gap-2 truncate">
                  <IntroImage
                    src="https://static.sketchfab.com/img/press/logos/sketchfab-logo.svg"
                    alt="Sketchfab icon"
                    className="size-4 shrink-0"
                    skeletonClassName="size-4 rounded shrink-0"
                  />
                  <span className="truncate">
                    Sketchfab 3D Model: University of Information Technology -
                    UIT
                  </span>
                </span>
                <ExternalLink className="size-4 text-slate-400 group-hover/link:text-main group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform shrink-0" />
              </a>
            </nav>
          </div>
        </section>
      </article>
    </DialogContent>
  );
}
