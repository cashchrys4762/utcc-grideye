import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const causeKeys = [
  { key: 'causes.speeding', value: 32, color: '#ef4444' },
  { key: 'causes.redLightViolation', value: 24, color: '#f59e0b' },
  { key: 'causes.distractedDriving', value: 18, color: '#00a3ff' },
  { key: 'causes.laneChange', value: 14, color: '#a855f7' },
  { key: 'causes.roadCondition', value: 8, color: '#22c55e' },
  { key: 'causes.other', value: 4, color: '#475569' },
]

const tableData = [
  { date: '2024-07-10', locationKey: 'locations.latPhraoKaset', typeKey: 'incidentTypes.multiVehicleCollision', risk: 9.2 },
  { date: '2024-07-10', locationKey: 'locations.sukhumvitSoi71', typeKey: 'incidentTypes.pedestrianConflict', risk: 6.7 },
  { date: '2024-07-10', locationKey: 'locations.ratchadaphisek', typeKey: 'incidentTypes.redLightViolation', risk: 4.1 },
  { date: '2024-07-10', locationKey: 'locations.chatuchak', typeKey: 'incidentTypes.congestionAlert', risk: 5.8 },
  { date: '2024-07-09', locationKey: 'locations.huaiKhwang', typeKey: 'incidentTypes.wrongWayDriver', risk: 9.7 },
  { date: '2024-07-09', locationKey: 'locations.phetchaburi', typeKey: 'incidentTypes.laneObstruction', risk: 3.2 },
  { date: '2024-07-09', locationKey: 'locations.vibhavadiRangsit', typeKey: 'incidentTypes.speedViolation', risk: 4.5 },
  { date: '2024-07-09', locationKey: 'locations.dinDaeng', typeKey: 'incidentTypes.multiVehicleCollision', risk: 8.9 },
  { date: '2024-07-08', locationKey: 'locations.ariBtsArea', typeKey: 'incidentTypes.pedestrianConflict', risk: 6.1 },
  { date: '2024-07-08', locationKey: 'locations.phahonYothin', typeKey: 'incidentTypes.redLightViolation', risk: 3.8 },
  { date: '2024-07-08', locationKey: 'locations.ngamwongwan', typeKey: 'incidentTypes.vehicleBreakdown', risk: 4.4 },
  { date: '2024-07-07', locationKey: 'locations.outerRingEast', typeKey: 'incidentTypes.roadDebris', risk: 2.9 },
]

const locationFilters = [
  { value: 'all', key: 'locations.allLocations' },
  { value: 'huaiKhwang', key: 'locations.huaiKhwangFilter' },
  { value: 'latPhrao', key: 'locations.latPhraoFilter' },
  { value: 'sukhumvit', key: 'locations.sukhumvitFilter' },
  { value: 'ratchadaphisek', key: 'locations.ratchadaphisekFilter' },
  { value: 'chatuchak', key: 'locations.chatuchakFilter' },
]

