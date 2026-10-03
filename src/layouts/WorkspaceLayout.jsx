import { useEffect, useRef, useState } from 'react'
import { NavLink, Link, Navigate, useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useActive } from '../hooks/useConfig'
import { NAV, NOTIFS } from '../data/workspace'

export default function WorkspaceLayout() {
  const { pathname } = useLocation()
  const { name, modules } = useActive()
  const [notifs, setNotifs] = useState(NOTIFS)
  const [toast, setToast] = useState('')
  const scroller = useRef(null)

  const items = NAV.filter((n) => !n.module || modules.includes(n.module))
  const slug = pathname.split('/')[2] ?? ''
  const unread = notifs.filter((n) => !n.read).length

  const ctx = {
    notifs,
    toggle: (id) => setNotifs((l) => l.map((n) => (n.id === id ? { ...n, read: !n.read } : n))),
    readAll: () => { setNotifs((l) => l.map((n) => ({ ...n, read: true }))); setToast('All notifications marked as read.') },
  }
  const outlet = useOutlet(ctx)

  useEffect(() => { scroller.current?.scrollTo(0, 0); scroller.current?.focus({ preventScroll: true }) }, [pathname])
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(''), 2400); return () => clearTimeout(t) }, [toast])

  if (!items.some((n) => n.to === slug)) return <Navigate to="/app" replace />

  const link = (n, bottom) => (
    <NavLink key={n.to} to={`/app/${n.to}`.replace(/\/$/, '')} end={n.to === ''} title={n.label}
      className={({ isActive }) => bottom
        ? `relative flex min-w-[72px] flex-none flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 text-[11px] ${isActive ? 'text-ac' : 'text-mu'}`
        : `relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors max-lg:justify-center ${isActive ? 'bg-raise text-tx' : 'text-mu hover:bg-raise hover:text-tx'}`}>
      <n.icon size={bottom ? 20 : 18} strokeWidth={1.6} aria-hidden />
      <span className={bottom ? '' : 'max-lg:sr-only'}>{n.label}</span>
      {n.to === 'notifications' && unread > 0 && (
        <span className={`rounded-full bg-ac text-[11px] font-semibold leading-none text-ink ${bottom ? 'absolute right-4 top-0.5 h-2 w-2 text-[0px]' : 'ml-auto px-1.5 py-[3px] max-lg:absolute max-lg:right-1.5 max-lg:top-1.5 max-lg:h-2 max-lg:w-2 max-lg:p-0 max-lg:text-[0px]'}`}>{unread}</span>
      )}
    </NavLink>
  )

  return (
    <div className="fixed inset-0 z-10 flex bg-ink text-[14px]">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[200] focus:rounded-lg focus:bg-tx focus:px-4 focus:py-2 focus:font-semibold focus:text-ink">Skip to content</a>
      <aside className="hidden w-16 shrink-0 flex-col gap-0.5 overflow-y-auto border-r border-line bg-[#0a1019] p-3 md:flex lg:w-56">
        <b className="px-2.5 pb-3 pt-1 text-[13px] tracking-[.12em] max-lg:text-center max-lg:text-[10px] max-lg:tracking-normal">GYMOS</b>
        <div className="mb-3 hidden gap-0.5 rounded-lg border border-line p-2.5 text-[12.5px] text-mu lg:grid">
          <span>{name} · {modules.length} modules</span>
          <Link to="/build" className="text-ac hover:underline">Reconfigure</Link>
        </div>
        <nav aria-label="Workspace" className="grid gap-0.5">{items.map((n) => link(n))}</nav>
        <small className="mt-auto px-2.5 pt-3 text-[11px] tracking-[.14em] text-mu max-lg:hidden">ANJORYX · <Link to="/" className="hover:text-tx">Back to site</Link></small>
      </aside>

      <div id="main" ref={scroller} tabIndex={-1} className="min-w-0 flex-1 overflow-y-auto pb-20 outline-none md:pb-0">
        <div className="mx-auto max-w-6xl p-4 md:p-6 lg:p-7">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, ease: [0.3, 0.7, 0.2, 1] }}>{outlet}</motion.div>
          </AnimatePresence>
        </div>
      </div>

      <nav aria-label="Workspace quick" className="fixed inset-x-0 bottom-0 z-20 flex overflow-x-auto border-t border-line bg-[#0a1019]/95 p-1.5 pb-[calc(6px+env(safe-area-inset-bottom))] md:hidden">{items.map((n) => link(n, true))}</nav>

      <AnimatePresence>
        {toast && <motion.div role="status" initial={{ opacity: 0, y: 16, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: 8, x: '-50%' }} className="fixed bottom-24 left-1/2 z-50 rounded-[10px] border border-line bg-raise px-4 py-2.5 text-sm md:bottom-8">{toast}</motion.div>}
      </AnimatePresence>
    </div>
  )
}
