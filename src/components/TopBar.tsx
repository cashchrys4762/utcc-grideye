import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import GlobalSearch from './GlobalSearch'
import NotificationCenter from './NotificationCenter'
import LanguageSwitcher from './LanguageSwitcher'

export default function TopBar() {
  const { t } = useTranslation()
  const [helpOpen, setHelpOpen] = useState(false)

  return (
    <header className="top-bar">
      <GlobalSearch />
      <div className="top-bar-actions">
        <button type="button" className="top-bar-btn" onClick={() => setHelpOpen((v) => !v)} title={t('help.title')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </button>
        <NotificationCenter />
        <div className="top-bar-lang">
          <LanguageSwitcher />
        </div>
      </div>
      {helpOpen && (
        <div className="help-panel">
          <div className="help-panel-title">{t('help.title')}</div>
          <div className="help-panel-row"><kbd>1</kbd><span>{t('nav.dashboard')}</span></div>
          <div className="help-panel-row"><kbd>2</kbd><span>{t('nav.liveFeed')}</span></div>
          <div className="help-panel-row"><kbd>3</kbd><span>{t('nav.reports')}</span></div>
          <div className="help-panel-row"><kbd>4</kbd><span>{t('nav.settings')}</span></div>
          <div className="help-panel-row"><kbd>Esc</kbd><span>{t('help.closeModal')}</span></div>
        </div>
      )}
    </header>
  )
}
