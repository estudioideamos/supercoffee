import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import { asset } from "@/lib/site";
import "./globals.css";
import "./premium.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const editorialSerif = Cormorant_Garamond({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const siteUrl = "https://estudioideamos.github.io/supercoffee/";
const socialImage =
  "https://estudioideamos.github.io/supercoffee/assets/img/hero-cinematic.webp";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Supercoffee — Café de especialidad",
  description:
    "Supercoffee: café de especialidad, tostado propio y una experiencia pensada para disfrutar sin apuro en Buenos Aires.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Supercoffee — Café de especialidad",
    description:
      "Café de especialidad, tostado propio y una experiencia pensada para disfrutar sin apuro en Buenos Aires.",
    url: siteUrl,
    siteName: "Supercoffee",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: socialImage,
        width: 1680,
        height: 945,
        alt: "La experiencia cinematográfica de Supercoffee",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Supercoffee — Café de especialidad",
    description:
      "Café de especialidad, tostado propio y una pausa bien hecha en Buenos Aires.",
    images: [socialImage],
  },
  icons: {
    icon: asset("/assets/img/favicon.svg"),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${editorialSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
