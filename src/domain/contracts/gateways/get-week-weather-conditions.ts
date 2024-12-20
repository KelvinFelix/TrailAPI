import { Trail, WeatherConditions } from '@/domain/entities'

export interface GetWeekWeatherConditions {
  getWeekWeatherConditions: (input: GetWeekWeatherConditions.Input) => Promise<GetWeekWeatherConditions.Output>
}

export namespace GetWeekWeatherConditions {
  export type Input = Pick<Trail, 'latitude' | 'longitude'>
  export type Output = WeatherConditions[] | undefined
}
