"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { KudosStats as KudosStatsType, KudosTranslations } from "@/types/kudos";
import { formatNumber } from "@/utils/format-number";
import { SecretBoxModal } from "./secret-box-modal";

interface KudosStatsProps {
  translations: KudosTranslations;
}

export function KudosStats({ translations }: KudosStatsProps): React.ReactElement {
  const [stats, setStats] = useState<KudosStatsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSecretBoxOpen, setIsSecretBoxOpen] = useState(false);

  const fetchStats = useCallback(() => {
    fetch("/api/kudos/stats")
      .then((r) => r.json() as Promise<KudosStatsType>)
      .then((data) => setStats(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  function handleOpenSecretBox(): void {
    setIsSecretBoxOpen(true);
  }

  function handleBoxOpened(): void {
    fetchStats();
  }

  if (loading) {
    return (
      <div className="bg-[#00070C] border border-[#998C5F] rounded-[17px] p-6 flex flex-col gap-4 animate-pulse">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className="h-7 bg-white/10 rounded w-48" />
            <div className="h-10 bg-[#FFEA9E]/20 rounded w-12" />
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return <></>;

  const rows = [
    { label: translations.statKudosReceived, value: stats.kudos_received },
    { label: translations.statKudosSent, value: stats.kudos_sent },
    { label: translations.statHeartsReceived, value: stats.hearts_received, showFireIcon: true },
  ];

  const boxRows = [
    { label: translations.statSecretBoxOpened, value: stats.secret_box_opened },
    { label: translations.statSecretBoxUnopened, value: stats.secret_box_unopened },
  ];

  return (
    <div className="bg-[#00070C] border border-[#998C5F] rounded-[17px] p-6 flex flex-col gap-4">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center justify-between gap-2">
          <span className="font-montserrat text-lg xl:text-[22px] font-bold leading-7 text-white">
            {row.label}
            {row.showFireIcon && (
              <span className="inline-flex items-center ml-1 relative">
                <span className="text-xl">🔥</span>
                <span className="absolute -top-1 -right-3 font-montserrat text-[17.54px] font-bold text-white [text-shadow:0_0_2px_#000] [-webkit-text-stroke:1.04px_#000]">
                  x2
                </span>
              </span>
            )}
          </span>
          <span className="font-montserrat text-2xl xl:text-[32px] font-bold leading-10 text-[#FFEA9E]">
            {formatNumber(row.value)}
          </span>
        </div>
      ))}

      {/* Divider */}
      <div className="h-px bg-[#2E3940]" />

      {boxRows.map((row) => (
        <div key={row.label} className="flex items-center justify-between gap-2">
          <span className="font-montserrat text-lg xl:text-[22px] font-bold leading-7 text-white">
            {row.label}
          </span>
          <span className="font-montserrat text-2xl xl:text-[32px] font-bold leading-10 text-[#FFEA9E]">
            {formatNumber(row.value)}
          </span>
        </div>
      ))}

      {/* Open Secret Box button */}
      <button
        type="button"
        onClick={handleOpenSecretBox}
        className="w-full h-[60px] flex items-center justify-center gap-1 bg-[#FFEA9E] rounded-lg font-montserrat text-lg xl:text-[22px] font-bold leading-7 text-[#00101A] hover:bg-[#FFE078] hover:-translate-y-0.5 focus:outline-2 focus:outline-[#FFEA9E] focus:outline-offset-2 active:bg-[#FFD54F] transition-all cursor-pointer"
      >
        {translations.openSecretBox}
        <Image src="/images/kudos/icon-gift.svg" alt="" width={24} height={24} />
      </button>

      <SecretBoxModal
        isOpen={isSecretBoxOpen}
        onClose={() => setIsSecretBoxOpen(false)}
        onOpened={handleBoxOpened}
        translations={translations}
      />
    </div>
  );
}
