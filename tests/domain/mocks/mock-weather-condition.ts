import { WeatherConditions } from '@/domain/entities'

export const mockWeatherConditions = (): WeatherConditions => ({
  id: 1,
  time: new Date(1733839200 * 1000),
  temperature: {
    day: 299.09,
    highest: 294.02,
    lowest: 299.09
  },
  humidity: 68,
  sunrise: new Date(1733817650 * 1000),
  sunset: new Date(1733866301 * 1000),
  summary: 'Expect a day of partly cloudy with clear spells'
})
