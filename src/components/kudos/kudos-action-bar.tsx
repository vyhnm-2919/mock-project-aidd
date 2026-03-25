"use client";

import { useState } from "react";
import Image from "next/image";
import type { WriteKudoTranslations } from "@/types/kudos";
import { WriteKudoModal } from "./write-kudo-modal";

interface KudosActionBarProps {
  writePlaceholder: string;
  searchPlaceholder: string;
  writeKudoTranslations: WriteKudoTranslations;
}

export function KudosActionBar({ writePlaceholder, searchPlaceholder, writeKudoTranslations }: KudosActionBarProps): React.ReactElement {
  const [showWriteKudo, setShowWriteKudo] = useState(false);

  function handleSearch(): void {
    alert("Tìm kiếm profile — coming soon");
  }

  return (
    <>
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-4 px-6 xl:px-36 -mt-6 relative z-20">
        <button
          type="button"
          onClick={() => setShowWriteKudo(true)}
          className="flex items-center gap-4 h-[60px] md:h-[72px] px-4 md:px-6 bg-[rgba(255,234,158,0.10)] border border-[#998C5F] rounded-[68px] font-montserrat text-sm md:text-base font-bold leading-6 tracking-[0.15px] text-white hover:bg-[rgba(255,234,158,0.40)] focus:outline-2 focus:outline-[#FFEA9E] focus:outline-offset-2 transition-colors cursor-pointer"
        >
          <Image src="/images/kudos/icon-write.svg" alt="" width={24} height={24} />
          <span className="text-left">{writePlaceholder}</span>
        </button>

        <button
          type="button"
          onClick={handleSearch}
          className="flex items-center gap-4 h-[60px] md:h-[72px] px-4 md:px-6 bg-[rgba(255,234,158,0.10)] border border-[#998C5F] rounded-[68px] font-montserrat text-sm md:text-base font-bold leading-6 tracking-[0.15px] text-white hover:bg-[rgba(255,234,158,0.40)] focus:outline-2 focus:outline-[#FFEA9E] focus:outline-offset-2 transition-colors cursor-pointer"
        >
          <Image src="/images/kudos/icon-search.svg" alt="" width={24} height={24} />
          <span>{searchPlaceholder}</span>
        </button>
      </div>

      <WriteKudoModal
        isOpen={showWriteKudo}
        onClose={() => setShowWriteKudo(false)}
        translations={writeKudoTranslations}
      />
    </>
  );
}
