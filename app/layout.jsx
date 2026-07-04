import './globals.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import CookieBanner from '../components/CookieBanner';

export const metadata = {
  title: {
    default: 'Flowstart AI — Agentic Infrastructure per PMI Italiane',
    template: '%s | Flowstart AI',
  },
  description:
    'Software Robot che rispondono alle chiamate, prenotano appuntamenti ed eliminano lavoro ripetitivo. Attivi in 7 giorni.',
  metadataBase: new URL('https://www.flowstart.it'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Flowstart AI — Agentic Infrastructure',
    description: 'Software Robot per PMI italiane. Attivi in 7 giorni.',
    url: 'https://www.flowstart.it',
    siteName: 'Flowstart AI',
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flowstart AI',
    description: 'Software Robot per PMI italiane.',
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
