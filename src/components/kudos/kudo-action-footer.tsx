"use client";

import { useState } from "react";
import Image from "next/image";
import { useHeartToggle } from "@/hooks/use-heart-toggle";
import { formatNumber } from "@/utils/format-number";

interface KudoActionFooterProps {
  kudoId: string;
  heartCount: number;
  isHearted: boolean;
  showDetail?: boolean;
  onDetailClick?: () => void;
  copyLinkLabel: string;
  viewDetailLabel?: string;
  toastMessage: string;
}

export function KudoActionFooter({
  kudoId,
  heartCount,
  isHearted,
  showDetail = false,
  onDetailClick,
  copyLinkLabel,
  viewDetailLabel,
  toastMessage,
}: KudoActionFooterProps): React.ReactElement {
  const { currentHearted, currentCount, toggle } = useHeartToggle(kudoId, isHearted, heartCount);
  const [showToast, setShowToast] = useState(false);

  function handleCopyLink(): void {
    const url = `${window.location.origin}/kudos?id=${kudoId}`;
    navigator.clipboard.writeText(url).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    });
  }

  return (
    <div className="flex items-center justify-between">
      <button
        type="button"
        onClick={toggle}
        className="flex items-center gap-1 cursor-pointer"
        aria-label={currentHearted ? "Bỏ tim" : "Thả tim"}
      >
        <Image
          src="/images/kudos/icon-heart.svg"
          alt=""
          width={32}
          height={32}
          className={`transition-transform hover:scale-110 ${currentHearted ? "brightness-100" : "brightness-50 grayscale"}`}
        />
        <span className="font-montserrat text-2xl font-bold leading-8 text-[#00101A]">
          {formatNumber(currentCount)}
        </span>
      </button>

      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={handleCopyLink}
          className="flex items-center gap-1 rounded px-4 py-4 font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-[#00101A] hover:text-[#FFEA9E] hover:underline focus:outline-2 focus:outline-[#FFEA9E] focus:outline-offset-2 transition-colors cursor-pointer"
        >
          {copyLinkLabel}
          <Image src="/images/kudos/icon-copy-link.svg" alt="" width={24} height={24} />
        </button>

        {showDetail && onDetailClick && (
          <button
            type="button"
            onClick={onDetailClick}
            className="flex items-center gap-1 rounded px-4 py-4 font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-[#00101A] hover:text-[#FFEA9E] hover:underline focus:outline-2 focus:outline-[#FFEA9E] focus:outline-offset-2 transition-colors cursor-pointer"
          >
            {viewDetailLabel}
            <span className="text-sm">↗</span>
          </button>
        )}
      </div>

      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] bg-[#00101A] border border-[#FFEA9E] text-white font-montserrat text-sm font-bold px-6 py-3 rounded-lg shadow-lg animate-[slideUp_0.3s_ease-out]">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
