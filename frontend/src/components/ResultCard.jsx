import { motion } from 'framer-motion'
import CircularGauge from './CircularGauge'
import { SAFE_RANGES, RECOMMENDATIONS } from '../constants'

/* ─── helper: check if a value is outside safe range ─── */
function getParamStatus(key, value) {
  const range = SAFE_RANGES[key]
  if (!range) return 'ok'
  const num = parseFloat(value)
  if (isNaN(num)) return 'ok'
  if (range.min !== undefined && num < range.min) return 'low'
  if (range.max !== undefined && num > range.max) return 'high'
  return 'ok'
}

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
}
const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export default function ResultCard({ result, inputs, params }) {
  const isPotable = result.prediction === 'Potable'
  const pct       = Math.round(result.probability * 100)

  const accent = isPotable
    ? { text: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/25', bar: 'from-emerald-500 to-teal-400' }
    : { text: 'text-red-400',     bg: 'bg-red-400/10',     border: 'border-red-400/25',     bar: 'from-red-500 to-orange-400' }

  /* ─── param breakdown ─── */
  const flagged = params
    .map((p) => ({ ...p, value: inputs[p.key], status: getParamStatus(p.key, inputs[p.key]) }))
    .filter((p) => p.status !== 'ok')

  const recommendations = [...new Set(flagged.map((p) => RECOMMENDATIONS[p.key]).filter(Boolean))]

  return (
    <motion.div
      variants={stagger}
      initial="initial"
      animate="animate"
      className={`glass-card p-6 border ${accent.border} shadow-2xl`}
      role="region"
      aria-label="Prediction Result"
    >
      {/* ── Top badge + headline ── */}
      <motion.div variants={fadeUp} className="text-center mb-6">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4 ${accent.bg} ${accent.text} border ${accent.border}`}>
          {isPotable ? '✅ Safe to Drink' : '⚠️ Unsafe — Treatment Required'}
        </div>

        <h2
          className={`text-4xl font-extrabold ${accent.text}`}
          style={{ fontFamily: 'Outfit, sans-serif', textShadow: isPotable ? '0 0 30px rgba(52,211,153,0.3)' : '0 0 30px rgba(248,113,113,0.3)' }}
        >
          {result.prediction}
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          {isPotable
            ? 'This water sample meets potability standards for drinking.'
            : 'This water sample does not meet safe drinking water standards.'}
        </p>
      </motion.div>

      {/* ── Gauge + confidence ── */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-6 mb-6">
        <CircularGauge probability={result.probability} isPotable={isPotable} />

        <div className="flex-1 w-full space-y-4">
          {/* Confidence bar */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1.5">
              <span>Confidence Level</span>
              <span className={`font-semibold ${accent.text}`}>{pct}%</span>
            </div>
            <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${accent.bar}`}
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`rounded-xl p-3 text-center ${accent.bg} border ${accent.border}`}>
              <p className="text-xs text-slate-400 mb-0.5">Prediction</p>
              <p className={`text-sm font-bold ${accent.text}`}>{result.prediction}</p>
            </div>
            <div className="rounded-xl p-3 text-center bg-white/5 border border-white/10">
              <p className="text-xs text-slate-400 mb-0.5">Probability Score</p>
              <p className="text-sm font-bold text-slate-200">{result.probability.toFixed(4)}</p>
            </div>
          </div>

          {/* Model note */}
          <div className="rounded-xl p-3 bg-white/3 border border-white/8 text-xs text-slate-400 leading-relaxed">
            {isPotable
              ? `XGBoost model predicts ${pct}% confidence this water is safe. Parameters appear within acceptable ranges.`
              : `XGBoost model predicts only ${pct}% potability. One or more parameters may exceed safe thresholds — treat water before use.`}
          </div>
        </div>
      </motion.div>

      {/* ── Parameter breakdown ── */}
      {flagged.length > 0 && (
        <motion.div variants={fadeUp} className="mb-6">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="text-amber-400">⚠</span> Out-of-Range Parameters
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {flagged.map((p) => (
              <div
                key={p.key}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5
                           bg-amber-400/5 border border-amber-400/20"
              >
                <span className="text-lg" aria-hidden="true">{p.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-amber-300 truncate">{p.label}</p>
                  <p className="text-xs text-slate-500">
                    Your value: <span className="text-amber-400 font-medium">{p.value} {p.unit}</span>
                    {' · '}Safe: <span className="text-slate-400">{SAFE_RANGES[p.key]?.label}</span>
                  </p>
                </div>
                <span className="text-xs font-bold text-amber-400 flex-shrink-0">
                  {p.status === 'high' ? '↑ HIGH' : '↓ LOW'}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Recommendations ── */}
      {recommendations.length > 0 && (
        <motion.div variants={fadeUp} className="mb-6">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="text-blue-400">💡</span> Treatment Recommendations
          </h3>
          <ul className="space-y-2">
            {recommendations.map((tip, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed
                                     rounded-xl px-3 py-2.5 bg-blue-500/5 border border-blue-500/15">
                <span className="text-blue-400 mt-0.5 flex-shrink-0">→</span>
                {tip}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Potable congratulatory message */}
      {isPotable && flagged.length === 0 && (
        <motion.div variants={fadeUp}
          className="rounded-xl px-4 py-3 bg-emerald-500/8 border border-emerald-500/20 text-xs text-emerald-300 leading-relaxed text-center">
          🎉 All 9 parameters are within safe ranges. This water appears safe for drinking!
        </motion.div>
      )}

      {/* ── Input summary grid ── */}
      {inputs && params && (
        <motion.div variants={fadeUp} className="mt-6">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Input Summary</h3>
          <div className="grid grid-cols-3 gap-2">
            {params.map((p) => {
              const st = getParamStatus(p.key, inputs[p.key])
              return (
                <div
                  key={p.key}
                  className={`rounded-lg p-2.5 flex flex-col gap-0.5 border
                    ${st !== 'ok'
                      ? 'bg-amber-400/5 border-amber-400/20'
                      : 'bg-white/3 border-white/6'}`}
                >
                  <span className="text-xs text-slate-500 truncate">{p.icon} {p.label}</span>
                  <span className={`text-sm font-semibold ${st !== 'ok' ? 'text-amber-300' : 'text-slate-200'}`}>
                    {inputs[p.key] || '–'}
                  </span>
                  <span className="text-xs text-slate-600">{p.unit}</span>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
