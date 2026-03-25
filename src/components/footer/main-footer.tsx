import Image from "next/image";
import Link from "next/link";
import type { HomepageTranslations } from "@/types/homepage";

interface MainFooterProps {
  translations: HomepageTranslations;
  pathname?: string;
}

const FOOTER_LINKS = [
  { labelKey: "navAboutSaa" as const, href: "/" },
  { labelKey: "navAwardInfo" as const, href: "/awards" },
  { labelKey: "navSunKudos" as const, href: "/kudos" },
  { labelKey: "navTieuChuan" as const, href: "#" },
];

export function MainFooter({ translations, pathname }: MainFooterProps) {
  return (
    <footer className="w-full flex flex-col md:flex-row items-center justify-between gap-6 px-6 xl:px-36 py-10 border-t border-[#2E3940]">
      <Link href="/" aria-label="SAA 2025 - Về trang chủ">
        <Image
          src="/images/homepage/footer-logo.png"
          alt="SAA 2025"
          width={69}
          height={64}
          className="w-[69px] h-16"
        />
      </Link>

      <nav
        aria-label="Footer navigation"
        className="flex flex-wrap items-center gap-6"
      >
        {FOOTER_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href + link.labelKey}
              href={link.href}
              className={`font-montserrat text-sm font-normal leading-5 tracking-[0.1px] text-white hover:text-[#FFEA9E] hover:underline focus:outline-2 focus:outline-white/50 focus:outline-offset-2 transition-colors ${
                isActive ? "bg-[rgba(255,234,158,0.1)] rounded px-3 py-1" : ""
              }`}
            >
              {translations[link.labelKey]}
            </Link>
          );
        })}
      </nav>

      <p className="font-montserrat text-sm font-normal leading-5 text-white">
        {translations.copyright}
      </p>
    </footer>
  );
}
