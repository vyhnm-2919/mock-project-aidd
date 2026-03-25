"use client";

import { useCallback } from "react";

interface RichTextToolbarProps {
  editorRef: React.RefObject<HTMLDivElement | null>;
  communityStandardsLabel: string;
  onLinkClick?: () => void;
}

const COMMANDS = [
  { cmd: "bold", label: "B", className: "font-bold" },
  { cmd: "italic", label: "I", className: "italic" },
  { cmd: "strikeThrough", label: "S", className: "line-through" },
  { cmd: "insertOrderedList", label: "≡", className: "" },
  { cmd: "createLink", label: "🔗", className: "" },
  { cmd: "formatBlock", label: "❝", className: "" },
];

export function RichTextToolbar({ editorRef, communityStandardsLabel, onLinkClick }: RichTextToolbarProps): React.ReactElement {
  const execCommand = useCallback((cmd: string) => {
    editorRef.current?.focus();
    if (cmd === "createLink") {
      if (onLinkClick) {
        onLinkClick();
      } else {
        const url = prompt("URL:");
        if (url) document.execCommand(cmd, false, url);
      }
    } else if (cmd === "formatBlock") {
      document.execCommand(cmd, false, "blockquote");
    } else {
      document.execCommand(cmd, false);
    }
  }, [editorRef, onLinkClick]);

  return (
    <div className="flex items-stretch">
      {COMMANDS.map((c, idx) => (
        <button
          key={c.cmd}
          type="button"
          onClick={() => execCommand(c.cmd)}
          className={`flex items-center justify-center w-12 h-10 border border-[#998C5F] bg-transparent hover:bg-[rgba(255,234,158,0.10)] transition-colors cursor-pointer ${idx === 0 ? "rounded-tl-lg" : ""} ${idx > 0 ? "-ml-px" : ""}`}
          aria-pressed={false}
          aria-label={c.cmd}
        >
          <span className={`font-montserrat text-base font-bold text-[#00101A] ${c.className}`}>
            {c.label}
          </span>
        </button>
      ))}
      <div className="flex-1 flex items-center justify-end border border-[#998C5F] -ml-px rounded-tr-lg px-4">
        <a href="#" className="font-montserrat text-base font-bold leading-6 text-[#E46060] hover:underline">
          {communityStandardsLabel}
        </a>
      </div>
    </div>
  );
}
