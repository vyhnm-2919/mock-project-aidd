import type { HomepageTranslations, AwardItem } from "@/types/homepage";
import { AwardCard } from "./award-card";

interface AwardsSectionProps {
  translations: Pick<
    HomepageTranslations,
    "awardsCaption" | "awardsTitle" | "detail"
  >;
  awards: AwardItem[];
}

export function AwardsSection({ translations, awards }: AwardsSectionProps) {
  return (
    <section className="flex flex-col gap-20">
      {/* Section Header */}
      <div className="flex flex-col gap-4">
        <p className="font-montserrat text-lg md:text-2xl font-bold leading-8 text-white">
          {translations.awardsCaption}
        </p>
        <div className="h-px bg-[#2E3940]" />
        <h2 className="font-montserrat text-3xl md:text-[57px] font-bold leading-tight md:leading-[64px] tracking-[-0.25px] text-[#FFEA9E]">
          {translations.awardsTitle}
        </h2>
      </div>

      {/* Award Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-20">
        {awards.map((award) => (
          <AwardCard
            key={award.slug}
            award={award}
            detailLabel={translations.detail}
          />
        ))}
      </div>
    </section>
  );
}
