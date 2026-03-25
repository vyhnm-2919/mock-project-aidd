import type { AwardDetailItem, AwardsPageTranslations } from "@/types/homepage";
import { AwardCard } from "./award-card";

interface AwardCardsListProps {
  awards: AwardDetailItem[];
  translations: AwardsPageTranslations;
}

export function AwardCardsList({ awards, translations }: AwardCardsListProps) {
  return (
    <div className="flex flex-col">
      {awards.map((award, index) => (
        <AwardCard
          key={award.slug}
          award={award}
          index={index}
          isLast={index === awards.length - 1}
          translations={translations}
        />
      ))}
    </div>
  );
}
