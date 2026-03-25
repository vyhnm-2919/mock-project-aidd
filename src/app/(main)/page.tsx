import {
  getLocaleFromCookie,
  getHomepageTranslations,
  getAwardItems,
  getRootFurtherContent,
} from "@/utils/i18n";
import { HeroSection } from "@/components/homepage/hero-section";
import { RootFurtherContent } from "@/components/homepage/root-further-content";
import { AwardsSection } from "@/components/homepage/awards-section";
import { SunKudosSection } from "@/components/homepage/sun-kudos-section";

export default async function HomepageSAA() {
  const locale = await getLocaleFromCookie();
  const translations = getHomepageTranslations(locale);
  const awards = getAwardItems(locale);
  const rootFurtherContent = getRootFurtherContent(locale);

  return (
    <main className="relative w-full min-h-screen bg-[#00101A]">
      {/* Hero Section — US1 + US3 */}
      <HeroSection
        targetDate={process.env.NEXT_PUBLIC_EVENT_START_DATETIME}
        translations={translations}
      />

      {/* Content Sections */}
      <div className="flex flex-col gap-[60px] xl:gap-[120px] px-6 xl:px-36 py-[60px] xl:py-24">
        {/* Root Further Content */}
        <RootFurtherContent content={rootFurtherContent} />

        {/* Awards Section — US2 */}
        <AwardsSection translations={translations} awards={awards} />

        {/* Sun* Kudos Section — US4 */}
        <SunKudosSection translations={translations} />
      </div>
    </main>
  );
}
