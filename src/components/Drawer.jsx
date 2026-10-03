import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Drawer({ open, onClose, title, children }) {
  const closeRef = useRef(null)
  useEffect(() => {
    if (!open) return
    const prev = document.activeElement
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); prev?.focus?.() }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="scrim" className="fixed inset-0 z-40 bg-black/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.aside key="panel" role="dialog" aria-modal="true" aria-label={title} className="fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto border-l border-line bg-panel p-6" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 320, damping: 34 }}>
            <div className="mb-5 flex items-center justify-between"><span className="tag">Demo Data</span><button ref={closeRef} type="button" className="btn btn-s" onClick={onClose}>Close</button></div>
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
