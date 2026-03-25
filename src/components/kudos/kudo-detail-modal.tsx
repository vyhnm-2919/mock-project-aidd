"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Kudo, KudosTranslations } from "@/types/kudos";
import { KudoUserInfo } from "./kudo-user-info";
import { KudoActionFooter } from "./kudo-action-footer";
import { ImageGallery } from "./image-gallery";

interface KudoDetailModalProps {
  kudo: Kudo | null;
  onClose: () => void;
  translations: KudosTranslations;
}

export function KudoDetailModal({ kudo, onClose, translations }: KudoDetailModalProps): React.ReactElement | null {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!kudo) return;

    function handleEscape(e: KeyboardEvent): void {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [kudo, onClose]);

  if (!kudo) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Chi tiết Kudos"
    >
      <div
        ref={dialogRef}
        className="relative w-[90vw] max-w-[680px] max-h-[90vh] overflow-y-auto bg-[#FFF8E1] rounded-3xl p-6 md:p-10 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#00101A]/10 hover:bg-[#00101A]/20 cursor-pointer"
          aria-label="Đóng"
        >
          <span className="text-[#00101A] text-lg font-bold">✕</span>
        </button>

        {/* User info */}
        <div className="flex items-start justify-between gap-4 md:gap-6">
          <KudoUserInfo user={kudo.sender} />
          <Image src="/images/kudos/icon-send-arrow.svg" alt="" width={32} height={32} className="shrink-0 mt-4" />
          <KudoUserInfo user={kudo.receiver} />
        </div>

        {/* Timestamp + Category */}
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <p className="font-montserrat text-base font-bold leading-6 tracking-[0.5px] text-[#999]">
            {new Date(kudo.created_at).toLocaleString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
            {" - "}
            {new Date(kudo.created_at).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })}
          </p>
          {kudo.hashtag_category && (
            <span className="font-montserrat text-base font-bold leading-6 tracking-[0.5px] text-[#00101A]">
              {kudo.hashtag_category}
            </span>
          )}
        </div>

        {/* Full content (no truncation) */}
        <div className="bg-[rgba(255,234,158,0.40)] border border-[#FFEA9E] rounded-xl px-6 py-4">
          <div
            className="font-montserrat text-xl font-bold leading-8 text-[#00101A] text-justify [&_a]:text-[#998C5F] [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: kudo.content }}
          />
        </div>

        {/* Images */}
        <ImageGallery images={kudo.images} />

        {/* Hashtags */}
        {kudo.hashtags.length > 0 && (
          <p className="font-montserrat text-base font-bold leading-6 tracking-[0.5px] text-[rgba(212,39,29,1)]">
            {kudo.hashtags.map((h) => `#${h}`).join(" ")}
          </p>
        )}

        {/* Actions */}
        <KudoActionFooter
          kudoId={kudo.id}
          heartCount={kudo.heart_count}
          isHearted={kudo.is_hearted}
          copyLinkLabel={translations.copyLink}
          toastMessage={translations.linkCopied}
        />
      </div>
    </div>
  );
}
