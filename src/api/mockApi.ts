import type { CauseStat, Incident, IncidentFilters, SortDirection, TrafficPeriod, TrafficPoint } from '../data/types'
import { ALL_INCIDENTS } from '../data/incidents'
import { ALL_HOTSPOTS } from '../data/hotspots'
import { TRAFFIC_DATA } from '../data/traffic'

const CAUSE_COLORS: Record<string, string> = {
  'causes.speeding': '#ef4444',
  'causes.redLightViolation': '#f59e0b',
  'causes.distractedDriving': '#00a3ff',
  'causes.laneChange': '#a855f7',
  'causes.roadCondition': '#22c55e',
  'causes.other': '#475569',
}

function delay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function filterIncidents(filters: IncidentFilters): Incident[] {
  return ALL_INCIDENTS.filter((inc) => {
    const inDateRange = inc.date >= filters.dateFrom && inc.date <= filters.dateTo
    const inLocation = filters.location === 'all' || inc.locationFilter === filters.location
    return inDateRange && inLocation
  })
}

export function sortIncidents(
  incidents: Incident[],
  sortCol: string,
  direction: SortDirection,
): Incident[] {
  const sorted = [...incidents].sort((a, b) => {
    let cmp = 0
    if (sortCol === 'date') cmp = a.date.localeCompare(b.date) || a.time.localeCompare(b.time)
    else if (sortCol === 'location') cmp = a.locationKey.localeCompare(b.locationKey)
    else if (sortCol === 'type') cmp = a.typeKey.localeCompare(b.typeKey)
    else if (sortCol === 'risk') cmp = a.risk - b.risk
    return direction === 'asc' ? cmp : -cmp
  })
  return sorted
}

export function computeCauseStats(incidents: Incident[]): CauseStat[] {
  const counts: Record<string, number> = {}
  for (const inc of incidents) {
    counts[inc.causeKey] = (counts[inc.causeKey] ?? 0) + 1
  }
  const total = incidents.length || 1
  return Object.entries(counts).map(([key, count]) => ({
    key,
    value: Math.round((count / total) * 100),
    color: CAUSE_COLORS[key] ?? '#475569',
  }))
}

export function computeHotspots(filters: IncidentFilters) {
  if (filters.location === 'all') return ALL_HOTSPOTS
  return ALL_HOTSPOTS.filter((h) => h.locationFilter === filters.location || h.locationFilter === 'all')
}

export async function fetchIncidents(filters: IncidentFilters): Promise<Incident[]> {
  await delay()
  return filterIncidents(filters)
}

export async function fetchTraffic(period: TrafficPeriod): Promise<TrafficPoint[]> {
  await delay(150)
  return TRAFFIC_DATA[period]
}

export async function generateReport(filters: IncidentFilters): Promise<{
  incidents: Incident[]
  causes: CauseStat[]
  hotspots: typeof ALL_HOTSPOTS
}> {
  await delay(500)
  const incidents = filterIncidents(filters)
  return {
    incidents,
    causes: computeCauseStats(incidents),
    hotspots: computeHotspots(filters),
  }
}

export function exportIncidentsCsv(incidents: Incident[], t: (key: string) => string): void {
  const headers = ['ID', 'Date', 'Time', 'Location', 'Type', 'Severity', 'Risk', 'Camera', 'Confidence']
  const rows = incidents.map((inc) => [
    inc.id, inc.date, inc.time, t(inc.locationKey), t(inc.typeKey),
    inc.severity, inc.risk.toFixed(1), inc.cam, `${inc.confidence}%`,
  ])
  const csv = [headers, ...rows].map((row) => row.map((c) => `"${c}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `grideye-report-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export function getIncidentById(id: string): Incident | undefined {
  return ALL_INCIDENTS.find((inc) => inc.id === id)
}

export function getActiveIncidentCount(): number {
  return ALL_INCIDENTS.filter((inc) => inc.statusKey === 'incidentDetail.statuses.active').length
}

export function getRecentIncidents(limit = 6): Incident[] {
  return [...ALL_INCIDENTS]
    .sort((a, b) => `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`))
    .slice(0, limit)
}
