"use client";

import Image from "next/image";
import type { Kudo, KudosTranslations } from "@/types/kudos";
import { KudoUserInfo } from "./kudo-user-info";
import { KudoContentBox } from "./kudo-content-box";
import { KudoActionFooter } from "./kudo-action-footer";
import { ImageGallery } from "./image-gallery";

interface KudoPostCardProps {
  kudo: Kudo;
  translations: KudosTranslations;
  onCategoryClick?: (category: string) => void;
}

export function KudoPostCard({ kudo, translations, onCategoryClick }: KudoPostCardProps): React.ReactElement {
  return (
    <div className="w-full bg-[#FFF8E1] rounded-3xl p-6 md:p-10 md:pb-4 flex flex-col gap-4">
      {/* User info row */}
      <div className="flex items-start justify-between gap-4 md:gap-6">
        <KudoUserInfo user={kudo.sender} />
        <Image src="/images/kudos/icon-send-arrow.svg" alt="" width={32} height={32} className="shrink-0 mt-4" />
        <KudoUserInfo user={kudo.receiver} />
      </div>

      {/* Timestamp + Category */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
        <p className="font-montserrat text-base font-bold leading-6 tracking-[0.5px] text-[#999]">
          {new Date(kudo.created_at).toLocaleString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
          {" - "}
          {new Date(kudo.created_at).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })}
        </p>
        {kudo.hashtag_category && (
          <button
            type="button"
            onClick={() => onCategoryClick?.(kudo.hashtag_category!)}
            className="flex items-center gap-2 font-montserrat text-base font-bold leading-6 tracking-[0.5px] text-[#00101A] cursor-pointer hover:underline"
          >
            {kudo.hashtag_category}
            <Image src="/images/kudos/icon-write.svg" alt="" width={20} height={20} className="opacity-50" />
          </button>
        )}
      </div>

      {/* Content */}
      <KudoContentBox content={kudo.content} maxLines={5} />

      {/* Images */}
      <ImageGallery images={kudo.images} />

      {/* Divider */}
      <div className="h-px bg-[#FFEA9E]" />

      {/* Hashtags */}
      {kudo.hashtags.length > 0 && (
        <p className="font-montserrat text-base font-bold leading-6 tracking-[0.5px] text-[rgba(212,39,29,1)] line-clamp-1">
          {kudo.hashtags.map((h) => `#${h}`).join(" ")}
        </p>
      )}

      {/* Action footer */}
      <KudoActionFooter
        kudoId={kudo.id}
        heartCount={kudo.heart_count}
        isHearted={kudo.is_hearted}
        copyLinkLabel={translations.copyLink}
        toastMessage={translations.linkCopied}
      />
    </div>
  );
}
