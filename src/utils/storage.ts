import type { AppSettings } from '../data/types'

const STORAGE_KEY = 'grideye-settings'

const DEFAULT_SETTINGS: AppSettings = {
  camera: { resolution: 1080, fps: 30, bitrate: 8, preset: 'balanced' },
  ai: { autoReport: true, redLight: true, speedDetection: false, crowdDetection: true },
  security: { autoBlur: true, encryptLogs: true, twoFactor: false },
}

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_SETTINGS
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

export const QUALITY_PRESETS = {
  economy: { resolution: 720, fps: 20, bitrate: 4 },
  balanced: { resolution: 1080, fps: 30, bitrate: 8 },
  highFidelity: { resolution: 2160, fps: 60, bitrate: 16 },
} as const
