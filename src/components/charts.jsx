import { motion } from 'framer-motion'

const ease = [0.3, 0.7, 0.2, 1]
const view = { once: true, amount: 0.3 }

export function LineChart({ data, label, h = 120 }) {
  const hi = Math.max(...data) * 1.1, lo = Math.min(...data) * 0.85
  const d = data.map((y, i) => `${i ? 'L' : 'M'}${((i / (data.length - 1)) * 400).toFixed(1)} ${(h - 6 - ((y - lo) / (hi - lo)) * (h - 12)).toFixed(1)}`).join('')
  return (
    <svg viewBox={`0 0 400 ${h}`} role="img" aria-label={label} className="w-full overflow-visible">
      <path d={`M0 ${h * 0.25}H400M0 ${h * 0.55}H400M0 ${h - 1}H400`} stroke="#1c2838" />
      <motion.path key={d} d={d} fill="none" stroke="#5fb8c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={view} transition={{ duration: 0.9, ease }} />
    </svg>
  )
}

export function BarChart({ data, labels, label, hl = -1, h = 70 }) {
  const mx = Math.max(...data), w = 280 / data.length
  return (
    <svg viewBox={`0 0 280 ${h + 16}`} role="img" aria-label={label} className="w-full">
      {data.map((v, i) => (
        <g key={i}>
          <motion.rect x={i * w + w * 0.18} y={h - (v / mx) * h} width={w * 0.64} height={(v / mx) * h} rx="3" fill="#5fb8c9" opacity={i === hl ? 1 : 0.55} style={{ originY: 1 }} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={view} transition={{ duration: 0.7, delay: i * 0.04, ease }} />
          <text x={i * w + w / 2} y={h + 12} textAnchor="middle" fontSize="9" fill="#8795a8">{labels[i]}</text>
        </g>
      ))}
    </svg>
  )
}

export function Donut({ parts }) {
  let a = 0
  const seg = parts.map(([n, p, c]) => { const o = a; a += p; return { n, p, c, o } })
  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 42 42" role="img" aria-label={`Membership mix: ${parts.map(([n, p]) => `${n} ${p}%`).join(', ')}`} className="w-24 shrink-0 -rotate-90">
        {seg.map((s, i) => (
          <motion.circle key={s.n} cx="21" cy="21" r="15.9" fill="none" stroke={s.c} strokeWidth="7" pathLength="100" strokeDashoffset={-s.o} initial={{ strokeDasharray: '0 100' }} whileInView={{ strokeDasharray: `${s.p - 1} ${101 - s.p}` }} viewport={view} transition={{ duration: 1, delay: i * 0.1, ease }} />
        ))}
      </svg>
      <ul className="grid gap-2 text-[13px]">{parts.map(([n, p, c]) => <li key={n} className="flex items-center gap-2"><i className="h-2 w-2 rounded-sm" style={{ background: c }} />{n} {p}%</li>)}</ul>
    </div>
  )
}
