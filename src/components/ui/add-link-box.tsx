"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import type { AddLinkBoxProps } from "@/types/add-link";

function validateText(value: string, t: AddLinkBoxProps["translations"]): string | null {
  const trimmed = value.trim();
  if (!trimmed) return t.errorTextRequired;
  if (trimmed.length > 100) return t.errorTextMaxlength;
  return null;
}

function validateUrl(value: string, t: AddLinkBoxProps["translations"]): string | null {
  const trimmed = value.trim();
  if (!trimmed) return t.errorUrlRequired;
  if (!/^https?:\/\//i.test(trimmed)) return t.errorUrlInvalid;
  if (trimmed.length > 2048) return t.errorUrlMaxlength;
  return null;
}

export function AddLinkBox({
  isOpen,
  onSave,
  onCancel,
  initialText,
  initialUrl,
  translations: t,
}: AddLinkBoxProps): React.ReactElement | null {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState<{ text: string | null; url: string | null }>({
    text: null,
    url: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const textInputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // US2: Sync props → state when modal opens; reset on close
  useEffect(() => {
    if (isOpen) {
      setText(initialText ?? "");
      setUrl(initialUrl ?? "");
      setErrors({ text: null, url: null });
      setIsSubmitting(false);
      setTimeout(() => textInputRef.current?.focus(), 0);
    }
  }, [isOpen, initialText, initialUrl]);

  // US3: Escape key listener
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;
    function handleTab(e: KeyboardEvent): void {
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'input, button, [tabindex]:not([tabindex="-1"])'
      );
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
    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  const handleChange = useCallback(
    (field: "text" | "url") => (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (field === "text") setText(val);
      else setUrl(val);
      setErrors((prev) => ({ ...prev, [field]: null }));
    },
    []
  );

  const handleUrlBlur = useCallback((): void => {
    if (url.trim() && !/^https?:\/\//i.test(url.trim())) {
      setErrors((prev) => ({ ...prev, url: t.errorUrlInvalid }));
    }
  }, [url, t.errorUrlInvalid]);

  const handleSubmit = useCallback(
    (e: React.FormEvent): void => {
      e.preventDefault();
      const textError = validateText(text, t);
      const urlError = validateUrl(url, t);
      if (textError || urlError) {
        setErrors({ text: textError, url: urlError });
        if (textError) textInputRef.current?.focus();
        else {
          const urlInput = dialogRef.current?.querySelector<HTMLInputElement>("#addlink-url");
          urlInput?.focus();
        }
        return;
      }
      setIsSubmitting(true);
      onSave({ text: text.trim(), url: url.trim() });
    },
    [text, url, t, onSave]
  );

  if (!isOpen) return null;

  const inputBase =
    "flex-1 h-12 md:h-14 px-6 py-4 border rounded-lg bg-white font-montserrat text-base leading-6 text-[#00101A] outline-none transition-colors";
  const inputDefault = "border-[#998C5F] focus:border-2 focus:border-[#998C5F]";
  const inputError = "border-[#EF4444]";

  return (
    <div
      className="fixed inset-0 z-[250] flex items-center justify-center bg-[rgba(0,16,26,0.6)] transition-opacity duration-150"
      onClick={onCancel}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="addlink-title"
        className="z-[251] w-[calc(100vw-32px)] md:w-full max-w-[752px] p-6 md:p-10 bg-[#FFF8E1] rounded-2xl md:rounded-3xl flex flex-col gap-6 md:gap-8 transition-all duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="addlink-title"
          className="font-montserrat text-2xl md:text-[32px] font-bold leading-8 md:leading-10 text-[#00101A]"
        >
          {t.title}
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-6 md:gap-8">
            {/* B: Text field */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label
                htmlFor="addlink-text"
                className="font-montserrat text-lg md:text-[22px] font-bold leading-6 md:leading-7 text-[#00101A] whitespace-nowrap"
              >
                {t.labelText}
              </label>
              <div className="flex-1 flex flex-col">
                <input
                  ref={textInputRef}
                  id="addlink-text"
                  type="text"
                  value={text}
                  onChange={handleChange("text")}
                  aria-describedby={errors.text ? "addlink-text-error" : undefined}
                  className={`${inputBase} ${errors.text ? inputError : inputDefault}`}
                />
                {errors.text && (
                  <p
                    id="addlink-text-error"
                    role="alert"
                    className="mt-1 font-montserrat text-sm font-normal leading-5 text-[#EF4444] text-left"
                  >
                    {errors.text}
                  </p>
                )}
              </div>
            </div>

            {/* C: URL field */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label
                htmlFor="addlink-url"
                className="font-montserrat text-lg md:text-[22px] font-bold leading-6 md:leading-7 text-[#00101A] whitespace-nowrap"
              >
                {t.labelUrl}
              </label>
              <div className="flex-1 flex flex-col">
                <div className="relative">
                  <input
                    id="addlink-url"
                    type="url"
                    value={url}
                    onChange={handleChange("url")}
                    onBlur={handleUrlBlur}
                    aria-describedby={errors.url ? "addlink-url-error" : undefined}
                    className={`w-full ${inputBase} pr-12 ${errors.url ? inputError : inputDefault}`}
                  />
                  <Image
                    src="/images/icons/icon-link.svg"
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden="true"
                    className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 pointer-events-none"
                  />
                </div>
                {errors.url && (
                  <p
                    id="addlink-url-error"
                    role="alert"
                    className="mt-1 font-montserrat text-sm font-normal leading-5 text-[#EF4444] text-left"
                  >
                    {errors.url}
                  </p>
                )}
              </div>
            </div>

            {/* D: Button group */}
            <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6 items-stretch md:items-start">
              <button
                type="button"
                onClick={onCancel}
                aria-label={t.cancel}
                className="flex items-center justify-center gap-2 self-stretch px-10 py-4 border border-[#998C5F] rounded bg-[rgba(255,234,158,0.10)] font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-[#00101A] hover:bg-[rgba(255,234,158,0.25)] active:bg-[rgba(255,234,158,0.35)] focus:outline-2 focus:outline-[#998C5F] focus:outline-offset-2 transition-colors min-h-12 md:min-h-0"
              >
                {t.cancel}
                <Image
                  src="/images/icons/icon-close.svg"
                  alt=""
                  width={24}
                  height={24}
                  aria-hidden="true"
                />
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                aria-label={t.save}
                className="flex-1 flex items-center justify-center gap-2 py-4 px-4 bg-[#FFEA9E] rounded-lg font-montserrat text-lg md:text-[22px] font-bold leading-7 text-[#00101A] hover:bg-[#FFE078] hover:-translate-y-px active:bg-[#FFD54F] active:translate-y-0 focus:outline-2 focus:outline-[#FFEA9E] focus:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all min-h-12 md:min-h-0"
              >
                {t.save}
                <Image
                  src="/images/icons/icon-link.svg"
                  alt=""
                  width={24}
                  height={24}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
