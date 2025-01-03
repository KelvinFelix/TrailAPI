import { WeatherDataApi, DataFromAPI, ISODateConverter } from '@/infra/gateways'
import { HttpGetClient, ConvertFromUnix, ConvertToISO9075Date, ConvertToISO9075Time } from '@/domain/contracts/gateways'
import { WeekWeatherConditionsData } from '@/domain/entities'

import { mock, MockProxy } from 'jest-mock-extended'

const weekDaysDates = {
  sunday: 1735480800,
  monday: 1735567200,
  tuesday: 1735653600,
  wednesday: 1735740000,
  thursday: 1735826400,
  friday: 1735308000,
  saturday: 1735394400
}

const weekDaysCases = Object.entries(weekDaysDates)
  .map(([weekDay, unixDate]) => ({ weekDay, unixDate: Number(unixDate) }))

describe('WeatherDataApi', () => {
  let latitude: number
  let longitude: number
  let appid: string
  let commonWeatherConditions: DataFromAPI.WeekDayWeatherConditions
  let httpClient: MockProxy<HttpGetClient>
  let dateConverter: ConvertFromUnix & ConvertToISO9075Date & ConvertToISO9075Time
  let setHttpGetResponse: (data: { daily: DataFromAPI.WeekDayWeatherConditions[] }) => void
  let convertToDate: (unixFormat: number) => Date
  let sut: WeatherDataApi

  beforeAll(() => {
    latitude = -22.99757558338544
    longitude = -43.28349922207635
    appid = 'q1w2e3r4'
    commonWeatherConditions = {
      dt: weekDaysDates.sunday,
      temp: {
        day: 297.3,
        min: 293.4,
        max: 298.9
      },
      humidity: 89,
      sunrise: 1734595444,
      sunset: 1734644210,
      summary: 'Expect a day of partly cloudy with clear spells'
    }

    httpClient = mock()
    dateConverter = new ISODateConverter()
    setHttpGetResponse = (data) => httpClient.get.mockResolvedValue(data)
    convertToDate = (unixFormat) => dateConverter.convertFromUnixTime(unixFormat)
  })

  beforeEach(() => {
    setHttpGetResponse({
      daily: [{
        ...commonWeatherConditions,
        dt: weekDaysDates.sunday
      }]
    })
    sut = new WeatherDataApi(httpClient, dateConverter, appid)
  })

  it('should call get to weather conditions api with the corrects params', async () => {
    await sut.getWeekWeatherConditions({ latitude, longitude })

    expect(httpClient.get).toHaveBeenCalledWith({
      url: 'https://api.openweathermap.org/data/3.0/onecall',
      params: {
        lat: latitude,
        lon: longitude,
        exclude: 'hourly,minutely',
        appid: appid
      }
    })
  })

  it.each(weekDaysCases)('should return weather conditions for $weekDay', async ({ weekDay, unixDate }) => {
    setHttpGetResponse({
      daily: [{
        ...commonWeatherConditions,
        sunrise: unixDate,
        sunset: unixDate,
        dt: unixDate
      }]
    })

    const weekWeatherConditions = await sut.getWeekWeatherConditions({ latitude, longitude })

    expect(weekWeatherConditions[weekDay as keyof WeekWeatherConditionsData]).toEqual({
      date: dateConverter.convertToISO9075Date(convertToDate(unixDate)),
      temperature: {
        day: 297.3,
        highest: 298.9,
        lowest: 293.4
      },
      humidity: 89,
      sunrise: dateConverter.convertToISO9075Time(convertToDate(unixDate)),
      sunset: dateConverter.convertToISO9075Time(convertToDate(unixDate)),
      summary: 'Expect a day of partly cloudy with clear spells'
    })
  })

  describe('when the service returns more than one forecast for the same week day', () => {
    it.each(weekDaysCases)('should consider the most close forecast for $weekDay', async ({ weekDay, unixDate }) => {
      setHttpGetResponse({
        daily: [{
          ...commonWeatherConditions,
          dt: unixDate
        }, {
          ...commonWeatherConditions,
          dt: unixDate + 604800
        }]
      })

      const weekWeatherConditions = await sut.getWeekWeatherConditions({ latitude, longitude })

      expect(weekWeatherConditions[weekDay as keyof WeekWeatherConditionsData]).toEqual(
        expect.objectContaining({
          date: dateConverter.convertToISO9075Date(convertToDate(unixDate))
        })
      )
    })
  })
})
