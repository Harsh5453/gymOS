const B = ({ h, w = '100%', className = '' }) => <div className={`animate-pulse rounded-[10px] bg-raise motion-reduce:animate-none ${className}`} style={{ height: h, width: w }} />

export default function Skeleton({ kind = 'dash' }) {
  return (
    <div role="status" aria-label="Loading" className="grid gap-3">
      <B h={26} w={220} /><B h={14} w={320} className="mb-3" />
      {kind === 'dash' && (<>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{[0, 1, 2, 3].map((i) => <B key={i} h={92} />)}</div>
        <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr]"><B h={210} /><B h={210} /></div>
        <div className="grid gap-3 lg:grid-cols-3"><B h={150} /><B h={150} /><B h={150} /></div>
      </>)}
      {kind === 'table' && (<><B h={38} />{[0, 1, 2, 3, 4, 5].map((i) => <B key={i} h={46} />)}</>)}
      {kind === 'charts' && <div className="grid gap-3 lg:grid-cols-2">{[0, 1, 2, 3].map((i) => <B key={i} h={170} />)}</div>}
    </div>
  )
}
