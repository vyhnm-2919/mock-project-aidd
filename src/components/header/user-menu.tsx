"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

interface UserMenuProps {
  translations: {
    menuProfile: string;
    menuSignOut: string;
  };
}

export function UserMenu({ translations }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const close = useCallback(() => {
    setIsOpen(false);
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

  async function handleSignOut(): Promise<void> {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu tài khoản"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="w-10 h-10 flex items-center justify-center rounded border border-[#998C5F] hover:bg-white/10 active:bg-white/15 focus:outline-2 focus:outline-white/50 focus:outline-offset-2 transition-colors cursor-pointer"
      >
        <Image
          src="/images/icons/user.svg"
          alt=""
          width={24}
          height={24}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div
          role="menu"
          className="absolute top-full right-0 mt-1 min-w-[180px] bg-[rgba(11,15,18,0.95)] backdrop-blur-[10px] rounded border border-[#2E3940] overflow-hidden"
        >
          <button
            type="button"
            role="menuitem"
            className="w-full flex items-center justify-between gap-2 px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            {translations.menuProfile}
            <Image
              src="/images/icons/user.svg"
              alt=""
              width={20}
              height={20}
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            className="w-full flex items-center justify-between gap-2 px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            {translations.menuSignOut}
            <Image
              src="/images/icons/logout.svg"
              alt=""
              width={20}
              height={20}
              aria-hidden="true"
            />
          </button>
        </div>
      )}
    </div>
  );
}
