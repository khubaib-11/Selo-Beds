"use client";

import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductMediaGalleryProps {
  images: string[];
  videos?: string[];
  productName: string;
}

export function ProductMediaGallery({
  images,
  videos = [],
  productName,
}: ProductMediaGalleryProps) {
  const allMedia = [
    ...videos.map((v) => ({ type: "video", url: v })),
    ...images.map((i) => ({ type: "image", url: i })),
  ];

  // Desktop active media state
  const [activeMedia, setActiveMedia] = useState(allMedia[0]);
  // Mobile slider active index state
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  // Track scroll position to update the mobile dots
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.clientWidth;
    // Calculate which slide is currently most visible
    const newIndex = Math.round(scrollLeft / width);
    setMobileActiveIndex(newIndex);
  };

  if (!allMedia.length) return null;

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* DESKTOP: Main Featured Media */}
      <div className="hidden md:block relative aspect-square md:aspect-[4/3] bg-muted rounded-3xl overflow-hidden border border-border">
        {activeMedia?.type === "video" ? (
          <video
            src={activeMedia.url}
            controls
            autoPlay
            muted
            loop
            playsInline // Required for Apple devices
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={activeMedia?.url || "/placeholder.jpg"}
            alt={productName}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      {/* MOBILE: Swipeable Scroll-Snap Slider */}
      <div className="md:hidden flex flex-col gap-3">
        <div
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 scrollbar-hide pb-2"
          onScroll={handleScroll}
        >
          {allMedia.map((media, idx) => (
            <div
              key={idx}
              className="relative w-full shrink-0 aspect-square bg-muted rounded-3xl overflow-hidden snap-center border border-border"
            >
              {media.type === "video" ? (
                <video
                  src={`${media.url}#t=0.001`} // The timestamp forces mobile to load the first frame as a thumbnail
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover bg-black"
                />
              ) : (
                <Image
                  src={media.url}
                  alt={`${productName} view ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          ))}
        </div>

        {/* MOBILE: Indicator Dots */}
        {allMedia.length > 1 && (
          <div className="flex justify-center items-center gap-2">
            {allMedia.map((_, idx) => (
              <div
                key={idx}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  mobileActiveIndex === idx
                    ? "w-5 bg-primary"
                    : "w-1.5 bg-primary/20",
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* DESKTOP: Thumbnail Grid */}
      <div className="hidden md:grid grid-cols-4 lg:grid-cols-5 gap-4">
        {allMedia.map((media, idx) => (
          <button
            key={idx}
            onClick={() => setActiveMedia(media)}
            className={cn(
              "relative aspect-square rounded-xl overflow-hidden border-2 transition-all",
              activeMedia?.url === media.url
                ? "border-primary ring-2 ring-primary/20"
                : "border-transparent hover:border-border opacity-70 hover:opacity-100",
            )}
          >
            {media.type === "video" ? (
              <>
                <video
                  src={`${media.url}#t=0.001`} // Force thumbnail render
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover opacity-50 bg-black"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-background/80 rounded-full p-2 backdrop-blur-sm shadow-sm">
                    <Play className="w-4 h-4 text-foreground ml-0.5" />
                  </div>
                </div>
              </>
            ) : (
              <Image
                src={media.url}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
