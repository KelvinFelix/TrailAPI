import { GetWeekWeatherConditions, setupGetWeatherConditions } from '@/domain/use-cases'
import { LoadTrail } from '@/domain/contracts/repos'
import { GetWeekWeatherConditions as GetWeatherData } from '@/domain/contracts/gateways'
import { ServerError, WeekWeatherConditions } from '@/domain/entities'

import { mockTrail, mockWeekWeatherConditions } from '@/tests/domain/mocks'

import { mock, MockProxy } from 'jest-mock-extended'

describe('GetWeekWeatherConditions', () => {
  let name: string
  let trailRepo: MockProxy<LoadTrail>
  let weatherDataApi: MockProxy<GetWeatherData>
  let mockedWeekWeatherConditions: WeekWeatherConditions
  let sut: GetWeekWeatherConditions

  beforeAll(() => {
    name = 'any_name'

    trailRepo = mock()
    trailRepo.load.mockResolvedValue(mockTrail())

    mockedWeekWeatherConditions = mockWeekWeatherConditions()
    weatherDataApi = mock()
    weatherDataApi.getWeekWeatherConditions.mockResolvedValue(mockedWeekWeatherConditions)
  })

  beforeEach(() => {
    sut = setupGetWeatherConditions(trailRepo, weatherDataApi)
  })

  it('should call LoadTrail with correct input', async () => {
    await sut({ name })

    expect(trailRepo.load).toHaveBeenCalledWith({ name })
    expect(trailRepo.load).toHaveBeenCalledTimes(1)
  })

  describe('when LoadTrail returns undefined', () => {
    it('should throw ServerError', async () => {
      trailRepo.load.mockResolvedValueOnce(undefined)

      const promise = sut({ name })

      await expect(promise).rejects.toThrow(new ServerError())
    })
  })

  describe('when LoadTrail returns data', () => {
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

      expect(weatherConditions).toBe(mockedWeekWeatherConditions)
    })
  })
})
