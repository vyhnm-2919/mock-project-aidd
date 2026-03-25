import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - SAA 2025",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
