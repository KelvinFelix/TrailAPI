import { Trail, TrailGeographicLocationData } from '@/domain/entities'

export interface LoadTrailGeographicLocation {
  load: (input: TrailGeographicLocation.Input) => Promise<TrailGeographicLocation.Output>
}

namespace TrailGeographicLocation {
  export type Input = Pick<Trail, 'name'>
  export type Output = undefined | TrailGeographicLocationData
}
