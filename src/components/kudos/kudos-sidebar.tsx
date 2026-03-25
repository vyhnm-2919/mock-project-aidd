import type { TopSunner, KudosTranslations } from "@/types/kudos";
import { KudosStats } from "./kudos-stats";
import { TopSunnerList } from "./top-sunner-list";

interface KudosSidebarProps {
  sunners: TopSunner[];
  translations: KudosTranslations;
}

export function KudosSidebar({ sunners, translations }: KudosSidebarProps): React.ReactElement {
  return (
    <aside className="w-full lg:w-[480px] xl:w-[520px] flex flex-col gap-6 shrink-0">
      <KudosStats translations={translations} />
      <TopSunnerList sunners={sunners} title={translations.topSunnerTitle} />
    </aside>
  );
}
