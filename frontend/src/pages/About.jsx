import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import { WATER_PARAMS, SAFE_RANGES } from '../constants'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, delay, ease: [0.4, 0, 0.2, 1] } },
})

const TECH_STACK = [
  { name: 'React 18',      color: 'text-cyan-400',    bg: 'bg-cyan-500/10',    border: 'border-cyan-500/25',    icon: '⚛️' },
  { name: 'Vite 6',        color: 'text-purple-400',  bg: 'bg-purple-500/10',  border: 'border-purple-500/25',  icon: '⚡' },
  { name: 'Tailwind CSS',  color: 'text-teal-400',    bg: 'bg-teal-500/10',    border: 'border-teal-500/25',    icon: '🎨' },
  { name: 'Framer Motion', color: 'text-pink-400',    bg: 'bg-pink-500/10',    border: 'border-pink-500/25',    icon: '🎞️' },
  { name: 'FastAPI',       color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25', icon: '🚀' },
  { name: 'XGBoost',       color: 'text-orange-400',  bg: 'bg-orange-500/10',  border: 'border-orange-500/25',  icon: '🌲' },
  { name: 'Python 3.12',   color: 'text-yellow-400',  bg: 'bg-yellow-500/10',  border: 'border-yellow-500/25',  icon: '🐍' },
  { name: 'scikit-learn',  color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/25',    icon: '📐' },
]

const MODEL_STEPS = [
  { step: '01', title: 'Data Ingestion',       desc: 'Raw water quality measurements are fed in as a 9-feature vector.' },
  { step: '02', title: 'Preprocessing',        desc: 'Missing values filled with training medians; IQR outlier clipping applied; TDS log-transformed; pH binned into Acidic / Neutral / Alkaline.' },
  { step: '03', title: 'Feature Scaling',      desc: 'Standard scaler normalises all features to zero mean and unit variance.' },
  { step: '04', title: 'XGBoost Inference',    desc: 'Gradient-boosted ensemble of decision trees produces a probability score (0–1) for potability.' },
  { step: '05', title: 'Result & Explanation', desc: 'Probability is compared against WHO thresholds to flag out-of-range parameters and suggest treatments.' },
]

export default function About() {
  return (
    <PageTransition>
      <div className="bg-animated page-wrapper">
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-10 sm:py-14">

          {/* ─── Hero ─── */}
          <motion.div className="text-center mb-14" {...fadeUp(0)}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                            bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-medium mb-4">
              📖 About This Project
            </div>
            <h1
              className="text-3xl sm:text-4xl font-extrabold text-white mb-3"
              style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}
            >
              Understanding{' '}
              <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                Water Potability
              </span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              A deep dive into the science of safe drinking water, the ML model behind the predictions,
              and the technology stack powering this tool.
            </p>
          </motion.div>

          {/* ─── What is Potability ─── */}
          <motion.section className="glass-card p-6 sm:p-8 mb-8" {...fadeUp(0.1)} aria-labelledby="potability-heading">
            <h2 id="potability-heading" className="text-xl font-bold text-white mb-4 flex items-center gap-2"
                style={{ fontFamily: 'Outfit, sans-serif' }}>
              💧 What is Water Potability?
            </h2>
            <div className="space-y-3 text-sm text-slate-400 leading-relaxed">
              <p>
                <strong className="text-slate-200">Potability</strong> refers to the suitability of water for safe human consumption. Potable water
                is free from harmful concentrations of pathogens, toxic chemicals, and excessive minerals.
              </p>
              <p>
                The <strong className="text-slate-200">World Health Organization (WHO)</strong> defines safe drinking water as water that does
                not pose a significant risk to health when consumed over a lifetime, accounting for sensitive groups.
              </p>
              <p>
                Unsafe water is a global crisis — over <strong className="text-teal-400">2 billion people</strong> lack access to safely
                managed drinking water, contributing to diseases like cholera, dysentery, and typhoid.
              </p>
            </div>
          </motion.section>

          {/* ─── The 9 Parameters ─── */}
          <motion.section className="mb-8" {...fadeUp(0.15)} aria-labelledby="params-heading">
            <h2 id="params-heading" className="text-xl font-bold text-white mb-5 flex items-center gap-2"
                style={{ fontFamily: 'Outfit, sans-serif' }}>
              🔬 The 9 Water Quality Parameters
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {WATER_PARAMS.map((p, i) => (
                <motion.div
                  key={p.key}
                  className="glass-card p-4 flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                >
                  <span className="text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">{p.icon}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {p.label}{' '}
                      <span className="text-slate-500 font-normal text-xs">({p.unit})</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{p.description}</p>
                    {SAFE_RANGES[p.key] && (
                      <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-xs
                                       bg-teal-500/10 border border-teal-500/20 text-teal-400">
                        Safe: {SAFE_RANGES[p.key].label}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ─── ML Model Pipeline ─── */}
          <motion.section className="glass-card p-6 sm:p-8 mb-8" {...fadeUp(0.2)} aria-labelledby="model-heading">
            <h2 id="model-heading" className="text-xl font-bold text-white mb-6 flex items-center gap-2"
                style={{ fontFamily: 'Outfit, sans-serif' }}>
              🌲 The XGBoost Model Pipeline
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              <strong className="text-slate-200">XGBoost (Extreme Gradient Boosting)</strong> is an optimised gradient-boosted
              decision tree algorithm renowned for its speed and performance on tabular data. It builds an ensemble
              of weak learners (decision trees) sequentially, each correcting the errors of the previous one.
            </p>
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-teal-500/40 via-blue-500/30 to-transparent" aria-hidden="true" />
              <div className="space-y-5">
                {MODEL_STEPS.map((s) => (
                  <div key={s.step} className="flex items-start gap-4 pl-14 relative">
                    <div className="absolute left-0 w-12 h-12 rounded-full bg-gradient-to-br from-teal-500/20 to-blue-600/20
                                    border border-teal-500/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-teal-400">{s.step}</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">{s.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ─── Tech Stack ─── */}
          <motion.section className="mb-10" {...fadeUp(0.25)} aria-labelledby="tech-heading">
            <h2 id="tech-heading" className="text-xl font-bold text-white mb-5 flex items-center gap-2"
                style={{ fontFamily: 'Outfit, sans-serif' }}>
              🛠️ Technology Stack
            </h2>
            <div className="flex flex-wrap gap-3">
              {TECH_STACK.map((t) => (
                <div key={t.name}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${t.bg} ${t.border} ${t.color} text-sm font-medium`}>
                  <span aria-hidden="true">{t.icon}</span>
                  {t.name}
                </div>
              ))}
            </div>
          </motion.section>

          {/* ─── CTA ─── */}
          <motion.div className="text-center" {...fadeUp(0.3)}>
            <Link
              to="/predict"
              id="about-cta"
              className="btn-predict inline-flex items-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                <path d="M18 4 C18 4 6 16 6 23 C6 29.627 11.373 35 18 35 C24.627 35 30 29.627 30 23 C30 16 18 4 18 4Z" fill="currentColor"/>
              </svg>
              Try the Predictor →
            </Link>
          </motion.div>
        </div>

        <footer className="text-center pb-8 text-xs text-slate-700">
          Water Potability Predictor · React + FastAPI + XGBoost
        </footer>
      </div>
    </PageTransition>
  )
}
