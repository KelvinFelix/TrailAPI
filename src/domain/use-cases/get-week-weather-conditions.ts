import { Trail, ServerError } from '@/domain/entities'
import { LoadTrail } from '@/domain/contracts/repos'
import { GetWeekWeatherConditions as GetWeatherData } from '@/domain/contracts/gateways'

type Setup = (trailRepo: LoadTrail, weatherDataApi: GetWeatherData) => GetWeekWeatherConditions
type Input = Pick<Trail, 'name'>
export type GetWeekWeatherConditions = (input: Input) => Promise<GetWeatherData.Output>

export const setupGetWeatherConditions: Setup = (trailRepo, weatherDataApi) => async input => {
  const trailGeographicLocation = await trailRepo.load({ name: input.name })
  if (trailGeographicLocation === undefined) {
    throw new ServerError()
  }

  const { latitude, longitude } = trailGeographicLocation
  return await weatherDataApi.getWeekWeatherConditions({ latitude, longitude })
}
