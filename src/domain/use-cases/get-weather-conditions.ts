import { ServerError, Trail, WeatherConditions } from '@/domain/entities'
import { LoadTrailGeographicLocation } from '@/domain/contracts/repos'
import { GetWeekWeatherConditions } from '@/domain/contracts/gateways'

type Setup = (trailGeographicLocationRepo: LoadTrailGeographicLocation, weatherDataApi: GetWeekWeatherConditions) => GetWeatherConditions
type Input = Pick<Trail, 'name'>
export type GetWeatherConditions = (input: Input) => Promise<WeatherConditions[]>

export const setupGetWeatherConditions: Setup = (trailGeographicLocationRepo, weatherDataApi) => async input => {
  const trailGeographicLocation = await trailGeographicLocationRepo.load(input)
  if (trailGeographicLocation === undefined) {
    throw new ServerError()
  }

  const { latitude, longitude } = trailGeographicLocation
  return await weatherDataApi.getWeekWeatherConditions({ latitude, longitude })
}
