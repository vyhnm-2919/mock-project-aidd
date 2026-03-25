import Image from "next/image";
import Link from "next/link";
import type { AwardsPageTranslations } from "@/types/homepage";

interface AwardsKudosSectionProps {
  translations: Pick<
    AwardsPageTranslations,
    "kudosLabel" | "kudosTitle" | "kudosDescription" | "kudosDetailButton"
  >;
}

export function AwardsKudosSection({ translations }: AwardsKudosSectionProps) {
  return (
    <section className="relative w-full mx-auto h-auto lg:h-[500px] bg-[#0F0F0F] rounded-lg overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/homepage/kudos-bg.webp"
        alt=""
        fill
        sizes="1152px"
        className="object-cover opacity-40"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-10 p-8 lg:p-16 h-full">
        {/* Text block */}
        <div className="flex flex-col gap-8 flex-1">
          <div className="flex flex-col gap-4">
            <p className="font-montserrat text-2xl font-bold leading-8 text-white">
              {translations.kudosLabel}
            </p>
            <h2 className="font-montserrat text-4xl lg:text-[57px] font-bold leading-tight lg:leading-[64px] text-[#FFEA9E]">
              {translations.kudosTitle}
            </h2>
            <p className="font-montserrat text-base font-bold leading-6 text-white">
              {translations.kudosDescription}
            </p>
          </div>

          <div className="flex flex-row gap-6">
            <Link
              href="/kudos"
              className="inline-flex items-center gap-2 px-4 py-4 bg-[#FFEA9E] text-[#00101A] rounded font-montserrat text-base font-bold leading-6 hover:bg-[#FFE078] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-[#FFEA9E] focus-visible:outline-offset-2 active:bg-[#FFD54F] transition-all"
            >
              {translations.kudosDetailButton}
              <Image
                src="/images/icons/arrow-up-right.svg"
                alt=""
                width={24}
                height={24}
                aria-hidden="true"
                className="brightness-0"
              />
            </Link>
          </div>
        </div>

        {/* Illustration + decorative text */}
        <div className="flex flex-col items-center gap-4 flex-shrink-0">
          <Image
            src="/images/homepage/kudos-illustration.png"
            alt="Sun* Kudos"
            width={272}
            height={219}
            sizes="272px"
            className="w-[200px] lg:w-[272px] h-auto"
          />
          <span
            className="font-sans text-6xl lg:text-[96px] font-normal leading-6 text-[#DBD1C1] select-none"
            aria-hidden="true"
          >
            KUDOS
          </span>
        </div>
      </div>
    </section>
  );
}
