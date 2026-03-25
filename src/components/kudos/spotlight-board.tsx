"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import type { SpotlightEntry } from "@/types/kudos";

interface SpotlightBoardProps {
  data: SpotlightEntry[];
  totalKudos: number;
  kudosLabel: string;
  searchPlaceholder: string;
}

interface NamePosition {
  name: string;
  count: number;
  x: number;
  y: number;
  fontSize: number;
}

export function SpotlightBoard({ data, totalKudos, kudosLabel, searchPlaceholder }: SpotlightBoardProps): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [positions, setPositions] = useState<NamePosition[]>([]);

  const calculatePositions = useCallback((): NamePosition[] => {
    if (data.length === 0) return [];
    const maxCount = Math.max(...data.map((d) => d.count));
    const minFont = 7;
    const maxFont = 14;

    return data.map((entry, i) => {
      const ratio = maxCount > 0 ? entry.count / maxCount : 0.5;
      const fontSize = minFont + ratio * (maxFont - minFont);
      // Distribute in a roughly circular/scattered pattern
      const angle = (i / data.length) * Math.PI * 2 + (i % 3) * 0.5;
      const radius = 0.15 + (i % 5) * 0.07 + Math.random() * 0.1;
      const x = 0.5 + Math.cos(angle) * radius;
      const y = 0.5 + Math.sin(angle) * radius;
      return { name: entry.name, count: entry.count, x, y, fontSize };
    });
  }, [data]);

  useEffect(() => {
    setPositions(calculatePositions());
  }, [calculatePositions]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear and darken background to make names stand out
    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = "rgba(0, 16, 26, 0.6)";
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Draw names
    const lowerQuery = searchQuery.toLowerCase();
    for (const pos of positions) {
      const isHighlighted = lowerQuery.length >= 2 && pos.name.toLowerCase().includes(lowerQuery);
      ctx.font = `700 ${pos.fontSize}px Montserrat, sans-serif`;
      ctx.fillStyle = isHighlighted ? "rgba(241, 118, 118, 1)" : "rgba(255, 255, 255, 0.8)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(pos.name, pos.x * rect.width, pos.y * rect.height);
    }
  }, [positions, searchQuery]);

  return (
    <div
      ref={containerRef}
      className="relative w-full xl:w-[1157px] h-[300px] md:h-[400px] xl:h-[548px] mx-auto border border-[#998C5F] rounded-[24px] xl:rounded-[47px] overflow-hidden bg-[#00101A] bg-cover bg-center"
      style={{ backgroundImage: "url(/images/kudos/kv-background.png)" }}
      role="img"
      aria-label={`Spotlight board hiển thị ${totalKudos} kudos`}
    >
      {/* Title */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        <span className="font-montserrat text-2xl md:text-[36px] font-bold leading-[44px] text-white">
          {totalKudos} {kudosLabel}
        </span>
      </div>

      {/* Search */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center gap-2 px-3 py-2 bg-[rgba(255,234,158,0.10)] border border-[#998C5F] rounded-[46px]">
          <Image src="/images/kudos/icon-search.svg" alt="" width={16} height={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="bg-transparent font-montserrat text-xs font-medium text-white placeholder:text-white/50 outline-none w-20 md:w-28"
            aria-label={searchPlaceholder}
          />
        </div>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
}
