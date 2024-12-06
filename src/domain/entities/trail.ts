export enum TrailKind {
  LOOP = 'Loop',
  POINT_TO_POINT = 'Point to point',
  OUT_AND_BACK = 'Out and back'
}

type TrailData = {
  id: number
  name: string
  description: string
  length: number
  elevationGain: number
  averageTime: number
  kind: TrailKind
}

export class Trail {
  id: number
  name: string
  description: string
  length: number
  elevationGain: number
  averageTime: number
  kind: TrailKind

  constructor (trailData: TrailData) {
    this.id = trailData.id
    this.name = trailData.name
    this.description = trailData.description
    this.length = trailData.length
    this.elevationGain = trailData.elevationGain
    this.averageTime = trailData.averageTime
    this.kind = trailData.kind
  }
}
