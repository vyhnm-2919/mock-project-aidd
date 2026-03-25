import Image from "next/image";
import Link from "next/link";
import type { HomepageTranslations } from "@/types/homepage";

interface SunKudosSectionProps {
  translations: Pick<
    HomepageTranslations,
    | "kudosLabel"
    | "kudosTitle"
    | "kudosSubtitle"
    | "kudosDescription"
    | "detail"
  >;
}

export function SunKudosSection({ translations }: SunKudosSectionProps) {
  return (
    <section className="relative flex flex-col md:flex-row items-center gap-8 rounded-lg border border-[#2E3940] bg-[rgba(0,12,20,0.8)] p-6 md:p-10 overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/homepage/kudos-bg.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-40 z-0"
        aria-hidden="true"
      />

      {/* Text content */}
      <div className="relative z-10 flex flex-col gap-4 flex-1">
        <p className="font-montserrat text-base font-bold leading-6 text-white">
          {translations.kudosLabel}
        </p>
        <h2 className="font-montserrat text-3xl md:text-[40px] font-bold leading-tight md:leading-[48px] text-white">
          {translations.kudosTitle}
        </h2>
        <p className="font-montserrat text-sm font-bold leading-5 text-[#FFEA9E] uppercase">
          {translations.kudosSubtitle}
        </p>
        <p className="font-montserrat text-base font-normal leading-6 text-white italic">
          {translations.kudosDescription}
        </p>
        <div className="pt-2">
          <Link
            href="/kudos"
            className="inline-flex items-center gap-2 w-fit px-6 py-3 border border-[#998C5F] bg-[#FFEA9E]/10 rounded-lg font-montserrat text-base font-bold leading-6 text-white hover:bg-[#FFEA9E] hover:text-[#00101A] focus:outline-2 focus:outline-[#FFEA9E] focus:outline-offset-2 transition-all"
          >
            {translations.detail}
            <Image
              src="/images/icons/arrow-up-right.svg"
              alt=""
              width={24}
              height={24}
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>

      {/* KUDOS branding logo */}
      <div className="relative z-10 flex-shrink-0 w-full md:w-[40%] flex items-center justify-center">
        <Image
          src="/images/homepage/kudos-label.svg"
          alt="KUDOS"
          width={364}
          height={74}
          sizes="(max-width: 768px) 280px, 364px"
          className="w-[280px] md:w-[364px] h-auto"
        />
      </div>
    </section>
  );
}
