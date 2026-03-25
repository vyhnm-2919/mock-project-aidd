import Image from "next/image";
import type { HomepageTranslations } from "@/types/homepage";
import { Countdown } from "./countdown";
import { EventInfo } from "./event-info";
import { HeroCta } from "./hero-cta";

interface HeroSectionProps {
  targetDate: string | undefined;
  translations: HomepageTranslations;
}

export function HeroSection({ targetDate, translations }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background artwork */}
      <Image
        src="/images/homepage/bg-artwork.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center z-0"
        aria-hidden="true"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(12deg, #00101A 23.7%, rgba(0,18,29,0.46) 38.34%, rgba(0,19,32,0) 48.92%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start gap-10 w-full px-6 md:px-12 xl:px-36 pt-32 xl:pt-40 pb-24">
        {/* ROOT FURTHER logo */}
        <Image
          src="/images/homepage/root-further-hero.png"
          alt="ROOT FURTHER"
          width={451}
          height={200}
          sizes="(max-width: 768px) 280px, (max-width: 1024px) 360px, 451px"
          className="w-[280px] md:w-[360px] xl:w-[451px] h-auto"
          priority
        />

        {/* Countdown */}
        {targetDate && (
          <Countdown targetDate={targetDate} translations={translations} />
        )}

        {/* Event info */}
        <EventInfo translations={translations} />

        {/* CTA buttons */}
        <HeroCta translations={translations} />
      </div>
    </section>
  );
}
