import { AnimatePresence, motion } from 'framer-motion'
import { MODULES } from '../data/gym'

export default function ModuleSelector({ value, onToggle }) {
  const picked = MODULES.filter((m) => value.includes(m.id))
  return (
    <div className="grid items-start gap-7 lg:grid-cols-2">
      <div role="group" aria-label="Modules" className="grid gap-2.5 sm:grid-cols-2">
        {MODULES.map(({ id, icon: Icon, desc }) => {
          const on = value.includes(id)
          return (
            <motion.button key={id} type="button" aria-pressed={on} onClick={() => onToggle(id)} whileTap={{ scale: 0.98 }}
              className={`flex gap-3 rounded-[10px] border p-3.5 text-left transition-colors ${on ? 'border-ac bg-raise' : 'border-line bg-panel hover:border-[#3d5570]'}`}>
              <Icon size={22} strokeWidth={1.6} className={`mt-0.5 shrink-0 transition-colors ${on ? 'text-ac' : 'text-mu'}`} aria-hidden />
              <span><b className="block text-[15px] font-semibold">{id}</b><span className="block text-[13px] leading-snug text-mu">{desc}</span></span>
            </motion.button>
          )
        })}
      </div>

      <div className="rounded-xl border border-line bg-panel lg:sticky lg:top-20">
        <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-3 text-[13px]">
          <strong aria-live="polite">Your system is taking shape...{picked.length > 0 && ` ${picked.length} module${picked.length > 1 ? 's' : ''}`}</strong>
          <span className="tag">Demo Data</span>
        </div>
        <div className="grid min-h-[300px] grid-cols-2 content-start gap-2.5 p-3.5">
          <AnimatePresence popLayout>
            {picked.map((m) => (
              <motion.div key={m.id} layout initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }} transition={{ duration: 0.35, ease: [0.3, 0.7, 0.2, 1] }} className="rounded-lg border border-line bg-raise p-3">
                <small className="block text-xs text-mu">{m.id}</small>
                <strong className="text-xl font-semibold tabular-nums tracking-tight">{m.metric}</strong>
                <small className="block text-xs text-mu">{m.label}</small>
                <i className="mt-2 block h-1 overflow-hidden rounded-sm bg-line"><i className="block h-full rounded-sm bg-ac" style={{ width: `${m.pct}%` }} /></i>
              </motion.div>
            ))}
          </AnimatePresence>
          {!picked.length && <p className="col-span-2 py-16 text-center text-sm text-mu">Select a module to start building.</p>}
        </div>
      </div>
    </div>
  )
}
