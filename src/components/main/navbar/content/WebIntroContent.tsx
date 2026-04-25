import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function WebIntroContent() {
  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle className="text-main">Giới thiệu UIT iMap</DialogTitle>
      </DialogHeader>
      <ScrollArea className="max-h-[60vh]">
        <div className="space-y-3 text-sm text-foreground/80 leading-relaxed pr-4 text-justify">
          <img
            src="logo.png"
            alt="UIT"
            className="w-1/2 mx-auto"
            draggable={false}
          />
          <p>
            <strong className="text-foreground">UIT iMAP</strong> là hệ thống
            bản đồ 3D trực tuyến dành cho Trường Đại học Công nghệ Thông tin –
            ĐHQG-HCM.
          </p>
          <p>
            Hệ thống cho phép sinh viên, giảng viên và khách tham quan dễ dàng
            tìm kiếm, khám phá các địa điểm trong khuôn viên trường bao gồm:
            phòng học, phòng máy, phòng lab, văn phòng khoa/bộ môn, căng tin,
            bãi xe và các khu vực tiện ích khác.
          </p>
          <p>
            Với giao diện 3D tương tác, người dùng có thể xoay, phóng to/thu nhỏ
            và khám phá toàn bộ khuôn viên từ nhiều góc độ khác nhau.
          </p>
          <p>
            Tính năng dẫn đường thông minh giúp tìm đường đi ngắn nhất giữa hai
            địa điểm bất kỳ, hỗ trợ cả định vị GPS để xác định vị trí hiện tại
            của người dùng.
          </p>

          <p className="flex flex-col text-xs text-muted-foreground border-t pt-3 gap-2">
            <div className="flex gap-1">
              <img
                src="uit-logo.jpg"
                alt="UIT logo"
                draggable={false}
                className="w-4 object-contain"
              />
              <span>Phát triển bởi sinh viên UIT</span>
            </div>
            <a
              href="https://github.com/helitoo/uit-imap"
              className="flex gap-1 text-main"
              target="_blank"
              title="Github repository"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
                alt="Github logo"
                className="size-4"
                draggable="false"
              />
              <span className="hover:underline">helitoo/uit-imap</span>
            </a>
          </p>
        </div>
      </ScrollArea>
    </DialogContent>
  );
}
