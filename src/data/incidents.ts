import type { Incident } from './types'

export const ALL_INCIDENTS: Incident[] = [
  {
    id: 'INC-0847', date: '2024-07-10', time: '18:42', locationKey: 'locations.latPhraoKaset',
    typeKey: 'incidentTypes.multiVehicleCollision', severity: 'high', cam: 'CAM-LP-03', risk: 9.2,
    confidence: 94.2, causeKey: 'causes.speeding', locationFilter: 'latPhrao',
    descriptionKey: 'incidentDetail.desc.multiVehicle', statusKey: 'incidentDetail.statuses.active', vehiclesInvolved: 3, responseTimeMin: 8,
  },
  {
    id: 'INC-0846', date: '2024-07-10', time: '18:21', locationKey: 'locations.sukhumvitSoi71',
    typeKey: 'incidentTypes.pedestrianConflict', severity: 'medium', cam: 'CAM-SK-12', risk: 6.7,
    confidence: 87.5, causeKey: 'causes.distractedDriving', locationFilter: 'sukhumvit',
    descriptionKey: 'incidentDetail.desc.pedestrian', statusKey: 'incidentDetail.statuses.resolved', vehiclesInvolved: 1, responseTimeMin: 12,
  },
  {
    id: 'INC-0845', date: '2024-07-10', time: '17:58', locationKey: 'locations.ratchadaphisek',
    typeKey: 'incidentTypes.redLightViolation', severity: 'low', cam: 'CAM-RD-07', risk: 4.1,
    confidence: 99.1, causeKey: 'causes.redLightViolation', locationFilter: 'ratchadaphisek',
    descriptionKey: 'incidentDetail.desc.redLight', statusKey: 'incidentDetail.statuses.resolved', vehiclesInvolved: 1, responseTimeMin: 5,
  },
  {
    id: 'INC-0844', date: '2024-07-10', time: '17:39', locationKey: 'locations.chatuchak',
    typeKey: 'incidentTypes.congestionAlert', severity: 'medium', cam: 'CAM-CK-01', risk: 5.8,
    confidence: 91.7, causeKey: 'causes.roadCondition', locationFilter: 'chatuchak',
    descriptionKey: 'incidentDetail.desc.congestion', statusKey: 'incidentDetail.statuses.monitoring', vehiclesInvolved: 0, responseTimeMin: 15,
  },
  {
    id: 'INC-0843', date: '2024-07-10', time: '17:12', locationKey: 'locations.huaiKhwang',
    typeKey: 'incidentTypes.wrongWayDriver', severity: 'high', cam: 'CAM-HK-04', risk: 9.7,
    confidence: 96.3, causeKey: 'causes.laneChange', locationFilter: 'huaiKhwang',
    descriptionKey: 'incidentDetail.desc.wrongWay', statusKey: 'incidentDetail.statuses.active', vehiclesInvolved: 2, responseTimeMin: 6,
  },
  {
    id: 'INC-0842', date: '2024-07-10', time: '16:55', locationKey: 'locations.phetchaburi',
    typeKey: 'incidentTypes.laneObstruction', severity: 'low', cam: 'CAM-PB-09', risk: 3.2,
    confidence: 88.4, causeKey: 'causes.other', locationFilter: 'all',
    descriptionKey: 'incidentDetail.desc.obstruction', statusKey: 'incidentDetail.statuses.resolved', vehiclesInvolved: 1, responseTimeMin: 20,
  },
  {
    id: 'INC-0841', date: '2024-07-09', time: '18:28', locationKey: 'locations.vibhavadiRangsit',
    typeKey: 'incidentTypes.speedViolation', severity: 'low', cam: 'CAM-VB-02', risk: 4.5,
    confidence: 97.8, causeKey: 'causes.speeding', locationFilter: 'all',
    descriptionKey: 'incidentDetail.desc.speed', statusKey: 'incidentDetail.statuses.resolved', vehiclesInvolved: 1, responseTimeMin: 4,
  },
  {
    id: 'INC-0840', date: '2024-07-09', time: '18:20', locationKey: 'locations.dinDaeng',
    typeKey: 'incidentTypes.multiVehicleCollision', severity: 'high', cam: 'CAM-DD-05', risk: 8.9,
    confidence: 93.6, causeKey: 'causes.speeding', locationFilter: 'all',
    descriptionKey: 'incidentDetail.desc.multiVehicle', statusKey: 'incidentDetail.statuses.resolved', vehiclesInvolved: 4, responseTimeMin: 10,
  },
  {
    id: 'INC-0839', date: '2024-07-09', time: '17:45', locationKey: 'locations.huaiKhwang',
    typeKey: 'incidentTypes.pedestrianConflict', severity: 'medium', cam: 'CAM-HK-01', risk: 6.1,
    confidence: 85.1, causeKey: 'causes.distractedDriving', locationFilter: 'huaiKhwang',
    descriptionKey: 'incidentDetail.desc.pedestrian', statusKey: 'incidentDetail.statuses.resolved', vehiclesInvolved: 1, responseTimeMin: 11,
  },
  {
    id: 'INC-0838', date: '2024-07-08', time: '16:30', locationKey: 'locations.ariBtsArea',
    typeKey: 'incidentTypes.pedestrianConflict', severity: 'medium', cam: 'CAM-AR-03', risk: 6.1,
    confidence: 85.1, causeKey: 'causes.distractedDriving', locationFilter: 'all',
    descriptionKey: 'incidentDetail.desc.pedestrian', statusKey: 'incidentDetail.statuses.resolved', vehiclesInvolved: 1, responseTimeMin: 9,
  },
  {
    id: 'INC-0837', date: '2024-07-08', time: '15:15', locationKey: 'locations.phahonYothin',
    typeKey: 'incidentTypes.redLightViolation', severity: 'low', cam: 'CAM-PY-08', risk: 3.8,
    confidence: 98.7, causeKey: 'causes.redLightViolation', locationFilter: 'all',
    descriptionKey: 'incidentDetail.desc.redLight', statusKey: 'incidentDetail.statuses.resolved', vehiclesInvolved: 1, responseTimeMin: 3,
  },
  {
    id: 'INC-0836', date: '2024-07-08', time: '14:00', locationKey: 'locations.ngamwongwan',
    typeKey: 'incidentTypes.vehicleBreakdown', severity: 'medium', cam: 'CAM-NW-06', risk: 4.4,
    confidence: 89.2, causeKey: 'causes.roadCondition', locationFilter: 'all',
    descriptionKey: 'incidentDetail.desc.breakdown', statusKey: 'incidentDetail.statuses.resolved', vehiclesInvolved: 1, responseTimeMin: 25,
  },
  {
    id: 'INC-0835', date: '2024-07-07', time: '19:10', locationKey: 'locations.outerRingEast',
    typeKey: 'incidentTypes.roadDebris', severity: 'low', cam: 'CAM-OR-11', risk: 2.9,
    confidence: 82.4, causeKey: 'causes.roadCondition', locationFilter: 'all',
    descriptionKey: 'incidentDetail.desc.debris', statusKey: 'incidentDetail.statuses.resolved', vehiclesInvolved: 0, responseTimeMin: 18,
  },
  {
    id: 'INC-0834', date: '2024-07-07', time: '11:30', locationKey: 'locations.sukhumvitSoi71',
    typeKey: 'incidentTypes.congestionAlert', severity: 'medium', cam: 'CAM-SK-12', risk: 5.2,
    confidence: 90.3, causeKey: 'causes.roadCondition', locationFilter: 'sukhumvit',
    descriptionKey: 'incidentDetail.desc.congestion', statusKey: 'incidentDetail.statuses.resolved', vehiclesInvolved: 0, responseTimeMin: 22,
  },
]

export const LOCATION_FILTERS = [
  { value: 'all', key: 'locations.allLocations' },
  { value: 'huaiKhwang', key: 'locations.huaiKhwangFilter' },
  { value: 'latPhrao', key: 'locations.latPhraoFilter' },
  { value: 'sukhumvit', key: 'locations.sukhumvitFilter' },
  { value: 'ratchadaphisek', key: 'locations.ratchadaphisekFilter' },
  { value: 'chatuchak', key: 'locations.chatuchakFilter' },
] as const
