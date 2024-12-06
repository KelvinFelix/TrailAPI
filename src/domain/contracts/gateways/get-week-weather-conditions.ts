import { TrailGeographicLocation, WeatherConditions } from '@/domain/entities'

export interface GetWeekWeatherConditions {
  getWeekWeatherConditions: (input: GetWeekWeatherConditions.Input) => Promise<WeatherConditions[]>
}

namespace GetWeekWeatherConditions {
  export type Input = Pick<TrailGeographicLocation, 'latitude' | 'longitude'>
}
