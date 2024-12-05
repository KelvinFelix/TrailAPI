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
    trailGeographicLocationRepo.loadTrailGeographicLocation.mockResolvedValue(mockTrailGeographicLocation())
  })

  beforeEach(() => {
    sut = setupGetWeatherConditions(trailGeographicLocationRepo)
  })

  it('should call LoadTrailGeographicLocation with correct input', async () => {
    await sut({ name })

    expect(trailGeographicLocationRepo.loadTrailGeographicLocation).toHaveBeenCalledWith({ name })
    expect(trailGeographicLocationRepo.loadTrailGeographicLocation).toHaveBeenCalledTimes(1)
  })

  describe('when LoadTrailGeographicLocation returns undefined', () => {
    it('should throw ServerError', async () => {
      trailGeographicLocationRepo.loadTrailGeographicLocation.mockResolvedValueOnce(undefined)

      const promise = sut({ name })

      await expect(promise).rejects.toThrow(new ServerError())
    })
  })
})
