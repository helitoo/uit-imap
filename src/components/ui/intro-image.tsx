import { useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export interface IntroImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  skeletonClassName?: string;
  stickerBorder?: boolean;
  outlineRadius?: number | string;
}

export function IntroImage({
  src,
  alt,
  className,
  skeletonClassName,
  stickerBorder = false,
  outlineRadius = 3.5,
  ...props
}: IntroImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Skeleton className={skeletonClassName || className} />}
      <img
        src={src}
        alt={alt}
        className={cn(
          className,
          stickerBorder && "sticker-border",
          !loaded && "hidden",
        )}
        draggable={false}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        ref={(el) => {
          if (el?.complete) setLoaded(true);
        }}
        {...props}
      />
    </>
  );
}

export default IntroImage;
