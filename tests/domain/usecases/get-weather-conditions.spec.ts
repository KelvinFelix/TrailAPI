import { GetWeatherConditions, setupGetWeatherConditions } from '@/domain/use-cases'
import { LoadTrailGeographicLocation } from '@/domain/contracts/repos'
import { ServerError } from '@/domain/entities'

import { mockTrailGeographicLocation } from '@/tests/domain/mocks'

import { mock, MockProxy } from 'jest-mock-extended'

describe('GetWeatherConditions', () => {
  let name: string
  let trailGeographicLocationRepo: MockProxy<LoadTrailGeographicLocation>
  let sut: GetWeatherConditions

  beforeAll(() => {
    name = 'any_name'
    trailGeographicLocationRepo = mock()
    trailGeographicLocationRepo.load.mockResolvedValue(mockTrailGeographicLocation())
  })

  beforeEach(() => {
    sut = setupGetWeatherConditions(trailGeographicLocationRepo)
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
})
