"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
}

export function ImageGallery({ images }: ImageGalleryProps): React.ReactElement | null {
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const displayed = images.slice(0, 5);

  return (
    <>
      <div className="flex items-center gap-4 overflow-x-auto">
        {displayed.map((url, idx) => (
          <button
            key={url}
            type="button"
            onClick={() => setFullscreenIndex(idx)}
            className="w-[88px] h-[88px] shrink-0 rounded-[18px] border border-[#998C5F] bg-white overflow-hidden cursor-pointer focus:outline-2 focus:outline-[#FFEA9E]"
          >
            <Image
              src={url}
              alt={`Ảnh ${idx + 1}`}
              width={88}
              height={88}
              className="w-full h-full object-cover rounded border border-[#FFEA9E]"
            />
          </button>
        ))}
      </div>

      {fullscreenIndex !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center"
          onClick={() => setFullscreenIndex(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setFullscreenIndex(null);
            if (e.key === "ArrowRight" && fullscreenIndex < displayed.length - 1) setFullscreenIndex(fullscreenIndex + 1);
            if (e.key === "ArrowLeft" && fullscreenIndex > 0) setFullscreenIndex(fullscreenIndex - 1);
          }}
          role="dialog"
          aria-modal="true"
          tabIndex={0}
        >
          <Image
            src={displayed[fullscreenIndex]}
            alt={`Ảnh ${fullscreenIndex + 1}`}
            width={800}
            height={800}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
