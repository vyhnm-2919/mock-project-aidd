"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface HashtagSelectorProps {
  hashtags: string[];
  onChange: (tags: string[]) => void;
  label: string;
  maxLabel: string;
  error?: boolean;
  disabled?: boolean;
  maxSelections?: number;
}

function PlusIcon(): React.ReactElement {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="#999" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon(): React.ReactElement {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="#998C5F" strokeWidth="2" />
      <path d="M8 12l3 3 5-5" stroke="#998C5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HashtagSelector({
  hashtags,
  onChange,
  label,
  maxLabel,
  error,
  disabled,
  maxSelections,
}: HashtagSelectorProps): React.ReactElement {
  const max = maxSelections ?? 5;
  const [options, setOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    fetch("/api/hashtags")
      .then((r) => r.json() as Promise<{ data: string[] }>)
      .then((data) => setOptions(data.data ?? []))
      .catch(() => setOptions([]));
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1);
    }
  }, [isOpen]);

  useEffect(() => {
    if (focusedIndex >= 0) {
      itemRefs.current[focusedIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [focusedIndex]);

  const toggleTag = useCallback(
    (tag: string): void => {
      if (hashtags.includes(tag)) {
        onChange(hashtags.filter((t) => t !== tag));
      } else if (hashtags.length < max) {
        onChange([...hashtags, tag]);
      }
    },
    [hashtags, onChange, max],
  );

  const isMaxReached = hashtags.length >= max;

  function handleTriggerKeyDown(e: React.KeyboardEvent): void {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIsOpen(true);
      setFocusedIndex(0);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  }

  function handlePanelKeyDown(e: React.KeyboardEvent): void {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % options.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + options.length) % options.length);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < options.length) {
          const tag = options[focusedIndex];
          const isDisabled = isMaxReached && !hashtags.includes(tag);
          if (!isDisabled) toggleTag(tag);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
    }
  }

  return (
    <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-6">
      <label className="font-montserrat text-[22px] font-bold leading-7 text-[#00101A] shrink-0">
        {label}
        <span className="ml-1 text-[#CF1322]">*</span>
      </label>
      <div className="flex flex-wrap items-center gap-2">
        {hashtags.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-[#FFEA9E] rounded-lg font-montserrat text-sm font-bold text-[#00101A]">
            #{tag}
            <button
              type="button"
              onClick={() => toggleTag(tag)}
              className="ml-1 text-[#00101A]/60 hover:text-[#00101A] cursor-pointer"
              aria-label={`Remove ${tag}`}
            >
              ✕
            </button>
          </span>
        ))}
        <div ref={wrapperRef} className="relative">
          <button
            ref={triggerRef}
            type="button"
            onClick={() => !disabled && setIsOpen((prev) => !prev)}
            onKeyDown={handleTriggerKeyDown}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            data-open={isOpen ? "" : undefined}
            data-error={error ? "" : undefined}
            className="flex items-center gap-2 h-12 px-2 py-1 border border-[#998C5F] rounded-lg bg-white hover:bg-[rgba(255,234,158,0.10)] data-[open]:bg-[rgba(255,234,158,0.15)] data-[error]:border-[#EF4444] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            <PlusIcon />
            <span className="flex flex-col items-start">
              <span className="font-montserrat text-[11px] font-bold leading-4 tracking-[0.5px] text-[#00101A]">
                {label}
              </span>
              <span className="font-montserrat text-[11px] font-bold leading-4 tracking-[0.5px] text-[#999]">
                {maxLabel}
              </span>
            </span>
          </button>

          {isOpen && (
            <div
              role="listbox"
              aria-multiselectable="true"
              aria-label={label}
              tabIndex={-1}
              onKeyDown={handlePanelKeyDown}
              className="absolute top-full left-0 mt-1.5 w-[318px] p-1.5 border border-[#998C5F] rounded-lg bg-[#00070C] flex flex-col max-h-[332px] overflow-y-auto z-50 scrollbar-dark"
            >
              {options.length === 0 ? (
                <p className="font-montserrat text-sm font-normal leading-5 text-[#999] py-4 text-center">
                  Không có hashtag nào
                </p>
              ) : (
                options.map((tag, index) => {
                  const isSelected = hashtags.includes(tag);
                  const isDisabled = isMaxReached && !isSelected;
                  const isFocused = focusedIndex === index;

                  return (
                    <button
                      key={tag}
                      ref={(el) => {
                        itemRefs.current[index] = el;
                      }}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={isDisabled}
                      onClick={() => !isDisabled && toggleTag(tag)}
                      className={`flex items-center justify-between min-h-[44px] md:min-h-[40px] px-4 cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-[rgba(255,234,158,0.20)] rounded-sm hover:bg-[rgba(255,234,158,0.30)]"
                          : "hover:bg-white/5"
                      } ${isDisabled ? "opacity-40 cursor-not-allowed pointer-events-none" : ""} ${
                        isFocused ? "outline outline-1 outline-white/40 -outline-offset-1" : ""
                      }`}
                    >
                      <span className="flex-1 font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white text-left">
                        #{tag}
                      </span>
                      {isSelected && (
                        <span className="shrink-0 ml-2">
                          <CheckIcon />
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
      <span aria-live="polite" className="absolute overflow-hidden w-px h-px m-[-1px] p-0 border-0" style={{ clip: "rect(0,0,0,0)" }}>
        {hashtags.length}/{max}
      </span>
    </div>
  );
}
