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
          <div className="space-y-2 pt-3 text-justify">
            <div className="overflow-hidden rounded-lg border bg-card">
              <img src="demo.gif" className="w-full" alt="Video demo" draggable={false} />
            </div>
            <div className="text-xs text-muted-foreground text-left space-y-2">
              <p className="font-medium text-foreground">Hướng dẫn tương tác:</p>
              <ul className="list-disc pl-4 space-y-2">
                <li>
                  <span className="font-medium text-foreground">Đối với mobile:</span> Sử dụng 1 ngón tay để xoay model, 2 ngón tay để thu / phóng và di chuyển model.
                </li>
                <li>
                  <span className="font-medium text-foreground">Đối với laptop:</span> Sử dụng chuột trái để xoay model, nút cuộn để thu / phóng và chuột phải di chuyển model.
                </li>
              </ul>
            </div>
          </div>

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

            <a
              href="https://skfb.ly/pKtHO"
              className="flex gap-1 text-main"
              target="_blank"
              title="Sketchfab model"
            >
              <img
                src="https://static.sketchfab.com/img/press/logos/sketchfab-logo.svg"
                alt="Sketchfab logo"
                className="size-4"
                draggable="false"
              />
              <span className="hover:underline">
                University of Information Technology - UIT
              </span>
            </a>
          </p>
        </div>
      </ScrollArea>
    </DialogContent>
  );
}
