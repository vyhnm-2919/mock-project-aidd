import Image from "next/image";
import {
  getLocaleFromCookie,
  getAwardDetailItems,
  getAwardsPageTranslations,
} from "@/utils/i18n";
import { AwardsSectionTitle } from "@/components/awards/section-title";
import { AwardsSidebar } from "@/components/awards/awards-sidebar";
import { AwardCardsList } from "@/components/awards/award-cards-list";
import { AwardsKudosSection } from "@/components/awards/kudos-section";

export default async function AwardsPage() {
  const locale = await getLocaleFromCookie();
  const awards = getAwardDetailItems(locale);
  const translations = getAwardsPageTranslations(locale);

  const sidebarAwards = awards.map(({ slug, title }) => ({ slug, title }));

  return (
    <main className="relative w-full min-h-screen bg-[#00101A]">
      {/* Keyvisual background */}
      <div className="absolute top-0 left-0 w-full h-[300px] md:h-[450px] xl:h-[547px] z-0">
        <Image
          src="/images/homepage/bg-artwork.png"
          alt="SAA 2025 Keyvisual"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Cover gradient overlay */}
      <div
        className="absolute top-0 left-0 w-full h-[400px] md:h-[550px] xl:h-[627px] z-[1]"
        style={{
          background:
            "linear-gradient(0deg, #00101A -4.23%, rgba(0,19,32,0) 52.79%)",
        }}
      />

      {/* Main content container ("Bìa") */}
      <div className="relative z-10 px-4 md:px-8 lg:px-16 xl:px-36 py-16 xl:py-24 flex flex-col gap-[60px] xl:gap-[120px]">
        {/* ROOT FURTHER Logo */}
        <Image
          src="/images/homepage/root-further-hero.png"
          alt="ROOT FURTHER"
          width={338}
          height={150}
          className="w-[200px] md:w-[280px] xl:w-[338px] h-auto"
        />

        {/* Section Title */}
        <AwardsSectionTitle
          subtitle={translations.sectionSubtitle}
          title={translations.sectionTitle}
        />

        {/* Award System: Sidebar + Cards */}
        <div className="flex w-full lg:gap-20 justify-between">
          <AwardsSidebar
            awards={sidebarAwards}
            ariaLabel={translations.sidebarAriaLabel}
          />
          <AwardCardsList awards={awards} translations={translations} />
        </div>

        {/* Sun* Kudos Section */}
        <AwardsKudosSection translations={translations} />
      </div>
    </main>
  );
}
