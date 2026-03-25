interface SectionTitleProps {
  subtitle: string;
  title: string;
}

export function AwardsSectionTitle({ subtitle, title }: SectionTitleProps) {
  return (
    <div className="block gap-4 w-full text-center">
      <p className="font-montserrat text-lg md:text-2xl font-bold leading-8 text-white">
        {subtitle}
      </p>
      <div className="h-px bg-[#2E3940] w-full" />
      <div className="block gap-8">
        <h1 className="font-montserrat text-[32px] md:text-[48px] xl:text-[57px] font-bold leading-tight md:leading-[56px] xl:leading-[64px] tracking-[-0.25px] text-[#FFEA9E]">
          {title}
        </h1>
      </div>
    </div>
  );
}
