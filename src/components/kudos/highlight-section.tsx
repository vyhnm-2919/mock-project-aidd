"use client";

import { useState, useEffect, useCallback } from "react";
import type { Kudo, KudoHighlight, KudosTranslations } from "@/types/kudos";
import { SectionHeader } from "./section-header";
import { HashtagFilter } from "./hashtag-filter";
import { DepartmentFilter } from "./department-filter";
import { HighlightCarousel } from "./highlight-carousel";
import { HighlightKudoCard } from "./highlight-kudo-card";
import { CarouselPagination } from "./carousel-pagination";

interface HighlightSectionProps {
  translations: KudosTranslations;
  onDetailClick: (kudo: Kudo) => void;
}

export function HighlightSection({ translations, onDetailClick }: HighlightSectionProps): React.ReactElement {
  const [highlights, setHighlights] = useState<KudoHighlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hashtagFilter, setHashtagFilter] = useState<string | null>(null);
  const [departmentFilter, setDepartmentFilter] = useState<string | null>(null);

  const fetchHighlights = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (hashtagFilter) params.set("hashtag", hashtagFilter);
      if (departmentFilter) params.set("department", departmentFilter);
      const response = await fetch(`/api/kudos/highlights?${params.toString()}`);
      if (response.ok) {
        const data = await response.json() as { data: KudoHighlight[] };
        setHighlights(data.data);
        setCurrentIndex(0);
      }
    } catch {
      // Silently fail, show empty
    } finally {
      setLoading(false);
    }
  }, [hashtagFilter, departmentFilter]);

  useEffect(() => {
    fetchHighlights();
  }, [fetchHighlights]);

  return (
    <section className="flex flex-col gap-10" aria-live="polite" aria-label="Highlight Kudos">
      <SectionHeader
        subtitle={translations.sectionSubtitle}
        title={translations.highlightTitle}
        filterSlot={
          <>
            <HashtagFilter label={translations.filterHashtag} selected={hashtagFilter} onSelect={setHashtagFilter} />
            <DepartmentFilter label={translations.filterDepartment} selected={departmentFilter} onSelect={setDepartmentFilter} />
          </>
        }
      />

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#FFEA9E] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : highlights.length === 0 ? (
        <p className="text-center text-white/60 font-montserrat text-base py-20">
          {translations.noKudos}
        </p>
      ) : (
        <>
          <HighlightCarousel
            currentIndex={currentIndex}
            onIndexChange={setCurrentIndex}
            total={highlights.length}
          >
            {highlights.map((kudo) => (
              <HighlightKudoCard
                key={kudo.id}
                kudo={kudo}
                onDetailClick={onDetailClick}
                copyLinkLabel={translations.copyLink}
                viewDetailLabel={translations.viewDetail}
                toastMessage={translations.linkCopied}
              />
            ))}
          </HighlightCarousel>

          <CarouselPagination
            currentIndex={currentIndex}
            total={highlights.length}
            onPrev={() => setCurrentIndex((prev) => prev > 0 ? prev - 1 : highlights.length - 1)}
            onNext={() => setCurrentIndex((prev) => prev < highlights.length - 1 ? prev + 1 : 0)}
          />
        </>
      )}
    </section>
  );
}
