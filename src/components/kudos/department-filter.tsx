"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Department } from "@/types/kudos";

const FALLBACK_DEPARTMENTS: Department[] = [
  { code: "CEVC2", name: "CEVC2" },
  { code: "CEVC3", name: "CEVC3" },
  { code: "CEVC4", name: "CEVC4" },
  { code: "CEVC1", name: "CEVC1" },
  { code: "OPD", name: "OPD" },
  { code: "Infra", name: "Infra" },
];

interface DepartmentFilterProps {
  label: string;
  selected: string | null;
  onSelect: (value: string | null) => void;
}

export function DepartmentFilter({ label, selected, onSelect }: DepartmentFilterProps): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Department[]>(FALLBACK_DEPARTMENTS);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0, width: 200 });

  useEffect(() => {
    fetch("/api/departments")
      .then((r) => r.json() as Promise<{ data: Department[] }>)
      .then((data) => {
        const list = data.data ?? [];
        if (list.length > 0) setOptions(list);
      })
      .catch(() => {});
  }, []);

  const updatePosition = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setDropdownPos({
      top: rect.bottom + 8,
      right: window.innerWidth - rect.right,
      width: Math.max(rect.width, 160),
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    updatePosition();

    function handleClickOutside(e: MouseEvent): void {
      if (
        buttonRef.current?.contains(e.target as Node) ||
        dropdownRef.current?.contains(e.target as Node)
      ) return;
      setOpen(false);
    }
    function handleEscape(e: KeyboardEvent): void {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition]);

  const selectedName = options.find((o) => o.code === selected)?.name;

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-4 bg-[rgba(255,234,158,0.10)] border border-[#998C5F] rounded font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white hover:bg-[rgba(255,234,158,0.40)] focus:outline-2 focus:outline-white/50 focus:outline-offset-2 transition-colors cursor-pointer"
        aria-expanded={open}
        aria-label={label}
      >
        {selectedName ?? label}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M7 10l5 5 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          ref={dropdownRef}
          className="fixed max-h-[350px] overflow-y-auto bg-[#00070C] border border-[#998C5F] rounded-lg shadow-lg z-[100] p-1.5"
          style={{ top: dropdownPos.top, right: dropdownPos.right, width: dropdownPos.width }}
          role="listbox"
          aria-label={label}
        >
          <button
            type="button"
            role="option"
            aria-selected={!selected}
            onClick={() => { onSelect(null); setOpen(false); }}
            className={`w-full text-center p-4 rounded font-montserrat text-base font-bold tracking-[0.5px] cursor-pointer transition-colors ${!selected ? "bg-[rgba(255,234,158,0.10)] text-white [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]" : "text-white/60 hover:bg-[rgba(255,234,158,0.10)]"}`}
          >
            Tất cả
          </button>
          {options.map((dept) => (
            <button
              key={dept.code}
              type="button"
              role="option"
              aria-selected={selected === dept.code}
              onClick={() => { onSelect(dept.code); setOpen(false); }}
              className={`w-full text-center p-4 rounded font-montserrat text-base font-bold tracking-[0.5px] cursor-pointer transition-colors ${selected === dept.code ? "bg-[rgba(255,234,158,0.10)] text-white [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]" : "text-white hover:bg-[rgba(255,234,158,0.10)]"}`}
            >
              {dept.name}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
