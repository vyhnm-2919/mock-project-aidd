import Image from "next/image";
import type { UserProfile } from "@/types/kudos";

interface KudoUserInfoProps {
  user: UserProfile;
  showBadge?: boolean;
}

const BADGE_SHADOW: Record<string, string> = {
  "Legend Hero": "[text-shadow:0_0_1.3px_#FFF]",
  "Rising Hero": "[text-shadow:0_0.386px_1.543px_#000]",
  "New Hero": "[text-shadow:0_0.386px_1.543px_#000]",
};

export function KudoUserInfo({ user, showBadge = true }: KudoUserInfoProps): React.ReactElement {
  return (
    <div className="flex flex-col items-center gap-[13px] w-[235px]">
      <div className="w-16 h-16 rounded-full border-[1.869px] border-white overflow-hidden bg-[#EEE] shrink-0">
        {user.avatar_url ? (
          <Image
            src={user.avatar_url}
            alt={user.full_name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#999] text-xl font-bold">
            {user.full_name.charAt(0)}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-1">
        <p className="font-montserrat text-base font-bold leading-6 tracking-[0.15px] text-[#00101A] text-center truncate max-w-full">
          {user.full_name}
        </p>

        <div className="flex items-center gap-1 flex-wrap justify-center">
          {user.department_code && (
            <span className="font-montserrat text-sm font-bold leading-5 tracking-[0.1px] text-[#999]">
              {user.department_code}
            </span>
          )}

          {showBadge && user.hero_badge && (
            <>
              <span className="w-1 h-1 rounded-full bg-[#999] opacity-40" />
              <span
                className={`inline-flex items-center h-[19px] px-2 rounded-[48px] border-[0.5px] border-[#FFEA9E] bg-[linear-gradient(0deg,rgba(9,36,50,0.50)_0%,rgba(9,36,50,0.50)_100%)] font-montserrat text-[11.4px] font-bold text-white ${BADGE_SHADOW[user.hero_badge] ?? ""}`}
              >
                {user.hero_badge}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
