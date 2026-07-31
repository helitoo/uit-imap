import { DialogContent } from "@/components/ui/dialog";
import { IntroImage } from "@/components/ui/intro-image";
import { CircleCheckBig, ExternalLink, School, Sparkles } from "lucide-react";

export default function UitIntroContent() {
  return (
    <DialogContent
      title="Thông tin Trường Đại học Công nghệ Thông tin - ĐHQG-HCM và Trung tâm CITD"
      visuallyHiddenTitle
      description="Giới thiệu tổng quan về lịch sử thành lập, sứ mệnh đào tạo chất lượng cao và các kênh thông tin tuyển sinh chính thức của UIT & CITD."
      visuallyHiddenDescription
      className="max-w-xl bg-transparent border-none shadow-none p-2 sm:p-4 max-h-[90vh] overflow-y-auto pr-1.5 sm:pr-3 scrollbar-thin focus:outline-none"
    >
      <article className="space-y-6 pt-2 pb-4">
        {/* Banner */}
        <div className="py-2 w-full flex justify-center bg-[linear-gradient(90deg,_rgba(255,255,255,0)_0%,_rgba(255,255,255,1)_40%,_rgba(255,255,255,1)_60%,_rgba(255,255,255,0)_100%)]">
          <div className="flex items-center">
            <IntroImage
              src="uit-logo.png"
              alt="Logo UI"
              className="h-11 object-contain"
              skeletonClassName="w-33 h-11 rounded-lg"
              stickerBorder
            />
            {/* Right banner text */}
            <div className="h-10 flex flex-col justify-between text-center text-[#2e69ff]">
              <div className="flex items-center justify-center font-extrabold text-3xl leading-none">
                UIT
              </div>
              <div className="flex flex-col justify-center text-[5px] leading-tight uppercase font-bold">
                <div>TRƯỜNG ĐẠI HỌC</div>
                <div>CÔNG NGHỆ THÔNG TIN</div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SECTION 1: UIT ================= */}
        <section
          aria-labelledby="uit-heading"
          className="group transition-all duration-300"
        >
          {/* Header Card (Bento Banner) */}
          <div className="card-header text-white rounded-3xl p-5 shadow-lg relative overflow-hidden -rotate-1 group-hover:rotate-0 transition-transform duration-300">
            {/* Background Glow Pattern */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            {/* Floating Main Icon Sticker */}
            <div className="absolute right-4 top-4 -rotate-12 group-hover:-rotate-6 transition-transform duration-300 bg-white/20 backdrop-blur-md border border-white/30 p-2.5 rounded-2xl shadow-lg">
              <School className="size-6 text-white drop-shadow-sm" />
            </div>

            <div className="pr-12">
              <h2
                id="uit-heading"
                className="text-lg sm:text-xl font-bold tracking-tight text-white leading-snug pt-1"
              >
                Trường Đại học Công nghệ Thông tin
              </h2>

              <p className="text-xs font-medium text-sky-100/90 flex items-center gap-1.5">
                <Sparkles className="size-3.5 text-amber-300" />
                Toàn diện • Sáng tạo • Phụng sự
              </p>
            </div>
          </div>

          {/* Body Card (Overlapping White Box) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-xl border border-slate-100 dark:border-slate-800 -mt-1.5 relative z-10 rotate-[0.5deg] group-hover:rotate-0 transition-transform duration-300 space-y-4">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
              <strong className="text-main font-semibold">UIT</strong>{" "}
              <em>(University of Information Technology - VNU-HCM)</em> là
              trường đại học công lập được thành lập ngày 08/06/2006 theo quyết
              định của Thủ tướng Chính phủ. Là trường thành viên của ĐHQG-HCM,
              UIT có nhiệm vụ đào tạo nguồn nhân lực ICT chất lượng cao.
            </p>

            {/* List with Secondary Decorative CircleCheckBig Icons */}
            <div className="bg-sky-50/60 dark:bg-slate-800/50 rounded-2xl p-4 border border-sky-100 dark:border-slate-700/60 space-y-2.5">
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <CircleCheckBig className="size-4 text-main shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900 dark:text-slate-100">
                      Đào tạo nhân lực chất lượng cao:
                    </strong>{" "}
                    Cung cấp đội ngũ chuyên gia CNTT xuất sắc cho đất nước.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CircleCheckBig className="size-4 text-main shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900 dark:text-slate-100">
                      Nghiên cứu & Chuyển giao:
                    </strong>{" "}
                    Đẩy mạnh ứng dụng CNTT tiên tiến phục vụ công nghiệp hóa,
                    hiện đại hóa.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CircleCheckBig className="size-4 text-main shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900 dark:text-slate-100">
                      Hội nhập quốc tế:
                    </strong>{" "}
                    Phát triển môi trường học thuật sáng tạo, tiệm cận chuẩn thế
                    giới.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ================= SECTION 2: LINKS ================= */}
        <section
          aria-labelledby="links-heading"
          className="group transition-all duration-300"
        >
          {/* Header Card (Bento Banner) */}
          <div className="card-header text-white rounded-3xl p-4 sm:p-5 shadow-md relative overflow-hidden -rotate-1 group-hover:rotate-0 transition-transform duration-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3
                id="links-heading"
                className="text-base sm:text-lg font-bold text-white tracking-tight"
              >
                Kênh Thông Tin Chính Thức
              </h3>
            </div>
            <span className="text-[10px] font-semibold uppercase bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full text-white border border-white/30 hidden sm:inline-block">
              Official Links
            </span>
          </div>

          {/* Body Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 shadow-xl border border-slate-100 dark:border-slate-800 -mt-1.5 relative z-10 rotate-[0.5deg] group-hover:rotate-0 transition-transform duration-300">
            <nav
              aria-label="Liên kết chính thức UIT và CITD"
              className="grid grid-cols-1 gap-2 text-xs sm:text-sm font-medium"
            >
              <a
                href="https://www.facebook.com/UIT.Fanpage"
                target="_blank"
                rel="noopener noreferrer"
                title="Truy cập Fanpage chính thức của UIT"
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-sky-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-main transition-all group/link border border-slate-200/60 dark:border-slate-700/60"
              >
                <span className="flex items-center gap-2">
                  <CircleCheckBig className="size-4 text-main shrink-0" />
                  Fanpage chính thức của UIT
                </span>
                <ExternalLink className="size-4 text-slate-400 group-hover/link:text-main group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://www.uit.edu.vn/"
                target="_blank"
                rel="noopener noreferrer"
                title="Truy cập Trang web chính thức của UIT"
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-sky-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-main transition-all group/link border border-slate-200/60 dark:border-slate-700/60"
              >
                <span className="flex items-center gap-2">
                  <CircleCheckBig className="size-4 text-main shrink-0" />
                  Trang web chính thức của UIT
                </span>
                <ExternalLink className="size-4 text-slate-400 group-hover/link:text-main group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://tuyensinh.uit.edu.vn/"
                target="_blank"
                rel="noopener noreferrer"
                title="Truy cập Thông tin tuyển sinh Đại học UIT"
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-sky-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-main transition-all group/link border border-slate-200/60 dark:border-slate-700/60"
              >
                <span className="flex items-center gap-2">
                  <CircleCheckBig className="size-4 text-main shrink-0" />
                  Cổng Thông tin Tuyển sinh UIT
                </span>
                <ExternalLink className="size-4 text-slate-400 group-hover/link:text-main group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            </nav>
          </div>
        </section>
      </article>
    </DialogContent>
  );
}
