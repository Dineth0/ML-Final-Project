import { useState } from 'react'

/**
 * InputField — Single water quality parameter input with tooltip.
 */
export default function InputField({ param, value, onChange, error }) {
  const [focused, setFocused] = useState(false)
  const [showTip, setShowTip] = useState(false)

  return (
    <div className="flex flex-col gap-1.5 relative">
      {/* Label row */}
      <div className="flex items-center justify-between gap-2">
        <label
          htmlFor={`field-${param.key}`}
          className="text-xs font-semibold text-slate-300 flex items-center gap-1.5"
        >
          <span className="text-sm" aria-hidden="true">{param.icon}</span>
          {param.label}
          <span className="text-slate-500 font-normal">({param.unit})</span>
        </label>

        {/* Info tooltip trigger */}
        <button
          type="button"
          aria-label={`Info about ${param.label}`}
          className="w-4 h-4 rounded-full bg-slate-700 text-slate-400 text-xs flex items-center justify-center hover:bg-teal-900 hover:text-teal-300 transition-colors cursor-help flex-shrink-0"
          onMouseEnter={() => setShowTip(true)}
          onMouseLeave={() => setShowTip(false)}
          onFocus={() => setShowTip(true)}
          onBlur={() => setShowTip(false)}
        >
          ?
        </button>

        {/* Tooltip popup */}
        {showTip && (
          <div
            role="tooltip"
            className="absolute right-0 top-6 z-50 w-56 p-2.5 rounded-xl text-xs text-slate-200 leading-relaxed
                       bg-slate-800 border border-slate-600 shadow-2xl"
          >
            <p className="font-medium text-teal-300 mb-1">{param.hint}</p>
            <p className="text-slate-400">{param.description}</p>
          </div>
        )}
      </div>

      {/* Input */}
      <input
        id={`field-${param.key}`}
        type="number"
        className={`water-input ${error ? 'border-red-400/60 focus:border-red-400' : ''}`}
        value={value}
        onChange={(e) => onChange(param.key, e.target.value)}
        placeholder={param.placeholder}
        min={param.min}
        max={param.max}
        step={param.step}
        aria-describedby={error ? `error-${param.key}` : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      {/* Range hint (shown when focused) */}
      {focused && !error && (
        <p className="text-xs text-teal-400/70 mt-0.5">{param.hint}</p>
      )}

      {/* Validation error */}
      {error && (
        <p
          id={`error-${param.key}`}
          className="text-xs text-red-400 mt-0.5"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}
