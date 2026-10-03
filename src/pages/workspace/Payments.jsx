import useSkeleton from '../../hooks/useSkeleton'
import Skeleton from '../../components/Skeleton'
import DataTable from '../../components/DataTable'
import { Kpi, PageHeader, Status } from '../../components/ui'
import { PAYMENTS } from '../../data/workspace'
import { inr } from '../../lib/format'

const KPIS = [['Collected', '₹3.42L', 'text-ok'], ['Pending', '₹48,200', 'text-wa'], ['Overdue', '₹17,800', 'text-[#e07a7a]'], ['Renewals this week', '₹72,400', 'text-mu']]
const COLS = [
  { label: 'Member', key: 'name', className: 'font-medium' },
  { label: 'Plan', key: 'plan', className: 'text-mu' },
  { label: 'Amount', render: (p) => inr(p.amount) },
  { label: 'Status', render: (p) => <Status s={p.status} /> },
  { label: 'Date', key: 'date', className: 'text-mu' },
]

export default function Payments() {
  if (useSkeleton('payments')) return <Skeleton kind="table" />
  return (
    <div className="grid gap-3">
      <PageHeader title="Payments" sub="Collections, dues and transactions." />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{KPIS.map(([label, text, tone]) => <Kpi key={label} label={label} text={text} tone={tone} note="" />)}</div>
      <DataTable cols={COLS} rows={PAYMENTS} />
    </div>
  )
}
