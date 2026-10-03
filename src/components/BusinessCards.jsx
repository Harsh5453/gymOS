import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { BUSINESSES } from '../data/gym'

// abstract line art, shifted per card so each business looks distinct
const Art = ({ i }) => (
  <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden="true">
    <g stroke="#2d4256" fill="none">
      {[0, 1, 2, 3, 4].map((k) => <rect key={k} x={20 + k * 12 + i * 6} y={24 + k * 8} width={60 + ((k * 14 + i * 20) % 70)} height="10" rx="3" />)}
    </g>
    <circle cx={150 - i * 6} cy="60" r={22 + i * 3} fill="none" stroke="#5fb8c9" strokeOpacity=".5" />
  </svg>
)

export default function BusinessCards({ value, onPick }) {
  return (
    <div role="group" aria-label="Business type" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {BUSINESSES.map((b, i) => {
        const on = value?.id === b.id
        return (
          <motion.button key={b.id} type="button" aria-pressed={on} onClick={() => onPick(b)} whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}
            className={`group relative flex flex-col overflow-hidden rounded-xl border bg-panel text-left transition-[border-color,opacity,box-shadow] sm:[&:last-child]:col-span-2 lg:[&:last-child]:col-span-1 ${on ? 'border-ac shadow-[0_20px_50px_-20px_rgba(95,184,201,.35)]' : 'border-line hover:border-[#3d5570]'} ${value && !on ? 'opacity-60' : ''}`}>
            <div className="relative h-24 overflow-hidden border-b border-line bg-raise lg:h-28">
              <div className="h-full w-full transition-transform duration-700 group-hover:translate-x-[-6px] group-hover:scale-105"><Art i={i} /></div>
              <motion.span initial={false} animate={{ scale: on ? 1 : 0 }} transition={{ type: 'spring', stiffness: 400, damping: 22 }} className="absolute right-2.5 top-2.5 grid h-[22px] w-[22px] place-items-center rounded-full bg-ac text-ink"><Check size={14} strokeWidth={3} /></motion.span>
            </div>
            <div className="flex flex-1 flex-col gap-1.5 p-4">
              <h3 className="text-base font-semibold tracking-tight">{b.name}</h3>
              <p className="text-sm text-mu">{b.desc}</p>
              <span className={`mt-auto pt-2 text-xs text-ac transition group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100 ${on ? 'opacity-100' : 'translate-y-1.5 opacity-0'}`}>{b.modules.length} modules recommended</span>
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
