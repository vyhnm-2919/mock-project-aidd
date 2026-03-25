"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    fetch("/api/notifications/unread-count")
      .then((res) => res.json() as Promise<{ count: number }>)
      .then((data) => setUnreadCount(data.count))
      .catch(() => setUnreadCount(0));
  }, []);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        aria-label="Thông báo"
        aria-expanded={isPanelOpen}
        className="relative w-10 h-10 flex items-center justify-center rounded hover:bg-white/10 active:bg-white/15 focus:outline-2 focus:outline-white/50 focus:outline-offset-2 transition-colors cursor-pointer"
      >
        <Image
          src="/images/icons/bell.svg"
          alt=""
          width={24}
          height={24}
          aria-hidden="true"
        />
        {unreadCount > 0 && (
          <span
            className="absolute top-[6px] right-[6px] w-2 h-2 bg-[#D4271D] rounded-full"
            aria-label="Có thông báo mới"
          />
        )}
      </button>
      {isPanelOpen && (
        <div className="absolute top-full right-0 mt-1 min-w-[240px] bg-[rgba(11,15,18,0.95)] backdrop-blur-[10px] rounded border border-[#2E3940] p-4">
          <p className="text-sm text-white/60">Không có thông báo mới</p>
        </div>
      )}
    </div>
  );
}
