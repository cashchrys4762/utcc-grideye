import { useTranslation } from 'react-i18next'
import type { Screen } from '../App'
import LanguageSwitcher from './LanguageSwitcher'
import { navItems } from '../navigation'

interface Props {
  active: Screen
  onNavigate: (s: Screen) => void
}

export default function Sidebar({ active, onNavigate }: Props) {
  const { t } = useTranslation()

  return (
    <aside className="sidebar-desktop">
      <div style={{ padding: '24px 20px 20px', borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#1e293b' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
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
          <div className="sidebar-lang">
            <LanguageSwitcher />
          </div>
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
