import { WeatherDataApi, DataFromAPI } from '@/infra/gateways'
import { HttpGetClient, HumanReadableDateFromUnix } from '@/domain/contracts/gateways'
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
  let commonWeatherConditions: Partial<DataFromAPI.WeekDayWeatherConditions>
  let httpClient: MockProxy<HttpGetClient>
  let dateConverter: MockProxy<HumanReadableDateFromUnix>
  let convertToDate: (unixFormat: number) => Date
  let setWeekDayDates: (unixDate: number) => void
  let sut: WeatherDataApi

  beforeAll(() => {
    latitude = -22.99757558338544
    longitude = -43.28349922207635
    appid = 'q1w2e3r4'
    commonWeatherConditions = {
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
    dateConverter = mock()

    convertToDate = (unixFormat: number) => new Date(unixFormat * 1000)
    setWeekDayDates = (unixDate: number) => dateConverter.convertFromUnix.mockReturnValue(convertToDate(unixDate))
  })

  beforeEach(() => {
    httpClient.get.mockResolvedValue({
      daily: [{
        ...commonWeatherConditions,
        dt: weekDaysDates.sunday
      },
      {
        ...commonWeatherConditions,
        dt: weekDaysDates.monday
      },
      {
        ...commonWeatherConditions,
        dt: weekDaysDates.tuesday
      },
      {
        ...commonWeatherConditions,
        dt: weekDaysDates.wednesday
      },
      {
        ...commonWeatherConditions,
        dt: weekDaysDates.thursday
      },
      {
        ...commonWeatherConditions,
        dt: weekDaysDates.friday
      },
      {
        ...commonWeatherConditions,
        dt: weekDaysDates.saturday
      }]
    })
    dateConverter.convertFromUnix.mockReturnValue(convertToDate(1735826400))
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
    setWeekDayDates(unixDate)

    const weekWeatherConditions = await sut.getWeekWeatherConditions({ latitude, longitude })

    expect(weekWeatherConditions[weekDay as keyof WeekWeatherConditionsData]).toEqual({
      time: convertToDate(unixDate),
      temperature: {
        day: 297.3,
        highest: 298.9,
        lowest: 293.4
      },
      humidity: 89,
      sunrise: convertToDate(unixDate),
      sunset: convertToDate(unixDate),
      summary: 'Expect a day of partly cloudy with clear spells'
    })
  })

  describe('when the service returns more than one forecast for the same week day', () => {
    it.each(weekDaysCases)('should consider the most close forecast for $weekDay', async ({ weekDay, unixDate }) => {
      const advancedTimeInOneWeek = unixDate + 604800
      httpClient.get.mockResolvedValueOnce({
        daily: [{
          ...commonWeatherConditions,
          dt: unixDate
        }, {
          ...commonWeatherConditions,
          dt: advancedTimeInOneWeek
        }]
      })
      setWeekDayDates(unixDate)
      dateConverter.convertFromUnix
        .calledWith(advancedTimeInOneWeek)
        .mockReturnValue(convertToDate(advancedTimeInOneWeek))

      const weekWeatherConditions = await sut.getWeekWeatherConditions({ latitude, longitude })

      expect(weekWeatherConditions[weekDay as keyof WeekWeatherConditionsData]).toEqual(
        expect.objectContaining({
          time: convertToDate(unixDate)
        })
      )
    })
  })
})
