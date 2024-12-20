import { ServerError, Trail } from '@/domain/entities'
import { LoadTrail } from '@/domain/contracts/repos'
import { GetWeekWeatherConditions } from '@/domain/contracts/gateways'

type Setup = (trailRepo: LoadTrail, weatherDataApi: GetWeekWeatherConditions) => GetWeatherConditions
type Input = Pick<Trail, 'name'>
export type GetWeatherConditions = (input: Input) => Promise<GetWeekWeatherConditions.Output>

export const setupGetWeatherConditions: Setup = (trailRepo, weatherDataApi) => async input => {
  const trailGeographicLocation = await trailRepo.load({ name: input.name })
  if (trailGeographicLocation === undefined) {
    throw new ServerError()
  }

  const { latitude, longitude } = trailGeographicLocation
  return await weatherDataApi.getWeekWeatherConditions({ latitude, longitude })
}
