"use client";

import Image from "next/image";
import type { RulesTranslations } from "@/types/kudos";

const BADGE_SHADOW: Record<string, string> = {
  "New Hero": "",
  "Rising Hero": "[text-shadow:0_0.447px_1.787px_#000]",
  "Super Hero": "[text-shadow:0_0.457px_1.83px_#000]",
  "Legend Hero": "[text-shadow:0_0_1.505px_#FFF]",
};

const ICON_IMAGES = [
  "badge-revival.png",
  "badge-touch-of-light.png",
  "badge-stay-gold.png",
  "badge-flow-to-horizon.png",
  "badge-beyond-the-boundary.png",
  "badge-root-further.png",
];

interface RulesContentProps {
  translations: RulesTranslations;
}

export function RulesContent({ translations: t }: RulesContentProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[473px]">
      {/* Title */}
      <h1 className="font-montserrat text-[36px] md:text-[45px] font-bold leading-[44px] md:leading-[52px] text-[#FFEA9E]">
        {t.title}
      </h1>

      {/* Section 1: Người nhận Kudos */}
      <section className="flex flex-col gap-4">
        <h2 className="font-montserrat text-[22px] font-bold leading-7 text-[#FFEA9E] uppercase">
          {t.sectionReceiverTitle}
        </h2>
        <p className="font-montserrat text-base font-bold leading-6 tracking-[0.5px] text-white text-justify">
          {t.sectionReceiverIntro}
        </p>

        {/* Badge tiers */}
        <div className="flex flex-col gap-4">
          {t.badgeTiers.map((tier) => (
            <div key={tier.name} className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex items-center h-[22px] px-3 rounded-[55px] border-[0.579px] border-[#FFEA9E] bg-[linear-gradient(0deg,rgba(9,36,50,0.50)_0%,rgba(9,36,50,0.50)_100%)] font-montserrat text-[13.2px] font-bold text-white ${BADGE_SHADOW[tier.name] ?? ""}`}
                >
                  {tier.name}
                </span>
                <span className="font-montserrat text-base font-bold leading-6 tracking-[0.5px] text-white">
                  {tier.threshold}
                </span>
              </div>
              <p className="font-montserrat text-sm font-bold leading-5 tracking-[0.1px] text-white text-justify">
                {tier.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Người gửi Kudos */}
      <section className="flex flex-col gap-4">
        <h2 className="font-montserrat text-[22px] font-bold leading-7 text-[#FFEA9E] uppercase">
          {t.sectionSenderTitle}
        </h2>
        <p className="font-montserrat text-base font-bold leading-6 tracking-[0.5px] text-white text-justify">
          {t.sectionSenderIntro}
        </p>

        {/* Icon badge grid */}
        <div className="grid grid-cols-3 gap-4 px-6">
          {ICON_IMAGES.map((img, idx) => (
            <div key={img} className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full border-2 border-white overflow-hidden">
                <Image
                  src={`/images/kudos/${img}`}
                  alt={t.iconBadgeNames[idx]}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-montserrat text-[11px] font-bold leading-4 tracking-[0.5px] text-white text-center">
                {t.iconBadgeNames[idx]}
              </span>
            </div>
          ))}
        </div>

        <p className="font-montserrat text-base font-bold leading-6 tracking-[0.5px] text-white text-justify">
          {t.sectionSenderCollect}
        </p>
      </section>

      {/* Section 3: Kudos Quốc Dân */}
      <section className="flex flex-col gap-4">
        <h2 className="font-montserrat text-2xl font-bold leading-8 text-[#FFEA9E]">
          {t.sectionKudosQuocDanTitle}
        </h2>
        <p className="font-montserrat text-base font-bold leading-6 tracking-[0.5px] text-white text-justify">
          {t.sectionKudosQuocDanBody}
        </p>
      </section>
    </div>
  );
}
