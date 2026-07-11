import { useTranslation } from 'react-i18next'
import type { Screen } from '../App'
import LanguageSwitcher from './LanguageSwitcher'

interface Props {
  active: Screen
  onNavigate: (s: Screen) => void
}

const ICON_INACTIVE = '#64748b'
const ICON_ACTIVE = '#00a3ff'

const navItems: { id: Screen; labelKey: string; icon: (active: boolean) => JSX.Element }[] = [
  {
    id: 'dashboard',
    labelKey: 'nav.dashboard',
    icon: (a) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={a ? ICON_ACTIVE : ICON_INACTIVE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: 'livefeed',
    labelKey: 'nav.liveFeed',
    icon: (a) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={a ? ICON_ACTIVE : ICON_INACTIVE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2" /><path d="M6.3 6.3a8 8 0 0 0 0 11.4" /><path d="M17.7 6.3a8 8 0 0 1 0 11.4" />
        <path d="M3.6 3.6a13 13 0 0 0 0 16.8" /><path d="M20.4 3.6a13 13 0 0 1 0 16.8" />
      </svg>
    ),
  },
  {
    id: 'reports',
    labelKey: 'nav.reports',
    icon: (a) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={a ? ICON_ACTIVE : ICON_INACTIVE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    id: 'settings',
    labelKey: 'nav.settings',
    icon: (a) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={a ? ICON_ACTIVE : ICON_INACTIVE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
]

export default function Sidebar({ active, onNavigate }: Props) {
  const { t } = useTranslation()

  return (
    <aside
      style={{
        width: 240,
        minWidth: 240,
        background: '#0a1628',
        borderRightWidth: 1,
        borderRightStyle: 'solid',
        borderRightColor: '#1e293b',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
      }}
    >
      <div style={{ padding: '24px 20px 20px', borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#1e293b' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, background: 'linear-gradient(135deg, #00a3ff, #0066cc)',
            borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 16px rgba(0,163,255,0.4)',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" />
              <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" /><line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
              <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" /><line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: 18, color: '#e2e8f0', letterSpacing: '0.04em' }}>
              GRIDEYE
            </div>
            <div style={{ fontSize: 10, color: '#00a3ff', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em', fontWeight: 500 }}>
              AI PLATFORM
            </div>
          </div>
        </div>
        <div style={{ marginTop: 14 }}>
          <LanguageSwitcher />
        </div>
      </div>

      <nav style={{ flex: 1, padding: '12px 12px 0' }}>
        <div style={{ fontSize: 10, color: '#475569', letterSpacing: '0.12em', fontWeight: 600, padding: '8px 8px 4px', fontFamily: 'JetBrains Mono, monospace' }}>
          {t('nav.navigation')}
        </div>
        {navItems.map((item) => {
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 12px',
                borderRadius: 8,
                borderWidth: 0,
                borderLeftWidth: 2,
                borderLeftStyle: 'solid',
                borderLeftColor: isActive ? '#00a3ff' : 'transparent',
                cursor: 'pointer',
                marginBottom: 2,
                background: isActive ? 'rgba(0,163,255,0.12)' : 'transparent',
                color: isActive ? '#00a3ff' : '#94a3b8',
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                fontFamily: 'Inter, sans-serif',
                transition: 'all 0.15s',
                textAlign: 'left',
              }}
            >
              {item.icon(isActive)}
              {t(item.labelKey)}
              {item.id === 'livefeed' && (
                <span style={{
                  marginLeft: 'auto', background: '#ef4444', color: 'white',
                  fontSize: 10, fontWeight: 700, borderRadius: 4, padding: '1px 6px',
                  fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.05em',
                }}>
                  {t('nav.live')}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      <div style={{ padding: '16px 20px', borderTopWidth: 1, borderTopStyle: 'solid', borderTopColor: '#1e293b' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%', background: '#22c55e',
            boxShadow: '0 0 8px #22c55e',
          }} />
          <span style={{ fontSize: 12, color: '#22c55e', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, letterSpacing: '0.05em' }}>
            {t('nav.systemOnline')}
          </span>
        </div>
        <div style={{ fontSize: 11, color: '#475569', fontFamily: 'JetBrains Mono, monospace' }}>
          {t('nav.version')}
        </div>
        <div style={{ fontSize: 11, color: '#475569', fontFamily: 'JetBrains Mono, monospace', marginTop: 2 }}>
          {t('nav.camerasActive')}
        </div>
      </div>
    </aside>
  )
}
