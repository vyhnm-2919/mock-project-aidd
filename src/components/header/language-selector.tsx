"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import type { Locale } from "@/types/auth";

interface LanguageSelectorProps {
  currentLocale: Locale;
}

const LANGUAGES: { value: Locale; label: string; flag: string }[] = [
  { value: "vi", label: "Tiếng Việt", flag: "/images/icons/flag-vn.svg" },
  { value: "en", label: "English", flag: "/images/icons/flag-en.svg" },
];

export function LanguageSelector({ currentLocale }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.value === currentLocale)!;

  const close = useCallback(() => {
    setIsOpen(false);
    setFocusedIndex(-1);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        close();
      }
    }

    function handleEscape(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        close();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [close]);

  function selectLocale(locale: Locale): void {
    document.cookie = `locale=${locale};path=/;max-age=31536000`;
    window.location.reload();
  }

  function handleKeyDown(event: React.KeyboardEvent): void {
    if (!isOpen) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setFocusedIndex((prev) =>
          prev < LANGUAGES.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setFocusedIndex((prev) =>
          prev > 0 ? prev - 1 : LANGUAGES.length - 1
        );
        break;
      case "Enter":
        event.preventDefault();
        if (focusedIndex >= 0) {
          selectLocale(LANGUAGES[focusedIndex].value);
        }
        break;
      case " ":
        event.preventDefault();
        if (focusedIndex >= 0) {
          selectLocale(LANGUAGES[focusedIndex].value);
        }
        break;
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex items-center gap-0.5 rounded px-4 py-4 hover:bg-white/10 active:bg-white/15 focus:outline-2 focus:outline-white/50 focus:outline-offset-2 transition-colors cursor-pointer"
      >
        <Image
          src={currentLang.flag}
          alt=""
          width={24}
          height={24}
          className="w-6 h-6"
          aria-hidden="true"
        />
        <span className="font-montserrat text-base font-bold leading-6 text-white tracking-[0.15px]">
          {currentLocale.toUpperCase()}
        </span>
        <Image
          src="/images/icons/chevron-down.svg"
          alt=""
          width={24}
          height={24}
          className={`w-6 h-6 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <ul
          role="listbox"
          aria-label="Select language"
          className="absolute top-full right-0 mt-1 z-50 bg-[#00070C] border border-[#998C5F] rounded-lg p-1.5 flex flex-col"
          onKeyDown={handleKeyDown}
        >
          {LANGUAGES.map((lang, index) => (
            <li
              key={lang.value}
              role="option"
              aria-selected={lang.value === currentLocale}
              aria-label={lang.label}
              onClick={() => selectLocale(lang.value)}
              className={`flex items-center gap-1 p-4 h-14 cursor-pointer transition-colors ${
                focusedIndex === index
                  ? "bg-[rgba(255,234,158,0.10)] rounded"
                  : "hover:bg-[rgba(255,234,158,0.10)] hover:rounded"
              } ${lang.value === currentLocale ? "bg-[rgba(255,234,158,0.20)] rounded-sm" : ""}`}
            >
              <Image
                src={lang.flag}
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
                aria-hidden="true"
              />
              <span className="font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white">
                {lang.value.toUpperCase()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
