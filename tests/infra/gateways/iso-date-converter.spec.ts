import { ISODateConverter } from '@/infra/gateways'

describe('ISODateConverter', () => {
  it('should convert unix time to human readable date', () => {
    const dateConverter = new ISODateConverter()

    const humanReadableDate = dateConverter.convertFromUnixTime(1734637035)

    expect(humanReadableDate.toISOString()).toBe('2024-12-19T19:37:15.000Z')
  })

  it('should convert date to ISO 9075 date', () => {
    const dateConverter = new ISODateConverter()

    const humanReadableDate = dateConverter.convertToISO9075Date(new Date('2024-12-19T19:37:15.000Z'))

    expect(humanReadableDate).toBe('2024-12-19')
  })

  it('should convert date to ISO 9075 time', () => {
    const dateConverter = new ISODateConverter()

    const humanReadableDate = dateConverter.convertToISO9075Time(new Date('2024-12-19T19:37:15.000Z'))

    expect(humanReadableDate).toBe('19:37:15')
  })
})
