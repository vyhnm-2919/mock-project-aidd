"use client";

import Image from "next/image";

interface CarouselPaginationProps {
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export function CarouselPagination({
  currentIndex,
  total,
  onPrev,
  onNext,
}: CarouselPaginationProps): React.ReactElement {
  return (
    <div className="flex items-center justify-center gap-8 px-6 xl:px-36">
      <button
        type="button"
        onClick={onPrev}
        className="w-12 h-12 flex items-center justify-center rounded cursor-pointer hover:opacity-80 transition-opacity"
        aria-label="Trang trước"
      >
        <Image src="/images/kudos/icon-arrow-left.svg" alt="" width={48} height={48} className="w-8 h-8 md:w-12 md:h-12" />
      </button>

      <span className="font-montserrat text-xl md:text-[28px] font-bold leading-9">
        <span className="text-white">{currentIndex + 1}</span>
        <span className="text-[#999]">/{total}</span>
      </span>

      <button
        type="button"
        onClick={onNext}
        className="w-12 h-12 flex items-center justify-center rounded cursor-pointer hover:opacity-80 transition-opacity"
        aria-label="Trang sau"
      >
        <Image src="/images/kudos/icon-arrow-right.svg" alt="" width={48} height={48} className="w-8 h-8 md:w-12 md:h-12" />
      </button>
    </div>
  );
}
