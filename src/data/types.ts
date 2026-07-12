export type Severity = 'high' | 'medium' | 'low'
export type TrafficPeriod = '24h' | '7d' | '30d'
export type SortDirection = 'asc' | 'desc'

export interface Incident {
  id: string
  date: string
  time: string
  locationKey: string
  typeKey: string
  severity: Severity
  cam: string
  risk: number
  confidence: number
  causeKey: string
  locationFilter: string
  descriptionKey: string
  statusKey: string
  vehiclesInvolved: number
  responseTimeMin: number
}

export interface TrafficPoint {
  time: string
  volume: number
}

export interface CauseStat {
  key: string
  value: number
  color: string
}

export interface Hotspot {
  nameKey: string
  count: number
  x: number
  y: number
  locationFilter: string
}

export interface Detection {
  x: number
  y: number
  w: number
  h: number
  labelKey: string
  confidence: number
  color: string
  incidentId?: string
}

export interface Camera {
  id: string
  nameKey: string
  locationKey: string
  detections: Detection[]
  vehicles: number
  pedestrians: number
  confidence: number
  hasIncident: boolean
}

export interface IncidentFilters {
  dateFrom: string
  dateTo: string
  location: string
}

export interface CameraSettings {
  resolution: number
  fps: number
  bitrate: number
  preset: 'economy' | 'balanced' | 'highFidelity'
}

export interface AiSettings {
  autoReport: boolean
  redLight: boolean
  speedDetection: boolean
  crowdDetection: boolean
}

export interface SecuritySettings {
  autoBlur: boolean
  encryptLogs: boolean
  twoFactor: boolean
}

export interface AppSettings {
  camera: CameraSettings
  ai: AiSettings
  security: SecuritySettings
}
