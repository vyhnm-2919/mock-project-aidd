"use client";

import { useState } from "react";

interface KudoTextAreaProps {
  editorRef: React.RefObject<HTMLDivElement | null>;
  placeholder: string;
  hint: string;
  error?: boolean;
}

export function KudoTextArea({ editorRef, placeholder, hint, error }: KudoTextAreaProps): React.ReactElement {
  const [isEmpty, setIsEmpty] = useState(true);

  function handleInput(): void {
    const text = editorRef.current?.textContent?.trim() ?? "";
    setIsEmpty(text.length === 0);
  }

  const borderClass = error ? "border-[#CF1322]" : "border-[#998C5F]";

  return (
    <div>
      <div className="relative">
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          className={`min-h-[120px] md:min-h-[200px] border ${borderClass} rounded-b-lg bg-white pl-6 pr-4 py-4 font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-[#00101A] outline-none focus:border-[#FFEA9E] transition-colors -mt-px`}
          role="textbox"
          aria-multiline="true"
          aria-required="true"
        />
        {isEmpty && (
          <p className="absolute top-4 left-6 font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-[#999] pointer-events-none">
            {placeholder}
          </p>
        )}
      </div>
      <p className="mt-2 font-montserrat text-base font-bold leading-6 tracking-[0.5px] text-[#00101A] text-center">
        {hint}
      </p>
    </div>
  );
}
