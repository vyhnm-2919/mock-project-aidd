"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

interface AwardsSidebarProps {
  awards: { slug: string; title: string }[];
  ariaLabel: string;
}

const VALID_SLUGS = [
  "top-talent",
  "top-project",
  "top-project-leader",
  "best-manager",
  "signature-creator",
  "mvp",
];

export function AwardsSidebar({ awards, ariaLabel }: AwardsSidebarProps) {
  const [activeSlug, setActiveSlug] = useState(awards[0]?.slug ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isClickScrolling = useRef(false);

  const handleClick = useCallback((slug: string) => {
    const section = document.getElementById(slug);
    if (!section) return;

    isClickScrolling.current = true;
    setActiveSlug(slug);
    section.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", `#${slug}`);

    setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  }, []);

  useEffect(() => {
    // Handle deep link on mount
    const hash = window.location.hash.slice(1);
    if (hash && VALID_SLUGS.includes(hash)) {
      setActiveSlug(hash);
      setTimeout(() => {
        const section = document.getElementById(hash);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }

    // Set up IntersectionObserver for scroll-spy
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    const sections = VALID_SLUGS.map((slug) =>
      document.getElementById(slug)
    ).filter(Boolean) as HTMLElement[];

    sections.forEach((section) => observerRef.current?.observe(section));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <>
      {/* Desktop: sticky vertical sidebar */}
      <nav
        aria-label={ariaLabel}
        aria-live="polite"
        className="hidden lg:flex flex-col gap-4 sticky top-24 w-[178px] flex-shrink-0 self-start"
      >
        {awards.map((award) => {
          const isActive = activeSlug === award.slug;
          return (
            <button
              key={award.slug}
              type="button"
              onClick={() => handleClick(award.slug)}
              aria-current={isActive ? "true" : undefined}
              className={`flex flex-row gap-1 items-center p-4 rounded text-left transition-colors focus-visible:outline-2 focus-visible:outline-white/50 ${
                isActive
                  ? "text-[#FFEA9E]"
                  : "text-white hover:bg-white/10 cursor-pointer"
              }`}
            >
              <Image
                src="/images/icons/target.svg"
                alt=""
                width={24}
                height={24}
                aria-hidden="true"
                className="flex-shrink-0"
              />
              <span className="font-montserrat text-sm font-bold leading-5">
                {award.title}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Mobile/Tablet: horizontal scroll tabs */}
      <nav
        aria-label={ariaLabel}
        className="lg:hidden flex flex-row gap-2 overflow-x-auto snap-x pb-4"
      >
        {awards.map((award) => {
          const isActive = activeSlug === award.slug;
          return (
            <button
              key={award.slug}
              type="button"
              onClick={() => handleClick(award.slug)}
              aria-current={isActive ? "true" : undefined}
              className={`flex flex-row gap-1 items-center p-3 rounded whitespace-nowrap snap-start min-h-[44px] transition-colors focus-visible:outline-2 focus-visible:outline-white/50 ${
                isActive
                  ? "text-[#FFEA9E] bg-white/5"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Image
                src="/images/icons/target.svg"
                alt=""
                width={20}
                height={20}
                aria-hidden="true"
                className="flex-shrink-0"
              />
              <span className="font-montserrat text-sm font-bold leading-5">
                {award.title}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
