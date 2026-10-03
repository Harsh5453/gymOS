import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const MSG = ['Initializing workspace...', 'Loading members...', 'Loading analytics...', 'Loading operations...']

export default function Loader({ onDone }) {
  const total = useReducedMotion() ? 500 : 1300
  const [i, setI] = useState(0)
  useEffect(() => {
    const a = setInterval(() => setI((n) => Math.min(n + 1, MSG.length - 1)), total / MSG.length)
    const b = setTimeout(onDone, total)
    return () => { clearInterval(a); clearTimeout(b) }
  }, [])

  return (
    <motion.div role="status" aria-live="polite" className="fixed inset-0 z-[100] grid place-content-center bg-ink text-center" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <motion.b initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="-mr-[.5em] block text-xs font-semibold tracking-[.5em] text-mu">ANJORYX</motion.b>
      <motion.span initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="-mr-[.18em] mb-6 mt-1.5 block text-5xl font-semibold tracking-[.18em]">GYMOS</motion.span>
      <div className="mx-auto h-0.5 w-40 overflow-hidden rounded bg-line">
        <motion.div className="h-full origin-left bg-ac" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: total / 1000, ease: 'linear' }} />
      </div>
      <p className="mt-3.5 min-h-5 text-[13px] text-mu">{MSG[i]}</p>
    </motion.div>
  )
}
