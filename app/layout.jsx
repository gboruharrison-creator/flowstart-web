import './globals.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import CookieBanner from '../components/CookieBanner';

export const metadata = {
  title: {
    default: 'Flowstart — Siti web, software e assistenti AI per PMI',
    template: '%s | Flowstart',
  },
  description:
    'Siti web, e-commerce e software su misura, presenza su Google e assistenti AI che rispondono a chiamate e messaggi. Audit gratuito.',
  metadataBase: new URL('https://www.flowstart.it'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Flowstart — Siti web, software e assistenti AI',
    description: 'Ti trovano su Google. Ti rispondono anche quando sei occupato. Audit gratuito.',
    url: 'https://www.flowstart.it',
    siteName: 'Flowstart',
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flowstart',
    description: 'Siti web, software e assistenti AI per PMI italiane.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.flowstart.it' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="it" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
