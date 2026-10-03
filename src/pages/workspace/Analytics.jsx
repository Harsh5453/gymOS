import { useState } from 'react'
import { motion } from 'framer-motion'
import useSkeleton from '../../hooks/useSkeleton'
import Skeleton from '../../components/Skeleton'
import { PageHeader, Panel } from '../../components/ui'
import { LineChart, BarChart, Donut } from '../../components/charts'
import { MIX, TRAINERS } from '../../data/workspace'

const PERIODS = { '7D': [7, 0.15], '30D': [10, 1], '90D': [12, 2.6], '1Y': [12, 9] }
const ser = (b, s, n, k) => Array.from({ length: n }, (_, i) => b + s * i + Math.sin(i * k) * b * 0.04)

export default function Analytics() {
  const loading = useSkeleton('analytics')
  const [period, setPeriod] = useState('30D')
  if (loading) return <Skeleton kind="charts" />
  const [n, m] = PERIODS[period]
  const charts = [['Member growth', ser(1180, 8 * m, n, 1.3)], ['Revenue growth', ser(290, 3.2 * m, n, 1.7)], ['Attendance', ser(80, 0.3 * m, n, 2.1)], ['Retention', ser(88, 0.15 * m, n, 0.9)]]
  return (
    <div className="grid gap-3">
      <PageHeader title="Analytics" sub="Growth, retention and performance." />
      <div role="group" aria-label="Period" className="inline-flex w-fit rounded-[9px] border border-line bg-panel p-0.5">
        {Object.keys(PERIODS).map((p) => (
          <button key={p} type="button" aria-pressed={period === p} onClick={() => setPeriod(p)} className={`relative rounded-md px-4 py-1.5 transition-colors ${period === p ? 'text-tx' : 'text-mu hover:text-tx'}`}>
            {period === p && <motion.span layoutId="period" className="absolute inset-0 rounded-md bg-raise" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
            <span className="relative">{p}</span>
          </button>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {charts.map(([t, d]) => <Panel key={t} title={t} aside={period}><LineChart label={`${t}, last ${period}`} data={d} /></Panel>)}
        <Panel title="Membership distribution"><Donut parts={MIX} /></Panel>
        <Panel title="Trainer performance" aside="sessions"><BarChart label="Sessions by trainer" data={TRAINERS.map((t) => t.sessions * 12)} labels={TRAINERS.map((t) => t.name.split(' ')[0])} /></Panel>
      </div>
    </div>
  )
}
