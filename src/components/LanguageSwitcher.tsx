import type { CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'

const btnBase: CSSProperties = {
  padding: '4px 10px',
  borderRadius: 5,
  borderWidth: 1,
  borderStyle: 'solid',
  fontSize: 11,
  fontWeight: 700,
  fontFamily: 'JetBrains Mono, monospace',
  letterSpacing: '0.08em',
  cursor: 'pointer',
  transition: 'all 0.15s',
}

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = i18n.language.startsWith('th') ? 'th' : 'en'

  const setLang = (lng: 'th' | 'en') => {
    void i18n.changeLanguage(lng)
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: 4,
        background: '#0f172a',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#1e293b',
        borderRadius: 8,
        padding: 3,
      }}
    >
      {(['th', 'en'] as const).map((lng) => {
        const active = current === lng
        return (
          <button
            key={lng}
            type="button"
            onClick={() => setLang(lng)}
            style={{
              ...btnBase,
              borderColor: active ? '#00a3ff' : 'transparent',
              background: active ? 'rgba(0,163,255,0.15)' : 'transparent',
              color: active ? '#00a3ff' : '#64748b',
            }}
          >
            {lng.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}
