import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function Toggle({ enabled, onChange, color = '#00a3ff' }: { enabled: boolean; onChange: (v: boolean) => void; color?: string }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      style={{
        width: 48, height: 26, borderRadius: 13, borderWidth: 0, cursor: 'pointer',
        background: enabled ? color : '#1e293b',
        position: 'relative', transition: 'background 0.2s',
        boxShadow: enabled ? `0 0 12px ${color}80` : 'none',
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute', top: 3, left: enabled ? 26 : 3,
        width: 20, height: 20, borderRadius: '50%', background: 'white',
        transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
      }} />
    </button>
  )
}

function Slider({ label, value, onChange, min, max, unit }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; unit: string }) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 13, color: '#cbd5e1', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 13, fontFamily: 'JetBrains Mono, monospace', color: '#00a3ff', fontWeight: 600 }}>{value} {unit}</span>
      </div>
      <div style={{ position: 'relative', height: 4, background: '#1e293b', borderRadius: 2 }}>
        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #0066cc, #00a3ff)', borderRadius: 2 }} />
        <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} style={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)', width: '100%', height: 20, opacity: 0, cursor: 'pointer', margin: 0 }} />
        <div style={{ position: 'absolute', top: '50%', left: `${pct}%`, transform: 'translate(-50%, -50%)', width: 14, height: 14, borderRadius: '50%', background: '#00a3ff', borderWidth: 2, borderStyle: 'solid', borderColor: '#0a1628', boxShadow: '0 0 8px rgba(0,163,255,0.5)', pointerEvents: 'none' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontSize: 10, color: '#334155', fontFamily: 'JetBrains Mono, monospace' }}>{min} {unit}</span>
        <span style={{ fontSize: 10, color: '#334155', fontFamily: 'JetBrains Mono, monospace' }}>{max} {unit}</span>
      </div>
    </div>
  )
}

const cardStyle: React.CSSProperties = {
  background: '#0a1628', borderWidth: 1, borderStyle: 'solid', borderColor: '#1e293b', borderRadius: 12, overflow: 'hidden',
}

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div style={cardStyle}>
      <div style={{ padding: '18px 22px', borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#1e293b' }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#e2e8f0' }}>{title}</div>
        {subtitle && <div style={{ fontSize: 12, color: '#475569', fontFamily: 'JetBrains Mono, monospace', marginTop: 2 }}>{subtitle}</div>}
      </div>
      <div style={{ padding: '20px 22px' }}>{children}</div>
    </div>
  )
}

function SettingRow({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="setting-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: 'rgba(30,41,59,0.6)' }}>
      <div>
        <div style={{ fontSize: 14, color: '#cbd5e1', fontWeight: 500 }}>{label}</div>
        {desc && <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>{desc}</div>}
      </div>
      {children}
    </div>
  )
}

