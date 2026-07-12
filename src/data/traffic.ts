import type { TrafficPeriod, TrafficPoint } from './types'

const TRAFFIC_24H: TrafficPoint[] = [
  { time: '00:00', volume: 1240 }, { time: '01:00', volume: 890 }, { time: '02:00', volume: 620 },
  { time: '03:00', volume: 480 }, { time: '04:00', volume: 710 }, { time: '05:00', volume: 1380 },
  { time: '06:00', volume: 2940 }, { time: '07:00', volume: 4820 }, { time: '08:00', volume: 5610 },
  { time: '09:00', volume: 4930 }, { time: '10:00', volume: 4210 }, { time: '11:00', volume: 3980 },
  { time: '12:00', volume: 4450 }, { time: '13:00', volume: 4180 }, { time: '14:00', volume: 3760 },
  { time: '15:00', volume: 4290 }, { time: '16:00', volume: 5120 }, { time: '17:00', volume: 6340 },
  { time: '18:00', volume: 5890 }, { time: '19:00', volume: 4620 }, { time: '20:00', volume: 3840 },
  { time: '21:00', volume: 3120 }, { time: '22:00', volume: 2340 }, { time: '23:00', volume: 1680 },
]

const TRAFFIC_7D: TrafficPoint[] = [
  { time: 'Mon', volume: 58200 }, { time: 'Tue', volume: 61400 }, { time: 'Wed', volume: 59800 },
  { time: 'Thu', volume: 63100 }, { time: 'Fri', volume: 67200 }, { time: 'Sat', volume: 48900 },
  { time: 'Sun', volume: 42100 },
]

const TRAFFIC_30D: TrafficPoint[] = [
  { time: 'W1', volume: 412000 }, { time: 'W2', volume: 438000 }, { time: 'W3', volume: 425000 },
  { time: 'W4', volume: 451000 },
]

export const TRAFFIC_DATA: Record<TrafficPeriod, TrafficPoint[]> = {
  '24h': TRAFFIC_24H,
  '7d': TRAFFIC_7D,
  '30d': TRAFFIC_30D,
}

export function getTotalVolume(period: TrafficPeriod): number {
  return TRAFFIC_DATA[period].reduce((sum, p) => sum + p.volume, 0)
}
