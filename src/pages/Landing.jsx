import { Link } from 'react-router-dom'
import Page from '../components/Page'
import DashboardPreview from '../components/DashboardPreview'
import { MODULES } from '../data/gym'

const HOW = [
  ['01', 'Configure', 'Choose your business type and the modules you need.'],
  ['02', 'Assemble', 'Watch GymOS connect each module into one system.'],
  ['03', 'Operate', 'Explore a workspace built around your choices.'],
]

export default function Landing() {
  return (
    <Page>
      <section className="relative px-6 pb-8 pt-16 text-center md:pt-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(95,184,201,.12),transparent_70%)]" />
        <div className="relative mx-auto max-w-6xl">
          <h1 className="mx-auto max-w-[15ch] text-[length:clamp(2.4rem,6.4vw,4.75rem)] font-semibold leading-[1.04] tracking-[-.035em]">
            Your gym deserves its own operating system.
          </h1>
          <p className="mx-auto mb-9 mt-6 max-w-[56ch] text-[length:clamp(1rem,2vw,1.2rem)] text-mu">
            Manage members, memberships, attendance, payments, trainers and operations from one intelligent workspace.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/build" className="btn btn-p">Build My Gym System</Link>
            <Link to="/app" className="btn">Explore Demo</Link>
          </div>
        </div>
      </section>

      <section id="demo" className="mx-auto mt-12 max-w-6xl px-4 md:mt-16 md:px-6"><DashboardPreview /></section>

      <section id="how" className="mx-auto max-w-6xl px-6 pb-16 pt-28 md:pt-36">
        <h2 className="max-w-[20ch] text-[length:clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-[-.03em]">Pick the modules. Watch the system assemble.</h2>
        <p className="mb-9 mt-4 max-w-[54ch] text-mu">All figures in this experience are demo data. GymOS rebuilds itself around the tools you choose.</p>
        <ol className="mb-8 grid gap-3 md:grid-cols-3">
          {HOW.map(([n, t, d]) => (
            <li key={n} className="rounded-xl border border-line bg-panel p-5">
              <span className="text-xs tabular-nums text-ac">{n}</span>
              <h3 className="mt-1 text-lg font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-mu">{d}</p>
            </li>
          ))}
        </ol>
        <ul className="mb-9 flex flex-wrap gap-2" aria-label="Modules">
          {MODULES.map((m) => <li key={m.id} className="rounded-lg border border-line bg-panel px-3.5 py-2 text-[13px] text-mu">{m.id}</li>)}
        </ul>
        <Link to="/build" className="btn btn-p">Build My Gym System</Link>
        <p className="mt-14 max-w-[44ch] text-base">ANJORYX doesn't just build websites. We build the software that runs businesses.</p>
      </section>
    </Page>
  )
}