export default function Settings() {
  const { t } = useTranslation()
  const [resolution, setResolution] = useState(1080)
  const [fps, setFps] = useState(30)
  const [bitrate, setBitrate] = useState(8)
  const [autoReport, setAutoReport] = useState(true)
  const [redLight, setRedLight] = useState(true)
  const [speedDetection, setSpeedDetection] = useState(false)
  const [crowdDetection, setCrowdDetection] = useState(true)
  const [autoBlur, setAutoBlur] = useState(true)
  const [encryptLogs, setEncryptLogs] = useState(true)
  const [twoFactor, setTwoFactor] = useState(false)

  const compliant = autoBlur && encryptLogs

  const qualityPresets = [
    t('settings.camera.economy'),
    t('settings.camera.balanced'),
    t('settings.camera.highFidelity'),
  ]

  const systemRows = [
    { label: t('settings.system.platformVersion'), val: t('settings.system.platformValue') },
    { label: t('settings.system.nodeCount'), val: t('settings.system.nodeValue') },
    { label: t('settings.system.modelEngine'), val: t('settings.system.modelValue') },
    { label: t('settings.system.gpuCluster'), val: t('settings.system.gpuValue') },
    { label: t('settings.system.inferenceBackend'), val: t('settings.system.inferenceValue') },
    { label: t('settings.system.uptime'), val: t('settings.system.uptimeValue') },
    { label: t('settings.system.lastModelUpdate'), val: t('settings.system.lastModelValue') },
    { label: t('settings.system.dataRegion'), val: t('settings.system.dataRegionValue') },
  ]

  const activeModules = [
    { label: t('settings.ai.moduleAutoReport'), active: autoReport, color: '#00a3ff' },
    { label: t('settings.ai.moduleRedLight'), active: redLight, color: '#ef4444' },
    { label: t('settings.ai.moduleSpeed'), active: speedDetection, color: '#f59e0b' },
    { label: t('settings.ai.moduleCrowd'), active: crowdDetection, color: '#a855f7' },
  ]

  const accessUsers = [
    { role: 'admin@grideye.ai', levelKey: 'settings.security.roles.superAdmin', timeKey: 'settings.security.loginTimes.today' },
    { role: 'ops@bangkok.gov', levelKey: 'settings.security.roles.operator', timeKey: 'settings.security.loginTimes.yesterday' },
    { role: 'viewer@trafficcenter', levelKey: 'settings.security.roles.readOnly', timeKey: 'settings.security.loginTimes.daysAgo' },
  ]

  return (
    <div className="page-content">
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, color: '#00a3ff', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.12em', marginBottom: 4 }}>{t('settings.badge')}</div>
        <h1 className="page-title">{t('settings.title')}</h1>
        <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>{t('settings.subtitle')}</div>
      </div>

      <div className="settings-grid">
        <Card title={t('settings.camera.title')} subtitle={t('settings.camera.subtitle')}>
          <Slider label={t('settings.camera.resolution')} value={resolution} onChange={setResolution} min={480} max={2160} unit="p" />
          <Slider label={t('settings.camera.frameRate')} value={fps} onChange={setFps} min={15} max={60} unit="fps" />
          <Slider label={t('settings.camera.bitrate')} value={bitrate} onChange={setBitrate} min={2} max={20} unit="Mbps" />
          <div style={{ marginTop: 4 }}>
            <div style={{ fontSize: 12, color: '#475569', fontFamily: 'JetBrains Mono, monospace', marginBottom: 10 }}>{t('settings.camera.streamPreset')}</div>
            <div className="quality-presets" style={{ display: 'flex', gap: 8 }}>
              {qualityPresets.map((q, i) => (
                <button key={q} style={{
                  flex: 1, padding: '7px 0', borderRadius: 6,
                  borderWidth: 1, borderStyle: 'solid', borderColor: i === 1 ? '#00a3ff' : '#1e293b',
                  background: i === 1 ? 'rgba(0,163,255,0.1)' : 'transparent',
                  color: i === 1 ? '#00a3ff' : '#64748b',
                  fontSize: 12, cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace',
                }}>{q}</button>
              ))}
            </div>
          </div>
        </Card>

        <Card title={t('settings.ai.title')} subtitle={t('settings.ai.subtitle')}>
          <SettingRow label={t('settings.ai.autoReport')} desc={t('settings.ai.autoReportDesc')}>
            <Toggle enabled={autoReport} onChange={setAutoReport} />
          </SettingRow>
          <SettingRow label={t('settings.ai.redLight')} desc={t('settings.ai.redLightDesc')}>
            <Toggle enabled={redLight} onChange={setRedLight} color="#ef4444" />
          </SettingRow>
          <SettingRow label={t('settings.ai.speed')} desc={t('settings.ai.speedDesc')}>
            <Toggle enabled={speedDetection} onChange={setSpeedDetection} color="#f59e0b" />
          </SettingRow>
          <SettingRow label={t('settings.ai.crowd')} desc={t('settings.ai.crowdDesc')}>
            <Toggle enabled={crowdDetection} onChange={setCrowdDetection} color="#a855f7" />
          </SettingRow>
          <div style={{ marginTop: 16, padding: '12px 14px', background: '#0f172a', borderRadius: 8, borderWidth: 1, borderStyle: 'solid', borderColor: '#1e293b' }}>
            <div style={{ fontSize: 12, color: '#475569', fontFamily: 'JetBrains Mono, monospace', marginBottom: 8 }}>{t('settings.ai.activeModules')}</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {activeModules.map((m) => (
                <span key={m.label} style={{
                  fontSize: 11, fontFamily: 'JetBrains Mono, monospace', padding: '3px 8px', borderRadius: 4,
                  color: m.active ? m.color : '#334155',
                  background: m.active ? `${m.color}18` : '#1e293b',
                  borderWidth: 1, borderStyle: 'solid', borderColor: m.active ? `${m.color}40` : '#1e293b',
                }}>{m.label}</span>
              ))}
            </div>
          </div>
        </Card>

        <Card title={t('settings.system.title')} subtitle={t('settings.system.subtitle')}>
          {systemRows.map((row) => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: 'rgba(30,41,59,0.5)' }}>
              <span style={{ fontSize: 13, color: '#64748b' }}>{row.label}</span>
              <span style={{ fontSize: 13, fontFamily: 'JetBrains Mono, monospace', color: '#94a3b8', fontWeight: 500 }}>{row.val}</span>
            </div>
          ))}
          <div className="system-actions" style={{ marginTop: 16, display: 'flex', gap: 10 }}>
            <button style={{ flex: 1, padding: '9px 0', background: 'rgba(0,163,255,0.08)', borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(0,163,255,0.25)', borderRadius: 8, color: '#00a3ff', fontSize: 13, cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace' }}>{t('settings.system.checkUpdates')}</button>
            <button style={{ flex: 1, padding: '9px 0', background: 'rgba(239,68,68,0.08)', borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(239,68,68,0.2)', borderRadius: 8, color: '#ef4444', fontSize: 13, cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace' }}>{t('settings.system.restartNode')}</button>
          </div>
        </Card>

        <Card title={t('settings.security.title')} subtitle={t('settings.security.subtitle')}>
          <SettingRow label={t('settings.security.autoBlur')} desc={t('settings.security.autoBlurDesc')}>
            <Toggle enabled={autoBlur} onChange={setAutoBlur} color="#22c55e" />
          </SettingRow>
          <SettingRow label={t('settings.security.encryptLogs')} desc={t('settings.security.encryptLogsDesc')}>
            <Toggle enabled={encryptLogs} onChange={setEncryptLogs} color="#22c55e" />
          </SettingRow>
          <SettingRow label={t('settings.security.twoFactor')} desc={t('settings.security.twoFactorDesc')}>
            <Toggle enabled={twoFactor} onChange={setTwoFactor} />
          </SettingRow>

          <div style={{ marginTop: 18, padding: '14px 16px', background: compliant ? 'rgba(34,197,94,0.06)' : 'rgba(245,158,11,0.06)', borderRadius: 8, borderWidth: 1, borderStyle: 'solid', borderColor: compliant ? 'rgba(34,197,94,0.2)' : 'rgba(245,158,11,0.2)' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: compliant ? '#22c55e' : '#f59e0b', boxShadow: `0 0 6px ${compliant ? '#22c55e' : '#f59e0b'}` }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: compliant ? '#22c55e' : '#f59e0b', fontFamily: 'JetBrains Mono, monospace' }}>
                {compliant ? t('settings.security.compliancePassed') : t('settings.security.complianceWarning')}
              </span>
            </div>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 6, paddingLeft: 16 }}>
              {compliant ? t('settings.security.compliancePassedDesc') : t('settings.security.complianceWarningDesc')}
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 12, color: '#475569', fontFamily: 'JetBrains Mono, monospace', marginBottom: 10 }}>{t('settings.security.accessControl')}</div>
            {accessUsers.map((u) => (
              <div key={u.role} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: 'rgba(30,41,59,0.5)' }}>
                <div>
                  <div style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: '#94a3b8' }}>{u.role}</div>
                  <div style={{ fontSize: 11, color: '#475569', marginTop: 1 }}>{t('settings.security.lastLogin', { time: t(u.timeKey) })}</div>
                </div>
                <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', padding: '3px 8px', borderRadius: 4, background: 'rgba(0,163,255,0.08)', color: '#00a3ff', borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(0,163,255,0.2)' }}>{t(u.levelKey)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
