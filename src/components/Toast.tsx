import { useApp } from '../context/AppContext'

const typeColors = {
  success: { bg: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.3)', color: '#22c55e' },
  info: { bg: 'rgba(0,163,255,0.15)', border: 'rgba(0,163,255,0.3)', color: '#00a3ff' },
  warning: { bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.3)', color: '#f59e0b' },
  error: { bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.3)', color: '#ef4444' },
}

export default function ToastContainer() {
  const { toasts, dismissToast } = useApp()

  if (toasts.length === 0) return null

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 380,
    }}>
      {toasts.map((toast) => {
        const c = typeColors[toast.type]
        return (
          <div key={toast.id}
            onClick={() => dismissToast(toast.id)}
            style={{
              background: '#0f172a', borderWidth: 1, borderStyle: 'solid', borderColor: c.border,
              borderRadius: 10, padding: '12px 16px', cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)', animation: 'toastIn 0.3s ease',
            }}
          >
            <div style={{ fontSize: 13, color: c.color, fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
              {toast.message}
            </div>
          </div>
        )
      })}
      <style>{`@keyframes toastIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  )
}
