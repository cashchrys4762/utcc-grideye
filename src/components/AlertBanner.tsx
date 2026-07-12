import { useTranslation } from 'react-i18next'
import { useApp } from '../context/AppContext'
import { ALL_INCIDENTS } from '../data/incidents'

export default function AlertBanner() {
  const { t } = useTranslation()
  const { openIncident, navigate } = useApp()

  const active = ALL_INCIDENTS.filter((inc) => inc.statusKey === 'incidentDetail.statuses.active')
  if (active.length === 0) return null

  const top = active.sort((a, b) => b.risk - a.risk)[0]

  return (
    <div className="alert-banner">
      <div className="alert-banner-pulse" />
      <div className="alert-banner-content">
        <span className="alert-banner-icon">⚠</span>
        <span className="alert-banner-text">
          {t('alert.activeIncidents', { count: active.length })} — {t(top.typeKey)} @ {t(top.locationKey)}
        </span>
      </div>
      <div className="alert-banner-actions">
        <button type="button" className="alert-banner-btn" onClick={() => openIncident(top)}>{t('alert.viewDetails')}</button>
        <button type="button" className="alert-banner-btn alert-banner-btn--ghost" onClick={() => navigate('livefeed')}>{t('alert.viewLive')}</button>
      </div>
    </div>
  )
}
