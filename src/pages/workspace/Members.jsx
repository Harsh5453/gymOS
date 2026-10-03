import { useState } from 'react'
import useSkeleton from '../../hooks/useSkeleton'
import Skeleton from '../../components/Skeleton'
import DataTable from '../../components/DataTable'
import Drawer from '../../components/Drawer'
import { Avatar, PageHeader, Panel, Status } from '../../components/ui'
import { BarChart } from '../../components/charts'
import { MEMBERS } from '../../data/workspace'

const PER = 6
const field = 'h-10 rounded-lg border border-line bg-panel px-3 transition-colors focus:border-ac focus:outline-none'

export default function Members() {
  const loading = useSkeleton('members')
  const [q, setQ] = useState(''), [status, setStatus] = useState(''), [plan, setPlan] = useState('')
  const [page, setPage] = useState(0), [sel, setSel] = useState(null)
  if (loading) return <Skeleton kind="table" />

  const list = MEMBERS.filter((m) => m.name.toLowerCase().includes(q.toLowerCase()) && (!status || m.status === status) && (!plan || m.plan === plan))
  const pages = Math.max(1, Math.ceil(list.length / PER)), p = Math.min(page, pages - 1)
  const filter = (set) => (e) => { set(e.target.value); setPage(0) }
  const cols = [
    { label: 'Member', render: (m) => <button type="button" onClick={() => setSel(m)} className="flex items-center gap-2.5 rounded text-left font-medium hover:text-ac"><Avatar name={m.name} />{m.name}</button> },
    { label: 'Membership', key: 'plan' },
    { label: 'Status', render: (m) => <Status s={m.status} /> },
    { label: 'Attendance', render: (m) => `${m.att}%` },
    { label: 'Last visit', key: 'last', className: 'text-mu' },
    { label: 'Renewal', key: 'renewal' },
    { label: 'Actions', className: 'max-md:hidden', render: (m) => <button type="button" className="btn btn-s" aria-label={`Open ${m.name}`} onClick={() => setSel(m)}>View</button> },
  ]

  return (
    <div>
      <PageHeader title="Members" sub="Search, filter and open any member." />
      <div className="mb-3 flex flex-wrap gap-2">
        <input type="search" aria-label="Search members" placeholder="Search members" value={q} onChange={filter(setQ)} className={`${field} min-w-40 flex-1`} />
        <select aria-label="Status" value={status} onChange={filter(setStatus)} className={field}><option value="">All statuses</option><option>Active</option><option>Expiring</option><option>Inactive</option></select>
        <select aria-label="Membership" value={plan} onChange={filter(setPlan)} className={field}><option value="">All plans</option><option>Basic</option><option>Pro</option><option>Elite</option></select>
      </div>
      <DataTable cols={cols} rows={list.slice(p * PER, p * PER + PER)} empty="No members match. Clear a filter to see more." />
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm text-mu">{list.length} members · page {p + 1} of {pages}</span>
        <span className="flex gap-2">
          <button type="button" className="btn btn-s" disabled={!p} onClick={() => setPage(p - 1)}>Previous</button>
          <button type="button" className="btn btn-s" disabled={p >= pages - 1} onClick={() => setPage(p + 1)}>Next</button>
        </span>
      </div>

      <Drawer open={!!sel} onClose={() => setSel(null)} title={sel ? `${sel.name}, member details` : ''}>
        {sel && (<>
          <div className="flex items-center gap-3"><Avatar name={sel.name} big /><div><h2 className="text-xl font-semibold tracking-tight">{sel.name}</h2><Status s={sel.status} /></div></div>
          <dl className="my-6 grid grid-cols-2 gap-4 text-sm">
            {[['Membership', sel.plan], ['Attendance', `${sel.att}%`], ['Last visit', sel.last], ['Renewal', sel.renewal]].map(([k, v]) => <div key={k}><dt className="text-xs text-mu">{k}</dt><dd className="font-medium">{v}</dd></div>)}
          </dl>
          <Panel title="Visits, last 8 weeks"><BarChart label="Weekly visits" data={[4, 5, 3, 5, 4, 2, 5, sel.att / 20]} labels={['1', '2', '3', '4', '5', '6', '7', '8']} h={50} /></Panel>
        </>)}
      </Drawer>
    </div>
  )
}
