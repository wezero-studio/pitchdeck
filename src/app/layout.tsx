import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./smooth-scroll";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Franchise Broker — Discover High-Potential Investment Opportunities",
  description:
    "Helping investors connect with established restaurant franchises through expert guidance, market insights, and a carefully curated portfolio of proven brands.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Franchise Broker — Discover High-Potential Investment Opportunities",
    description:
      "Helping investors connect with established restaurant franchises through expert guidance and a curated portfolio of proven brands.",
    url: "/",
    siteName: "Franchise Broker",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Franchise Broker — Discover High-Potential Investment Opportunities",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Franchise Broker — Discover High-Potential Investment Opportunities",
    description:
      "Helping investors connect with established restaurant franchises through expert guidance and a curated portfolio of proven brands.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${ibmPlexMono.variable}`}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
