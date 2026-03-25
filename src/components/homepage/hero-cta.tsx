import Link from "next/link";
import Image from "next/image";
import type { HomepageTranslations } from "@/types/homepage";

interface HeroCtaProps {
  translations: Pick<HomepageTranslations, "aboutAwards" | "aboutKudos">;
}

export function HeroCta({ translations }: HeroCtaProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-10 w-full md:w-auto">
      <Link
        href="/awards"
        className="flex items-center justify-center gap-2 px-6 py-4 bg-[#FFEA9E] rounded-lg font-montserrat text-[22px] font-bold leading-7 text-[#00101A] hover:bg-[#FFE078] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(255,234,158,0.4)] active:bg-[#FFD54F] focus:outline-2 focus:outline-[#FFEA9E] focus:outline-offset-2 transition-all"
      >
        {translations.aboutAwards}
        <Image
          src="/images/icons/arrow-up-right.svg"
          alt=""
          width={24}
          height={24}
          aria-hidden="true"
        />
      </Link>
      <Link
        href="/kudos"
        className="flex items-center justify-center gap-2 px-6 py-4 border border-[#998C5F] bg-[#FFEA9E]/10 rounded-lg font-montserrat text-[22px] font-bold leading-7 text-white hover:bg-[#FFEA9E] hover:text-[#00101A] hover:-translate-y-0.5 focus:outline-2 focus:outline-[#FFEA9E] focus:outline-offset-2 transition-all"
      >
        {translations.aboutKudos}
        <Image
          src="/images/icons/arrow-up-right.svg"
          alt=""
          width={24}
          height={24}
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}
