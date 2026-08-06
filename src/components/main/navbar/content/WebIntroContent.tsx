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
      className="w-[calc(100vw-1rem)] sm:w-full max-w-xl bg-transparent border-none shadow-none p-2 sm:p-4 max-h-[90vh] overflow-y-auto overflow-x-hidden pr-1.5 sm:pr-3 scrollbar-thin focus:outline-none"
    >
      <article className="space-y-6 pt-2 pb-4 overflow-x-hidden w-full">
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
          <div className="bg-card text-card-foreground rounded-3xl p-5 shadow-xl border border-border -mt-1.5 relative z-10 rotate-[0.5deg] group-hover:rotate-0 transition-transform duration-300 space-y-4">
            <p className="text-xs sm:text-sm text-foreground leading-relaxed text-justify">
              <strong className="text-primary font-semibold">UIT iMap</strong>{" "}
              là bản đồ 3D trường Đại học Công nghệ thông tin (UIT), cung cấp
              trải nghiệm khám phá không gian học thuật hiện đại, trực quan dành
              cho học sinh, sinh viên và khách tham quan.
            </p>

            {/* List with Secondary Decorative CircleCheckBig Icons */}
            <div className="bg-accent/40 rounded-2xl p-4 border border-accent space-y-2.5">
              <ul className="space-y-2 text-xs sm:text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <CircleCheckBig className="size-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">Mô hình 3D:</strong> Tái
                    hiện chân thực toàn bộ kiến trúc campus UIT.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CircleCheckBig className="size-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">Ảnh 360:</strong> Khám
                    qua không gian UIT thông qua hệ thống ảnh 360 ngay tại trình
                    duyệt web.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CircleCheckBig className="size-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">
                      Tra cứu địa điểm & dẫn đường:
                    </strong>{" "}
                    Tìm kiếm nhanh chóng các giảng đường, phòng lab, hội trường
                    và các địa điểm khác.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CircleCheckBig className="size-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">
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
          <div className="bg-card text-card-foreground rounded-3xl p-4 sm:p-5 shadow-xl border border-border -mt-1.5 relative z-10 rotate-[0.5deg] group-hover:rotate-0 transition-transform duration-300">
            <nav
              aria-label="Thông tin phát triển và mã nguồn mở"
              className="grid grid-cols-1 gap-2 text-xs sm:text-sm font-medium"
            >
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-muted/50 border border-border text-foreground">
                <IntroImage
                  src="uit-logo.png"
                  alt="UIT logo icon"
                  className="w-5 h-5 object-contain rounded"
                  skeletonClassName="w-5 h-5 rounded shrink-0"
                />
                Phát triển bởi sinh viên Trường Đại học Công nghệ Thông tin
              </div>

              <a
                href="https://github.com/UIT-iMap/uit-imap"
                target="_blank"
                rel="noopener noreferrer"
                title="Truy cập kho mã nguồn GitHub của dự án helitoo/uit-imap"
                className="flex items-center justify-between p-3 rounded-2xl bg-muted/50 hover:bg-accent text-foreground hover:text-primary transition-all group/link border border-border"
              >
                <span className="flex items-center gap-2">
                  <svg
                    viewBox="0 0 128 128"
                    className="text-[#181616] dark:text-white size-4 shrink-0"
                  >
                    <g fill="currentColor">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
                      ></path>
                      <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"></path>
                    </g>
                  </svg>
                  <span>GitHub Repo: UIT-iMap/uit-imap</span>
                </span>
                <ExternalLink className="size-4 text-foreground group-hover/link:text-primary group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://skfb.ly/pMAT9"
                target="_blank"
                rel="noopener noreferrer"
                title="Xem mô hình 3D UIT trên Sketchfab"
                className="flex items-center justify-between p-3 rounded-2xl bg-muted/50 hover:bg-accent text-foreground hover:text-primary transition-all group/link border border-border"
              >
                <span className="flex items-center gap-2 truncate">
                  <IntroImage
                    src="https://static.sketchfab.com/img/press/logos/sketchfab-logo.svg"
                    alt="Sketchfab icon"
                    className="size-4 shrink-0"
                    skeletonClassName="size-4 rounded shrink-0"
                  />
                  <span className="truncate">
                    Sketchfab Model: University of Information Technology
                  </span>
                </span>
                <ExternalLink className="size-4 text-foreground group-hover/link:text-primary group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform shrink-0" />
              </a>
            </nav>
          </div>
        </section>
      </article>
    </DialogContent>
  );
}
