"use client";

import dynamic from "next/dynamic";
import type { SpotlightEntry, KudosTranslations } from "@/types/kudos";
import { SectionHeader } from "./section-header";

const SpotlightBoard = dynamic(() => import("./spotlight-board").then((m) => m.SpotlightBoard), {
  ssr: false,
  loading: () => (
    <div className="w-full xl:w-[1157px] h-[300px] md:h-[400px] xl:h-[548px] mx-auto border border-[#998C5F] rounded-[24px] xl:rounded-[47px] bg-[#00101A] animate-pulse" />
  ),
});

interface SpotlightSectionProps {
  data: SpotlightEntry[];
  totalKudos: number;
  translations: KudosTranslations;
}

export function SpotlightSection({ data, totalKudos, translations }: SpotlightSectionProps): React.ReactElement {
  return (
    <section className="flex flex-col gap-10">
      <SectionHeader
        subtitle={translations.sectionSubtitle}
        title={translations.spotlightTitle}
      />
      <div className="px-6 xl:px-0 xl:flex xl:justify-center">
        <SpotlightBoard
          data={data}
          totalKudos={totalKudos}
          kudosLabel={translations.spotlightCount}
          searchPlaceholder={translations.searchPlaceholder}
        />
      </div>
    </section>
  );
}
