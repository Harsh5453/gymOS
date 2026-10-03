import { PageHeader, Panel, People } from '../../components/ui'
import { Donut } from '../../components/charts'
import { PLANS, MEMBERS, MIX } from '../../data/workspace'
import { inr } from '../../lib/format'

export default function Memberships() {
  return (
    <div className="grid gap-3">
      <PageHeader title="Memberships" sub="Plans and how members are distributed." />
      <div className="grid gap-3 md:grid-cols-3">
        {PLANS.map((p) => (
          <Panel key={p.name} title={p.name} aside={<span className="tag">Demo Pricing</span>}>
            <div className="text-2xl font-semibold tracking-tight">{inr(p.price)}<span className="text-[13px] font-normal text-mu"> / month</span></div>
            <ul className="my-3 grid gap-1 text-sm text-mu">{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
            <div className="text-xs text-ok">{p.members} members</div>
          </Panel>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Panel title="Distribution"><Donut parts={MIX} /></Panel>
        <Panel title="Renewals due in 30 days"><People rows={MEMBERS.filter((m) => m.status !== 'Inactive').slice(0, 5).map((m) => [m.name, `${m.plan} · ${m.renewal}`])} right={(x) => <span className="text-xs text-mu">{x}</span>} /></Panel>
      </div>
    </div>
  )
}
