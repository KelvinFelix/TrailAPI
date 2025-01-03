import { WeatherConditions, ISODate, ISOTime } from '@/domain/entities'

import { formatISO9075 } from 'date-fns'

export const mockWeatherConditions = (): WeatherConditions => ({
  date: formatISO9075(new Date(1733839200 * 1000), { representation: 'date' }) as ISODate,
  temperature: {
    day: 299.09,
    highest: 294.02,
    lowest: 299.09
  },
  humidity: 68,
  sunrise: formatISO9075(new Date(1733817650 * 1000), { representation: 'time' }) as ISOTime,
  sunset: formatISO9075(new Date(1733866301 * 1000), { representation: 'time' }) as ISOTime,
  summary: 'Expect a day of partly cloudy with clear spells'
})
