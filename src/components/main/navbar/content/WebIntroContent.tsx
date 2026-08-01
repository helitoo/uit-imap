import { DialogContent } from "@/components/ui/dialog";
import { IntroImage } from "@/components/ui/intro-image";
import {
  Code2,
  CircleCheckBig,
  ExternalLink,
  Sparkles,
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

        {/* ================= SECTION 2: CREDITS & LINKS ================= */}
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
