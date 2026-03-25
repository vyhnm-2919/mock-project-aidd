import Image from "next/image";
import type { AwardDetailItem, AwardsPageTranslations } from "@/types/homepage";
import { AwardCardContent } from "./award-card-content";

interface AwardCardProps {
  award: AwardDetailItem;
  index: number;
  isLast: boolean;
  translations: AwardsPageTranslations;
}

export function AwardCard({ award, index, isLast, translations }: AwardCardProps) {
  const isImageLeft = index % 2 === 0;

  return (
    <section
      id={award.slug}
      aria-labelledby={`${award.slug}-title`}
      className="scroll-mt-24"
    >
      <div
        className={`flex flex-col gap-10 items-start ${isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}
      >
        {/* Award Image */}
        <div className="relative w-full lg:w-[336px] aspect-square lg:aspect-auto lg:h-[336px] flex-shrink-0 rounded-3xl overflow-hidden border border-[#FFEA9E]">
          <Image
            src={award.image}
            alt={`${award.title} award`}
            fill
            sizes="(max-width: 1024px) 100vw, 336px"
            className="object-cover mix-blend-screen"
          />
        </div>

        {/* Card Content */}
        <AwardCardContent award={award} translations={translations} />
      </div>

      {/* Divider — omit after last card (MVP) */}
      {!isLast && (
        <div className="h-px bg-[#2E3940] max-w-[853px] mt-20" />
      )}
    </section>
  );
}
