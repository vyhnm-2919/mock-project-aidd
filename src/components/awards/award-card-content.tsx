import Image from "next/image";
import type { AwardDetailItem, AwardsPageTranslations } from "@/types/homepage";

interface AwardCardContentProps {
  award: AwardDetailItem;
  translations: AwardsPageTranslations;
}

export function AwardCardContent({
  award,
  translations,
}: AwardCardContentProps) {
  const hasSecondPrize = award.secondPrizeValue && award.secondPrizeNote;

  return (
    <div className="flex flex-col gap-8 flex-1">
      {/* Title block */}
      <div className="flex flex-col gap-6 rounded-2xl">
        {/* Title row */}
        <div className="flex flex-row gap-4 items-center">
          <Image
            src="/images/icons/target.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
            className="flex-shrink-0"
          />
          <h2
            id={`${award.slug}-title`}
            className="font-montserrat text-2xl font-bold leading-8 text-[#FFEA9E]"
          >
            {award.title}
          </h2>
        </div>

        {/* Description */}
        <p className="font-montserrat text-base font-bold leading-6 text-white max-w-[480px]">
          {award.description}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#2E3940] max-w-[480px]" />

      {/* Quantity block */}
      <div className="flex flex-row gap-4 items-center">
        <Image
          src="/images/icons/diamond.svg"
          alt=""
          width={24}
          height={24}
          aria-hidden="true"
          className="flex-shrink-0"
        />
        <span className="font-montserrat text-2xl font-bold leading-8 text-[#FFEA9E]">
          {translations.quantityLabel}
        </span>
        <div className="flex flex-col gap-2">
          <span className="font-montserrat text-4xl font-bold leading-[44px] text-white">
            {award.quantityDisplay}
          </span>
          {award.quantityUnit && (
            <span className="font-montserrat text-sm font-bold leading-5 text-white">
              {award.quantityUnit}
            </span>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[#2E3940] max-w-[480px]" />

      {/* Prize block */}
      <div className="flex flex-row gap-4 items-center">
        <Image
          src="/images/icons/license.svg"
          alt=""
          width={24}
          height={24}
          aria-hidden="true"
          className="flex-shrink-0"
        />
        <span className="font-montserrat text-2xl font-bold leading-8 text-[#FFEA9E]">
          {translations.prizeLabel}
        </span>
        <div className="flex flex-col gap-2">
          <span className="font-montserrat text-4xl font-bold leading-[44px] text-white">
            {award.prizeValue}
          </span>
          {award.prizeNote && (
            <span className="font-montserrat text-sm font-bold leading-5 text-white">
              {award.prizeNote}
            </span>
          )}
        </div>

        {/* "Hoặc" divider for Signature card */}
        {hasSecondPrize && (
          <>
            <div className="flex flex-row gap-2 items-center max-w-[480px]">
              <span className="font-montserrat text-sm font-bold leading-5 text-[#2E3940]">
                {translations.orText}
              </span>
              <div className="flex-1 h-px bg-[#2E3940]" />
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-montserrat text-4xl font-bold leading-[44px] text-white">
                {award.secondPrizeValue}
              </span>
              <span className="font-montserrat text-sm font-bold leading-5 text-white">
                {award.secondPrizeNote}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
