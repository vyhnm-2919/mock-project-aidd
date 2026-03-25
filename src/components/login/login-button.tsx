"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/libs/supabase/client";

interface LoginButtonProps {
  label: string;
  errorMessages: {
    default: string;
    domain: string;
  };
}

export function LoginButton({ label, errorMessages }: LoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (errorParam === "domain_restricted") {
      setError(errorMessages.domain);
    } else if (errorParam === "auth_error") {
      setError(errorMessages.default);
    } else {
      setError(null);
    }
  }, [errorParam, errorMessages]);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(null), 5000);
    return () => clearTimeout(timer);
  }, [error]);

  async function handleLogin(): Promise<void> {
    setIsLoading(true);
    setError(null);

    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleLogin}
        disabled={isLoading}
        aria-label="Đăng nhập bằng Google"
        className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-4 min-h-[48px] bg-[#FFEA9E] rounded-lg font-montserrat text-base md:text-lg xl:text-[22px] font-bold leading-7 xl:leading-7 text-[#00101A] hover:bg-[#FFE078] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(255,234,158,0.4)] focus:outline-2 focus:outline-[#FFEA9E] focus:outline-offset-2 active:bg-[#FFD54F] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
      >
        <span>{label}</span>
        {isLoading ? (
          <svg
            className="animate-spin h-6 w-6 text-[#00101A]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <Image
            src="/images/icons/google.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
        )}
      </button>
      {error && (
        <p className="mt-3 text-sm font-normal leading-5 text-[#EF4444] font-montserrat">
          {error}
        </p>
      )}
    </div>
  );
}
