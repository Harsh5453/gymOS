import { useOutletContext } from 'react-router-dom'
import { PageHeader } from '../../components/ui'

export default function Notifications() {
  const { notifs, toggle, readAll } = useOutletContext()
  return (
    <div>
      <PageHeader title="Notifications" sub="Operational alerts for your gym." />
      <button type="button" className="btn btn-s mb-3" onClick={readAll}>Mark all as read</button>
      <ul className="grid gap-2">
        {notifs.map((n) => (
          <li key={n.id}>
            <button type="button" onClick={() => toggle(n.id)} className="card flex w-full items-center gap-3.5 px-4 py-3.5 text-left hover:border-[#3d5570]">
              <i aria-hidden className={`h-2 w-2 shrink-0 rounded-full ${n.read ? 'bg-line' : 'bg-ac'}`} />
              <span className="min-w-0 flex-1">
                <b className={`block font-medium ${n.read ? 'text-mu' : 'text-tx'}`}>{n.text}</b>
                <small className="text-xs text-mu">{n.tag} · {n.time}</small>
              </span>
              <span className={`rounded-full border px-2.5 py-0.5 text-[11.5px] ${n.read ? 'border-line text-mu' : 'border-wa/[.35] text-wa'}`}>{n.read ? 'Read' : 'Unread'}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
