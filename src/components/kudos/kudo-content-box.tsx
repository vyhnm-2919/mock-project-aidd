interface KudoContentBoxProps {
  content: string;
  maxLines: 3 | 5;
}

export function KudoContentBox({ content, maxLines }: KudoContentBoxProps): React.ReactElement {
  const clampClass = maxLines === 3 ? "line-clamp-3" : "line-clamp-5";

  return (
    <div className="bg-[rgba(255,234,158,0.40)] border border-[#FFEA9E] rounded-xl px-6 py-4">
      <div
        className={`font-montserrat text-xl font-bold leading-8 text-[#00101A] text-justify ${clampClass} [&_a]:text-[#998C5F] [&_a]:underline`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
