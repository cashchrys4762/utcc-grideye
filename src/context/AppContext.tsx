import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { pathToScreen, SCREEN_PATHS, type Screen } from '../navigation'
import type { AppSettings, Incident } from '../data/types'
import { loadSettings, saveSettings } from '../utils/storage'

export type { Screen }

export interface Toast {
  id: number
  message: string
  type: 'success' | 'info' | 'warning' | 'error'
}

interface AppContextValue {
  activeScreen: Screen
  navigate: (screen: Screen) => void
  selectedIncident: Incident | null
  openIncident: (incident: Incident) => void
  closeIncident: () => void
  toasts: Toast[]
  showToast: (message: string, type?: Toast['type']) => void
  dismissToast: (id: number) => void
  settings: AppSettings
  updateSettings: (patch: Partial<AppSettings>) => void
  updateCameraSettings: (patch: Partial<AppSettings['camera']>) => void
  updateAiSettings: (patch: Partial<AppSettings['ai']>) => void
  updateSecuritySettings: (patch: Partial<AppSettings['security']>) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const routerNavigate = useNavigate()
  const location = useLocation()
  const activeScreen = useMemo(() => pathToScreen(location.pathname), [location.pathname])

  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [settings, setSettings] = useState<AppSettings>(loadSettings)

  const navigate = useCallback((screen: Screen) => {
    routerNavigate(SCREEN_PATHS[screen])
  }, [routerNavigate])

  const openIncident = useCallback((incident: Incident) => setSelectedIncident(incident), [])
  const closeIncident = useCallback(() => setSelectedIncident(null), [])

  const showToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000)
  }, [])

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const updateSettings = useCallback((patch: Partial<AppSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch }
      saveSettings(next)
      return next
    })
  }, [])

  const updateCameraSettings = useCallback((patch: Partial<AppSettings['camera']>) => {
    setSettings((prev) => {
      const next = { ...prev, camera: { ...prev.camera, ...patch } }
      saveSettings(next)
      return next
    })
  }, [])

  const updateAiSettings = useCallback((patch: Partial<AppSettings['ai']>) => {
    setSettings((prev) => {
      const next = { ...prev, ai: { ...prev.ai, ...patch } }
      saveSettings(next)
      return next
    })
  }, [])

  const updateSecuritySettings = useCallback((patch: Partial<AppSettings['security']>) => {
    setSettings((prev) => {
      const next = { ...prev, security: { ...prev.security, ...patch } }
      saveSettings(next)
      return next
    })
  }, [])

  return (
    <AppContext.Provider value={{
      activeScreen, navigate, selectedIncident, openIncident, closeIncident,
      toasts, showToast, dismissToast, settings,
      updateSettings, updateCameraSettings, updateAiSettings, updateSecuritySettings,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
