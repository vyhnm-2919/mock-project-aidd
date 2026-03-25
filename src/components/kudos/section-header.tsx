interface SectionHeaderProps {
  subtitle: string;
  title: string;
  filterSlot?: React.ReactNode;
}

export function SectionHeader({ subtitle, title, filterSlot }: SectionHeaderProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-4 px-6 xl:px-36">
      <p className="font-montserrat text-lg md:text-2xl font-bold leading-8 text-white">
        {subtitle}
      </p>
      <div className="h-px bg-[#2E3940]" />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="font-montserrat text-4xl md:text-[48px] xl:text-[57px] font-bold leading-tight md:leading-[56px] xl:leading-[64px] tracking-[-0.25px] text-[#FFEA9E]">
          {title}
        </h2>
        {filterSlot && (
          <div className="flex items-center gap-2">{filterSlot}</div>
        )}
      </div>
    </div>
  );
}
