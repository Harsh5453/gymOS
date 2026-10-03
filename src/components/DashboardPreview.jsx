import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import useCountUp from '../hooks/useCountUp'

const NAV = ['Dashboard', 'Members', 'Memberships', 'Attendance', 'Payments', 'Trainers', 'Classes', 'Analytics', 'Inventory', 'Notifications', 'Settings']
const KPIS = [
  { label: 'Active Members', v: 1284, note: '+3.2% this month' },
  { label: 'Monthly Revenue', v: 342800, p: '₹', note: '+8.1% this month' },
  { label: 'Attendance', v: 87.4, s: '%', dec: 1, note: '+1.4 pts' },
  { label: 'Renewals', v: 64, note: 'due in 30 days', plain: true },
]
const REV = [212, 228, 224, 261, 278, 304, 318, 343]
const BARS = [62, 71, 68, 80, 88, 52, 44]
const MIX = [['Basic', 46, '#5fb8c9'], ['Pro', 34, '#3b6f8f'], ['Elite', 20, '#2a3a52']]
const CHECKINS = [['Aarav Sharma', 'Pro'], ['Neha Rao', 'Pro'], ['Ananya Iyer', 'Elite'], ['Sana Qureshi', 'Basic']]
const RENEWALS = [['Kabir Singh', '04 Oct'], ['Neha Rao', '07 Oct'], ['Vikram Joshi', '10 Oct']]

const hi = Math.max(...REV) * 1.1, lo = Math.min(...REV) * 0.85
const LINE = REV.map((y, i) => `${i ? 'L' : 'M'}${((i / (REV.length - 1)) * 400).toFixed(1)} ${(114 - ((y - lo) / (hi - lo)) * 108).toFixed(1)}`).join('')
let acc = 0
const SEG = MIX.map(([n, p, c]) => { const o = acc; acc += p; return { n, p, c, o } })

const ease = [0.3, 0.7, 0.2, 1]
const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }
const ini = (n) => n.split(' ').map((w) => w[0]).join('')

const Card = ({ title, aside, className = '', children }) => (
  <motion.div variants={item} className={`card ${className}`}>
    <h3 className="mb-2.5 flex justify-between text-[12.5px] font-medium text-mu">{title}{aside && <span>{aside}</span>}</h3>
    {children}
  </motion.div>
)

function Kpi({ label, v, p = '', s = '', dec = 0, note, run }) {
  const n = useCountUp(v, run)
  return (
    <Card title={label}>
      <div className="text-2xl font-semibold tabular-nums tracking-tight">
        {p}{n.toLocaleString('en-IN', { minimumFractionDigits: dec, maximumFractionDigits: dec })}{s}
      </div>
      <div className="text-xs text-ok">{note}</div>
    </Card>
  )
}

const People = ({ rows, right }) => (
  <ul className="grid gap-2.5 text-[13px]">
    {rows.map(([n, x]) => (
      <li key={n} className="flex items-center justify-between gap-2">
        <span className="flex min-w-0 items-center gap-2.5">
          <i className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#1d2b3d] text-[11px] font-semibold not-italic">{ini(n)}</i>
          {n}
        </span>
        {right(x)}
      </li>
    ))}
  </ul>
)

export default function DashboardPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.4'] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [10, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1])

  return (
    <div style={{ perspective: 1600 }}>
      <motion.div
        ref={ref}
        role="img"
        aria-label="GymOS dashboard preview with demo data"
        style={reduced ? undefined : { rotateX, scale, transformOrigin: '50% 0' }}
        className="grid overflow-hidden rounded-[14px] border border-line bg-panel text-left shadow-[0_60px_120px_-30px_rgba(0,0,0,.8)] lg:grid-cols-[200px_1fr]"
      >
        <aside className="hidden flex-col gap-0.5 border-r border-line bg-[#0a1019] p-3 lg:flex">
          <b className="px-2.5 pb-4 pt-1 text-[13px] tracking-[.12em]">GYMOS</b>
          {NAV.map((n, i) => (
            <span key={n} className={`rounded-md px-2.5 py-2 text-[13.5px] transition hover:translate-x-0.5 hover:bg-raise hover:text-tx ${i ? 'text-mu' : 'bg-raise text-tx'}`}>{n}</span>
          ))}
          <small className="mt-auto px-2.5 pt-3 text-[11px] tracking-[.14em] text-mu">ANJORYX</small>
        </aside>

        <motion.div variants={{ show: { transition: { staggerChildren: 0.07 } } }} initial="hidden" animate={inView ? 'show' : 'hidden'} className="grid min-w-0 gap-3 p-5 lg:p-6">
          <motion.div variants={item} className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Good morning, Alex</h2>
              <p className="text-[13px] text-mu">Here's what's happening at your gym today. Thursday, October 1, 2026</p>
            </div>
            <span className="tag">Demo Data</span>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{KPIS.map((k) => <Kpi key={k.label} {...k} run={inView} />)}</div>

          <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr]">
            <Card title="Revenue, last 8 months" aside="₹ thousands">
              <svg viewBox="0 0 400 120" className="w-full overflow-visible" aria-hidden="true">
                <path d="M0 30H400M0 70H400M0 119H400" stroke="#1c2838" />
                <motion.path d={LINE} fill="none" stroke="#5fb8c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: inView ? 1 : 0 }} transition={{ duration: 1.2, delay: 0.3, ease }} />
              </svg>
            </Card>
            <Card title="Membership mix">
              <div className="flex items-center gap-4">
                <svg viewBox="0 0 42 42" className="w-24 shrink-0 -rotate-90" aria-hidden="true">
                  {SEG.map((s, i) => (
                    <motion.circle key={s.n} cx="21" cy="21" r="15.9" fill="none" stroke={s.c} strokeWidth="7" pathLength="100" strokeDashoffset={-s.o} initial={{ strokeDasharray: '0 100' }} animate={{ strokeDasharray: inView ? `${s.p - 1} ${101 - s.p}` : '0 100' }} transition={{ duration: 1, delay: 0.4 + i * 0.1, ease }} />
                  ))}
                </svg>
                <ul className="grid gap-2 text-[13px]">{MIX.map(([n, p]) => <li key={n}>{n} {p}%</li>)}</ul>
              </div>
            </Card>
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            <Card title="Weekly attendance">
              <svg viewBox="0 0 280 90" className="w-full" aria-hidden="true">
                {BARS.map((v, i) => (
                  <g key={i}>
                    <motion.rect x={i * 40 + 6} y={70 - (v / 88) * 70} width="28" height={(v / 88) * 70} rx="3" fill="#5fb8c9" opacity={i === 4 ? 1 : 0.55} style={{ originY: 1 }} initial={{ scaleY: 0 }} animate={{ scaleY: inView ? 1 : 0 }} transition={{ duration: 0.8, delay: 0.3 + i * 0.04, ease }} />
                    <text x={i * 40 + 20} y="86" textAnchor="middle" fontSize="9" fill="#8795a8">{'MTWTFSS'[i]}</text>
                  </g>
                ))}
              </svg>
            </Card>
            <Card title="Recent check-ins"><People rows={CHECKINS} right={(x) => <span className="text-xs text-mu">{x}</span>} /></Card>
            <Card title="Upcoming renewals"><People rows={RENEWALS} right={(x) => <span className="rounded-full border border-wa/[.35] px-2 py-0.5 text-[11px] text-wa">{x}</span>} /></Card>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
