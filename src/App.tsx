import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Sidebar from './components/Sidebar'
import { MobileBottomNav, MobileHeader } from './components/MobileNav'
import TopBar from './components/TopBar'
import AlertBanner from './components/AlertBanner'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'
import LiveFeed from './components/LiveFeed'
import Reports from './components/Reports'
import Settings from './components/Settings'
import NotFound from './components/NotFound'
import ToastContainer from './components/Toast'
import IncidentDetailModal from './components/IncidentDetailModal'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'

function AppShell() {
  useKeyboardShortcuts()

  return (
    <div className="app-shell flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <MobileHeader />
        <TopBar />
        <AlertBanner />
        <main className="main-content flex-1 overflow-x-hidden overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/live" element={<LiveFeed />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
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
