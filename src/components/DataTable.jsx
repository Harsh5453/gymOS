// Table on md+, stacked cards on mobile. The first column becomes the card title.
export default function DataTable({ cols, rows, empty = 'No results.' }) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-line bg-panel">
      <table className="block w-full md:table">
        <thead className="hidden md:table-header-group">
          <tr>{cols.map((c) => <th key={c.label} scope="col" className="border-b border-line px-3.5 py-2.5 text-left text-xs font-medium text-mu">{c.label}</th>)}</tr>
        </thead>
        <tbody className="block md:table-row-group">
          {rows.length ? rows.map((r) => (
            <tr key={r.id} className="grid grid-cols-2 gap-x-3 gap-y-1.5 border-b border-line p-3.5 last:border-0 md:table-row md:p-0 md:transition-colors md:hover:bg-raise">
              {cols.map((c, i) => (
                <td key={c.label} data-label={c.label} className={`block text-sm before:block before:text-[11px] before:text-mu before:content-[attr(data-label)] md:table-cell md:border-b md:border-line md:px-3.5 md:py-3 md:before:hidden ${i === 0 ? 'col-span-2 before:hidden' : ''} ${c.className || ''}`}>
                  {c.render ? c.render(r) : r[c.key]}
                </td>
              ))}
            </tr>
          )) : <tr className="block md:table-row"><td colSpan={cols.length} className="block p-6 text-center text-mu md:table-cell">{empty}</td></tr>}
        </tbody>
      </table>
    </div>
  )
}
