"use client";

import { useState, useRef, useCallback } from "react";

interface HeartToggleReturn {
  currentHearted: boolean;
  currentCount: number;
  toggle: () => void;
}

export function useHeartToggle(
  kudoId: string,
  initialHearted: boolean,
  initialCount: number
): HeartToggleReturn {
  const [currentHearted, setCurrentHearted] = useState(initialHearted);
  const [currentCount, setCurrentCount] = useState(initialCount);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingRef = useRef(false);

  const toggle = useCallback(() => {
    if (pendingRef.current) return;

    // Optimistic update
    const newHearted = !currentHearted;
    const newCount = newHearted ? currentCount + 1 : currentCount - 1;
    setCurrentHearted(newHearted);
    setCurrentCount(newCount);

    // Debounce API call
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      pendingRef.current = true;
      try {
        const response = await fetch(`/api/kudos/${kudoId}/heart`, {
          method: "POST",
        });

        if (!response.ok) {
          // Rollback on error
          setCurrentHearted(currentHearted);
          setCurrentCount(currentCount);
        } else {
          const data = await response.json() as { hearted: boolean; heart_count: number };
          setCurrentHearted(data.hearted);
          setCurrentCount(data.heart_count);
        }
      } catch {
        // Rollback on network error
        setCurrentHearted(currentHearted);
        setCurrentCount(currentCount);
      } finally {
        pendingRef.current = false;
      }
    }, 300);
  }, [kudoId, currentHearted, currentCount]);

  return { currentHearted, currentCount, toggle };
}
