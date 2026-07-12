import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import PanelHeader from './PanelHeader'
import { useApp } from '../context/AppContext'
import { fetchTraffic, getActiveIncidentCount, getRecentIncidents } from '../api/mockApi'
import { getTotalVolume } from '../data/traffic'
import type { TrafficPeriod } from '../data/types'

const card = {
  background: '#0a1628',
  borderWidth: 1, borderStyle: 'solid' as const, borderColor: '#1e293b',
  borderRadius: 12,
}

export default function Dashboard() {
  const { t } = useTranslation()
  const { navigate, openIncident } = useApp()
  const [period, setPeriod] = useState<TrafficPeriod>('24h')
  const [trafficData, setTrafficData] = useState<{ time: string; volume: number }[]>([])
  const [lastUpdated, setLastUpdated] = useState('')

  const incidents = getRecentIncidents(6)
  const activeCount = getActiveIncidentCount()

  useEffect(() => {
    fetchTraffic(period).then(setTrafficData)
  }, [period])

  useEffect(() => {
    const update = () => setLastUpdated(new Date().toTimeString().slice(0, 8))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  const totalVolume = getTotalVolume(period)
  const volumeLabel = period === '24h' ? totalVolume.toLocaleString() : totalVolume.toLocaleString()

  const kpis = [
    {
      label: t('dashboard.kpi.trafficVolume'), value: volumeLabel, unit: t('dashboard.kpi.trafficVolumeUnit'), delta: t('dashboard.kpi.trafficVolumeDelta'), up: true, color: '#00a3ff',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00a3ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2" /><path d="M16 8h4l3 5v3h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
    },
    {
      label: t('dashboard.kpi.activeIncidents'), value: String(activeCount), unit: t('dashboard.kpi.activeIncidentsUnit'), delta: t('dashboard.kpi.activeIncidentsDelta'), up: false, color: '#ef4444',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
    },
    {
      label: t('dashboard.kpi.systemAccuracy'), value: '97.8%', unit: t('dashboard.kpi.systemAccuracyUnit'), delta: t('dashboard.kpi.systemAccuracyDelta'), up: true, color: '#22c55e',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>,
    },
    {
      label: t('dashboard.kpi.avgLatency'), value: '38ms', unit: t('dashboard.kpi.avgLatencyUnit'), delta: t('dashboard.kpi.avgLatencyDelta'), up: true, color: '#a855f7',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    },
  ]

  const tableHeaders = [
    'dashboard.incidents.headers.id',
    'dashboard.incidents.headers.time',
    'dashboard.incidents.headers.location',
    'dashboard.incidents.headers.type',
    'dashboard.incidents.headers.severity',
    'dashboard.incidents.headers.camera',
  ]

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value?: number }[]; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: '#0f172a', borderWidth: 1, borderStyle: 'solid', borderColor: '#1e293b', borderRadius: 8, padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>
          <div style={{ color: '#64748b', marginBottom: 4 }}>{label}</div>
          <div style={{ color: '#00a3ff', fontWeight: 600 }}>{payload[0]?.value?.toLocaleString()} {t('dashboard.vehicles')}</div>
        </div>
      )
    }
    return null
  }

  const periods: TrafficPeriod[] = ['24h', '7d', '30d']

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <div style={{ fontSize: 11, color: '#00a3ff', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.12em', marginBottom: 4 }}>{t('dashboard.badge')}</div>
          <h1 className="page-title">{t('dashboard.title')}</h1>
          <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>{t('dashboard.subtitle')}</div>
        </div>
        <div className="status-pill" style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#0f172a', borderWidth: 1, borderStyle: 'solid', borderColor: '#1e293b', borderRadius: 8, padding: '8px 14px' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
          <span style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>{t('dashboard.lastUpdatedAt', { time: lastUpdated })}</span>
        </div>
      </div>

      <div className="kpi-grid">
        {kpis.map((kpi) => (
          <div key={kpi.label} style={{ ...card, padding: '20px 22px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${kpi.color}, transparent)` }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              {kpi.icon}
              <div style={{
                fontSize: 11, fontWeight: 600, color: kpi.up ? '#22c55e' : '#ef4444',
                background: kpi.up ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                borderRadius: 4, padding: '2px 7px', fontFamily: 'JetBrains Mono, monospace',
              }}>
                {kpi.delta}
              </div>
            </div>
            <div style={{ fontSize: 30, fontWeight: 700, fontFamily: 'Rajdhani, sans-serif', color: '#e2e8f0', letterSpacing: '0.02em', lineHeight: 1 }}>{kpi.value}</div>
            <div style={{ fontSize: 13, color: '#e2e8f0', fontWeight: 500, marginTop: 4 }}>{kpi.label}</div>
            <div style={{ fontSize: 11, color: '#475569', fontFamily: 'JetBrains Mono, monospace', marginTop: 2 }}>{kpi.unit}</div>
          </div>
        ))}
      </div>

      <div style={{ ...card, padding: '22px 24px', marginBottom: 24 }}>
        <PanelHeader
          center
          title={t('dashboard.chart.title')}
          subtitle={t('dashboard.chart.subtitle')}
          actions={(
            <div className="chart-period-tabs">
              {periods.map((p) => (
                <button key={p} onClick={() => setPeriod(p)} style={{
                  padding: '5px 12px', borderRadius: 6,
                  borderWidth: 1, borderStyle: 'solid', borderColor: period === p ? '#00a3ff' : '#1e293b',
                  background: period === p ? 'rgba(0,163,255,0.1)' : 'transparent',
                  color: period === p ? '#00a3ff' : '#64748b',
                  fontSize: 12, cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace',
                }}>{p}</button>
              ))}
            </div>
          )}
        />
        <div className="chart-visual-wrap">
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={trafficData} margin={{ top: 4, right: 8, left: -8, bottom: 0 }}>
            <defs>
              <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00a3ff" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#00a3ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="time" tick={{ fill: '#475569', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }} axisLine={false} tickLine={false} interval={period === '24h' ? 3 : 0} />
            <YAxis tick={{ fill: '#475569', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="volume" stroke="#00a3ff" strokeWidth={2} fill="url(#blueGrad)" dot={false} activeDot={{ r: 5, fill: '#00a3ff', stroke: '#0a1628', strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
        </div>
      </div>

      <div style={{ ...card, overflow: 'hidden' }}>
        <div className="card-panel-header card-panel-header--center">
          <PanelHeader
            center
            title={t('dashboard.incidents.title')}
            subtitle={t('dashboard.incidents.subtitle')}
          />
          <button onClick={() => navigate('reports')} style={{
            marginTop: 12, padding: '6px 14px', background: 'rgba(0,163,255,0.1)',
            borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(0,163,255,0.3)',
            borderRadius: 6, color: '#00a3ff', fontSize: 12, cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace',
          }}>{t('dashboard.incidents.viewAll')}</button>
        </div>
        <div className="table-scroll">
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
          <thead>
            <tr style={{ borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#1e293b' }}>
              {tableHeaders.map((h) => (
                <th key={h} style={{ padding: '10px 20px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#475569', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.06em' }}>
                  {t(h).toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {incidents.map((inc, i) => (
              <tr key={inc.id}
                onClick={() => openIncident(inc)}
                style={{ borderBottomWidth: i < incidents.length - 1 ? 1 : 0, borderBottomStyle: 'solid', borderBottomColor: '#0f172a', cursor: 'pointer' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = '#0f172a' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = 'transparent' }}
              >
                <td style={{ padding: '13px 20px' }}><span style={{ fontSize: 13, fontFamily: 'JetBrains Mono, monospace', color: '#00a3ff', fontWeight: 500 }}>{inc.id}</span></td>
                <td style={{ padding: '13px 20px' }}><span style={{ fontSize: 13, fontFamily: 'JetBrains Mono, monospace', color: '#94a3b8' }}>{inc.time}</span></td>
                <td style={{ padding: '13px 20px' }}><span style={{ fontSize: 13, color: '#cbd5e1' }}>{t(inc.locationKey)}</span></td>
                <td style={{ padding: '13px 20px' }}><span style={{ fontSize: 13, color: '#94a3b8' }}>{t(inc.typeKey)}</span></td>
                <td style={{ padding: '13px 20px' }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace',
                    color: inc.severity === 'high' ? '#ef4444' : inc.severity === 'medium' ? '#f59e0b' : '#22c55e',
                    background: inc.severity === 'high' ? 'rgba(239,68,68,0.12)' : inc.severity === 'medium' ? 'rgba(245,158,11,0.12)' : 'rgba(34,197,94,0.12)',
                    borderRadius: 4, padding: '3px 8px',
                  }}>{t(`severity.${inc.severity}`)}</span>
                </td>
                <td style={{ padding: '13px 20px' }}><span style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: '#64748b' }}>{inc.cam}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}
