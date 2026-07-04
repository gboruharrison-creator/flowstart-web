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
    'Flowstart AI costruisce Software Robot che eliminano il lavoro ripetitivo. Automazione AI per studi dentistici, studi legali e PMI italiane.',
  metadataBase: new URL('https://www.flowstart.it'),
  openGraph: {
    title: 'Flowstart AI — Agentic Infrastructure',
    description: 'Software Robot che ti Ridanno Tempo.',
    url: 'https://www.flowstart.it',
    siteName: 'Flowstart AI',
    locale: 'it_IT',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flowstart AI — Agentic Infrastructure',
    description: 'Software Robot che ti Ridanno Tempo.',
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
