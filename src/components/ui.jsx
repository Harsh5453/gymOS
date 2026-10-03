import useCountUp from '../hooks/useCountUp'

const TONE = { Active: 'ok', Paid: 'ok', Available: 'ok', Expiring: 'wa', Pending: 'wa', 'In session': 'wa', Overdue: 'r', Inactive: 'n', Refunded: 'n', 'Off today': 'n' }
const CLS = { ok: 'text-ok border-ok/[.35]', wa: 'text-wa border-wa/[.35]', r: 'text-[#e07a7a] border-[#e07a7a]/[.35]', n: 'text-mu border-line' }

export const Status = ({ s }) => <span className={`whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[11.5px] ${CLS[TONE[s]]}`}>{s}</span>

export const Avatar = ({ name, big }) => (
  <i className={`grid shrink-0 place-items-center rounded-full bg-[#1d2b3d] font-semibold not-italic ${big ? 'h-12 w-12 text-base' : 'h-7 w-7 text-[11px]'}`}>
    {name.split(' ').map((w) => w[0]).join('')}
  </i>
)

export const PageHeader = ({ title, sub }) => (
  <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
    <div><h1 className="text-2xl font-semibold tracking-tight">{title}</h1><p className="text-sm text-mu">{sub}</p></div>
    <span className="tag">Demo Data</span>
  </header>
)

export const Panel = ({ title, aside, className = '', children }) => (
  <section className={`card ${className}`}>
    {title && <h2 className="mb-2.5 flex justify-between gap-2 text-[12.5px] font-medium text-mu">{title}{aside && <span>{aside}</span>}</h2>}
    {children}
  </section>
)

export function Kpi({ label, v, text, p = '', s = '', dec = 0, note, tone = 'text-ok' }) {
  const n = useCountUp(v ?? 0)
  return (
    <Panel title={label}>
      <div className="text-2xl font-semibold tabular-nums tracking-tight">
        {text ?? `${p}${n.toLocaleString('en-IN', { minimumFractionDigits: dec, maximumFractionDigits: dec })}${s}`}
      </div>
      <div className={`text-xs ${tone}`}>{note}</div>
    </Panel>
  )
}

export const People = ({ rows, right }) => (
  <ul className="grid gap-2.5 text-[13px]">
    {rows.map(([n, x]) => (
      <li key={n} className="flex items-center justify-between gap-2">
        <span className="flex min-w-0 items-center gap-2.5"><Avatar name={n} />{n}</span>
        {right(x)}
      </li>
    ))}
  </ul>
)
