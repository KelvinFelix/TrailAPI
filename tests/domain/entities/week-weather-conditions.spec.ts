import { WeekWeatherConditions } from '@/domain/entities'
import { mockWeekWeatherConditions } from '@/tests/domain/mocks'

describe('WeekWeatherConditions', () => {
  it('should have the proper specified data', () => {
    const mockedWeekWeatherConditions = mockWeekWeatherConditions()

    const sut = new WeekWeatherConditions(mockedWeekWeatherConditions)

    expect(sut).toEqual(mockedWeekWeatherConditions)
  })
})
