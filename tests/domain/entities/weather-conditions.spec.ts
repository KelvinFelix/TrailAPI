import { WeatherConditions } from '@/domain/entities'
import { mockWeatherConditions } from '@/tests/domain/mocks'

describe('WeatherConditions', () => {
  it('should have the proper specified data', () => {
    const mockedWeatherConditions = mockWeatherConditions()

    const sut = new WeatherConditions(mockedWeatherConditions)

    expect(sut).toEqual(mockedWeatherConditions)
  })
})
