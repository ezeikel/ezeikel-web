import { Metadata } from 'next';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import HeaderHeightMeasurer from '@/components/HeaderMeasurer/HeaderMeasurer';
import './globals.css';
import Providers from './providers';

config.autoAddCss = false;

export const metadata: Metadata = {
  title: 'Ezeikel - London based Software Engineer',
  description: 'Developer, writer, and creator based in London, UK.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>
          <HeaderHeightMeasurer />
          <Header />
          <main className="flex-1 p-8">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
        {/* <!-- Google Tag Manager --> */}
        <Script
          id="gooogle-tag-manager"
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_MEASUREMENT_ID}`}
        />
        {/* <!-- Google Analytics --> */}
        <Script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        {/* <!-- Hotjar Tracking Code --> */}
        <Script
          id="hotjar"
          dangerouslySetInnerHTML={{
            __html: `
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${process.env.HOTJAR_ID},hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        />
      </body>
    </html>
  );
}
