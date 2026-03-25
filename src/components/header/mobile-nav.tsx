"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

interface MobileNavProps {
  links: { label: string; href: string; isActive: boolean }[];
}

export function MobileNav({ links }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        close();
      }
    }

    function handleEscape(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        close();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, close]);

  return (
    <div className="md:hidden" ref={panelRef}>
      {/* Hamburger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu điều hướng"
        aria-expanded={isOpen}
        className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded hover:bg-white/10 focus:outline-2 focus:outline-white/50 focus:outline-offset-2 transition-colors cursor-pointer"
      >
        <span
          className={`block w-5 h-0.5 bg-white transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`}
        />
        <span
          className={`block w-5 h-0.5 bg-white transition-opacity ${isOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`block w-5 h-0.5 bg-white transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
        />
      </button>

      {/* Slide-out panel */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            aria-hidden="true"
          />
          <nav
            aria-label="Mobile navigation"
            className="fixed top-0 right-0 h-full w-64 bg-[rgba(11,15,18,0.98)] backdrop-blur-[10px] border-l border-[#2E3940] z-50 p-6 pt-20 animate-[slideIn_200ms_ease-out]"
          >
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  aria-current={link.isActive ? "page" : undefined}
                  className={`px-4 py-3 rounded text-sm font-bold min-h-[44px] flex items-center transition-colors ${
                    link.isActive
                      ? "text-[#FFEA9E] bg-white/5"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
