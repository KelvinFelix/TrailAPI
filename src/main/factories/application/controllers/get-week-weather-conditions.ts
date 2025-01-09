import { makeGetWeekWeatherConditions } from '@/main/factories/domain/use-cases'
import { GetWeekWeatherConditionsController as Controller } from '@/application/controllers'

export const makeGetWeekWeatherConditionsController = (): Controller => new Controller(makeGetWeekWeatherConditions())
