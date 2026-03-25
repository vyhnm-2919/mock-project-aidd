import Image from "next/image";
import { getLocaleFromCookie, getTranslations } from "@/utils/i18n";
import { LoginHeader } from "@/components/login/login-header";
import { LoginHero } from "@/components/login/login-hero";
import { LoginFooter } from "@/components/login/login-footer";

export default async function LoginPage() {
  const locale = await getLocaleFromCookie();
  const translations = getTranslations(locale);

  return (
    <main className="relative w-full min-h-screen bg-[#00101A] overflow-hidden">
      <Image
        src="/images/login/bg-artwork.webp"
        alt=""
        fill
        className="object-cover"
        priority
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[1] [background:linear-gradient(90deg,#00101A_0%,#00101A_25.41%,rgba(0,16,26,0)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[2] [background:linear-gradient(0deg,#00101A_22.48%,rgba(0,19,32,0)_51.74%)]"
        aria-hidden="true"
      />
      <LoginHeader locale={locale} />
      <LoginHero translations={translations} />
      <LoginFooter copyright={translations.copyright} />
    </main>
  );
}
