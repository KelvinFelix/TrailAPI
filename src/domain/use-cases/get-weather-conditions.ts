import { ServerError, Trail } from '@/domain/entities'
import { LoadTrailGeographicLocation } from '@/domain/contracts/repos'

type Setup = (trailGeographicLocationRepo: LoadTrailGeographicLocation) => GetWeatherConditions
type Input = Pick<Trail, 'name'>
export type GetWeatherConditions = (input: Input) => Promise<void>

export const setupGetWeatherConditions: Setup = (trailGeographicLocationRepo) => async input => {
  const trailGeographicLocation = await trailGeographicLocationRepo.load(input)
  if (trailGeographicLocation === undefined) {
    throw new ServerError()
  }
}
