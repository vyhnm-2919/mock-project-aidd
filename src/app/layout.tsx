import type { Metadata } from "next";
import { Montserrat, Montserrat_Alternates } from "next/font/google";
import localFont from "next/font/local";
import { getLocaleFromCookie } from "@/utils/i18n";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
});

const montserratAlt = Montserrat_Alternates({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700"],
  variable: "--font-montserrat-alt",
});

const digitalNumbers = localFont({
  src: "../fonts/DigitalNumbers-Regular.ttf",
  variable: "--font-digital-numbers",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SAA 2025 - Sun Annual Awards",
  description: "Sun Annual Awards 2025 - ROOT FURTHER",
  icons: {
    icon: { url: "/favicon.svg", type: "image/svg+xml" },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocaleFromCookie();

  return (
    <html lang={locale}>
      <body
        className={`${montserrat.variable} ${montserratAlt.variable} ${digitalNumbers.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
