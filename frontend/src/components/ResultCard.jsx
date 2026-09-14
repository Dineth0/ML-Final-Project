import CircularGauge from './CircularGauge'

/**
 * ResultCard — displays prediction result with gauge and parameter breakdown.
 */
export default function ResultCard({ result, inputs, params }) {
  const isPotable = result.prediction === 'Potable'
  const pct = Math.round(result.probability * 100)

  const accentColor = isPotable
    ? { text: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/25', glow: 'shadow-emerald-500/20' }
    : { text: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/25', glow: 'shadow-red-500/20' }

  return (
    <div
      className={`result-card glass-card p-6 border ${accentColor.border} shadow-2xl ${accentColor.glow}`}
      role="region"
      aria-label="Prediction Result"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4 ${accentColor.bg} ${accentColor.text} border ${accentColor.border}`}>
          {isPotable ? '✅ Safe' : '⚠️ Unsafe'}
        </div>

        <h2
          className={`font-display text-4xl font-extrabold ${accentColor.text}`}
          style={{ fontFamily: 'Outfit, sans-serif', textShadow: isPotable ? '0 0 30px rgba(52,211,153,0.3)' : '0 0 30px rgba(248,113,113,0.3)' }}
        >
          {result.prediction}
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          {isPotable
            ? 'This water meets potability standards.'
            : 'This water does not meet potability standards.'}
        </p>
      </div>

      {/* Gauge + bar section */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
        {/* Circular gauge */}
        <CircularGauge probability={result.probability} isPotable={isPotable} />

        {/* Info panel */}
        <div className="flex-1 w-full space-y-4">
          {/* Confidence bar */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1.5">
              <span>Confidence Level</span>
              <span className={`font-semibold ${accentColor.text}`}>{pct}%</span>
            </div>
            <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${isPotable ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-red-500 to-orange-400'}`}
                style={{ width: `${pct}%` }}
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`rounded-xl p-3 text-center ${accentColor.bg} border ${accentColor.border}`}>
              <p className="text-xs text-slate-400 mb-0.5">Prediction</p>
              <p className={`text-sm font-bold ${accentColor.text}`}>{result.prediction}</p>
            </div>
            <div className="rounded-xl p-3 text-center bg-white/5 border border-white/10">
              <p className="text-xs text-slate-400 mb-0.5">Probability Score</p>
              <p className="text-sm font-bold text-slate-200">{result.probability.toFixed(4)}</p>
            </div>
          </div>

          {/* Interpretation */}
          <div className="rounded-xl p-3 bg-white/3 border border-white/8 text-xs text-slate-400 leading-relaxed">
            {isPotable
              ? `The ML model predicts ${pct}% confidence that this water sample is safe for drinking. All parameters appear within acceptable ranges.`
              : `The ML model predicts only ${pct}% potability probability. One or more parameters may exceed safe thresholds. Treat water before use.`}
          </div>
        </div>
      </div>

      {/* Parameter summary */}
      {inputs && params && (
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Input Parameters</h3>
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
            {params.map((p) => (
              <div key={p.key} className="rounded-lg p-2.5 bg-white/3 border border-white/6 flex flex-col gap-0.5">
                <span className="text-xs text-slate-500">{p.icon} {p.label}</span>
                <span className="text-sm font-semibold text-slate-200">{inputs[p.key] || '–'}</span>
                <span className="text-xs text-slate-600">{p.unit}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
