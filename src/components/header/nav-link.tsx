import Link from "next/link";

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
}

export function NavLink({ href, label, isActive }: NavLinkProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`px-4 py-4 font-montserrat text-sm font-bold leading-5 tracking-[0.1px] transition-colors ${
        isActive
          ? "text-[#FFEA9E] border-b border-[#FFEA9E] [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]"
          : "text-white rounded hover:bg-white/10"
      } focus:outline-2 focus:outline-white/50 focus:outline-offset-2`}
    >
      {label}
    </Link>
  );
}
