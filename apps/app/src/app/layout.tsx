import "@coordinize/ui/globals.css";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { router } from "@/utils/upload";
import { extractRouterConfig } from "@coordinize/storage";
import { StorageSSRPlugin } from "@coordinize/storage/ssr";
import { DesignSystemProvider } from "@coordinize/ui/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Coordinize",
    default: "Coordinize",
  },
  description: "Modern communication platform for modern teams.",
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
        <StorageSSRPlugin routerConfig={extractRouterConfig(router)} />
        <DesignSystemProvider>
          {children}
          <VercelAnalytics />
        </DesignSystemProvider>
      </body>
    </html>
  );
}
