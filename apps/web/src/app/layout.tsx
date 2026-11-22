import type { Metadata } from "next";
import {
  Cinzel,
  Fraunces,
  Instrument_Sans,
  Source_Serif_4,
} from "next/font/google";
import { DemoBanner } from "@/components/DemoBanner";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  absoluteUrl,
  buildOpenGraph,
  buildTwitter,
  organizationJsonLd,
  SITE_DESCRIPTION,
  SITE_DOMAIN,
  SITE_NAME,
  SITE_URL,
} from "@/lib/distribution";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: `${SITE_DESCRIPTION} Domaine : ${SITE_DOMAIN}.`,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": absoluteUrl("/feed.xml"),
    },
  },
  openGraph: buildOpenGraph({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    path: "/",
  }),
  twitter: buildTwitter({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  }),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
        <SeoJsonLd data={organizationJsonLd()} />
        <DemoBanner />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
