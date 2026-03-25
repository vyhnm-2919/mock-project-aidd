"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { CountdownTranslations, CountdownTimeLeft } from "@/types/countdown";
import { CountdownUnit } from "./countdown-unit";

interface CountdownTimerProps {
  targetDate: string;
  translations: CountdownTranslations;
}

function calculateTimeLeft(target: Date): CountdownTimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
  };
}

export function CountdownTimer({
  targetDate,
  translations,
}: CountdownTimerProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<CountdownTimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const target = new Date(targetDate);

    if (isNaN(target.getTime()) || target.getTime() <= Date.now()) {
      router.push("/");
      return;
    }

    setTimeLeft(calculateTimeLeft(target));

    const intervalId = setInterval(() => {
      const updated = calculateTimeLeft(target);
      setTimeLeft(updated);

      if (
        updated.days === 0 &&
        updated.hours === 0 &&
        updated.minutes === 0
      ) {
        clearInterval(intervalId);
        router.push("/");
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [mounted, targetDate, router]);

  if (!mounted) {
    return (
      <div className="flex flex-col items-center gap-4 md:gap-5 xl:gap-6">
        <div className="h-[48px] w-[400px] max-w-full" />
        <div className="flex items-center gap-4 md:gap-8 lg:gap-[48px] xl:gap-[60px]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col gap-2 md:gap-3 lg:gap-4 xl:gap-[21px]">
              <div className="flex gap-2 md:gap-3 lg:gap-4 xl:gap-[21px]">
                <div className="w-[45px] h-[72px] md:w-[60px] md:h-[96px] lg:w-[70px] lg:h-[112px] xl:w-[77px] xl:h-[123px] rounded-xl bg-white/5" />
                <div className="w-[45px] h-[72px] md:w-[60px] md:h-[96px] lg:w-[70px] lg:h-[112px] xl:w-[77px] xl:h-[123px] rounded-xl bg-white/5" />
              </div>
              <div className="h-[48px] w-[100px] bg-white/5 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 md:gap-5 xl:gap-6">
      <h1 className="font-montserrat text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold italic xl:leading-[48px] text-white text-center">
        {translations.heading}
      </h1>

      <div role="timer" aria-live="polite" aria-atomic="true">
        <div className="flex items-center gap-4 md:gap-8 lg:gap-[48px] xl:gap-[60px]">
          <CountdownUnit
            value={timeLeft.days}
            label={translations.daysLabel}
          />
          <CountdownUnit
            value={timeLeft.hours}
            label={translations.hoursLabel}
          />
          <CountdownUnit
            value={timeLeft.minutes}
            label={translations.minutesLabel}
          />
        </div>
      </div>
    </div>
  );
}
