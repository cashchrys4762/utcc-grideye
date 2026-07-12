import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useApp } from '../context/AppContext'
import { ALL_INCIDENTS } from '../data/incidents'
import type { Incident } from '../data/types'

export default function GlobalSearch() {
  const { t } = useTranslation()
  const { openIncident } = useApp()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const results = query.length >= 2
    ? ALL_INCIDENTS.filter((inc) => {
        const q = query.toLowerCase()
        return inc.id.toLowerCase().includes(q)
          || t(inc.locationKey).toLowerCase().includes(q)
          || t(inc.typeKey).toLowerCase().includes(q)
          || inc.cam.toLowerCase().includes(q)
      }).slice(0, 6)
    : []

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const select = (inc: Incident) => {
    openIncident(inc)
    setQuery('')
    setOpen(false)
  }

  return (
    <div ref={ref} className="global-search">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="search"
        value={query}
        placeholder={t('search.placeholder')}
        onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        className="global-search-input"
      />
      {open && results.length > 0 && (
        <div className="global-search-results">
          {results.map((inc) => (
            <button key={inc.id} type="button" className="global-search-item" onClick={() => select(inc)}>
              <span className="global-search-id">{inc.id}</span>
              <span className="global-search-meta">{t(inc.typeKey)} · {t(inc.locationKey)}</span>
            </button>
          ))}
        </div>
      )}
      {open && query.length >= 2 && results.length === 0 && (
        <div className="global-search-results global-search-empty">{t('search.noResults')}</div>
      )}
    </div>
  )
}
