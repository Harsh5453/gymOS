import { createContext, useContext, useState } from 'react'
import { BUSINESSES } from '../data/gym'

const Ctx = createContext(null)
export const useConfig = () => useContext(Ctx)

export function ConfigProvider({ children }) {
  const [business, setBusiness] = useState(null)
  const [modules, setModules] = useState([])
  const [step, setStep] = useState(0)
  const pick = (b) => { setBusiness(b); setModules(b.modules) }
  const toggle = (id) => setModules((m) => (m.includes(id) ? m.filter((x) => x !== id) : [...m, id]))
  return <Ctx.Provider value={{ business, modules, step, setStep, pick, toggle }}>{children}</Ctx.Provider>
}

// Workspace falls back to a Fitness Center preset when /app is opened without configuring.
export function useActive() {
  const { business, modules } = useConfig()
  return business ? { name: business.name, modules } : { name: 'Fitness Center', modules: BUSINESSES[1].modules }
}
