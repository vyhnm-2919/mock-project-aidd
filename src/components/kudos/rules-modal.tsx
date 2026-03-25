"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { RulesTranslations } from "@/types/kudos";
import { RulesContent } from "./rules-content";

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWriteKudos?: () => void;
  translations: RulesTranslations;
}

export function RulesModal({ isOpen, onClose, onWriteKudos, translations: t }: RulesModalProps): React.ReactElement | null {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(e: KeyboardEvent): void {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !t) return null;

  function handleWriteKudos(): void {
    onClose();
    if (onWriteKudos) {
      onWriteKudos();
    } else {
      alert("Viết KUDOS — coming soon");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[200]"
      role="dialog"
      aria-modal="true"
      aria-label={t.title}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[rgba(0,16,26,0.6)]"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="absolute right-0 top-0 w-full md:w-[553px] h-full bg-[#00070C] flex flex-col animate-[slideInRight_0.3s_ease-out]"
        style={{ padding: "24px 40px 40px 40px" }}
      >
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto pr-2" style={{ scrollbarWidth: "thin", scrollbarColor: "#998C5F transparent" }}>
          <RulesContent translations={t} />
        </div>

        {/* Footer buttons — sticky */}
        <div className="flex gap-4 pt-6 shrink-0">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center gap-2 px-4 py-4 bg-[rgba(255,234,158,0.10)] border border-[#998C5F] rounded font-montserrat text-base font-bold leading-6 tracking-[0.5px] text-white hover:bg-[rgba(255,234,158,0.40)] focus:outline-2 focus:outline-white/50 focus:outline-offset-2 transition-colors cursor-pointer"
          >
            <Image src="/images/kudos/icon-close.svg" alt="" width={24} height={24} />
            {t.buttonClose}
          </button>

          {/* Write KUDOS button */}
          <button
            type="button"
            onClick={handleWriteKudos}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-4 bg-[#FFEA9E] rounded font-montserrat text-base font-bold leading-6 tracking-[0.5px] text-[#00101A] hover:bg-[#FFE078] hover:-translate-y-0.5 focus:outline-2 focus:outline-[#FFEA9E] focus:outline-offset-2 active:bg-[#FFD54F] transition-all cursor-pointer"
          >
            <Image src="/images/kudos/icon-write.svg" alt="" width={24} height={24} />
            {t.buttonWriteKudos}
          </button>
        </div>
      </div>
    </div>
  );
}
