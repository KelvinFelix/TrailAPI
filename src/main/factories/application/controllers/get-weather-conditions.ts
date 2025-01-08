import { makeGetWeatherConditions } from '@/main/factories/domain/use-cases'
import { GetWeatherConditionsController } from '@/application/controllers'

export const makeGetWeatherConditionsController = (): GetWeatherConditionsController =>
  new GetWeatherConditionsController(makeGetWeatherConditions())