const hotspots = [
  { nameKey: 'locations.huaiKhwang', count: 47, x: 62, y: 38 },
  { nameKey: 'locations.latPhraoJunction', count: 39, x: 44, y: 25 },
  { nameKey: 'locations.chatuchakShort', count: 31, x: 30, y: 42 },
  { nameKey: 'locations.dinDaengHotspot', count: 26, x: 50, y: 55 },
  { nameKey: 'locations.sukhumvitSoi71', count: 22, x: 72, y: 65 },
  { nameKey: 'locations.ratchadaphisekFilter', count: 18, x: 40, y: 62 },
]

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
  const [dateFrom, setDateFrom] = useState('2024-07-07')
  const [dateTo, setDateTo] = useState('2024-07-10')
  const [location, setLocation] = useState('all')
  const [sortCol, setSortCol] = useState('date')

  const causeData = causeKeys.map((c) => ({ name: t(c.key), value: c.value, color: c.color }))
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

  return (
    <div style={{ padding: '28px 32px', minHeight: '100vh' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, color: '#00a3ff', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.12em', marginBottom: 4 }}>{t('reports.badge')}</div>
        <h1 style={{ fontSize: 26, fontWeight: 700, fontFamily: 'Rajdhani, sans-serif', color: '#e2e8f0', margin: 0, letterSpacing: '0.02em' }}>{t('reports.title')}</h1>
      </div>

      <div style={{ ...card, padding: '16px 22px', marginBottom: 22, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}>{t('reports.from')}</span>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} style={inputStyle} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}>{t('reports.to')}</span>
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} style={inputStyle} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}>{t('reports.location')}</span>
          <select value={location} onChange={(e) => setLocation(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
            {locationFilters.map((l) => <option key={l.value} value={l.value} style={{ background: '#0f172a' }}>{t(l.key)}</option>)}
          </select>
        </div>
        <button style={{
          marginLeft: 'auto', padding: '8px 18px', background: 'linear-gradient(135deg, #00a3ff, #0066cc)',
          borderWidth: 0, borderRadius: 8, color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace',
        }}>{t('reports.generateReport')}</button>
        <button style={{
          padding: '8px 18px', background: 'rgba(0,163,255,0.08)',
          borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(0,163,255,0.25)',
          borderRadius: 8, color: '#00a3ff', fontSize: 13, cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace',
        }}>{t('reports.exportCsv')}</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 22 }}>
        <div style={{ ...card, padding: '22px 24px' }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#e2e8f0', marginBottom: 4 }}>{t('reports.causesTitle')}</div>
          <div style={{ fontSize: 12, color: '#475569', fontFamily: 'JetBrains Mono, monospace', marginBottom: 16 }}>{t('reports.causesSubtitle')}</div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={causeData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3} dataKey="value">
                {causeData.map((entry, i) => <Cell key={i} fill={entry.color} stroke="transparent" />)}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ ...card, overflow: 'hidden', position: 'relative' }}>
          <div style={{ padding: '22px 24px 14px' }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#e2e8f0', marginBottom: 4 }}>{t('reports.hotspotTitle')}</div>
            <div style={{ fontSize: 12, color: '#475569', fontFamily: 'JetBrains Mono, monospace' }}>{t('reports.hotspotSubtitle')}</div>
          </div>
          <div style={{ position: 'relative', margin: '0 24px 20px', height: 248, background: '#040d1a', borderRadius: 8, overflow: 'hidden', borderWidth: 1, borderStyle: 'solid', borderColor: '#1e293b' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'linear-gradient(#00a3ff 1px, transparent 1px), linear-gradient(90deg, #00a3ff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100" preserveAspectRatio="none">
              <line x1="0" y1="40" x2="100" y2="42" stroke="#1e3a5f" strokeWidth="0.8" />
              <line x1="0" y1="60" x2="100" y2="58" stroke="#1e3a5f" strokeWidth="0.6" />
              <line x1="35" y1="0" x2="38" y2="100" stroke="#1e3a5f" strokeWidth="0.8" />
              <line x1="65" y1="0" x2="62" y2="100" stroke="#1e3a5f" strokeWidth="0.6" />
              <line x1="0" y1="20" x2="45" y2="40" stroke="#1e3a5f" strokeWidth="0.5" />
              <line x1="55" y1="42" x2="100" y2="25" stroke="#1e3a5f" strokeWidth="0.5" />
            </svg>
            {hotspots.map((h) => {
              const radius = 6 + (h.count / 47) * 20
              const alpha = 0.2 + (h.count / 47) * 0.35
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
            <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(5,14,26,0.85)', borderWidth: 1, borderStyle: 'solid', borderColor: '#1e293b', borderRadius: 6, padding: '6px 10px' }}>
              <div style={{ fontSize: 10, color: '#475569', fontFamily: 'JetBrains Mono, monospace', marginBottom: 4 }}>{t('reports.incidentDensity')}</div>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                {[0.2, 0.4, 0.6, 0.8, 1].map((o) => (
                  <div key={o} style={{ width: 12, height: 12, borderRadius: 2, background: `rgba(239,68,68,${o})` }} />
                ))}
                <span style={{ fontSize: 10, color: '#475569', fontFamily: 'JetBrains Mono, monospace', marginLeft: 4 }}>{t('reports.high')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ ...card, overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#e2e8f0' }}>{t('reports.tableTitle')}</div>
            <div style={{ fontSize: 12, color: '#475569', fontFamily: 'JetBrains Mono, monospace', marginTop: 2 }}>
              {t('reports.recordsSorted', { count: tableData.length, sort: sortLabels[sortCol] ?? sortCol })}
            </div>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#1e293b' }}>
                {tableHeaders.map((h) => (
                  <th key={h.id} onClick={() => setSortCol(h.id)} style={{
                    padding: '10px 22px', textAlign: 'left', fontSize: 11, fontWeight: 600,
                    color: sortCol === h.id ? '#00a3ff' : '#475569',
                    fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.06em', cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap',
                  }}>
                    {t(h.key).toUpperCase()} {sortCol === h.id ? '↑' : ''}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i}
                  style={{ borderBottomWidth: i < tableData.length - 1 ? 1 : 0, borderBottomStyle: 'solid', borderBottomColor: '#0f172a' }}
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
