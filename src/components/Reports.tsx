import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import PanelHeader from './PanelHeader'
import ChartLegend from './ChartLegend'
import { useApp } from '../context/AppContext'
import { generateReport, exportIncidentsCsv, sortIncidents } from '../api/mockApi'
import { LOCATION_FILTERS } from '../data/incidents'
import type { CauseStat, Hotspot, Incident, SortDirection } from '../data/types'

function RiskBar({ score }: { score: number }) {
  const color = score >= 8 ? '#ef4444' : score >= 6 ? '#f59e0b' : score >= 4 ? '#00a3ff' : '#22c55e'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 4, background: '#1e293b', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ width: `${score * 10}%`, height: '100%', background: color, borderRadius: 2 }} />
      </div>
      <span style={{ fontSize: 13, fontFamily: 'JetBrains Mono, monospace', color, fontWeight: 700, minWidth: 32 }}>{score.toFixed(1)}</span>
    </div>
  )
}

const card = { background: '#0a1628', borderWidth: 1, borderStyle: 'solid' as const, borderColor: '#1e293b', borderRadius: 12 }

const inputStyle: React.CSSProperties = {
  background: '#0f172a', borderWidth: 1, borderStyle: 'solid', borderColor: '#1e293b',
  borderRadius: 8, color: '#e2e8f0', fontSize: 13, padding: '8px 12px', outline: 'none',
  fontFamily: 'JetBrains Mono, monospace',
}

