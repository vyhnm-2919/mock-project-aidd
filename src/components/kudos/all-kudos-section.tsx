"use client";

import { useState, useEffect, useRef } from "react";
import type { TopSunner, KudosTranslations, KudosFeedFilters } from "@/types/kudos";
import { useKudosFeed } from "@/hooks/use-kudos-feed";
import { KudoPostCard } from "./kudo-post-card";
import { KudosSidebar } from "./kudos-sidebar";

interface AllKudosSectionProps {
  sunners: TopSunner[];
  translations: KudosTranslations;
}

export function AllKudosSection({ sunners, translations }: AllKudosSectionProps): React.ReactElement {
  const [filters, setFilters] = useState<KudosFeedFilters>({});
  const { kudos, isLoading, isLoadingMore, error, hasMore, loadMore, retry } = useKudosFeed(filters);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, loadMore]);

  function handleCategoryClick(category: string): void {
    setFilters((prev) => ({ ...prev, category: prev.category === category ? undefined : category }));
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 px-6 xl:px-36">
      {/* Feed column */}
      <div className="flex-1 flex flex-col gap-6" role="feed" aria-label="Danh sách kudos">
        {isLoading ? (
          // Skeleton cards
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-full h-[400px] bg-[#FFF8E1]/20 rounded-3xl animate-pulse" />
          ))
        ) : error ? (
          <div className="flex flex-col items-center gap-4 py-20">
            <p className="text-white/60 font-montserrat text-base">{error}</p>
            <button
              type="button"
              onClick={retry}
              className="px-6 py-3 bg-[#FFEA9E] rounded-lg font-montserrat text-base font-bold text-[#00101A] hover:bg-[#FFE078] cursor-pointer"
            >
              {translations.retry}
            </button>
          </div>
        ) : kudos.length === 0 ? (
          <p className="text-center text-white/60 font-montserrat text-base py-20">
            {translations.noKudos}
          </p>
        ) : (
          kudos.map((kudo) => (
            <KudoPostCard
              key={kudo.id}
              kudo={kudo}
              translations={translations}
              onCategoryClick={handleCategoryClick}
            />
          ))
        )}

        {/* Infinite scroll trigger */}
        <div ref={loadMoreRef} className="h-4" />

        {isLoadingMore && (
          <div className="flex justify-center py-4">
            <div className="w-8 h-8 border-2 border-[#FFEA9E] border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Sidebar */}
      <KudosSidebar sunners={sunners} translations={translations} />
    </div>
  );
}
