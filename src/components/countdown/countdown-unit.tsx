import { DigitBox } from "./digit-box";

interface CountdownUnitProps {
  value: number;
  label: string;
}

export function CountdownUnit({ value, label }: CountdownUnitProps) {
  const tens = Math.floor(value / 10);
  const ones = value % 10;

  return (
    <div
      className="flex flex-col gap-2 md:gap-3 lg:gap-4 xl:gap-[21px]"
      aria-label={`${value} ${label.toLowerCase()}`}
    >
      <div className="flex gap-2 md:gap-3 lg:gap-4 xl:gap-[21px] items-center">
        <DigitBox digit={tens} />
        <DigitBox digit={ones} />
      </div>

      <span className="font-montserrat font-bold text-white text-base md:text-2xl lg:text-3xl xl:text-4xl xl:leading-[48px]">
        {label}
      </span>
    </div>
  );
}
