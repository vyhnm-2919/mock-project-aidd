"use client";

import Image from "next/image";

interface HighlightCarouselProps {
  children: React.ReactNode;
  currentIndex: number;
  onIndexChange: (index: number) => void;
  total: number;
}

export function HighlightCarousel({
  children,
  currentIndex,
  onIndexChange,
  total,
}: HighlightCarouselProps): React.ReactElement {
  const childArray = Array.isArray(children) ? children : [children];

  function getIndex(offset: number): number {
    return ((currentIndex + offset) % total + total) % total;
  }

  function handlePrev(): void {
    onIndexChange(getIndex(-1));
  }

  function handleNext(): void {
    onIndexChange(getIndex(1));
  }

  const prevIdx = getIndex(-1);
  const nextIdx = getIndex(1);

  return (
    <div className="relative overflow-hidden">
      {/* Prev button */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-2 md:left-4 xl:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded cursor-pointer transition-opacity hover:opacity-80"
        aria-label="Trang trước"
      >
        <Image src="/images/kudos/icon-arrow-left.svg" alt="" width={60} height={60} className="w-8 h-8 md:w-10 md:h-10" />
      </button>

      {/* Next button */}
      <button
        type="button"
        onClick={handleNext}
        className="absolute right-2 md:right-4 xl:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded cursor-pointer transition-opacity hover:opacity-80"
        aria-label="Trang sau"
      >
        <Image src="/images/kudos/icon-arrow-right.svg" alt="" width={60} height={60} className="w-8 h-8 md:w-10 md:h-10" />
      </button>

      {/* 3-card layout */}
      <div className="flex items-stretch justify-center gap-6 px-6 xl:px-36 py-4">
        {/* Previous card */}
        {total > 1 && (
          <div className="hidden md:block w-[480px] xl:w-[528px] shrink-0 pointer-events-none">
            {childArray[prevIdx]}
          </div>
        )}

        {/* Current card */}
        <div className="w-[320px] md:w-[480px] xl:w-[528px] shrink-0">
          {childArray[currentIndex]}
        </div>

        {/* Next card */}
        {total > 1 && (
          <div className="hidden md:block w-[480px] xl:w-[528px] shrink-0 pointer-events-none">
            {childArray[nextIdx]}
          </div>
        )}
      </div>
    </div>
  );
}
