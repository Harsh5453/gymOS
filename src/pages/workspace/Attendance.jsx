import { motion } from 'framer-motion'
import { PageHeader, Panel, People } from '../../components/ui'
import { BarChart } from '../../components/charts'
import { MEMBERS, WEEK, DAYS } from '../../data/workspace'

const ZONES = ['Cardio', 'Strength', 'Functional', 'Free weights']

export default function Attendance() {
  return (
    <div className="grid gap-3">
      <PageHeader title="Attendance" sub="Occupancy and check-ins." />
      <div className="grid gap-3 lg:grid-cols-3">
        <Panel title="Current occupancy">
          <div className="relative mx-auto max-w-[200px]">
            <svg viewBox="0 0 100 100" role="img" aria-label="Occupancy 72 of 120, 60 percent" className="-rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#1c2838" strokeWidth="9" />
              <motion.circle cx="50" cy="50" r="42" fill="none" stroke="#5fb8c9" strokeWidth="9" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 0.6 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.3, 0.7, 0.2, 1] }} />
            </svg>
            <div className="absolute inset-0 grid place-content-center text-center"><b className="text-2xl font-semibold tabular-nums">72 / 120</b><span className="text-mu">60% capacity</span></div>
          </div>
        </Panel>
        <Panel title="Peak hours today"><BarChart label="Occupancy by hour, peaking at 6 pm" data={[18, 42, 64, 38, 22, 31, 58, 92, 76, 40]} labels={['6a', '7', '8', '9', '11', '1p', '4', '6', '7', '8']} hl={7} h={80} /></Panel>
        <Panel title="Weekly attendance"><BarChart label="Attendance by weekday" data={WEEK} labels={DAYS} hl={4} h={80} /></Panel>
      </div>
      <Panel title="Recent check-ins"><People rows={MEMBERS.slice(0, 7).map((m, i) => [m.name, `${ZONES[i % 4]} · ${(i + 1) * 4} min ago`])} right={(x) => <span className="text-xs text-mu">{x}</span>} /></Panel>
    </div>
  )
}
