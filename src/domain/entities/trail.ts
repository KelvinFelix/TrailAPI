export enum TrailKind {
  LOOP = 'Loop',
  POINT_TO_POINT = 'Point to point'
}

export type TrailData = {
  id: number
  description: string
  length: number
  elevationGain: number
  averageTime: number
  kind: TrailKind
}

export class Trail {
  id: number
  description: string
  length: number
  elevationGain: number
  averageTime: number
  kind: TrailKind

  constructor (trailData: TrailData) {
    this.id = trailData.id
    this.description = trailData.description
    this.length = trailData.length
    this.elevationGain = trailData.elevationGain
    this.averageTime = trailData.averageTime
    this.kind = trailData.kind
  }
}
