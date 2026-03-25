"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import type { FabTranslations } from "@/types/fab";
import type { RulesTranslations, WriteKudoTranslations } from "@/types/kudos";
import { RulesModal } from "@/components/kudos/rules-modal";
import { WriteKudoModal } from "@/components/kudos/write-kudo-modal";

interface WidgetButtonProps {
  translations: FabTranslations;
  rulesTranslations: RulesTranslations;
  writeKudoTranslations: WriteKudoTranslations;
}

export function WidgetButton({ translations: t, rulesTranslations, writeKudoTranslations }: WidgetButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showWriteKudo, setShowWriteKudo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstActionRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setIsExpanded(false);
  }, [pathname]);

  // Click outside + Escape key (only when expanded)
  useEffect(() => {
    if (!isExpanded) return;

    function handleClickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsExpanded(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded]);

  // Focus first action button when expanding
  useEffect(() => {
    if (isExpanded) {
      firstActionRef.current?.focus();
    }
  }, [isExpanded]);

  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsExpanded(false);
    triggerRef.current?.focus();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed right-4 bottom-4 md:right-6 md:bottom-6 lg:right-8 lg:bottom-8 xl:right-[143px] xl:bottom-[120px] z-[60]"
      role="group"
      aria-label={t.ariaLabel}
    >
      {/* Expanded action buttons */}
      <div
        className={`flex flex-col items-end gap-5 mb-5 transition-all duration-200 ease-out ${
          isExpanded
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-5 pointer-events-none"
        }`}
      >
        {/* Thể lệ button */}
        <button
          ref={firstActionRef}
          type="button"
          onClick={() => { setShowRules(true); setIsExpanded(false); }}
          className="flex items-center gap-2 px-4 py-4 bg-[#FFEA9E] rounded-[4px] hover:bg-[#FFE078] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFEA9E] transition-all cursor-pointer"
          tabIndex={isExpanded ? 0 : -1}
        >
          <Image
            src="/images/icons/saa-icon.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
          <span className="font-montserrat text-2xl font-bold leading-8 text-[#00101A]">
            {t.theLe}
          </span>
        </button>

        {/* Viết KUDOS button */}
        <button
          type="button"
          onClick={() => { setShowWriteKudo(true); setIsExpanded(false); }}
          className="flex items-center gap-2 px-4 py-4 bg-[#FFEA9E] rounded-[4px] hover:bg-[#FFE078] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFEA9E] transition-all cursor-pointer"
          tabIndex={isExpanded ? 0 : -1}
        >
          <Image
            src="/images/icons/pen.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
          <span className="font-montserrat text-2xl font-bold leading-8 text-[#00101A]">
            {t.vietKudos}
          </span>
        </button>
      </div>

      {/* Trigger / Close button container - both occupy the same space */}
      <div className="relative flex justify-end">
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label={t.closeLabel}
          className={`absolute right-0 bottom-0 flex items-center justify-center w-14 h-14 bg-[#D4271D] rounded-full hover:bg-[#B91C14] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4271D] transition-all cursor-pointer ${
            isExpanded
              ? "opacity-100 pointer-events-auto scale-100"
              : "opacity-0 pointer-events-none scale-90"
          }`}
          tabIndex={isExpanded ? 0 : -1}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Collapsed trigger */}
        <button
          ref={triggerRef}
          type="button"
          onClick={handleToggle}
          aria-expanded={isExpanded}
          aria-haspopup="true"
          aria-label={t.ariaLabel}
          className={`flex items-center gap-2 px-4 py-4 bg-[#FFEA9E] rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287] hover:bg-[#FFE078] hover:scale-105 active:bg-[#FFD54F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFEA9E] transition-all cursor-pointer ${
            isExpanded
              ? "opacity-0 pointer-events-none scale-90"
              : "opacity-100 pointer-events-auto scale-100"
          }`}
        >
          <Image
            src="/images/icons/pen.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
          <span className="font-montserrat text-2xl font-bold leading-8 text-[#00101A]">
            /
          </span>
          <Image
            src="/images/icons/saa-icon.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Rules Modal */}
      <RulesModal
        isOpen={showRules}
        onClose={() => setShowRules(false)}
        onWriteKudos={() => { setShowRules(false); setShowWriteKudo(true); }}
        translations={rulesTranslations}
      />

      {/* Write Kudo Modal */}
      <WriteKudoModal
        isOpen={showWriteKudo}
        onClose={() => setShowWriteKudo(false)}
        translations={writeKudoTranslations}
      />
    </div>
  );
}
