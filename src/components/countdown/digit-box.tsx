interface DigitBoxProps {
  digit: number;
}

export function DigitBox({ digit }: DigitBoxProps) {
  return (
    <div className="relative w-[45px] h-[72px] md:w-[60px] md:h-[96px] lg:w-[70px] lg:h-[112px] xl:w-[77px] xl:h-[123px]">
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          border: "0.75px solid rgba(255, 234, 158, 0.5)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.05) 100%)",
          backdropFilter: "blur(24.96px)",
          WebkitBackdropFilter: "blur(24.96px)",
          opacity: 0.5,
        }}
      />

      <span className="absolute inset-0 flex items-center justify-center font-digital-numbers text-[44px] md:text-[58px] lg:text-[67px] xl:text-[73.73px] text-white leading-none">
        {digit}
      </span>
    </div>
  );
}
