import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'

/* ─── animation helpers ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] } },
})

const STATS = [
  { icon: '🔬', value: '9',          label: 'Parameters Analyzed',  color: 'from-teal-500/20 to-teal-600/10',  border: 'border-teal-500/25' },
  { icon: '⚡', value: 'Real-time',  label: 'ML Prediction',         color: 'from-blue-500/20 to-blue-600/10',  border: 'border-blue-500/25' },
  { icon: '🌲', value: 'XGBoost',    label: 'Gradient Boost Model',  color: 'from-indigo-500/20 to-indigo-600/10', border: 'border-indigo-500/25' },
  { icon: '💧', value: 'WHO',        label: 'Safety Standards',      color: 'from-cyan-500/20 to-cyan-600/10',  border: 'border-cyan-500/25' },
]

const FEATURES = [
  {
    icon: '🎯',
    title: 'Accurate Predictions',
    desc: 'XGBoost classifier trained on thousands of water samples. Outputs probability scores for transparent, explainable results.',
  },
  {
    icon: '🚀',
    title: 'Instant Analysis',
    desc: 'Submit your parameters and get a prediction in milliseconds via the FastAPI backend — no waiting, no batch jobs.',
  },
  {
    icon: '📊',
    title: 'Parameter Breakdown',
    desc: 'Each result highlights which parameters exceed WHO safe limits and provides actionable water treatment recommendations.',
  },
]

export default function Home() {
  return (
    <PageTransition>
      <div className="bg-animated page-wrapper">
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 sm:py-20">

          {/* ─── Hero ─── */}
          <section className="text-center mb-20" aria-labelledby="hero-heading">
            {/* Animated water drop */}
            <motion.div
              className="inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-8
                         bg-gradient-to-br from-teal-500/20 to-blue-600/20 border border-teal-500/30"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1,   opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              aria-hidden="true"
            >
              <motion.svg
                width="52" height="52" viewBox="0 0 36 36" fill="none"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <path
                  d="M18 4 C18 4 6 16 6 23 C6 29.627 11.373 35 18 35 C24.627 35 30 29.627 30 23 C30 16 18 4 18 4Z"
                  fill="url(#heroGrad)"
                />
                <defs>
                  <linearGradient id="heroGrad" x1="18" y1="4" x2="18" y2="35" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </motion.div>

            <motion.div {...fadeUp(0.1)}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                              bg-teal-500/10 border border-teal-500/25 text-teal-400 text-xs font-medium mb-5">
                🧪 AI-Powered Water Safety Analysis
              </div>
            </motion.div>

            <motion.h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight"
              style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.03em' }}
              {...fadeUp(0.15)}
            >
              Is Your Water{' '}
              <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Safe to Drink?
              </span>
            </motion.h1>

            <motion.p
              className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-8"
              {...fadeUp(0.2)}
            >
              Enter 9 water quality parameters and our{' '}
              <span className="text-teal-400 font-medium">XGBoost machine learning model</span>{' '}
              instantly predicts whether your water is potable — with confidence scores and safety recommendations.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
              {...fadeUp(0.25)}
            >
              <Link
                to="/predict"
                id="hero-cta"
                className="btn-predict inline-flex items-center gap-2.5 text-base"
              >
                <svg width="20" height="20" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                  <path d="M18 4 C18 4 6 16 6 23 C6 29.627 11.373 35 18 35 C24.627 35 30 29.627 30 23 C30 16 18 4 18 4Z" fill="currentColor"/>
                </svg>
                Start Predicting
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link
                to="/about"
                className="px-5 py-3.5 rounded-xl text-sm font-medium text-slate-300 border border-slate-700
                           hover:bg-white/5 hover:border-slate-500 transition-all"
              >
                Learn More
              </Link>
            </motion.div>
          </section>

          {/* ─── Stat cards ─── */}
          <section className="mb-20" aria-labelledby="stats-heading">
            <h2 id="stats-heading" className="sr-only">Key Features</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  className={`glass-card p-5 text-center border ${s.border} bg-gradient-to-br ${s.color}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <div className="text-3xl mb-2" aria-hidden="true">{s.icon}</div>
                  <div className="text-xl font-extrabold text-white mb-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>{s.value}</div>
                  <div className="text-xs text-slate-400">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ─── Feature cards ─── */}
          <section className="mb-20" aria-labelledby="features-heading">
            <motion.div className="text-center mb-10" {...fadeUp(0.4)}>
              <h2
                id="features-heading"
                className="text-2xl sm:text-3xl font-bold text-white mb-3"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                How It Works
              </h2>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                A full-stack ML pipeline from raw water measurements to a clear potability verdict.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  className="glass-card p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.45 + i * 0.1 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <div className="text-3xl mb-4" aria-hidden="true">{f.icon}</div>
                  <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {f.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ─── Final CTA ─── */}
          <motion.section
            className="text-center glass-card p-10 border border-teal-500/15"
            {...fadeUp(0.5)}
            aria-labelledby="cta-heading"
          >
            <h2
              id="cta-heading"
              className="text-2xl sm:text-3xl font-extrabold text-white mb-3"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Ready to Analyze Your Water?
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              It only takes 30 seconds. Fill in the 9 parameters and get an instant AI-powered verdict.
            </p>
            <Link
              to="/predict"
              id="bottom-cta"
              className="btn-predict inline-flex items-center gap-2"
            >
              Open Predictor →
            </Link>
          </motion.section>
        </div>

        {/* Footer */}
        <footer className="text-center pb-8 text-xs text-slate-700">
          Water Potability Predictor · React + FastAPI + XGBoost
        </footer>
      </div>
    </PageTransition>
  )
}
