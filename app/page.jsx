import { Bricolage_Grotesque, Source_Sans_3, JetBrains_Mono } from 'next/font/google'
import Home from '../components/home/Home'
import './home.css'

const display = Bricolage_Grotesque({ subsets: ['latin'], weight: ['500', '700', '800'], variable: '--font-display', display: 'swap' })
const body = Source_Sans_3({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-body', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['500'], variable: '--font-mono', display: 'swap' })

export default function Page() {
  return <Home fontClass={`${display.variable} ${body.variable} ${mono.variable}`} />
}
