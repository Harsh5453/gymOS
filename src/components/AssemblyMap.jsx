import { useState } from 'react'
import { motion } from 'framer-motion'
import useMedia from '../hooks/useMedia'

const ease = [0.3, 0.7, 0.2, 1]

// desktop: modules on an ellipse around the core. mobile: core on top, modules in two columns.
const place = (i, n, narrow) => {
  if (narrow) return [90 + (i % 2) * 180, 150 + Math.floor(i / 2) * 64]
  const a = -Math.PI / 2 + (i / n) * 2 * Math.PI
  return [380 + Math.cos(a) * 285, 210 + Math.sin(a) * 150]
}

export default function AssemblyMap({ modules }) {
  const narrow = useMedia('(max-width: 639px)')
  const [run, setRun] = useState(0)
  const [done, setDone] = useState(false)
  const n = modules.length
  const [cx, cy] = narrow ? [180, 56] : [380, 210]
  const w = narrow ? 140 : 120
  const h = narrow ? 36 : 34
  const step = 0.26

  return (
    <div>
      <div className="rounded-xl border border-line bg-panel p-2">
        <svg key={`${run}-${narrow}`} viewBox={narrow ? `0 0 360 ${150 + Math.ceil(n / 2) * 64}` : '0 0 760 420'} role="img" aria-label={`System map: ${modules.join(', ')} connected to GymOS`} className="block h-auto w-full">
          {modules.map((m, i) => {
            const [x, y] = place(i, n, narrow)
            return <motion.path key={m} d={`M${cx} ${cy}L${x} ${y}`} fill="none" strokeWidth="1.5" initial={{ pathLength: 0, stroke: '#2d4256' }} animate={{ pathLength: 1, stroke: '#5fb8c9' }} transition={{ duration: 0.7, delay: 0.3 + i * step, ease }} />
          })}
          <g transform={`translate(${cx - 50} ${cy - 20})`}>
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <rect width="100" height="40" rx="9" fill="#e8edf4" />
              <text x="50" y="20" textAnchor="middle" dominantBaseline="central" fill="#070b12" fontSize="13" fontWeight="700" letterSpacing="1.5">GYMOS</text>
            </motion.g>
          </g>
          {modules.map((m, i) => {
            const [x, y] = place(i, n, narrow)
            return (
              <g key={m} transform={`translate(${x - w / 2} ${y - h / 2})`}>
                <motion.g initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.55 + i * step, ease }} onAnimationComplete={i === n - 1 ? () => setDone(true) : undefined}>
                  <rect width={w} height={h} rx="8" fill="#121b28" stroke="#3d5570" />
                  <text x={w / 2} y={h / 2} textAnchor="middle" dominantBaseline="central" fill="#e8edf4" fontSize="13" fontWeight="500">{m}</text>
                </motion.g>
              </g>
            )
          })}
        </svg>
      </div>
      <div className="mt-4 flex min-h-11 flex-wrap items-center gap-4">
        <p aria-live="polite" className="text-[15px] text-mu">{done ? 'A complete business operating system has been assembled.' : ''}</p>
        <button type="button" className="btn btn-s" onClick={() => { setDone(false); setRun((r) => r + 1) }}>Replay assembly</button>
      </div>
    </div>
  )
}
