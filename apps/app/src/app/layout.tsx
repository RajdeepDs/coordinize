import '@coordinize/ui/globals.css';

import { extractRouterConfig } from '@coordinize/storage';
import { StorageSSRPlugin } from '@coordinize/storage/ssr';
import { DesignSystemProvider } from '@coordinize/ui/providers';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { GlobalsKeysProvider } from '@/components/providers/globals-keys-provider';
import { TRPCReactProvider } from '@/trpc/client';
import { router } from '@/utils/upload';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://coordinize.tech'),
  title: {
    template: '%s | Coordinize',
    default: 'Coordinize',
  },
  description: 'Modern communication platform for modern teams.',
  twitter: {
    title: 'Coordinize',
    description: 'Modern communication platform for modern teams.',
    card: 'summary_large_image',
    site: '@coordinize',
    images: '/opengraph-image.png',
  },
  openGraph: {
    title: 'Coordinize',
    description: 'Modern communication platform for modern teams.',
    url: 'https://coordinize.tech',
    siteName: 'Coordinize',
    type: 'website',
    locale: 'en_US',
    images: '/opengraph-image.png',
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
        <StorageSSRPlugin routerConfig={extractRouterConfig(router)} />
        <TRPCReactProvider>
          <DesignSystemProvider>
            <GlobalsKeysProvider />
            {children}
            <VercelAnalytics />
          </DesignSystemProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
