import type { HomepageTranslations } from "@/types/homepage";

interface EventInfoProps {
  translations: Pick<
    HomepageTranslations,
    | "eventTimeLabel"
    | "eventTimeValue"
    | "eventVenueLabel"
    | "eventVenueValue"
    | "livestreamNote"
  >;
}

export function EventInfo({ translations }: EventInfoProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col md:flex-row gap-4 md:gap-[60px]">
        <p>
          <span className="font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white">
            {translations.eventTimeLabel}{" "}
          </span>
          <span className="font-montserrat text-xl md:text-2xl font-bold leading-8 text-[#FFEA9E]">
            {translations.eventTimeValue}
          </span>
        </p>
        <p>
          <span className="font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-white">
            {translations.eventVenueLabel}{" "}
          </span>
          <span className="font-montserrat text-xl md:text-2xl font-bold leading-8 text-[#FFEA9E]">
            {translations.eventVenueValue}
          </span>
        </p>
      </div>
      <p className="font-montserrat text-base font-bold leading-6 tracking-[0.5px] text-white">
        {translations.livestreamNote}
      </p>
    </div>
  );
}
