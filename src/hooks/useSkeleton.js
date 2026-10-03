import { useEffect, useState } from 'react'

const seen = new Set() // skeleton shows on first visit to a screen only

export default function useSkeleton(key, ms = 380) {
  const [loading, setLoading] = useState(!seen.has(key))
  useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => { seen.add(key); setLoading(false) }, ms)
    return () => clearTimeout(t)
  }, [])
  return loading
}
