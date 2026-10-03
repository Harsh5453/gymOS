import { useState } from 'react'
import Drawer from '../../components/Drawer'
import { Avatar, PageHeader, Panel, Status } from '../../components/ui'
import { BarChart } from '../../components/charts'
import { DAYS, TRAINERS } from '../../data/workspace'

export default function Trainers() {
  const [sel, setSel] = useState(null)
  return (
    <div>
      <PageHeader title="Trainers" sub="Schedules and availability." />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TRAINERS.map((t) => (
          <button key={t.id} type="button" onClick={() => setSel(t)} className="card flex flex-col gap-3 p-4 text-left transition hover:-translate-y-0.5 hover:border-[#3d5570]">
            <span className="flex items-center justify-between"><Avatar name={t.name} big /><Status s={t.status} /></span>
            <span><b className="block text-base">{t.name}</b><span className="text-mu">{t.role}</span></span>
            <span className="text-sm text-mu">{t.sessions} sessions today · {t.members} members</span>
          </button>
        ))}
      </div>
      <Drawer open={!!sel} onClose={() => setSel(null)} title={sel ? `${sel.name}, trainer details` : ''}>
        {sel && (<>
          <div className="flex items-center gap-3"><Avatar name={sel.name} big /><div><h2 className="text-xl font-semibold tracking-tight">{sel.name}</h2><span className="text-mu">{sel.role}</span></div></div>
          <dl className="my-6 grid grid-cols-2 gap-4 text-sm">
            {[['Availability', sel.status], ['Sessions today', sel.sessions], ['Members', sel.members], ['Rating', `4.${9 - sel.id}`]].map(([k, v]) => <div key={k}><dt className="text-xs text-mu">{k}</dt><dd className="font-medium">{v}</dd></div>)}
          </dl>
          <Panel title="Sessions this week"><BarChart label="Sessions per weekday" data={[4, 6, 5, 6, sel.sessions, 3, 2]} labels={DAYS} hl={4} h={50} /></Panel>
        </>)}
      </Drawer>
    </div>
  )
}
