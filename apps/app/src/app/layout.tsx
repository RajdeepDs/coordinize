import "@coordinize/ui/globals.css";
import { DesignSystemProvider } from "@coordinize/ui/providers";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
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
        <DesignSystemProvider>
          {children}
          <VercelAnalytics />
        </DesignSystemProvider>
      </body>
    </html>
  );
}
