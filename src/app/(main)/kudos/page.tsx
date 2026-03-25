import { getLocaleFromCookie, getKudosTranslations, getWriteKudoTranslations } from "@/utils/i18n";
import { createClient } from "@/libs/supabase/server";
import { KudosHero } from "@/components/kudos/kudos-hero";
import { KudosActionBar } from "@/components/kudos/kudos-action-bar";
import { SpotlightSection } from "@/components/kudos/spotlight-section";
import { AllKudosSection } from "@/components/kudos/all-kudos-section";
import { SectionHeader } from "@/components/kudos/section-header";
import { KudosPageClient } from "@/components/kudos/kudos-page-client";
import type { SpotlightEntry, TopSunner } from "@/types/kudos";

async function getSpotlightData(): Promise<{ data: SpotlightEntry[]; total_kudos: number }> {
  try {
    const supabase = await createClient();
    const { data: kudos } = await supabase
      .from("kudos")
      .select("receiver_id, receiver:user_profiles!kudos_receiver_profile_fkey(full_name)");

    const counts = new Map<string, { name: string; count: number }>();
    for (const kudo of kudos ?? []) {
      const receiver = Array.isArray(kudo.receiver) ? kudo.receiver[0] : kudo.receiver;
      const name = receiver?.full_name ?? "Unknown";
      const existing = counts.get(kudo.receiver_id);
      if (existing) {
        existing.count++;
      } else {
        counts.set(kudo.receiver_id, { name, count: 1 });
      }
    }

    const entries = Array.from(counts.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 100);

    return { data: entries, total_kudos: kudos?.length ?? 0 };
  } catch {
    return { data: [], total_kudos: 0 };
  }
}

async function getTopReceivers(): Promise<TopSunner[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("secret_boxes")
      .select(`
        gift_description,
        user:user_profiles!secret_boxes_user_id_fkey(id, full_name, department_code, department_name, star_count, hero_badge, avatar_url)
      `)
      .eq("is_opened", true)
      .order("opened_at", { ascending: false })
      .limit(10);

    return (data ?? []).map((item) => ({
      profile: Array.isArray(item.user) ? item.user[0] : item.user,
      gift_description: item.gift_description ?? "",
    }));
  } catch {
    return [];
  }
}

export default async function KudosLiveBoardPage(): Promise<React.ReactElement> {
  const locale = await getLocaleFromCookie();
  const translations = getKudosTranslations(locale);
  const writeKudoT = getWriteKudoTranslations(locale);

  const [spotlightData, topReceivers] = await Promise.all([
    getSpotlightData(),
    getTopReceivers(),
  ]);

  return (
    <main className="relative w-full min-h-screen bg-[#00101A] overflow-x-hidden">
      {/* Hero + Action Bar */}
      <KudosHero tagline={translations.heroTagline} />
      <KudosActionBar
        writePlaceholder={translations.actionBarPlaceholder}
        searchPlaceholder={translations.searchPlaceholder}
        writeKudoTranslations={writeKudoT}
      />

      {/* Main content */}
      <div className="flex flex-col gap-12 xl:gap-16 pt-10 xl:pt-16 pb-12 xl:pb-16">
        {/* Highlight Kudos */}
        <KudosPageClient translations={translations} />

        {/* Spotlight Board */}
        <SpotlightSection
          data={spotlightData.data}
          totalKudos={spotlightData.total_kudos}
          translations={translations}
        />

        {/* All Kudos */}
        <div className="flex flex-col gap-10">
          <SectionHeader
            subtitle={translations.sectionSubtitle}
            title={translations.allKudosTitle}
          />
          <AllKudosSection
            sunners={topReceivers}
            translations={translations}
          />
        </div>
      </div>
    </main>
  );
}
