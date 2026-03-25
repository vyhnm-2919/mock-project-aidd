import Image from "next/image";
import { getLocaleFromCookie, getCountdownTranslations } from "@/utils/i18n";
import { CountdownTimer } from "@/components/countdown/countdown-timer";

export default async function CountdownPage() {
  const locale = await getLocaleFromCookie();
  const translations = getCountdownTranslations(locale);
  const targetDate = process.env.NEXT_PUBLIC_EVENT_START_DATE ?? "";

  return (
    <main className="relative w-full h-screen bg-[#00101A] overflow-hidden">
      <Image
        src="/images/countdown/bg-artwork.png"
        alt=""
        fill
        className="object-cover"
        priority
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(18deg, #00101A 15.48%, rgba(0,18,29,0.46) 52.13%, rgba(0,19,32,0) 63.41%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 md:px-8">
        <CountdownTimer targetDate={targetDate} translations={translations} />
      </div>
    </main>
  );
}
