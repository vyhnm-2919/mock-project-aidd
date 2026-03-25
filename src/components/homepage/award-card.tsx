import Image from "next/image";
import Link from "next/link";
import type { AwardItem } from "@/types/homepage";

interface AwardCardProps {
  award: AwardItem;
  detailLabel: string;
}

export function AwardCard({ award, detailLabel }: AwardCardProps) {
  return (
    <Link
      href={`/awards#${award.slug}`}
      className="group flex flex-col gap-6 hover:-translate-y-1 focus:outline-2 focus:outline-[#FFEA9E] focus:outline-offset-4 rounded-lg transition-transform"
    >
      <div className="relative w-full aspect-square rounded-3xl border border-[#FFEA9E] shadow-[0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287] overflow-hidden group-hover:shadow-[0_4px_8px_rgba(0,0,0,0.3),0_0_12px_#FAE287] transition-shadow">
        <Image
          src={award.image}
          alt={award.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 336px"
          className="object-contain"
        />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-montserrat text-2xl font-normal leading-8 text-[#FFEA9E]">
          {award.title}
        </h3>
        <p className="font-montserrat text-base font-normal leading-6 tracking-[0.5px] text-white line-clamp-2">
          {award.description}
        </p>
        <span className="inline-flex items-center gap-1 py-4 font-montserrat text-base font-medium leading-6 tracking-[0.15px] text-white group-hover:text-[#FFEA9E] group-hover:underline transition-colors">
          {detailLabel}
          <Image
            src="/images/icons/arrow-up-right.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
