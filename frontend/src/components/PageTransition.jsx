import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const variants = {
  initial:  { opacity: 0, y: 18 },
  animate:  { opacity: 1, y: 0 },
  exit:     { opacity: 0, y: -12 },
}

/**
 * PageTransition — wraps page content with a Framer Motion fade+slide animation.
 * Uses the current route path as the AnimatePresence key so transitions fire on navigation.
 */
export default function PageTransition({ children }) {
  const { pathname } = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
