import { useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

function IntroImage({
  src,
  alt,
  className,
  skeletonClassName,
  title,
}: {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
  title?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Skeleton className={skeletonClassName || className} />}
      <img
        src={src}
        alt={alt}
        title={title}
        className={cn(className, !loaded && "hidden")}
        draggable={false}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        ref={(el) => {
          if (el?.complete) setLoaded(true);
        }}
      />
    </>
  );
}

export default function WebIntroContent() {
  return (
    <DialogContent
      description="Thông tin giới thiệu về hệ thống bản đồ 3D trực tuyến UIT iMap"
      visuallyHiddenDescription
      className="max-w-md"
    >
      <DialogHeader>
        <DialogTitle className="text-main">Giới thiệu UIT iMap</DialogTitle>
      </DialogHeader>
      <ScrollArea className="max-h-[60vh]">
        <div className="space-y-3 text-sm text-foreground/80 leading-relaxed pr-4 text-justify">
          <IntroImage
            src="logo.png"
            alt="UIT"
            className="w-1/2 mx-auto"
            skeletonClassName="w-1/2 h-20 mx-auto rounded-lg"
          />
          <p>
            <strong className="text-foreground">UIT iMAP</strong> là hệ thống
            bản đồ 3D trực tuyến dành cho Trường Đại học Công nghệ Thông tin –
            ĐHQG-HCM.
          </p>
          <div className="space-y-2 pt-3 text-justify">
            <div className="overflow-hidden rounded-lg border bg-card">
              <IntroImage
                src="demo.gif"
                alt="Video demo"
                className="w-full"
                skeletonClassName="w-full h-44 rounded-lg"
              />
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

          <div className="flex flex-col text-xs text-muted-foreground border-t pt-3 gap-2">
            <div className="flex gap-1 items-center">
              <IntroImage
                src="uit-logo.jpg"
                alt="UIT logo"
                className="w-4 object-contain"
                skeletonClassName="w-4 h-4 rounded shrink-0"
              />
              <span>Phát triển bởi sinh viên UIT</span>
            </div>

            <a
              href="https://github.com/helitoo/uit-imap"
              className="flex gap-1 text-main items-center"
              target="_blank"
              title="Github repository"
            >
              <IntroImage
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
                alt="Github logo"
                className="size-4"
                skeletonClassName="size-4 rounded shrink-0"
              />
              <span className="hover:underline">helitoo/uit-imap</span>
            </a>

            <a
              href="https://skfb.ly/pKtHO"
              className="flex gap-1 text-main items-center"
              target="_blank"
              title="Sketchfab model"
            >
              <IntroImage
                src="https://static.sketchfab.com/img/press/logos/sketchfab-logo.svg"
                alt="Sketchfab logo"
                className="size-4"
                skeletonClassName="size-4 rounded shrink-0"
              />
              <span className="hover:underline">
                University of Information Technology - UIT
              </span>
            </a>
          </div>
        </div>
      </ScrollArea>
    </DialogContent>
  );
}

