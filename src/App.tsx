import { AppProvider, useApp } from './context/AppContext'
import Sidebar from './components/Sidebar'
import { MobileBottomNav, MobileHeader } from './components/MobileNav'
import Dashboard from './components/Dashboard'
import LiveFeed from './components/LiveFeed'
import Reports from './components/Reports'
import Settings from './components/Settings'
import ToastContainer from './components/Toast'
import IncidentDetailModal from './components/IncidentDetailModal'

export type Screen = 'dashboard' | 'livefeed' | 'reports' | 'settings'

function AppShell() {
  const { activeScreen } = useApp()

  const screens: Record<Screen, JSX.Element> = {
    dashboard: <Dashboard />,
    livefeed: <LiveFeed />,
    reports: <Reports />,
    settings: <Settings />,
  }

  return (
    <div className="app-shell flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <MobileHeader />
        <main className="main-content flex-1 overflow-x-hidden overflow-y-auto">
          {screens[activeScreen]}
        </main>
        <MobileBottomNav />
      </div>
      <ToastContainer />
      <IncidentDetailModal />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
