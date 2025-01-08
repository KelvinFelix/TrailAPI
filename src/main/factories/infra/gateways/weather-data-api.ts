import { env } from '@/main/config/env'
import { makeAxiosHttpClient, makeIsoDateConverter } from '@/main/factories/infra/gateways'
import { WeatherDataApi } from '@/infra/gateways'

export const makeWeatherDataApi = (): WeatherDataApi =>
  new WeatherDataApi(
    makeAxiosHttpClient(),
    makeIsoDateConverter(),
    env.weatherDataApi.appid
  )
