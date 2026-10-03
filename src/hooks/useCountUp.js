import { useEffect, useState } from 'react'
import { animate, useReducedMotion } from 'framer-motion'

export default function useCountUp(to, run = true, duration = 1) {
  const reduced = useReducedMotion()
  const [v, setV] = useState(reduced ? to : 0)
  useEffect(() => {
    if (!run) return
    if (reduced) return setV(to)
    const c = animate(0, to, { duration, ease: [0.3, 0.7, 0.2, 1], onUpdate: setV })
    return () => c.stop()
  }, [to, run, reduced, duration])
  return v
}
