import { useTranslation } from 'react-i18next'
import { useApp } from '../context/AppContext'
import LanguageSwitcher from './LanguageSwitcher'
import { navItems } from '../navigation'

export function MobileHeader() {
  return (
    <header className="mobile-header">
      <div className="mobile-header-brand">
        <div className="mobile-header-logo">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" />
            <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" /><line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
            <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" /><line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
          </svg>
        </div>
        <div>
          <div className="mobile-header-title">GRIDEYE</div>
          <div className="mobile-header-subtitle">AI PLATFORM</div>
        </div>
      </div>
      <LanguageSwitcher />
    </header>
  )
}

export function MobileBottomNav() {
  const { t } = useTranslation()
  const { activeScreen: active, navigate } = useApp()

  return (
    <nav className="mobile-bottom-nav" aria-label="Main navigation">
      {navItems.map((item) => {
        const isActive = active === item.id
        return (
          <button
            key={item.id}
            type="button"
            className={`mobile-nav-item${isActive ? ' mobile-nav-item--active' : ''}`}
            onClick={() => navigate(item.id)}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className="mobile-nav-icon">{item.icon(isActive)}</span>
            <span className="mobile-nav-label">{t(item.labelKey)}</span>
            {item.id === 'livefeed' && <span className="mobile-nav-badge">{t('nav.live')}</span>}
          </button>
        )
      })}
    </nav>
  )
}
