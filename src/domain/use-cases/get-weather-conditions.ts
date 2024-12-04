import { Trail } from '@/domain/entities'
import { LoadTrailGeographicLocation } from '@/domain/contracts/repos'

type Setup = (trailGeographicLocationRepo: LoadTrailGeographicLocation) => GetWeatherConditions
type Input = Pick<Trail, 'name'>
type GetWeatherConditions = (input: Input) => Promise<void>

export const setupGetWeatherConditions: Setup = (trailGeographicLocationRepo) => async input => {
  await trailGeographicLocationRepo.loadTrailGeographicLocation(input)
}
