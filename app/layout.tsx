import { Metadata } from 'next';
import Script from 'next/script';
import { config } from '@fortawesome/fontawesome-svg-core';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ezeikel - London based Software Engineer',
};

config.autoAddCss = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          {children}
          <Footer />
        </div>
        {/* <!-- Google Tag Manager --> */}
        <Script
          id="gooogle-tag-manager"
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        />
        {/* <!-- Google Analytics --> */}
        <Script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
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
                h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_ID},hjsv:6};
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
