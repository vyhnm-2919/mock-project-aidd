"use client";

import Image from "next/image";
import type { Kudo } from "@/types/kudos";
import { KudoUserInfo } from "./kudo-user-info";
import { KudoContentBox } from "./kudo-content-box";
import { KudoActionFooter } from "./kudo-action-footer";

interface HighlightKudoCardProps {
  kudo: Kudo;
  onDetailClick: (kudo: Kudo) => void;
  onCategoryClick?: (category: string) => void;
  copyLinkLabel: string;
  viewDetailLabel: string;
  toastMessage: string;
}

export function HighlightKudoCard({
  kudo,
  onDetailClick,
  onCategoryClick,
  copyLinkLabel,
  viewDetailLabel,
  toastMessage,
}: HighlightKudoCardProps): React.ReactElement {
  return (
    <div className="w-full h-full bg-[#FFF8E1] border-4 border-[#FFEA9E] rounded-2xl p-4 md:p-6 md:pb-4 flex flex-col gap-4">
      {/* User info row */}
      <div className="flex items-start justify-between gap-4">
        <KudoUserInfo user={kudo.sender} />
        <Image src="/images/kudos/icon-send-arrow.svg" alt="" width={32} height={32} className="shrink-0 mt-4" />
        <KudoUserInfo user={kudo.receiver} />
      </div>

      {/* Timestamp + Category */}
      <div className="flex flex-col gap-2">
        <p className="font-montserrat text-base font-bold leading-6 tracking-[0.5px] text-[#999]">
          {new Date(kudo.created_at).toLocaleString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
          {" - "}
          {new Date(kudo.created_at).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })}
        </p>

        {kudo.hashtag_category && (
          <button
            type="button"
            onClick={() => onCategoryClick?.(kudo.hashtag_category!)}
            className="flex items-center justify-center gap-2 font-montserrat text-base font-bold leading-6 tracking-[0.5px] text-[#00101A] cursor-pointer hover:underline"
          >
            {kudo.hashtag_category}
            <Image src="/images/kudos/icon-write.svg" alt="" width={20} height={20} className="opacity-50" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <KudoContentBox content={kudo.content} maxLines={3} />
      </div>

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
        showDetail
        onDetailClick={() => onDetailClick(kudo)}
        copyLinkLabel={copyLinkLabel}
        viewDetailLabel={viewDetailLabel}
        toastMessage={toastMessage}
      />
    </div>
  );
}
