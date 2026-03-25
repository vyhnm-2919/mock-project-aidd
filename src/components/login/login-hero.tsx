import { Suspense } from "react";
import Image from "next/image";
import type { LoginTranslations } from "@/types/auth";
import { LoginButton } from "./login-button";

interface LoginHeroProps {
  translations: LoginTranslations;
}

export function LoginHero({ translations }: LoginHeroProps) {
  return (
    <section className="relative z-10 flex flex-col px-6 md:px-20 xl:px-36 pt-44 xl:pt-[184px]">
      <div className="flex flex-col justify-center gap-20">
        <Image
          src="/images/login/root-further.png"
          alt="ROOT FURTHER"
          width={451}
          height={200}
          className="w-[280px] md:w-[360px] xl:w-[451px] h-auto"
          priority
        />
        <div className="flex flex-col gap-6 pl-4">
          <p className="font-montserrat text-base md:text-lg xl:text-xl font-bold leading-8 xl:leading-10 text-white tracking-[0.5px] whitespace-pre-line">
            {translations.heroDescription}
          </p>
          <Suspense
            fallback={
              <div className="h-[60px] w-full md:w-[305px] bg-[#FFEA9E]/20 rounded-lg animate-pulse" />
            }
          >
            <LoginButton
              label={translations.loginButton}
              errorMessages={{
                default: translations.errorDefault,
                domain: translations.errorDomain,
              }}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
