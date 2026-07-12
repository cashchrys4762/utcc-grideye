import { useTranslation } from 'react-i18next'
import { useApp } from '../context/AppContext'

const sevColors = {
  high: { color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
  medium: { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
  low: { color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
}

function DetailRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: 'rgba(30,41,59,0.6)' }}>
      <span style={{ fontSize: 13, color: '#64748b' }}>{label}</span>
      <span style={{ fontSize: 13, fontFamily: 'JetBrains Mono, monospace', color: color ?? '#e2e8f0', fontWeight: 500 }}>{value}</span>
    </div>
  )
}

export default function IncidentDetailModal() {
  const { t } = useTranslation()
  const { selectedIncident, closeIncident } = useApp()

  if (!selectedIncident) return null

  const inc = selectedIncident
  const sev = sevColors[inc.severity]

  return (
    <div
      onClick={closeIncident}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#0a1628', borderWidth: 1, borderStyle: 'solid', borderColor: '#1e293b',
          borderRadius: 14, width: '100%', maxWidth: 520, maxHeight: '85vh', overflow: 'auto',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        }}
      >
        <div style={{
          padding: '20px 24px', borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#1e293b',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        }}>
          <div>
            <div style={{ fontSize: 11, color: '#00a3ff', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em', marginBottom: 6 }}>
              {t('incidentDetail.badge')}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'Rajdhani, sans-serif', color: '#e2e8f0' }}>
              {inc.id}
            </div>
          </div>
          <button onClick={closeIncident} style={{
            background: 'transparent', borderWidth: 0, color: '#64748b', cursor: 'pointer', fontSize: 20, padding: 4,
          }}>✕</button>
        </div>

        <div style={{ padding: '16px 24px 24px' }}>
          <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6, marginBottom: 16 }}>
            {t(inc.descriptionKey)}
          </p>

          <DetailRow label={t('incidentDetail.type')} value={t(inc.typeKey)} />
          <DetailRow label={t('incidentDetail.location')} value={t(inc.locationKey)} />
          <DetailRow label={t('incidentDetail.dateTime')} value={`${inc.date} ${inc.time}`} />
          <DetailRow label={t('incidentDetail.camera')} value={inc.cam} />
          <DetailRow label={t('incidentDetail.severity')} value={t(`severity.${inc.severity}`)} color={sev.color} />
          <DetailRow label={t('incidentDetail.riskScore')} value={inc.risk.toFixed(1)} color={inc.risk >= 8 ? '#ef4444' : inc.risk >= 6 ? '#f59e0b' : '#00a3ff'} />
          <DetailRow label={t('incidentDetail.confidence')} value={`${inc.confidence}%`} color="#22c55e" />
          <DetailRow label={t('incidentDetail.cause')} value={t(inc.causeKey)} />
          <DetailRow label={t('incidentDetail.statusLabel')} value={t(inc.statusKey)} />
          <DetailRow label={t('incidentDetail.vehicles')} value={String(inc.vehiclesInvolved)} />
          <DetailRow label={t('incidentDetail.responseTime')} value={t('incidentDetail.responseTimeValue', { min: inc.responseTimeMin })} />

          <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
            <button onClick={closeIncident} style={{
              flex: 1, padding: '10px 0', background: 'rgba(0,163,255,0.1)',
              borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(0,163,255,0.3)',
              borderRadius: 8, color: '#00a3ff', fontSize: 13, cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace',
            }}>{t('incidentDetail.close')}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
