import type { Camera } from './types'

export const CAMERAS: Camera[] = [
  {
    id: 'CAM-HK-01',
    nameKey: 'cameras.huaiKhwang01',
    locationKey: 'locations.huaiKhwang',
    vehicles: 4, pedestrians: 1, confidence: 94.2, hasIncident: true,
    detections: [
      { x: 12, y: 30, w: 18, h: 28, labelKey: 'liveFeed.bbox.veh', confidence: 97.2, color: '#00a3ff' },
      { x: 38, y: 35, w: 14, h: 22, labelKey: 'liveFeed.bbox.veh', confidence: 94.8, color: '#00a3ff' },
      { x: 60, y: 28, w: 20, h: 32, labelKey: 'liveFeed.bbox.incident', confidence: 91.4, color: '#ef4444', incidentId: 'INC-0843' },
      { x: 78, y: 42, w: 12, h: 18, labelKey: 'liveFeed.bbox.ped', confidence: 88.6, color: '#22c55e' },
    ],
  },
  {
    id: 'CAM-LP-03',
    nameKey: 'cameras.latPhrao03',
    locationKey: 'locations.latPhraoKaset',
    vehicles: 6, pedestrians: 2, confidence: 92.8, hasIncident: true,
    detections: [
      { x: 8, y: 25, w: 16, h: 24, labelKey: 'liveFeed.bbox.veh', confidence: 96.1, color: '#00a3ff' },
      { x: 30, y: 32, w: 22, h: 30, labelKey: 'liveFeed.bbox.incident', confidence: 93.5, color: '#ef4444', incidentId: 'INC-0847' },
      { x: 55, y: 28, w: 14, h: 20, labelKey: 'liveFeed.bbox.veh', confidence: 95.3, color: '#00a3ff' },
      { x: 72, y: 38, w: 12, h: 16, labelKey: 'liveFeed.bbox.veh', confidence: 91.7, color: '#00a3ff' },
      { x: 85, y: 45, w: 10, h: 14, labelKey: 'liveFeed.bbox.ped', confidence: 86.2, color: '#22c55e' },
    ],
  },
  {
    id: 'CAM-SK-12',
    nameKey: 'cameras.sukhumvit12',
    locationKey: 'locations.sukhumvitSoi71',
    vehicles: 3, pedestrians: 3, confidence: 89.5, hasIncident: false,
    detections: [
      { x: 20, y: 35, w: 15, h: 22, labelKey: 'liveFeed.bbox.veh', confidence: 93.4, color: '#00a3ff' },
      { x: 45, y: 30, w: 12, h: 18, labelKey: 'liveFeed.bbox.veh', confidence: 90.1, color: '#00a3ff' },
      { x: 65, y: 40, w: 10, h: 14, labelKey: 'liveFeed.bbox.ped', confidence: 87.8, color: '#22c55e' },
      { x: 78, y: 50, w: 8, h: 12, labelKey: 'liveFeed.bbox.ped', confidence: 84.3, color: '#22c55e' },
    ],
  },
  {
    id: 'CAM-CK-01',
    nameKey: 'cameras.chatuchak01',
    locationKey: 'locations.chatuchak',
    vehicles: 8, pedestrians: 0, confidence: 96.1, hasIncident: false,
    detections: [
      { x: 5, y: 28, w: 14, h: 20, labelKey: 'liveFeed.bbox.veh', confidence: 98.2, color: '#00a3ff' },
      { x: 22, y: 32, w: 16, h: 22, labelKey: 'liveFeed.bbox.veh', confidence: 97.5, color: '#00a3ff' },
      { x: 42, y: 30, w: 14, h: 20, labelKey: 'liveFeed.bbox.veh', confidence: 96.8, color: '#00a3ff' },
      { x: 60, y: 35, w: 15, h: 22, labelKey: 'liveFeed.bbox.veh', confidence: 95.9, color: '#00a3ff' },
    ],
  },
]
