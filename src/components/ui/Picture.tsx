import { type CSSProperties, type ImgHTMLAttributes } from "react";
import { optimizedImages } from "@/data/images";
import { cn } from "@/lib/utils";

interface PictureProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height"> {
  slug: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}

function buildSrcSet(sources: { width: number; path: string }[]) {
  return sources.map((s) => `${s.path} ${s.width}w`).join(", ");
}

/** Responsive AVIF/WebP/JPEG <picture> sourced from the pre-optimized set in src/data/images.generated.ts. */
export function Picture({
  slug,
  alt,
  className,
  imgClassName,
  sizes = "100vw",
  priority = false,
  fill = false,
  ...rest
}: PictureProps) {
  const image = optimizedImages[slug];

  if (!image) {
    if (import.meta.env.DEV) {
      console.warn(`Picture: no optimized image found for slug "${slug}". Run \`npm run optimize-images\`.`);
    }
    return <div className={cn("bg-surface", className)} aria-hidden="true" />;
  }

  const wrapperStyle: CSSProperties = fill
    ? { position: "absolute", inset: 0 }
    : { aspectRatio: `${image.width} / ${image.height}` };

  return (
    <div
      className={className}
      style={{
        ...wrapperStyle,
        backgroundImage: `url(${image.lqip})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      <picture>
        <source type="image/avif" srcSet={buildSrcSet(image.avif)} sizes={sizes} />
        <source type="image/webp" srcSet={buildSrcSet(image.webp)} sizes={sizes} />
        <img
          src={image.fallback}
          srcSet={buildSrcSet(image.jpg)}
          sizes={sizes}
          alt={alt}
          width={image.width}
          height={image.height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className={cn("h-full w-full object-cover", imgClassName)}
          {...rest}
        />
      </picture>
    </div>
  );
}
