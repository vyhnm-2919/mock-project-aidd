"use client";

import { useState } from "react";
import type { Kudo, KudosTranslations } from "@/types/kudos";
import { HighlightSection } from "./highlight-section";
import { KudoDetailModal } from "./kudo-detail-modal";

interface KudosPageClientProps {
  translations: KudosTranslations;
}

export function KudosPageClient({ translations }: KudosPageClientProps): React.ReactElement {
  const [selectedKudo, setSelectedKudo] = useState<Kudo | null>(null);

  return (
    <>
      <HighlightSection
        translations={translations}
        onDetailClick={setSelectedKudo}
      />

      <KudoDetailModal
        kudo={selectedKudo}
        onClose={() => setSelectedKudo(null)}
        translations={translations}
      />
    </>
  );
}
