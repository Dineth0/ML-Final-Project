import { useState, useEffect, useCallback } from 'react'
import StatusBadge from './components/StatusBadge'
import InputField from './components/InputField'
import ResultCard from './components/ResultCard'
import { checkHealth, predictPotability } from './api'
import { WATER_PARAMS, INITIAL_VALUES } from './constants'

export default function App() {
  // ─── Backend status ─────────────────────────────────────────
  const [backendStatus, setBackendStatus] = useState('checking')

  // ─── Form state ─────────────────────────────────────────────
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})

  // ─── Request state ───────────────────────────────────────────
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [apiError, setApiError] = useState(null)

  // ─── Check backend health on mount & every 30 s ─────────────
  const pingBackend = useCallback(async () => {
    try {
      await checkHealth()
      setBackendStatus('online')
    } catch {
      setBackendStatus('offline')
    }
  }, [])

  useEffect(() => {
    pingBackend()
    const id = setInterval(pingBackend, 30_000)
    return () => clearInterval(id)
  }, [pingBackend])

  // ─── Field change handler ────────────────────────────────────
  const handleChange = (key, val) => {
    setValues((prev) => ({ ...prev, [key]: val }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  // ─── Validation ──────────────────────────────────────────────
  const validate = () => {
    const newErrors = {}
    WATER_PARAMS.forEach((p) => {
      const raw = values[p.key]
      if (raw === '' || raw === undefined || raw === null) {
        newErrors[p.key] = 'This field is required.'
      } else {
        const num = parseFloat(raw)
        if (isNaN(num)) newErrors[p.key] = 'Must be a number.'
        else if (num < p.min || num > p.max)
          newErrors[p.key] = `Enter a value between ${p.min} and ${p.max}.`
      }
    })
    return newErrors
  }

  // ─── Submit handler ──────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError(null)
    setResult(null)

    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // Scroll to first error field
      const firstKey = Object.keys(errs)[0]
      document.getElementById(`field-${firstKey}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setLoading(true)
    try {
      const payload = Object.fromEntries(
        WATER_PARAMS.map((p) => [p.key, parseFloat(values[p.key])])
      )
      const data = await predictPotability(payload)
      setResult(data)
      // Scroll to result
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        err?.message ||
        'An unexpected error occurred. Please check your connection.'
      setApiError(msg)
    } finally {
      setLoading(false)
    }
  }

  // ─── Reset form ──────────────────────────────────────────────
  const handleReset = () => {
    setValues(INITIAL_VALUES)
    setErrors({})
    setResult(null)
    setApiError(null)
  }

  // ─── Fill sample data ────────────────────────────────────────
  const fillSample = () => {
    setValues({
      ph: '7.08',
      Hardness: '204.89',
      Solids: '20791.32',
      Chloramines: '7.30',
      Sulfate: '368.52',
      Conductivity: '564.31',
      Organic_carbon: '10.38',
      Trihalomethanes: '86.99',
      Turbidity: '2.96',
    })
    setErrors({})
    setResult(null)
    setApiError(null)
  }

  return (
    <div className="bg-animated min-h-screen relative">
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 sm:py-12">

        {/* ─── Header ─── */}
        <header className="text-center mb-10">
          {/* Logo / Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4
                          bg-gradient-to-br from-teal-500/20 to-blue-600/20
                          border border-teal-500/30 shadow-lg shadow-teal-500/10">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
              <path d="M18 4 C18 4 6 16 6 23 C6 29.627 11.373 35 18 35 C24.627 35 30 29.627 30 23 C30 16 18 4 18 4Z"
                fill="url(#waterGrad)" />
              <defs>
                <linearGradient id="waterGrad" x1="18" y1="4" x2="18" y2="35" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="flex items-center justify-center gap-3 mb-3 flex-wrap">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white"
                style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}>
              Water Potability{' '}
              <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                Predictor
              </span>
            </h1>
          </div>

          <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-4">
            Enter water quality parameters below to determine if your water sample is
            safe to drink using a machine learning model.
          </p>

          {/* Status badge */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <StatusBadge status={backendStatus} />
            <span className="text-slate-600 text-xs">API: http://127.0.0.1:8000</span>
          </div>
        </header>

        {/* ─── Offline Warning ─── */}
        {backendStatus === 'offline' && (
          <div role="alert"
               className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/25 flex items-start gap-3">
            <span className="text-red-400 text-xl mt-0.5" aria-hidden="true">⚠️</span>
            <div>
              <p className="text-red-300 font-semibold text-sm">Backend is not reachable</p>
              <p className="text-red-400/70 text-xs mt-1">
                Make sure the FastAPI server is running at{' '}
                <code className="bg-red-900/40 px-1 py-0.5 rounded text-red-300">
                  http://127.0.0.1:8000
                </code>{' '}
                with the command:{' '}
                <code className="bg-red-900/40 px-1 py-0.5 rounded text-red-300">
                  uv run fastapi dev backend/main.py
                </code>
              </p>
            </div>
          </div>
        )}

        {/* ─── Main Form Card ─── */}
        <main>
          <form onSubmit={handleSubmit} noValidate id="prediction-form">
            <div className="glass-card p-6 sm:p-8 mb-6">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                  <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Water Quality Parameters
                  </h2>
                  <p className="text-slate-500 text-xs mt-0.5">
                    All 9 fields are required. Hover the{' '}
                    <span className="text-slate-400">?</span> icon for safe ranges.
                  </p>
                </div>
                {/* Quick actions */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    id="btn-sample"
                    onClick={fillSample}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg border border-teal-500/30
                               text-teal-400 hover:bg-teal-500/10 transition-colors"
                  >
                    Load Sample
                  </button>
                  <button
                    type="button"
                    id="btn-reset"
                    onClick={handleReset}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-600
                               text-slate-400 hover:bg-white/5 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Input grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {WATER_PARAMS.map((param) => (
                  <InputField
                    key={param.key}
                    param={param}
                    value={values[param.key]}
                    onChange={handleChange}
                    error={errors[param.key]}
                  />
                ))}
              </div>
            </div>

            {/* ─── API Error ─── */}
            {apiError && (
              <div role="alert"
                   className="mb-5 p-4 rounded-2xl bg-red-500/10 border border-red-500/25 flex items-start gap-3">
                <span className="text-red-400 text-xl mt-0.5" aria-hidden="true">❌</span>
                <div>
                  <p className="text-red-300 font-semibold text-sm">Prediction Failed</p>
                  <p className="text-red-400/80 text-xs mt-1">{apiError}</p>
                </div>
              </div>
            )}

            {/* ─── Submit Button ─── */}
            <div className="flex justify-center">
              <button
                type="submit"
                id="btn-predict"
                disabled={loading || backendStatus === 'offline'}
                className="btn-predict flex items-center gap-3 min-w-[220px] justify-center"
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner w-5 h-5" aria-hidden="true" />
                    Analyzing…
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 2C12 2 4 10 4 15.5C4 19.642 7.582 23 12 23C16.418 23 20 19.642 20 15.5C20 10 12 2 12 2Z"
                            fill="currentColor" opacity="0.9"/>
                    </svg>
                    Predict Potability
                  </>
                )}
              </button>
            </div>
          </form>

          {/* ─── Loading overlay message ─── */}
          {loading && (
            <div className="mt-6 text-center" aria-live="polite">
              <div className="inline-flex items-center gap-3 text-teal-300 text-sm">
                <div className="spinner" aria-hidden="true" />
                <span>Running ML model prediction…</span>
              </div>
            </div>
          )}

          {/* ─── Result Section ─── */}
          {result && !loading && (
            <section id="result-section" className="mt-8" aria-label="Prediction Result">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-2">
                  Prediction Result
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
              </div>
              <ResultCard result={result} inputs={values} params={WATER_PARAMS} />

              {/* Predict again button */}
              <div className="flex justify-center mt-5">
                <button
                  type="button"
                  id="btn-predict-again"
                  onClick={handleReset}
                  className="px-5 py-2.5 text-sm font-medium rounded-xl border border-slate-600
                             text-slate-300 hover:bg-white/5 hover:border-slate-500 transition-all"
                >
                  ↩ Predict Another Sample
                </button>
              </div>
            </section>
          )}
        </main>

        {/* ─── Footer ─── */}
        <footer className="text-center mt-12 text-xs text-slate-600">
          <p>
            Water Potability Predictor · Powered by{' '}
            <span className="text-teal-700">FastAPI</span> +{' '}
            <span className="text-blue-700">React</span> + Machine Learning
          </p>
        </footer>
      </div>
    </div>
  )
}
