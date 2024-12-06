import { Trail, TrailGeographicLocation } from '@/domain/entities'

export interface LoadTrailGeographicLocation {
  load: (input: LoadTrailGeographicLocation.Input) => Promise<LoadTrailGeographicLocation.Output>
}

namespace LoadTrailGeographicLocation {
  export type Input = Pick<Trail, 'name'>
  export type Output = undefined | TrailGeographicLocation
}
