import { useState } from 'react'
import Sidebar from './components/Sidebar'
import { MobileBottomNav, MobileHeader } from './components/MobileNav'
import Dashboard from './components/Dashboard'
import LiveFeed from './components/LiveFeed'
import Reports from './components/Reports'
import Settings from './components/Settings'

export type Screen = 'dashboard' | 'livefeed' | 'reports' | 'settings'

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('dashboard')

  const screens: Record<Screen, JSX.Element> = {
    dashboard: <Dashboard />,
    livefeed: <LiveFeed />,
    reports: <Reports />,
    settings: <Settings />,
  }

  return (
    <div className="app-shell flex h-screen overflow-hidden">
      <Sidebar active={activeScreen} onNavigate={setActiveScreen} />
      <div className="flex min-w-0 flex-1 flex-col">
        <MobileHeader />
        <main className="main-content flex-1 overflow-x-hidden overflow-y-auto">
          {screens[activeScreen]}
        </main>
        <MobileBottomNav active={activeScreen} onNavigate={setActiveScreen} />
      </div>
    </div>
  )
}
