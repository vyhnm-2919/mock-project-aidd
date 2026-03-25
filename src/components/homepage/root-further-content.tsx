import Image from "next/image";
import type { RootFurtherContent as RootFurtherContentType } from "@/types/homepage";

interface RootFurtherContentProps {
  content: RootFurtherContentType;
}

export function RootFurtherContent({ content }: RootFurtherContentProps) {
  return (
    <section className="rounded-lg bg-[rgba(0,16,26,0.6)] px-6 md:px-[52px] xl:px-[104px] py-[60px] xl:py-[120px]">
      <div className="flex flex-col items-center gap-8">
        {/* ROOT FURTHER small logos */}
        <div className="flex items-center gap-4">
          <Image
            src="/images/homepage/root-further-small-further.png"
            alt="Further"
            width={290}
            height={67}
            className="w-[180px] md:w-[230px] xl:w-[290px] h-auto"
          />
          <span className="font-montserrat text-4xl md:text-5xl xl:text-6xl font-light text-white/50">/</span>
          <Image
            src="/images/homepage/root-further-small-root.png"
            alt="Root"
            width={189}
            height={67}
            className="w-[120px] md:w-[150px] xl:w-[189px] h-auto"
          />
        </div>

        {/* Paragraphs */}
        <div className="flex flex-col gap-8 w-full">
          {content.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="font-montserrat text-base md:text-xl xl:text-2xl font-bold leading-6 md:leading-8 text-white text-left"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Quote */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="font-montserrat text-base md:text-xl font-bold leading-8 text-white">
            {content.quote}
          </p>
          <p className="font-montserrat text-sm md:text-base font-bold leading-6 text-white/70">
            {content.quoteAttribution}
          </p>
        </div>

        {/* Paragraphs after quote */}
        {content.paragraphsAfterQuote.length > 0 && (
          <div className="flex flex-col gap-8 w-full">
            {content.paragraphsAfterQuote.map((paragraph, index) => (
              <p
                key={`after-${index}`}
                className="font-montserrat text-base md:text-xl xl:text-2xl font-bold leading-6 md:leading-8 text-white text-left"
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
