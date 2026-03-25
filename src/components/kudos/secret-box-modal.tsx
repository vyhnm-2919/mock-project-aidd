"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import type { SecretBox, OpenSecretBoxResponse, KudosTranslations } from "@/types/kudos";

interface SecretBoxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpened: (result: OpenSecretBoxResponse) => void;
  translations: KudosTranslations;
}

export function SecretBoxModal({ isOpen, onClose, onOpened, translations: t }: SecretBoxModalProps): React.ReactElement | null {
  const [boxes, setBoxes] = useState<SecretBox[]>([]);
  const [isOpening, setIsOpening] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const closeRef = useRef<HTMLButtonElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const count = boxes.length;

  // Fetch unopened boxes when modal opens
  useEffect(() => {
    if (!isOpen) return;
    setResult(null);
    setError(null);
    setIsOpening(false);

    fetch("/api/secret-box/unopened")
      .then((r) => r.json() as Promise<{ data: SecretBox[] }>)
      .then((data) => setBoxes(data.data ?? []))
      .catch(() => setBoxes([]));
  }, [isOpen]);

  // Escape key + body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    function handleEscape(e: KeyboardEvent): void {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    // Focus close button on open
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Focus trap: Tab cycles between close button and box image
  function handleKeyDown(e: React.KeyboardEvent): void {
    if (e.key !== "Tab") return;
    const focusable = [closeRef.current, boxRef.current].filter(Boolean) as HTMLElement[];
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  const handleOpenBox = useCallback(async (): Promise<void> => {
    if (isOpening || count === 0) return;
    setIsOpening(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/secret-box/open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ box_id: boxes[0].id }),
      });
      const data = await res.json() as OpenSecretBoxResponse & { error?: string };
      if (!res.ok || !data.success) {
        setError(t.secretBoxError);
        return;
      }
      setResult(data.gift_description || "🎁");
      setBoxes((prev) => prev.slice(1));
      onOpened(data);
    } catch {
      setError(t.secretBoxError);
    } finally {
      setIsOpening(false);
    }
  }, [isOpening, count, boxes, t.secretBoxError, onOpened]);

  function handleBoxKeyDown(e: React.KeyboardEvent): void {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpenBox();
    }
  }

  if (!isOpen) return null;

  const isDisabled = count === 0 && !isOpening;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[rgba(0,16,26,0.8)]" />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="secret-box-title"
        className="relative z-10 flex flex-col items-center gap-[22px] bg-[#00101A] rounded-[13px] p-6 px-3 w-full mx-4 md:mx-auto md:max-w-[652px] max-h-[calc(100vh-2rem)] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar */}
        <div className="flex items-center justify-between w-full">
          <h2
            id="secret-box-title"
            className="font-montserrat text-[26px] font-bold leading-8 text-[#FFEA9E] text-center flex-1"
          >
            {t.secretBoxTitle}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="w-5 h-5 flex items-center justify-center text-white hover:opacity-70 cursor-pointer shrink-0 focus:outline-2 focus:outline-[#FFEA9E] focus:outline-offset-2"
            aria-label="Đóng"
          >
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden="true">
              <path d="M14.25 4.75L4.75 14.25M4.75 4.75L14.25 14.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#2E3940]" />

        {/* Instruction / Result / Error */}
        {error ? (
          <p className="font-montserrat text-[13px] font-bold leading-[19px] tracking-[0.4px] text-[#EF4444] text-center">
            {error}
          </p>
        ) : result ? (
          <p className="font-montserrat text-[13px] font-bold leading-[19px] tracking-[0.4px] text-[#FFEA9E] text-center">
            {result}
          </p>
        ) : count > 0 ? (
          <p className="font-montserrat text-[13px] font-bold leading-[19px] tracking-[0.4px] text-white text-center">
            {t.secretBoxInstruction}
          </p>
        ) : null}

        {/* Box Image */}
        <div
          ref={boxRef}
          role="button"
          tabIndex={0}
          aria-label="Mở secret box"
          aria-disabled={isDisabled || isOpening}
          onClick={() => !isDisabled && !isOpening && handleOpenBox()}
          onKeyDown={handleBoxKeyDown}
          className={`relative w-full max-w-[557px] aspect-square transition-transform ${
            isDisabled
              ? "opacity-50 cursor-not-allowed"
              : isOpening
                ? "opacity-70 animate-pulse cursor-wait"
                : "cursor-pointer hover:scale-[1.02] hover:brightness-110 active:scale-[0.98]"
          }`}
        >
          <Image
            src="/images/kudos/secret-box-unopened.png"
            alt="Secret Box"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#2E3940]" />

        {/* Footer Count */}
        <div className="flex items-center gap-1.5">
          <span className="font-montserrat text-[13px] font-bold leading-[19px] tracking-[0.4px] text-white">
            {t.secretBoxUnopenedLabel}
          </span>
          <span className="font-montserrat text-[29px] font-bold leading-[35px] text-[#FFEA9E]">
            {String(count).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
