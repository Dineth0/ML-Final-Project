import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import InputField from '../components/InputField'
import ResultCard from '../components/ResultCard'
import PageTransition from '../components/PageTransition'
import { useBackendStatus } from '../hooks/useBackendStatus'
import { predictPotability } from '../api'
import { WATER_PARAMS, INITIAL_VALUES } from '../constants'

const SAMPLE = {
  ph: '7.08', Hardness: '204.89', Solids: '20791.32',
  Chloramines: '7.30', Sulfate: '368.52', Conductivity: '564.31',
  Organic_carbon: '10.38', Trihalomethanes: '86.99', Turbidity: '2.96',
}

export default function Predict() {
  const backendStatus = useBackendStatus()

  const [values,   setValues]   = useState(INITIAL_VALUES)
  const [errors,   setErrors]   = useState({})
  const [loading,  setLoading]  = useState(false)
  const [result,   setResult]   = useState(null)
  const [apiError, setApiError] = useState(null)

  /* ─── handlers ─── */
  const handleChange = (key, val) => {
    setValues((prev) => ({ ...prev, [key]: val }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const validate = () => {
    const errs = {}
    WATER_PARAMS.forEach((p) => {
      const raw = values[p.key]
      if (raw === '' || raw == null) { errs[p.key] = 'Required.'; return }
      const num = parseFloat(raw)
      if (isNaN(num)) { errs[p.key] = 'Must be a number.'; return }
      if (num < p.min || num > p.max) errs[p.key] = `Between ${p.min} – ${p.max}.`
    })
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError(null)
    setResult(null)
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      document.getElementById(`field-${Object.keys(errs)[0]}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setLoading(true)
    try {
      const payload = Object.fromEntries(WATER_PARAMS.map((p) => [p.key, parseFloat(values[p.key])]))
      const data = await predictPotability(payload)
      setResult(data)
      setTimeout(() => document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150)
    } catch (err) {
      setApiError(err?.response?.data?.detail || err?.message || 'Unexpected error. Check your connection.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => { setValues(INITIAL_VALUES); setErrors({}); setResult(null); setApiError(null) }
  const fillSample  = () => { setValues(SAMPLE); setErrors({}); setResult(null); setApiError(null) }

  return (
    <PageTransition>
      <div className="bg-animated page-wrapper">
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 sm:py-12">

          {/* ─── Page header ─── */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1
              className="text-3xl sm:text-4xl font-extrabold text-white mb-2"
              style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}
            >
              Water Quality{' '}
              <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                Analysis
              </span>
            </h1>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Fill in the 9 water parameters below and click <strong className="text-slate-300">Predict Potability</strong>.
            </p>
          </motion.div>

          {/* ─── Offline banner ─── */}
          <AnimatePresence>
            {backendStatus === 'offline' && (
              <motion.div
                role="alert"
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/25 flex items-start gap-3 overflow-hidden"
              >
                <span className="text-red-400 text-xl mt-0.5" aria-hidden="true">⚠️</span>
                <div>
                  <p className="text-red-300 font-semibold text-sm">Backend not reachable</p>
                  <p className="text-red-400/70 text-xs mt-1">
                    Start the API:{' '}
                    <code className="bg-red-900/40 px-1 py-0.5 rounded text-red-300">uv run fastapi dev backend/main.py</code>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── Form card ─── */}
          <form onSubmit={handleSubmit} noValidate id="prediction-form">
            <motion.div
              className="glass-card p-6 sm:p-8 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                  <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Water Quality Parameters
                  </h2>
                  <p className="text-slate-500 text-xs mt-0.5">
                    All 9 fields required · hover <span className="text-slate-400">?</span> for safe ranges
                  </p>
                </div>
                <div className="flex gap-2">
                  <button type="button" id="btn-sample" onClick={fillSample}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg border border-teal-500/30 text-teal-400 hover:bg-teal-500/10 transition-colors">
                    Load Sample
                  </button>
                  <button type="button" id="btn-reset" onClick={handleReset}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-600 text-slate-400 hover:bg-white/5 transition-colors">
                    Clear All
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {WATER_PARAMS.map((param) => (
                  <InputField key={param.key} param={param} value={values[param.key]} onChange={handleChange} error={errors[param.key]} />
                ))}
              </div>
            </motion.div>

            {/* ─── API error ─── */}
            <AnimatePresence>
              {apiError && (
                <motion.div role="alert"
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mb-5 p-4 rounded-2xl bg-red-500/10 border border-red-500/25 flex items-start gap-3">
                  <span className="text-red-400 text-xl mt-0.5" aria-hidden="true">❌</span>
                  <div>
                    <p className="text-red-300 font-semibold text-sm">Prediction Failed</p>
                    <p className="text-red-400/80 text-xs mt-1">{apiError}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ─── Submit ─── */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
            >
              <button
                type="submit" id="btn-predict"
                disabled={loading || backendStatus === 'offline'}
                className="btn-predict flex items-center gap-3 min-w-[220px] justify-center"
                aria-busy={loading}
              >
                {loading ? (
                  <><span className="spinner w-5 h-5" aria-hidden="true" /> Analyzing…</>
                ) : (
                  <><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 2C12 2 4 10 4 15.5C4 19.642 7.582 23 12 23C16.418 23 20 19.642 20 15.5C20 10 12 2 12 2Z" fill="currentColor" opacity="0.9"/>
                    </svg>
                    Predict Potability</>
                )}
              </button>
            </motion.div>
          </form>

          {/* ─── Loading message ─── */}
          <AnimatePresence>
            {loading && (
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                aria-live="polite"
              >
                <div className="inline-flex items-center gap-3 text-teal-300 text-sm">
                  <div className="spinner" aria-hidden="true" />
                  <span>Running XGBoost model prediction…</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── Result ─── */}
          <AnimatePresence>
            {result && !loading && (
              <motion.section
                id="result-section"
                className="mt-10"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                aria-label="Prediction Result"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-2">
                    Prediction Result
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
                </div>

                <ResultCard result={result} inputs={values} params={WATER_PARAMS} />

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                  <button type="button" id="btn-predict-again" onClick={handleReset}
                    className="px-5 py-2.5 text-sm font-medium rounded-xl border border-slate-600
                               text-slate-300 hover:bg-white/5 hover:border-slate-500 transition-all">
                    ↩ Predict Another Sample
                  </button>
                  <Link to="/about"
                    className="px-5 py-2.5 text-sm font-medium rounded-xl border border-teal-500/30
                               text-teal-400 hover:bg-teal-500/10 transition-all">
                    Learn About the Model →
                  </Link>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        <footer className="text-center pb-8 text-xs text-slate-700">
          Water Potability Predictor · React + FastAPI + XGBoost
        </footer>
      </div>
    </PageTransition>
  )
}
