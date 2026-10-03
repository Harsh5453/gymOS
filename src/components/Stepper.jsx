import { motion } from 'framer-motion'
import { STEPS } from '../data/gym'

export default function Stepper({ step, onGo }) {
  return (
    <ol aria-label="Configuration steps" className="mb-9 grid grid-cols-4 gap-2">
      {STEPS.map((s, i) => (
        <li key={s}>
          <button type="button" disabled={i > step} onClick={() => onGo(i)} aria-current={i === step ? 'step' : undefined}
            className={`relative block w-full border-t-2 border-line pt-3 text-left text-sm transition-colors disabled:cursor-default disabled:opacity-50 ${i === step ? 'text-tx' : 'text-mu'}`}>
            <motion.span className="absolute -top-0.5 left-0 h-0.5 w-full origin-left bg-ac" initial={false} animate={{ scaleX: i <= step ? 1 : 0 }} transition={{ duration: 0.6, ease: [0.3, 0.7, 0.2, 1] }} />
            <b className="mr-2 font-medium tabular-nums text-mu max-sm:block">0{i + 1}</b>{s}
          </button>
        </li>
      ))}
    </ol>
  )
}
