import Image from "next/image";
import type { TopSunner } from "@/types/kudos";

interface TopSunnerListProps {
  sunners: TopSunner[];
  title: string;
}

export function TopSunnerList({ sunners, title }: TopSunnerListProps): React.ReactElement {
  return (
    <div className="bg-[#00070C] border border-[#998C5F] rounded-[17px] p-6 pr-4 flex flex-col gap-4">
      <h3 className="font-montserrat text-lg xl:text-[22px] font-bold leading-7 text-[#FFEA9E] text-center whitespace-pre-line">
        {title}
      </h3>

      <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-2" style={{ scrollbarWidth: "thin", scrollbarColor: "#999 transparent" }}>
        {sunners.map((sunner) => (
          <div key={sunner.profile.id} className="flex items-center gap-2 h-16">
            <div className="w-16 h-16 rounded-full border-[1.869px] border-white overflow-hidden bg-[#EEE] shrink-0">
              {sunner.profile.avatar_url ? (
                <Image
                  src={sunner.profile.avatar_url}
                  alt={sunner.profile.full_name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#999] text-xl font-bold">
                  {sunner.profile.full_name.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <p className="font-montserrat text-lg xl:text-[22px] font-bold leading-7 text-[#FFEA9E] truncate">
                {sunner.profile.full_name}
              </p>
              <p className="font-montserrat text-base font-bold leading-6 text-white truncate">
                {sunner.gift_description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
