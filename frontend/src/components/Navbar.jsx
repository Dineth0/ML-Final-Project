import { NavLink, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import StatusBadge from './StatusBadge'
import { useBackendStatus } from '../hooks/useBackendStatus'

const NAV_LINKS = [
  { to: '/',        label: 'Home'    },
  { to: '/predict', label: 'Predict' },
  { to: '/about',   label: 'About'   },
]

export default function Navbar() {
  const status = useBackendStatus()

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 h-16"
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Glass backdrop */}
      <div
        className="h-full border-b border-white/[0.06]"
        style={{
          background: 'rgba(5, 13, 26, 0.82)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group flex-shrink-0"
            aria-label="Water Potability Predictor — Home"
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center
                            bg-gradient-to-br from-teal-500/25 to-blue-600/25
                            border border-teal-500/30 group-hover:border-teal-400/50
                            transition-colors duration-200">
              <svg width="18" height="18" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                <path
                  d="M18 4 C18 4 6 16 6 23 C6 29.627 11.373 35 18 35 C24.627 35 30 29.627 30 23 C30 16 18 4 18 4Z"
                  fill="url(#navWaterGrad)"
                />
                <defs>
                  <linearGradient id="navWaterGrad" x1="18" y1="4" x2="18" y2="35" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span
              className="font-extrabold text-white text-sm sm:text-base hidden xs:block"
              style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.01em' }}
            >
              Aqua<span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">Predict</span>
            </span>
          </Link>

          {/* ── Nav links ── */}
          <nav className="flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ` +
                  (isActive
                    ? 'text-teal-300'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5')
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-teal-500/10 border border-teal-500/20"
                        transition={{ type: 'spring', stiffness: 380, damping: 35 }}
                        aria-hidden="true"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ── Status badge ── */}
          <div className="flex-shrink-0">
            <StatusBadge status={status} />
          </div>
        </div>
      </div>
    </motion.header>
  )
}
