import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/types/auth";
import type { HomepageTranslations } from "@/types/homepage";
import { NavLink } from "./nav-link";
import { NotificationBell } from "./notification-bell";
import { LanguageSelector } from "./language-selector";
import { UserMenu } from "./user-menu";
import { MobileNav } from "./mobile-nav";

interface MainHeaderProps {
  locale: Locale;
  translations: HomepageTranslations;
  pathname: string;
}

const NAV_LINKS = [
  { labelKey: "navAboutSaa" as const, href: "/" },
  { labelKey: "navAwardInfo" as const, href: "/awards" },
  { labelKey: "navSunKudos" as const, href: "/kudos" },
];

export function MainHeader({
  locale,
  translations,
  pathname,
}: MainHeaderProps) {
  return (
    <header className="sticky top-0 w-full h-20 flex items-center justify-between px-6 md:px-20 xl:px-36 bg-[rgba(16,20,23,0.8)] backdrop-blur-[10px] z-50">
      <div className="flex items-center gap-8">
        <Link href="/" aria-label="SAA 2025 - Về trang chủ">
          <Image
            src="/images/logo-saa.png"
            alt="SAA 2025"
            width={52}
            height={48}
            className="w-10 h-11 xl:w-[52px] xl:h-12"
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={translations[link.labelKey]}
              isActive={pathname === link.href}
            />
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-1">
        <NotificationBell />
        <LanguageSelector currentLocale={locale} />
        <UserMenu translations={{ menuProfile: translations.menuProfile, menuSignOut: translations.menuSignOut }} />
        <MobileNav
          links={NAV_LINKS.map((link) => ({
            label: translations[link.labelKey],
            href: link.href,
            isActive: pathname === link.href,
          }))}
        />
      </div>
    </header>
  );
}
