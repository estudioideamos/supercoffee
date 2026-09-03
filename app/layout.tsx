import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { asset } from "@/lib/site";
import "./globals.css";
import "./premium.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Supercoffee — Café de especialidad",
  description:
    "Supercoffee: café de especialidad, tostado propio y una experiencia pensada para disfrutar sin apuro en Buenos Aires.",
  icons: {
    icon: asset("/assets/img/favicon.svg"),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
