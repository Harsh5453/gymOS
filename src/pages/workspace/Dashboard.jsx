import useSkeleton from '../../hooks/useSkeleton'
import Skeleton from '../../components/Skeleton'
import { Kpi, Panel, PageHeader, People } from '../../components/ui'
import { LineChart, BarChart, Donut } from '../../components/charts'
import { MEMBERS, TRAINERS, MIX, WEEK, DAYS } from '../../data/workspace'

const KPIS = [
  { label: 'Active Members', v: 1284, note: '+3.2% this month' },
  { label: 'Monthly Revenue', v: 342800, p: '₹', note: '+8.1% this month' },
  { label: 'Attendance', v: 87.4, s: '%', dec: 1, note: '+1.4 pts' },
  { label: 'Renewals', v: 64, note: 'due in 30 days', tone: 'text-mu' },
]

export default function Dashboard() {
  const loading = useSkeleton('dash')
  if (loading) return <Skeleton kind="dash" />
  return (
    <div className="grid gap-3">
      <PageHeader title="Good morning, Alex" sub="Here's what's happening at your gym today. Thursday, October 1, 2026" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{KPIS.map((k) => <Kpi key={k.label} {...k} />)}</div>
      <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr]">
        <Panel title="Revenue, last 8 months" aside="₹ thousands"><LineChart label="Monthly revenue rising from 212 to 343 thousand rupees" data={[212, 228, 224, 261, 278, 304, 318, 343]} /></Panel>
        <Panel title="Membership mix"><Donut parts={MIX} /></Panel>
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        <Panel title="Weekly attendance"><BarChart label="Attendance by weekday" data={WEEK} labels={DAYS} hl={4} /></Panel>
        <Panel title="Recent check-ins"><People rows={MEMBERS.filter((m) => m.last === 'Today').slice(0, 4).map((m) => [m.name, m.plan])} right={(x) => <span className="text-xs text-mu">{x}</span>} /></Panel>
        <Panel title="Upcoming renewals"><People rows={MEMBERS.filter((m) => m.status === 'Expiring').map((m) => [m.name, m.renewal])} right={(x) => <span className="rounded-full border border-wa/[.35] px-2 py-0.5 text-[11px] text-wa">{x}</span>} /></Panel>
      </div>
      <Panel title="Trainer activity"><People rows={TRAINERS.slice(0, 3).map((t) => [t.name, `${t.sessions} sessions today`])} right={(x) => <span className="text-xs text-mu">{x}</span>} /></Panel>
    </div>
  )
}
