import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

const SIZE = 160
const STROKE = 12
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/**
 * CircularGauge — Framer Motion animated SVG ring.
 * Smoothly animates stroke-dashoffset from 0% to the probability value.
 */
export default function CircularGauge({ probability, isPotable }) {
  const pct = Math.round(probability * 100)
  const progress = useMotionValue(0)

  // Map progress (0→1) to strokeDashoffset (CIRCUMFERENCE→0)
  const dashOffset = useTransform(progress, [0, 1], [CIRCUMFERENCE, CIRCUMFERENCE - probability * CIRCUMFERENCE])

  useEffect(() => {
    const controls = animate(progress, probability, {
      duration: 1.4,
      ease: [0.4, 0, 0.2, 1],
    })
    return controls.stop
  }, [probability, progress])

  const strokeColor = isPotable ? 'url(#gaugeGreen)' : 'url(#gaugeRed)'
  const textColor   = isPotable ? '#34d399' : '#f87171'

  return (
    <div className="flex flex-col items-center gap-3 flex-shrink-0">
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-label={`Potability probability: ${pct}%`}
        role="img"
      >
        <defs>
          <linearGradient id="gaugeGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#10b981" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
          <linearGradient id="gaugeRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#ef4444" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <filter id="gaugeGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background track */}
        <circle
          cx={SIZE / 2} cy={SIZE / 2} r={RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={STROKE}
        />

        {/* Animated progress arc */}
        <motion.circle
          cx={SIZE / 2} cy={SIZE / 2} r={RADIUS}
          fill="none"
          stroke={strokeColor}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          style={{
            strokeDashoffset: dashOffset,
            rotate: '-90deg',
            transformOrigin: `${SIZE / 2}px ${SIZE / 2}px`,
          }}
          filter="url(#gaugeGlow)"
        />

        {/* Center percentage text */}
        <text
          x="50%" y="44%"
          textAnchor="middle" dominantBaseline="middle"
          fontSize="28" fontWeight="800"
          fontFamily="Outfit, sans-serif"
          fill={textColor}
        >
          {pct}%
        </text>
        <text
          x="50%" y="63%"
          textAnchor="middle" dominantBaseline="middle"
          fontSize="10" fill="#94a3b8"
          fontFamily="Inter, sans-serif" letterSpacing="0.5"
        >
          PROBABILITY
        </text>
      </svg>
    </div>
  )
}
