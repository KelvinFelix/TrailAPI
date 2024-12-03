import { Trail } from '@/domain/entities'
import { mockTrail } from '@/tests/domain/mocks'

describe('Trail', () => {
  it('should have the proper specified data', () => {
    const mockedTrail = mockTrail()

    const sut = new Trail(mockedTrail)

    expect(sut).toEqual(mockedTrail)
  })
})
