import { TrailGeographicLocation } from '@/domain/entities'
import { mockTrailGeographicLocation } from '@/tests/domain/mocks'

describe('TrailGeographicLocation', () => {
  it('should have the proper specified data', () => {
    const mockedTrailGeographicLocation = mockTrailGeographicLocation()

    const sut = new TrailGeographicLocation(mockedTrailGeographicLocation)

    expect(sut).toEqual(mockedTrailGeographicLocation)
  })
})
