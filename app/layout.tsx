import type { Metadata, Viewport } from "next";
import { Playfair_Display, Be_Vietnam_Pro, Dancing_Script } from "next/font/google";
import "@/styles/globals.css";
import { AppStateProvider } from "@/hooks/useAppState";
import { siteConfig } from "@/data/content";

const displayFont = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const handFont = Dancing_Script({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: `${siteConfig.name} | ${siteConfig.eventTitle}`,
  description: siteConfig.description,
  keywords: [
    "thiệp mời tốt nghiệp",
    "lễ tốt nghiệp",
    siteConfig.name,
    "graduation invitation",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.eventTitle}`,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: `${siteConfig.name} - Thiệp Mời Tốt Nghiệp`,
    images: [
      {
        url: "/assets/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: siteConfig.eventTitle,
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.eventTitle}`,
    description: siteConfig.description,
    images: ["/assets/images/og-cover.jpg"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/assets/images/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFF1E6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: siteConfig.eventTitle,
    startDate: siteConfig.graduationDateISO,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    description: siteConfig.description,
    organizer: {
      "@type": "Person",
      name: siteConfig.name,
    },
  };

  return (
    <html lang="vi" className={`${displayFont.variable} ${bodyFont.variable} ${handFont.variable}`}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-body">
        <AppStateProvider>{children}</AppStateProvider>
      </body>
    </html>
  );
}
