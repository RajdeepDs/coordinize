import "@coordinize/ui/globals.css";
import { DesignSystemProvider } from "@coordinize/ui/providers";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://coordinize.tech"),
  title: "Coordinize",
  description: "Modern communication platform for modern teams.",
  twitter: {
    card: "summary_large_image",
    site: "@coordinize",
    creator: "@coordinize",
  },
  openGraph: {
    title: "Coordinize",
    description: "Modern communication platform for modern teams.",
    images: "/opengraph-image.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <DesignSystemProvider>
          {children}
          <VercelAnalytics />
          <SpeedInsights />
        </DesignSystemProvider>
      </body>
    </html>
  );
}
