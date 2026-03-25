"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import type { UserProfile, WriteKudoTranslations } from "@/types/kudos";
import type { LinkData } from "@/types/add-link";
import { ReceiverSearch } from "./receiver-search";
import { RichTextToolbar } from "./rich-text-toolbar";
import { KudoTextArea } from "./kudo-text-area";
import { HashtagSelector } from "./hashtag-selector";
import { ImageUploader } from "./image-uploader";
import { AddLinkBox } from "@/components/ui/add-link-box";
import { addLinkTranslations } from "@/utils/add-link-translations";

interface WriteKudoModalProps {
  isOpen: boolean;
  onClose: () => void;
  translations: WriteKudoTranslations;
  locale?: "vi" | "en";
}

export function WriteKudoModal({ isOpen, onClose, translations: t, locale = "vi" }: WriteKudoModalProps): React.ReactElement | null {
  const [receiver, setReceiver] = useState<UserProfile | null>(null);
  const [danhHieu, setDanhHieu] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAddLinkOpen, setIsAddLinkOpen] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

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

  function resetForm(): void {
    setReceiver(null);
    setDanhHieu("");
    setHashtags([]);
    setImages([]);
    setIsAnonymous(false);
    setErrors({});
    if (editorRef.current) editorRef.current.innerHTML = "";
  }

  function handleClose(): void {
    resetForm();
    onClose();
  }

  function validate(): boolean {
    const newErrors: Record<string, boolean> = {};
    if (!receiver) newErrors.receiver = true;
    if (!danhHieu.trim()) newErrors.danhHieu = true;
    const content = editorRef.current?.textContent?.trim() ?? "";
    if (!content) newErrors.content = true;
    if (hashtags.length < 1) newErrors.hashtags = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(): Promise<void> {
    if (!validate() || submitting) return;
    setSubmitting(true);
    setErrorMessage("");
    try {
      const res = await fetch("/api/kudos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiver_id: receiver!.id,
          danh_hieu: danhHieu,
          content: editorRef.current?.innerHTML ?? "",
          hashtags,
          images,
          is_anonymous: isAnonymous,
        }),
      });
      if (res.ok) {
        setShowToast(true);
        setTimeout(() => { setShowToast(false); handleClose(); }, 2000);
      } else {
        const data = await res.json().catch(() => ({ error: "Unknown error" })) as { error?: string };
        setErrorMessage(data.error ?? `Error ${res.status}`);
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const isFormComplete = receiver && danhHieu.trim() && hashtags.length >= 1;

  const handleAddLinkSave = useCallback((data: LinkData): void => {
    if (editorRef.current) {
      editorRef.current.focus();
      const link = document.createElement("a");
      link.href = data.url;
      link.textContent = data.text;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(link);
        range.setStartAfter(link);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        editorRef.current.appendChild(link);
      }
    }
    setIsAddLinkOpen(false);
  }, []);

  const handleAddLinkCancel = useCallback((): void => {
    setIsAddLinkOpen(false);
  }, []);

  if (!isOpen || !t) return null;

  return (
    <div className="fixed inset-0 z-[200]" role="dialog" aria-modal="true" aria-label={t.title}>
      <div className="absolute inset-0 bg-[rgba(0,16,26,0.8)]" onClick={handleClose} />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className="relative w-full md:w-[752px] max-h-[90vh] bg-[#FFF8E1] rounded-3xl p-6 md:p-10 flex flex-col gap-8 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Title */}
          <h2 className="font-montserrat text-2xl md:text-[32px] font-bold leading-tight md:leading-10 text-[#00101A] text-center">
            {t.title}
          </h2>

          {/* Người nhận */}
          <ReceiverSearch
            value={receiver}
            onChange={setReceiver}
            label={t.labelReceiver}
            placeholder={t.placeholderSearch}
            noResults={t.noResults}
            error={errors.receiver}
          />

          {/* Danh hiệu */}
          <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-6">
            <label className="font-montserrat text-[22px] font-bold leading-7 text-[#00101A] shrink-0">
              {t.labelDanhHieu}<span className="text-[#CF1322] ml-1">*</span>
            </label>
            <div className="flex-1">
              <input
                type="text"
                value={danhHieu}
                onChange={(e) => setDanhHieu(e.target.value)}
                placeholder={t.placeholderDanhHieu}
                className={`w-full border ${errors.danhHieu ? "border-[#CF1322]" : "border-[#998C5F] focus:border-[#FFEA9E]"} rounded-lg bg-white px-6 py-4 font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-[#00101A] placeholder:text-[#999] outline-none transition-colors`}
                aria-required="true"
              />
              <p className="mt-2 font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-[#999] whitespace-pre-line">
                {t.helperDanhHieu}
              </p>
            </div>
          </div>

          {/* Rich Text Editor */}
          <div>
            <RichTextToolbar editorRef={editorRef} communityStandardsLabel={t.communityStandards} onLinkClick={() => setIsAddLinkOpen(true)} />
            <KudoTextArea editorRef={editorRef} placeholder={t.placeholderContent} hint={t.helperMention} error={errors.content} />
          </div>

          {/* Hashtag */}
          <HashtagSelector
            hashtags={hashtags}
            onChange={setHashtags}
            label={t.labelHashtag}
            maxLabel={t.maxHashtag}
            error={errors.hashtags}
          />

          {/* Images */}
          <ImageUploader
            images={images}
            onChange={setImages}
            label={t.labelImage}
            maxLabel={t.maxImage}
          />

          {/* Anonymous checkbox */}
          <label className="flex items-center gap-4 cursor-pointer">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-6 h-6 border border-[#999] rounded bg-white accent-[#FFEA9E] cursor-pointer"
            />
            <span className="font-montserrat text-lg md:text-[22px] font-bold leading-7 text-[#999]">
              {t.checkboxAnonymous}
            </span>
          </label>

          {/* Error message */}
          {errorMessage && (
            <p className="font-montserrat text-sm font-bold text-[#CF1322] text-center">{errorMessage}</p>
          )}

          {/* Action buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex items-center justify-center gap-2 px-10 py-4 bg-[rgba(255,234,158,0.10)] border border-[#998C5F] rounded font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-[#00101A] hover:bg-[rgba(255,234,158,0.40)] transition-colors cursor-pointer"
            >
              {t.buttonCancel}
              <Image src="/images/kudos/icon-close.svg" alt="" width={24} height={24} />
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormComplete || submitting}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#FFEA9E] rounded-lg font-montserrat text-lg md:text-[22px] font-bold leading-7 text-[#00101A] hover:bg-[#FFE078] hover:-translate-y-0.5 focus:outline-2 focus:outline-[#FFEA9E] active:bg-[#FFD54F] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all cursor-pointer"
            >
              {submitting ? "..." : t.buttonSubmit}
              <span>▷</span>
            </button>
          </div>
        </div>
      </div>

      <AddLinkBox
        isOpen={isAddLinkOpen}
        onSave={handleAddLinkSave}
        onCancel={handleAddLinkCancel}
        translations={addLinkTranslations[locale]}
      />

      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] bg-[#00101A] border border-[#FFEA9E] text-white font-montserrat text-sm font-bold px-6 py-3 rounded-lg shadow-lg animate-[slideUp_0.3s_ease-out]">
          {t.successMessage}
        </div>
      )}
    </div>
  );
}
