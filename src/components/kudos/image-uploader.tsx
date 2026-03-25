"use client";

import { useRef } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  images: string[];
  onChange: (urls: string[]) => void;
  label: string;
  maxLabel: string;
}

export function ImageUploader({ images, onChange, label, maxLabel }: ImageUploaderProps): React.ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File quá lớn. Tối đa 5MB.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload/image", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json() as { url: string };
        onChange([...images, data.url]);
      }
    } catch {
      alert("Lỗi upload ảnh. Vui lòng thử lại.");
    }

    if (inputRef.current) inputRef.current.value = "";
  }

  function removeImage(idx: number): void {
    onChange(images.filter((_, i) => i !== idx));
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
      <label className="font-montserrat text-[22px] font-bold leading-7 text-[#00101A] shrink-0">
        {label}
      </label>
      <div className="flex items-center gap-4 flex-wrap">
        {images.map((url, idx) => (
          <div key={url} className="relative w-20 h-20 rounded-[18px] border border-[#998C5F] bg-white overflow-hidden shrink-0">
            <Image src={url} alt={`Ảnh ${idx + 1}`} width={80} height={80} className="w-full h-full object-cover rounded border border-[#FFEA9E]" />
            <button
              type="button"
              onClick={() => removeImage(idx)}
              className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-[#D4271D] text-white text-xs font-bold cursor-pointer"
              aria-label={`Xóa ảnh ${idx + 1}`}
            >
              ✕
            </button>
          </div>
        ))}
        {images.length < 5 && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex items-center gap-1 px-2 py-1 border border-[#998C5F] bg-white rounded-lg hover:bg-[rgba(255,234,158,0.10)] cursor-pointer"
          >
            <span className="text-[#999] text-lg">+</span>
            <span className="flex flex-col">
              <span className="font-montserrat text-[11px] font-bold leading-4 tracking-[0.5px] text-[#00101A]">{label}</span>
              <span className="font-montserrat text-[11px] font-bold leading-4 tracking-[0.5px] text-[#999]">{maxLabel}</span>
            </span>
          </button>
        )}
        <input ref={inputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
      </div>
    </div>
  );
}
