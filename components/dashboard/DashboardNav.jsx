'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LogoutButton from './LogoutButton'

export default function DashboardNav({ meta }) {
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard',          label: 'Panoramica' },
    { href: '/dashboard/settings', label: 'Impostazioni' },
  ]

  return (
    <nav style={{
      background: '#0b1222',
      borderBottom: '1px solid rgba(255,255,255,0.06)'
    }}>
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Left: logo + nav links */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              {meta.logoUrl ? (
                <img
                  src={meta.logoUrl}
                  alt={meta.businessName}
                  className="h-7 w-auto object-contain"
                />
              ) : (
                <div
                  style={{ background: 'var(--brand-primary)' }}
                  className="w-7 h-7 rounded-lg flex items-center
                             justify-center text-white font-bold
                             text-sm flex-shrink-0">
                  {meta.businessName.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="text-white font-semibold text-sm
                               tracking-tight hidden sm:block">
                {meta.businessName}
              </span>
            </div>

            <div className="flex items-center gap-1">
              {navItems.map(item => (
                <Link key={item.href} href={item.href}
                  className={`
                    px-3 py-1.5 rounded-lg text-sm
                    transition-all duration-150
                    ${pathname === item.href
                      ? 'text-white bg-white/[0.08]'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                    }
                  `}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: agent status + logout */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5
                            px-2.5 py-1 rounded-full
                            bg-slate-800/60 border border-white/[0.06]">
              <div
                style={{
                  width: 5, height: 5, borderRadius: '50%',
                  background: meta.isAgentActive
                    ? 'var(--brand-primary)'
                    : '#475569'
                }}
                className={meta.isAgentActive ? 'animate-pulse' : ''}
              />
              <span className="text-slate-400 text-xs">
                {meta.agentName}
              </span>
            </div>
            <LogoutButton />
          </div>

        </div>
      </div>
    </nav>
  )
}
