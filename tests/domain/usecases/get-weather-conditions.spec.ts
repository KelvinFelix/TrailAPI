import { GetWeatherConditions, setupGetWeatherConditions } from '@/domain/use-cases'
import { LoadTrailGeographicLocation } from '@/domain/contracts/repos'
import { GetWeekWeatherConditions } from '@/domain/contracts/gateways'
import { ServerError, WeatherConditions } from '@/domain/entities'

import { mockTrailGeographicLocation, mockWeatherConditions } from '@/tests/domain/mocks'

import { mock, MockProxy } from 'jest-mock-extended'

describe('GetWeatherConditions', () => {
  let name: string
  let trailGeographicLocationRepo: MockProxy<LoadTrailGeographicLocation>
  let weatherDataApi: MockProxy<GetWeekWeatherConditions>
  let mockedWeatherConditions: WeatherConditions[]
  let sut: GetWeatherConditions

  beforeAll(() => {
    name = 'any_name'

    trailGeographicLocationRepo = mock()
    trailGeographicLocationRepo.load.mockResolvedValue(mockTrailGeographicLocation())

    mockedWeatherConditions = [mockWeatherConditions()]
    weatherDataApi = mock()
    weatherDataApi.getWeekWeatherConditions.mockResolvedValue(mockedWeatherConditions)
  })

  beforeEach(() => {
    sut = setupGetWeatherConditions(trailGeographicLocationRepo, weatherDataApi)
  })

  it('should call LoadTrailGeographicLocation with correct input', async () => {
    await sut({ name })

    expect(trailGeographicLocationRepo.load).toHaveBeenCalledWith({ name })
    expect(trailGeographicLocationRepo.load).toHaveBeenCalledTimes(1)
  })

  describe('when LoadTrailGeographicLocation returns undefined', () => {
    it('should throw ServerError', async () => {
      trailGeographicLocationRepo.load.mockResolvedValueOnce(undefined)

      const promise = sut({ name })

      await expect(promise).rejects.toThrow(new ServerError())
    })
  })

  describe('when LoadTrailGeographicLocation returns data', () => {
    it('should call LoadWeatherConditions with correct input', async () => {
      const loadWeatherConditionsInput = {
        latitude: -22.99708152654489,
        longitude: -43.28480818424458
      }

      await sut({ name })

      expect(weatherDataApi.getWeekWeatherConditions).toHaveBeenCalledWith(loadWeatherConditionsInput)
      expect(weatherDataApi.getWeekWeatherConditions).toHaveBeenCalledTimes(1)
    })

    it('should return the weather conditions', async () => {
      const weatherConditions = await sut({ name })

      expect(weatherConditions).toBe(mockedWeatherConditions)
    })
  })
})
