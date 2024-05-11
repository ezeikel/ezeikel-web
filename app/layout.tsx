import { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import PlausibleProvider from 'next-plausible';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import HeaderHeightMeasurer from '@/components/HeaderMeasurer/HeaderMeasurer';
import '@/global.css';
import Providers from './providers';

config.autoAddCss = false;

export const metadata: Metadata = {
  title: 'Ezeikel - London based Fullstack JavaScript Developer',
  description: 'Software Engineer, writer, and creator based in London, UK.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider domain="ezeikel.com" />
      </head>
      <body>
        <Providers>
          <HeaderHeightMeasurer />
          <Header />
          <main className="flex-1 p-8">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
