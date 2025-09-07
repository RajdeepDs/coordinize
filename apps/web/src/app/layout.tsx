import { TRPCReactProvider } from "@/trpc/client";
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
    title: "Coordinize",
    description: "Modern communication platform for modern teams.",
    card: "summary_large_image",
    site: "@coordinize",
    images: "/opengraph-image.png",
  },
  openGraph: {
    title: "Coordinize",
    description: "Modern communication platform for modern teams.",
    url: "https://coordinize.tech",
    siteName: "Coordinize",
    type: "website",
    locale: "en_US",
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <TRPCReactProvider>
          <DesignSystemProvider>
            {children}
            <VercelAnalytics />
            <SpeedInsights />
          </DesignSystemProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
