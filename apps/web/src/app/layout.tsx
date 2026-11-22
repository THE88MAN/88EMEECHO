import type { Metadata } from "next";
import {
  Cinzel,
  Fraunces,
  Instrument_Sans,
  Source_Serif_4,
} from "next/font/google";
import { DemoBanner } from "@/components/DemoBanner";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const carton = Cinzel({
  variable: "--font-carton",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const sans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const serif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LE 88ÈME ÉCHO",
    template: "%s · LE 88ÈME ÉCHO",
  },
  description:
    "Média documentaire indépendant — histoire africaine, diasporas, mémoires oubliées, géopolitique. Domaine : 88emeecho.com.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${display.variable} ${carton.variable} ${sans.variable} ${serif.variable} min-h-screen bg-ink text-parchment antialiased`}
      >
        <DemoBanner />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
