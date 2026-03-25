"use client";

import { useState, useEffect } from "react";
import type { HomepageTranslations } from "@/types/homepage";

interface CountdownProps {
  targetDate: string;
  translations: Pick<
    HomepageTranslations,
    "comingSoon" | "days" | "hours" | "minutes"
  >;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  isExpired: boolean;
}

function calculateTimeLeft(target: Date): TimeLeft {
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, isExpired: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    isExpired: false,
  };
}

function pad(n: number): [string, string] {
  const str = n.toString().padStart(2, "0");
  return [str[0], str[1]];
}

function DigitBox({ digit }: { digit: string }) {
  return (
    <div className="w-[40px] h-[65px] md:w-[51px] md:h-[82px] flex items-center justify-center rounded-lg border-[0.5px] border-[#FFEA9E] opacity-50 bg-[linear-gradient(180deg,#FFF_0%,rgba(255,255,255,0.10)_100%)] backdrop-blur-[16.64px]">
      <span className="font-digital-numbers text-[38px] md:text-[49px] font-normal text-white">
        {digit}
      </span>
    </div>
  );
}

function CountdownUnit({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const [d1, d2] = pad(value);
  return (
    <div className="flex flex-col items-center gap-3.5">
      <div className="flex gap-3.5">
        <DigitBox digit={d1} />
        <DigitBox digit={d2} />
      </div>
      <span className="font-montserrat text-lg md:text-2xl font-bold leading-8 text-white">
        {label}
      </span>
    </div>
  );
}

export function Countdown({ targetDate, translations }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(new Date(targetDate))
  );

  useEffect(() => {
    const target = new Date(targetDate);
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(target));
    }, 60000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!targetDate) return null;

  const ariaLabel = timeLeft.isExpired
    ? "Sự kiện đã diễn ra"
    : `Còn ${timeLeft.days} ngày ${timeLeft.hours} giờ ${timeLeft.minutes} phút`;

  return (
    <div
      role="timer"
      aria-live="polite"
      aria-label={ariaLabel}
      className="flex flex-col items-start gap-4"
    >
      {!timeLeft.isExpired && (
        <p className="font-montserrat text-lg md:text-2xl font-bold leading-8 text-white">
          {translations.comingSoon}
        </p>
      )}

      <div className="flex items-center gap-6 md:gap-10">
        <CountdownUnit
          value={timeLeft.days}
          label={translations.days}
        />
        <CountdownUnit
          value={timeLeft.hours}
          label={translations.hours}
        />
        <CountdownUnit
          value={timeLeft.minutes}
          label={translations.minutes}
        />
      </div>
    </div>
  );
}
