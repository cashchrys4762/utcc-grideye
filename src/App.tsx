import { useState } from 'react'
import Sidebar from './components/Sidebar'
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
    <div className="flex h-screen overflow-hidden" style={{ background: '#020617', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar active={activeScreen} onNavigate={setActiveScreen} />
      <main className="flex-1 overflow-y-auto overflow-x-hidden" style={{ background: '#020617' }}>
        {screens[activeScreen]}
      </main>
    </div>
  )
}
