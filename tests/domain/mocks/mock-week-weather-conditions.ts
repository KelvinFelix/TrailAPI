import { WeekWeatherConditions } from '@/domain/entities'

const defaultWeatherConditions = {
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
}

export const mockWeekWeatherConditions = (): WeekWeatherConditions => ({
  sunday: defaultWeatherConditions,
  monday: defaultWeatherConditions,
  tuesday: defaultWeatherConditions,
  wednesday: defaultWeatherConditions,
  thursday: defaultWeatherConditions,
  friday: defaultWeatherConditions,
  saturday: defaultWeatherConditions
})
