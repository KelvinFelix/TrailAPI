import { setupGetWeatherConditions } from '@/domain//use-cases'
import { LoadTrailGeographicLocation } from '@/domain/contracts/repos'

import { mockTrailGeographicLocation, mockTrail } from '@/tests/domain/mocks'

import { mock, MockProxy } from 'jest-mock-extended'

describe('GetWeatherConditions', () => {
  it('should call LoadTrailGeographicLocation with correct input', async () => {
    const trailGeographicLocationRepo: MockProxy<LoadTrailGeographicLocation> = mock()
    trailGeographicLocationRepo.loadTrailGeographicLocation.mockResolvedValue(mockTrailGeographicLocation())
    const { name } = mockTrail()

    const sut = setupGetWeatherConditions(trailGeographicLocationRepo)
    await sut({ name })

    expect(trailGeographicLocationRepo.loadTrailGeographicLocation).toHaveBeenCalledWith({ name })
    expect(trailGeographicLocationRepo.loadTrailGeographicLocation).toHaveBeenCalledTimes(1)
  })
})
