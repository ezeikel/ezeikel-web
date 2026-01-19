import type React from 'react';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import PlausibleProvider from 'next-plausible';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import './globals.css';

// Prevent FontAwesome from adding its CSS since we did it manually above
config.autoAddCss = false;

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'Ezeikel Pemberton | Software Engineer & Indie App Founder',
  description:
    'UK-based software engineer, indie app founder, and content creator. Building apps like Chunky Crayon and Parking Ticket Pal. Specializing in React, React Native, Expo, TypeScript, and AI.',
  keywords: [
    'software engineer',
    'indie hacker',
    'react native',
    'expo',
    'typescript',
    'content creator',
    'UK developer',
  ],
  authors: [{ name: 'Ezeikel Pemberton' }],
  creator: 'Ezeikel Pemberton',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://ezeikel.dev',
    title: 'Ezeikel Pemberton | Software Engineer & Indie App Founder',
    description:
      'UK-based software engineer, indie app founder, and content creator. Building apps and sharing the journey.',
    siteName: 'ezeikel.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ezeikel Pemberton | Software Engineer & Indie App Founder',
    description:
      'UK-based software engineer, indie app founder, and content creator.',
    creator: '@ezeikel',
  },
  generator: 'v0.app',
};

export const viewport: Viewport = {
  themeColor: '#f8f7f4',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <PlausibleProvider domain="ezeikel.dev">{children}</PlausibleProvider>
        <Analytics />
      </body>
    </html>
  );
}
