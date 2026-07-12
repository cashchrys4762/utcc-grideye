import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import PanelHeader from './PanelHeader'
import { useApp } from '../context/AppContext'
import { CAMERAS } from '../data/cameras'
import { getIncidentById } from '../api/mockApi'
import { ALL_INCIDENTS } from '../data/incidents'

const sevColors = {
  high: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
  medium: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  low: { color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
}

type Corner = 'tl' | 'tr' | 'bl' | 'br'

function BoundingBox({ x, y, w, h, label, color, highlighted }: { x: number; y: number; w: number; h: number; label: string; color: string; highlighted?: boolean }) {
  const corners: Corner[] = ['tl', 'tr', 'bl', 'br']
  return (
    <div style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%`, transition: 'opacity 0.2s', opacity: highlighted === false ? 0.3 : 1 }}>
      <div style={{
        position: 'absolute', inset: 0,
        borderWidth: highlighted ? 2 : 1, borderStyle: 'solid', borderColor: color,
        boxShadow: `0 0 ${highlighted ? 16 : 8}px ${color}80`,
      }}>
        {corners.map((c) => (
          <div key={c} style={{
            position: 'absolute',
            top: c.includes('t') ? -1 : undefined,
            bottom: c.includes('b') ? -1 : undefined,
            left: c.includes('l') ? -1 : undefined,
            right: c.includes('r') ? -1 : undefined,
            width: 10, height: 10,
            borderTopWidth: c.includes('t') ? 2 : 0,
            borderTopStyle: 'solid',
            borderTopColor: color,
            borderBottomWidth: c.includes('b') ? 2 : 0,
            borderBottomStyle: 'solid',
            borderBottomColor: color,
            borderLeftWidth: c.includes('l') ? 2 : 0,
            borderLeftStyle: 'solid',
            borderLeftColor: color,
            borderRightWidth: c.includes('r') ? 2 : 0,
            borderRightStyle: 'solid',
            borderRightColor: color,
          }} />
        ))}
      </div>
      <div style={{
        position: 'absolute', top: -22, left: 0,
        background: color, color: '#000',
        fontSize: 10, fontFamily: 'JetBrains Mono, monospace', fontWeight: 700,
        padding: '2px 7px', borderRadius: 3, whiteSpace: 'nowrap',
      }}>
        {label}
      </div>
    </div>
  )
}

export default function LiveFeed() {
  const { t } = useTranslation()
  const { openIncident } = useApp()
  const [cameraIndex, setCameraIndex] = useState(0)
  const [fps, setFps] = useState(30)
  const [tick, setTick] = useState(0)
  const [highlightedId, setHighlightedId] = useState<string | null>(null)

  const camera = CAMERAS[cameraIndex]
  const logEntries = [...ALL_INCIDENTS]
    .sort((a, b) => `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`))
    .slice(0, 12)

  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    setFps(28 + Math.floor(Math.random() * 4))
  }, [tick])

  const now = new Date()
  const timeStr = now.toTimeString().slice(0, 8)

  const hudStats = [
    { label: t('liveFeed.vehiclesDetected'), val: String(camera.vehicles) },
    { label: t('liveFeed.pedestrians'), val: String(camera.pedestrians) },
    { label: t('liveFeed.confidence'), val: `${camera.confidence}%` },
  ]

  const handleLogClick = (id: string) => {
    setHighlightedId(id)
    const incident = getIncidentById(id)
    if (incident) openIncident(incident)
  }

  return (
    <div className="page-content">
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 11, color: '#00a3ff', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.12em', marginBottom: 4 }}>{t('liveFeed.badge')}</div>
        <div className="page-header-row">
          <h1 className="page-title">
            {t('liveFeed.title')} — {t(camera.locationKey)}
          </h1>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <select
              value={cameraIndex}
              onChange={(e) => { setCameraIndex(Number(e.target.value)); setHighlightedId(null) }}
              style={{
                background: '#0a1628', borderWidth: 1, borderStyle: 'solid', borderColor: '#1e293b',
                borderRadius: 6, color: '#00a3ff', fontSize: 12, padding: '6px 12px',
                fontFamily: 'JetBrains Mono, monospace', cursor: 'pointer',
              }}
            >
              {CAMERAS.map((cam, i) => (
                <option key={cam.id} value={i} style={{ background: '#0f172a' }}>{cam.id} — {t(cam.locationKey)}</option>
              ))}
            </select>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#0a1628', borderWidth: 1, borderStyle: 'solid', borderColor: '#1e293b', borderRadius: 6, padding: '6px 12px' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 8px #ef4444' }} />
              <span style={{ fontSize: 12, color: '#ef4444', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>{t('liveFeed.rec')}</span>
            </div>
            <div style={{ background: '#0a1628', borderWidth: 1, borderStyle: 'solid', borderColor: '#1e293b', borderRadius: 6, padding: '6px 12px', fontSize: 12, color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}>
              {timeStr}
            </div>
          </div>
        </div>
      </div>

      <div className="live-feed-grid">
        <div className="live-feed-video" style={{ position: 'relative', background: '#050e1a', borderWidth: 1, borderStyle: 'solid', borderColor: '#1e293b', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.07,
            backgroundImage: 'linear-gradient(#00a3ff 1px, transparent 1px), linear-gradient(90deg, #00a3ff 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #071524 0%, #0a1e2e 40%, #061018 100%)' }}>
            <div style={{ position: 'absolute', bottom: '20%', left: '25%', width: '50%', height: 2, background: 'rgba(255,255,255,0.12)' }} />
            <div style={{ position: 'absolute', bottom: '35%', left: '20%', width: '60%', height: 1, background: 'rgba(255,255,255,0.06)' }} />
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} style={{ position: 'absolute', bottom: '27%', left: `${28 + i * 10}%`, width: '5%', height: 3, background: 'rgba(255,220,0,0.3)', borderRadius: 1 }} />
            ))}
          </div>

          {camera.detections.map((det, i) => (
            <BoundingBox
              key={i}
              x={det.x} y={det.y} w={det.w} h={det.h}
              label={`${t(det.labelKey)} · ${det.confidence}%`}
              color={det.color}
              highlighted={highlightedId ? det.incidentId === highlightedId : undefined}
            />
          ))}

          <div className="hud-top" style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 0%, transparent 100%)',
            padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, color: '#00a3ff', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>{camera.id}</span>
              <span className="hud-top-meta" style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>|</span>
              <span style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>
                FPS: <span style={{ color: fps >= 29 ? '#22c55e' : '#f59e0b' }}>{fps}</span>
              </span>
              <span className="hud-top-meta" style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>|</span>
              <span className="hud-top-meta" style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'JetBrains Mono, monospace' }}>1920×1080</span>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 11, color: '#22c55e', fontFamily: 'JetBrains Mono, monospace', background: 'rgba(34,197,94,0.1)', padding: '3px 8px', borderRadius: 4, borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(34,197,94,0.2)' }}>{t('liveFeed.aiActive')}</span>
              <span style={{ fontSize: 11, color: '#a855f7', fontFamily: 'JetBrains Mono, monospace', background: 'rgba(168,85,247,0.1)', padding: '3px 8px', borderRadius: 4, borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(168,85,247,0.2)' }}>{t('liveFeed.bboxOn')}</span>
            </div>
          </div>

          <div className="hud-bottom" style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, transparent 100%)',
            padding: '12px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div className="hud-stats" style={{ display: 'flex', gap: 20 }}>
              {hudStats.map((s) => (
                <div key={s.label}>
                  <div style={{ fontSize: 10, color: '#475569', fontFamily: 'JetBrains Mono, monospace' }}>{s.label}</div>
                  <div style={{ fontSize: 16, fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, color: '#e2e8f0' }}>{s.val}</div>
                </div>
              ))}
            </div>
            {camera.hasIncident && (
              <div style={{ background: 'rgba(239,68,68,0.15)', borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(239,68,68,0.4)', borderRadius: 6, padding: '6px 14px' }}>
                <span style={{ fontSize: 12, color: '#ef4444', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700 }}>{t('liveFeed.incidentDetected')}</span>
              </div>
            )}
          </div>

          <div style={{
            position: 'absolute', left: 0, right: 0, height: 2,
            background: 'linear-gradient(90deg, transparent, rgba(0,163,255,0.4), transparent)',
            animation: 'scanline 4s linear infinite',
          }} />
          <style>{`@keyframes scanline { 0% { top: 0%; } 100% { top: 100%; } }`}</style>
        </div>

        <div className="live-feed-log" style={{ display: 'flex', flexDirection: 'column', background: '#0a1628', borderWidth: 1, borderStyle: 'solid', borderColor: '#1e293b', borderRadius: 12, overflow: 'hidden' }}>
          <div className="card-panel-header card-panel-header--center">
            <PanelHeader
              center
              title={t('liveFeed.incidentLog')}
              subtitle={t('liveFeed.realtimeEvents')}
              actions={(
                <div style={{ fontSize: 11, color: '#22c55e', fontFamily: 'JetBrains Mono, monospace', background: 'rgba(34,197,94,0.1)', padding: '3px 8px', borderRadius: 4, marginTop: 8 }}>{t('liveFeed.liveStatus')}</div>
              )}
            />
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
            {logEntries.map((entry, i) => {
              const sev = sevColors[entry.severity]
              const isHighlighted = highlightedId === entry.id
              return (
                <div key={entry.id}
                  onClick={() => handleLogClick(entry.id)}
                  style={{
                    padding: '12px 18px', borderBottomWidth: i < logEntries.length - 1 ? 1 : 0,
                    borderBottomStyle: 'solid', borderBottomColor: 'rgba(30,41,59,0.5)', cursor: 'pointer',
                    background: isHighlighted ? '#0f172a' : 'transparent',
                    borderLeftWidth: isHighlighted ? 2 : 0, borderLeftStyle: 'solid', borderLeftColor: '#00a3ff',
                  }}
                  onMouseEnter={(e) => { if (!isHighlighted) (e.currentTarget as HTMLDivElement).style.background = '#0f172a' }}
                  onMouseLeave={(e) => { if (!isHighlighted) (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: '#00a3ff', fontWeight: 500 }}>{entry.id}</span>
                    <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: '#475569' }}>{entry.time}</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#e2e8f0', fontWeight: 500, marginBottom: 4 }}>{t(entry.typeKey)}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: '#64748b' }}>{t(entry.locationKey)}</span>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <span style={{ fontSize: 10, color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}>{entry.confidence}%</span>
                      <span style={{ fontSize: 10, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', color: sev.color, background: sev.bg, borderRadius: 3, padding: '2px 6px' }}>{t(`severity.${entry.severity}`)}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div style={{ padding: '12px 18px', borderTopWidth: 1, borderTopStyle: 'solid', borderTopColor: '#1e293b' }}>
            <div style={{ fontSize: 11, color: '#475569', fontFamily: 'JetBrains Mono, monospace', textAlign: 'center' }}>{t('liveFeed.showingIncidents')}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
