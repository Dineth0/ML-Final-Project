import { useEffect, useRef } from 'react'

const SIZE = 160
const STROKE = 12
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/**
 * CircularGauge — animated SVG ring showing probability percentage.
 */
export default function CircularGauge({ probability, isPotable }) {
  const progressRef = useRef(null)
  const pct = Math.round(probability * 100)
  const offset = CIRCUMFERENCE - (probability * CIRCUMFERENCE)

  const strokeColor = isPotable
    ? 'url(#gaugeGradientGreen)'
    : 'url(#gaugeGradientRed)'

  useEffect(() => {
    if (progressRef.current) {
      // Force reflow to trigger CSS transition
      progressRef.current.style.strokeDashoffset = CIRCUMFERENCE
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (progressRef.current) {
            progressRef.current.style.strokeDashoffset = offset
          }
        })
      })
    }
  }, [probability, offset])

  return (
    <div className="flex flex-col items-center gap-3">
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-label={`Potability probability: ${pct}%`}
        role="img"
      >
        <defs>
          <linearGradient id="gaugeGradientGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
          <linearGradient id="gaugeGradientRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          {/* Glow filter */}
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background track */}
        <circle
          className="circle-track"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          strokeWidth={STROKE}
        />

        {/* Progress arc */}
        <circle
          ref={progressRef}
          className="circle-progress"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          strokeWidth={STROKE}
          stroke={strokeColor}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          filter="url(#glow)"
        />

        {/* Center text */}
        <text
          x="50%"
          y="44%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="28"
          fontWeight="800"
          fontFamily="Outfit, sans-serif"
          fill={isPotable ? '#34d399' : '#f87171'}
        >
          {pct}%
        </text>
        <text
          x="50%"
          y="62%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          fill="#94a3b8"
          fontFamily="Inter, sans-serif"
          letterSpacing="0.5"
        >
          PROBABILITY
        </text>
      </svg>
    </div>
  )
}
