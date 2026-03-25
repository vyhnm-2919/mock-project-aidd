import Image from "next/image";
import type { Locale } from "@/types/auth";
import { LanguageSelector } from "@/components/header/language-selector";

interface LoginHeaderProps {
  locale: Locale;
}

export function LoginHeader({ locale }: LoginHeaderProps) {
  return (
    <header className="absolute top-0 w-full h-20 flex items-center justify-between px-6 md:px-20 xl:px-36 bg-[rgba(11,15,18,0.8)] backdrop-blur-[10px] z-50">
      <div className="flex items-center">
        <Image
          src="/images/logo-saa.png"
          alt="SAA 2025"
          width={52}
          height={48}
          className="w-10 h-11 xl:w-[52px] xl:h-12"
        />
      </div>
      <LanguageSelector currentLocale={locale} />
    </header>
  );
}
