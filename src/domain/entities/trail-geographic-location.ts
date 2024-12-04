export type TrailGeographicLocationData = {
  id: number
  trailId: number
  areaName: string
  latitude: number
  longitude: number
}

export class TrailGeographicLocation {
  id: number
  trailId: number
  areaName: string
  latitude: number
  longitude: number

  constructor (trailGeographicLocationData: TrailGeographicLocationData) {
    this.id = trailGeographicLocationData.id
    this.trailId = trailGeographicLocationData.trailId
    this.areaName = trailGeographicLocationData.areaName
    this.latitude = trailGeographicLocationData.latitude
    this.longitude = trailGeographicLocationData.longitude
  }
}
