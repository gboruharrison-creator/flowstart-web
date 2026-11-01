import './globals.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import CookieBanner from '../components/CookieBanner';

export const metadata = {
  title: {
    default: 'Flowstart — Presenza online e assistenti AI per PMI',
    template: '%s | Flowstart',
  },
  description:
    'Ti facciamo trovare su Google (scheda, sito, WhatsApp) e aggiungiamo un assistente AI che risponde a chiamate e messaggi e prenota appuntamenti. Audit gratuito.',
  metadataBase: new URL('https://www.flowstart.it'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Flowstart — Presenza online e assistenti AI',
    description: 'Ti trovano su Google. Ti rispondono anche quando sei occupato. Audit gratuito.',
    url: 'https://www.flowstart.it',
    siteName: 'Flowstart',
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flowstart',
    description: 'Presenza online e assistenti AI per PMI italiane.',
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
