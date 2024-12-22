import { HumanReadableDateConverter } from '@/infra/gateways'

describe('HumanReadableDateConverter', () => {
  it('should convert unix time to human readable date', () => {
    const dateConverter = new HumanReadableDateConverter()

    const humanReadableDate = dateConverter.convertFromUnix(1734637035)

    expect(humanReadableDate.toISOString()).toBe('2024-12-19T19:37:15.000Z')
  })
})
