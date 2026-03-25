"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type { UserProfile } from "@/types/kudos";

interface ReceiverSearchProps {
  value: UserProfile | null;
  onChange: (user: UserProfile) => void;
  label: string;
  placeholder: string;
  noResults: string;
  error?: boolean;
}

export function ReceiverSearch({ value, onChange, label, placeholder, noResults, error }: ReceiverSearchProps): React.ReactElement {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserProfile[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const cleanQuery = query.replace(/^@/, "");
    if (cleanQuery.length < 1) { setResults([]); return; }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const res = await fetch(`/api/users/search?q=${encodeURIComponent(cleanQuery)}`);
      if (res.ok) {
        const data = await res.json() as { data: UserProfile[] };
        setResults(data.data ?? []);
        setOpen(true);
      }
    }, 300);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const borderClass = error ? "border-[#CF1322]" : "border-[#998C5F] focus-within:border-[#FFEA9E]";

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
      <label className="font-montserrat text-[22px] font-bold leading-7 text-[#00101A] shrink-0">
        {label}<span className="text-[#CF1322] ml-1">*</span>
      </label>
      <div ref={ref} className="relative flex-1">
        <div className={`flex items-center justify-between border ${borderClass} rounded-lg bg-white px-6 py-4 transition-colors`}>
          <input
            type="text"
            value={value ? value.full_name : query}
            onChange={(e) => { setQuery(e.target.value); if (value) onChange(null as unknown as UserProfile); }}
            placeholder={placeholder}
            className="flex-1 font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-[#00101A] placeholder:text-[#999] outline-none bg-transparent"
            aria-required="true"
          />
          <Image src="/images/kudos/icon-search.svg" alt="" width={24} height={24} className="opacity-50" />
        </div>
        {open && results.length > 0 && (
          <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-[#998C5F] rounded-lg shadow-lg z-50 max-h-[200px] overflow-y-auto">
            {results.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => { onChange(user); setQuery(""); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[rgba(255,234,158,0.10)] cursor-pointer text-left"
              >
                <div className="w-8 h-8 rounded-full bg-[#EEE] overflow-hidden shrink-0">
                  {user.avatar_url && <Image src={user.avatar_url} alt="" width={32} height={32} className="w-full h-full object-cover" />}
                </div>
                <span className="font-montserrat text-sm font-bold text-[#00101A]">{user.full_name}</span>
                {user.department_code && <span className="font-montserrat text-xs text-[#999]">{user.department_code}</span>}
              </button>
            ))}
          </div>
        )}
        {open && query.length >= 1 && results.length === 0 && (
          <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-[#998C5F] rounded-lg shadow-lg z-50 px-4 py-3">
            <span className="font-montserrat text-sm text-[#999]">{noResults}</span>
          </div>
        )}
      </div>
    </div>
  );
}