export default function Reports() {
  const { t } = useTranslation()
  const { showToast, openIncident } = useApp()
  const [dateFrom, setDateFrom] = useState('2024-07-07')
  const [dateTo, setDateTo] = useState('2024-07-10')
  const [location, setLocation] = useState('all')
  const [sortCol, setSortCol] = useState('date')
  const [sortDir, setSortDir] = useState<SortDirection>('desc')
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [tableData, setTableData] = useState<Incident[]>([])
  const [causeData, setCauseData] = useState<CauseStat[]>([])
  const [hotspots, setHotspots] = useState<Hotspot[]>([])

  const sortLabels: Record<string, string> = {
    date: t('reports.headers.date'),
    location: t('reports.headers.location'),
    type: t('reports.headers.type'),
    risk: t('reports.headers.risk'),
  }

  const tableHeaders = [
    { id: 'date', key: 'reports.headers.date' },
    { id: 'location', key: 'reports.headers.location' },
    { id: 'type', key: 'reports.headers.type' },
    { id: 'risk', key: 'reports.headers.risk' },
  ]

  const handleSort = (col: string) => {
    if (sortCol === col) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortCol(col)
      setSortDir('desc')
    }
  }

  const loadReport = async (showNotification = false) => {
    setLoading(true)
    try {
      const result = await generateReport({ dateFrom, dateTo, location })
      setTableData(result.incidents)
      setCauseData(result.causes)
      setHotspots(result.hotspots)
      setGenerated(true)
      if (showNotification) {
        showToast(t('toast.reportGenerated', { count: result.incidents.length }), 'success')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadReport()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleExport = () => {
    if (!generated || tableData.length === 0) {
      showToast(t('toast.generateFirst'), 'warning')
      return
    }
    const sorted = sortIncidents(tableData, sortCol, sortDir)
    exportIncidentsCsv(sorted, t)
    showToast(t('toast.csvExported'), 'success')
  }

  const displayedData = generated
    ? sortIncidents(tableData, sortCol, sortDir)
    : []

  const pieData = causeData.map((c) => ({ name: t(c.key), value: c.value, color: c.color }))

  const CustomPieTooltip = ({ active, payload }: { active?: boolean; payload?: { name?: string; value?: number; payload?: { color?: string } }[] }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: '#0f172a', borderWidth: 1, borderStyle: 'solid', borderColor: '#1e293b', borderRadius: 8, padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>
          <div style={{ color: payload[0].payload?.color, fontWeight: 700 }}>{payload[0].name}</div>
          <div style={{ color: '#94a3b8', marginTop: 2 }}>{payload[0].value}{t('reports.percentOfIncidents')}</div>
        </div>
      )
    }
    return null
  }

  const maxHotspotCount = hotspots.length > 0 ? Math.max(...hotspots.map((h) => h.count)) : 47

  return (
    <div className="page-content">
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, color: '#00a3ff', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.12em', marginBottom: 4 }}>{t('reports.badge')}</div>
        <h1 className="page-title">{t('reports.title')}</h1>
      </div>

      <div className="filter-bar" style={{ ...card, padding: '16px 22px', marginBottom: 22 }}>
        <div className="filter-field">
          <span style={{ fontSize: 12, color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}>{t('reports.from')}</span>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} style={{ ...inputStyle, width: '100%' }} />
        </div>
        <div className="filter-field">
          <span style={{ fontSize: 12, color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}>{t('reports.to')}</span>
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} style={{ ...inputStyle, width: '100%' }} />
        </div>
        <div className="filter-field">
          <span style={{ fontSize: 12, color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}>{t('reports.location')}</span>
          <select value={location} onChange={(e) => setLocation(e.target.value)} style={{ ...inputStyle, cursor: 'pointer', width: '100%' }}>
            {LOCATION_FILTERS.map((l) => <option key={l.value} value={l.value} style={{ background: '#0f172a' }}>{t(l.key)}</option>)}
          </select>
        </div>
        <div className="filter-bar-actions">
        <button onClick={() => loadReport(true)} disabled={loading} style={{
          padding: '8px 18px', background: loading ? '#1e293b' : 'linear-gradient(135deg, #00a3ff, #0066cc)',
          borderWidth: 0, borderRadius: 8, color: 'white', fontSize: 13, fontWeight: 600,
          cursor: loading ? 'wait' : 'pointer', fontFamily: 'JetBrains Mono, monospace', width: '100%',
          opacity: loading ? 0.7 : 1,
        }}>{loading ? t('reports.generating') : t('reports.generateReport')}</button>
        <button onClick={handleExport} style={{
          padding: '8px 18px', background: 'rgba(0,163,255,0.08)',
          borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(0,163,255,0.25)',
          borderRadius: 8, color: '#00a3ff', fontSize: 13, cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace', width: '100%',
        }}>{t('reports.exportCsv')}</button>
        </div>
      </div>

      <div className="charts-grid">
        <div style={{ ...card, padding: '22px 24px' }}>
          <PanelHeader center title={t('reports.causesTitle')} subtitle={generated ? t('reports.causesSubtitleFiltered', { count: tableData.length }) : t('reports.causesSubtitle')} />
          <div className="pie-chart-wrap">
            {generated && pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={196}>
                <PieChart margin={{ top: 4, right: 0, bottom: 12, left: 0 }}>
                  <Pie data={pieData} cx="50%" cy="46%" innerRadius={58} outerRadius={86} paddingAngle={3} dataKey="value">
                    {pieData.map((entry, i) => <Cell key={i} fill={entry.color} stroke="transparent" />)}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: 196, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#475569', fontSize: 13, fontFamily: 'JetBrains Mono, monospace' }}>
                {t('reports.noData')}
              </div>
            )}
          </div>
          {generated && pieData.length > 0 && <ChartLegend items={pieData} />}
        </div>

        <div style={{ ...card, overflow: 'hidden', position: 'relative' }}>
          <div style={{ padding: '22px 24px 0' }}>
            <PanelHeader center title={t('reports.hotspotTitle')} subtitle={t('reports.hotspotSubtitle')} />
          </div>
          <div className="chart-visual-wrap" style={{ position: 'relative', margin: '0 24px', height: 248, background: '#040d1a', borderRadius: 8, overflow: 'hidden', borderWidth: 1, borderStyle: 'solid', borderColor: '#1e293b' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'linear-gradient(#00a3ff 1px, transparent 1px), linear-gradient(90deg, #00a3ff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="0" y1="40" x2="100" y2="42" stroke="#1e3a5f" strokeWidth="0.8" />
              <line x1="0" y1="60" x2="100" y2="58" stroke="#1e3a5f" strokeWidth="0.6" />
              <line x1="35" y1="0" x2="38" y2="100" stroke="#1e3a5f" strokeWidth="0.8" />
              <line x1="65" y1="0" x2="62" y2="100" stroke="#1e3a5f" strokeWidth="0.6" />
              <line x1="0" y1="20" x2="45" y2="40" stroke="#1e3a5f" strokeWidth="0.5" />
              <line x1="55" y1="42" x2="100" y2="25" stroke="#1e3a5f" strokeWidth="0.5" />
            </svg>
            {(generated ? hotspots : []).map((h) => {
              const radius = 6 + (h.count / maxHotspotCount) * 20
              const alpha = 0.2 + (h.count / maxHotspotCount) * 0.35
              return (
                <div key={h.nameKey} style={{ position: 'absolute', left: `${h.x}%`, top: `${h.y}%`, transform: 'translate(-50%,-50%)' }}>
                  <div style={{
                    width: radius * 2, height: radius * 2, borderRadius: '50%',
                    background: `rgba(239,68,68,${alpha})`,
                    borderWidth: 1, borderStyle: 'solid', borderColor: `rgba(239,68,68,${alpha + 0.3})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#ef4444' }} />
                  </div>
                  <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: 3, whiteSpace: 'nowrap', fontSize: 9, fontFamily: 'JetBrains Mono, monospace', color: '#94a3b8' }}>
                    {h.count}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="density-legend">
            <span className="density-legend-title">{t('reports.incidentDensity')}</span>
            <div className="density-legend-scale">
              {[0.2, 0.4, 0.6, 0.8, 1].map((o) => (
                <div key={o} className="density-legend-swatch" style={{ background: `rgba(239,68,68,${o})` }} />
              ))}
            </div>
            <span className="density-legend-high">{t('reports.high')}</span>
          </div>
        </div>
      </div>

      <div style={{ ...card, overflow: 'hidden' }}>
        <div className="card-panel-header card-panel-header--center">
          <PanelHeader
            center
            title={t('reports.tableTitle')}
            subtitle={generated
              ? t('reports.recordsSorted', { count: displayedData.length, sort: sortLabels[sortCol] ?? sortCol })
              : t('reports.tableEmpty')}
          />
        </div>
        <div className="table-scroll">
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
            <thead>
              <tr style={{ borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#1e293b' }}>
                {tableHeaders.map((h) => (
                  <th key={h.id} onClick={() => handleSort(h.id)} style={{
                    padding: '10px 22px', textAlign: 'left', fontSize: 11, fontWeight: 600,
                    color: sortCol === h.id ? '#00a3ff' : '#475569',
                    fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.06em', cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap',
                  }}>
                    {t(h.key).toUpperCase()} {sortCol === h.id ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedData.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: '32px 22px', textAlign: 'center', color: '#475569', fontSize: 13, fontFamily: 'JetBrains Mono, monospace' }}>
                    {t('reports.noData')}
                  </td>
                </tr>
              ) : displayedData.map((row, i) => (
                <tr key={row.id}
                  onClick={() => openIncident(row)}
                  style={{ borderBottomWidth: i < displayedData.length - 1 ? 1 : 0, borderBottomStyle: 'solid', borderBottomColor: '#0f172a', cursor: 'pointer' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = '#0f172a' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = 'transparent' }}
                >
                  <td style={{ padding: '12px 22px' }}><span style={{ fontSize: 13, fontFamily: 'JetBrains Mono, monospace', color: '#64748b' }}>{row.date}</span></td>
                  <td style={{ padding: '12px 22px' }}><span style={{ fontSize: 13, color: '#cbd5e1' }}>{t(row.locationKey)}</span></td>
                  <td style={{ padding: '12px 22px' }}><span style={{ fontSize: 13, color: '#94a3b8' }}>{t(row.typeKey)}</span></td>
                  <td style={{ padding: '12px 22px', minWidth: 160 }}><RiskBar score={row.risk} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
