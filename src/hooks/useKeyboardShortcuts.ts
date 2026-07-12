import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { SCREEN_PATHS, type Screen } from '../navigation'

const SHORTCUTS: Record<string, Screen> = {
  '1': 'dashboard',
  '2': 'livefeed',
  '3': 'reports',
  '4': 'settings',
}

export function useKeyboardShortcuts() {
  const navigate = useNavigate()
  const { closeIncident } = useApp()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) return
      if (e.key === 'Escape') {
        closeIncident()
        return
      }
      const screen = SHORTCUTS[e.key]
      if (screen && !e.metaKey && !e.ctrlKey && !e.altKey) {
        navigate(SCREEN_PATHS[screen])
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [navigate, closeIncident])
}
