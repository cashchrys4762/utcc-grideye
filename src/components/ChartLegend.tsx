interface LegendItem {
  name: string
  color: string
}

export default function ChartLegend({ items }: { items: LegendItem[] }) {
  return (
    <div className="chart-legend-grid">
      {items.map((entry) => (
        <div key={entry.name} className="chart-legend-item">
          <span className="chart-legend-dot" style={{ background: entry.color }} />
          <span className="chart-legend-label" style={{ color: entry.color }}>{entry.name}</span>
        </div>
      ))}
    </div>
  )
}
