import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useApp } from '../context/AppContext'
import { ALL_INCIDENTS } from '../data/incidents'

export default function NotificationCenter() {
  const { t } = useTranslation()
  const { openIncident } = useApp()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const alerts = ALL_INCIDENTS
    .filter((inc) => inc.statusKey === 'incidentDetail.statuses.active' || inc.severity === 'high')
    .slice(0, 5)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="notification-center">
      <button type="button" className="notification-btn" onClick={() => setOpen((v) => !v)} aria-label={t('notifications.title')}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {alerts.length > 0 && <span className="notification-badge">{alerts.length}</span>}
      </button>
      {open && (
        <div className="notification-panel">
          <div className="notification-panel-header">{t('notifications.title')}</div>
          {alerts.length === 0 ? (
            <div className="notification-empty">{t('notifications.empty')}</div>
          ) : alerts.map((inc) => (
            <button key={inc.id} type="button" className="notification-item" onClick={() => { openIncident(inc); setOpen(false) }}>
              <div className="notification-item-top">
                <span className="notification-item-id">{inc.id}</span>
                <span className={`notification-sev notification-sev--${inc.severity}`}>{t(`severity.${inc.severity}`)}</span>
              </div>
              <div className="notification-item-type">{t(inc.typeKey)}</div>
              <div className="notification-item-loc">{t(inc.locationKey)}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
