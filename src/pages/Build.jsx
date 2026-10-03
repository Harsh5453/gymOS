import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Page from '../components/Page'
import Stepper from '../components/Stepper'
import BusinessCards from '../components/BusinessCards'
import ModuleSelector from '../components/ModuleSelector'
import AssemblyMap from '../components/AssemblyMap'
import { useConfig } from '../hooks/useConfig'
import { STEPS } from '../data/gym'

function Summary({ business, count }) {
  const stats = [
    ['Business type', business.name],
    ['Selected modules', count],
    ['Screens (approx.)', count * 2 + 2],
    ['Complexity', count >= 9 ? 'Advanced' : count >= 6 ? 'Intermediate' : 'Starter'],
  ]
  return (
    <>
      <p className="mb-5 text-mu">Indicative scope based on your choices. <span className="tag ml-1">Demo Estimate</span></p>
      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map(([k, v]) => (
          <div key={k} className="rounded-[10px] border border-line bg-panel p-4">
            <dt className="text-[12.5px] text-mu">{k}</dt>
            <dd className={`mt-0.5 font-semibold tracking-tight ${typeof v === 'string' && v.length > 12 ? 'text-lg' : 'text-2xl'}`}>{v}</dd>
          </div>
        ))}
      </dl>
    </>
  )
}

export default function Build() {
  const { business, modules, step, setStep, pick, toggle } = useConfig()
  const navigate = useNavigate()
  const ok = step === 0 ? !!business : step === 1 ? modules.length >= 2 : true
  const next = () => (step === 3 ? navigate('/app') : setStep(step + 1))

  return (
    <Page className="mx-auto max-w-6xl px-6 pb-16">
      <h1 className="mt-10 text-[length:clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-.035em]">Build your gym system.</h1>
      <p className="mb-8 mt-3 text-mu">Configure the tools your business actually needs.</p>
      <Stepper step={step} onGo={setStep} />

      <AnimatePresence mode="wait">
        <motion.section key={step} aria-label={STEPS[step]} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          {step === 0 && <BusinessCards value={business} onPick={pick} />}
          {step === 1 && (<><h2 className="mb-4 text-2xl font-semibold tracking-tight">Choose what your gym needs.</h2><ModuleSelector value={modules} onToggle={toggle} /></>)}
          {step === 2 && <AssemblyMap modules={modules} />}
          {step === 3 && <Summary business={business} count={modules.length} />}
        </motion.section>
      </AnimatePresence>

      <div className="mt-8 flex items-center justify-between gap-3">
        <button type="button" className={`btn ${step === 0 ? 'invisible' : ''}`} onClick={() => setStep(step - 1)}>Back</button>
        <button type="button" className="btn btn-p" disabled={!ok} onClick={next}>{step === 3 ? 'Open your workspace' : 'Continue'}</button>
      </div>
    </Page>
  )
}
