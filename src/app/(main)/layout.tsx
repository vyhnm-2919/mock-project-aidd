import { headers } from "next/headers";
import { getLocaleFromCookie, getHomepageTranslations, getFabTranslations, getRulesTranslations, getWriteKudoTranslations } from "@/utils/i18n";
import { MainHeader } from "@/components/header/main-header";
import { MainFooter } from "@/components/footer/main-footer";
import { WidgetButton } from "@/components/widget-button";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocaleFromCookie();
  const translations = getHomepageTranslations(locale);
  const fabT = getFabTranslations(locale);
  const rulesT = getRulesTranslations(locale);
  const writeKudoT = getWriteKudoTranslations(locale);
  const headersList = await headers();
  const pathname = headersList.get("x-invoke-path") || "/";

  return (
    <>
      <MainHeader
        locale={locale}
        translations={translations}
        pathname={pathname}
      />
      {children}
      <MainFooter translations={translations} pathname={pathname} />
      <WidgetButton translations={fabT} rulesTranslations={rulesT} writeKudoTranslations={writeKudoT} />
    </>
  );
}
