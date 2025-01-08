import { setupGetWeatherConditions, GetWeatherConditions } from '@/domain/use-cases'
import { makeTrailRepository } from '@/main/factories/infra/repos/postgres'
import { makeWeatherDataApi } from '@/main/factories/infra/gateways'

export const makeGetWeatherConditions = (): GetWeatherConditions =>
  setupGetWeatherConditions(
    makeTrailRepository(),
    makeWeatherDataApi()
  )
