import { GetWeekWeatherConditions, HttpGetClient, ConvertFromUnix, ConvertToISO9075Date, ConvertToISO9075Time } from '@/domain/contracts/gateways'
import { WeekWeatherConditions, WeekWeatherConditionsData } from '@/domain/entities'

export namespace DataFromAPI {
  export type WeekDayWeatherConditions = {
    dt: number
    temp: {
      day: number
      min: number
      max: number
    }
    humidity: number
    sunrise: number
    sunset: number
    summary: string
  }
}

type GetWeekWeatherData = (
  weekWeatherConditions: WeekWeatherConditionsData,
  weekDayWeatherCondition: DataFromAPI.WeekDayWeatherConditions
) => WeekWeatherConditionsData

const weekDayResolver = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
]

export class WeatherDataApi implements GetWeekWeatherConditions {
  private readonly baseUrl = 'https://api.openweathermap.org/data/3.0/onecall'

  constructor (
    private readonly httpClient: HttpGetClient,
    private readonly dateConverter: ConvertFromUnix & ConvertToISO9075Date & ConvertToISO9075Time,
    private readonly appid: string
  ) {}

  async getWeekWeatherConditions (input: GetWeekWeatherConditions.Input): Promise<GetWeekWeatherConditions.Output> {
    return this.httpClient.get({
      url: this.baseUrl,
      params: {
        lat: input.latitude,
        lon: input.longitude,
        exclude: 'hourly,minutely',
        appid: this.appid
      }
    }).then(({ daily }) => {
      const getWeekWeatherDataCB: GetWeekWeatherData = (weekWeatherConditions, weekDayWeatherCondition) => {
        const day = this.dateConverter.convertFromUnixTime(weekDayWeatherCondition.dt)
        const weekdayName = weekDayResolver[day.getDay()]
        const index = weekdayName as keyof WeekWeatherConditionsData
        if (weekWeatherConditions[index] === undefined) {
          const date = this.dateConverter.convertToISO9075Date(day)
          const ISODateTimeSunrise = this.dateConverter.convertFromUnixTime(weekDayWeatherCondition.sunrise)
          const ISOTimeSunrise = this.dateConverter.convertToISO9075Time(ISODateTimeSunrise)
          const ISODateTimeSunset = this.dateConverter.convertFromUnixTime(weekDayWeatherCondition.sunset)
          const ISOTimeSunset = this.dateConverter.convertToISO9075Time(ISODateTimeSunset)
          const temperature = {
            day: weekDayWeatherCondition.temp.day,
            highest: weekDayWeatherCondition.temp.max,
            lowest: weekDayWeatherCondition.temp.min
          }
          weekWeatherConditions[index] = {
            date,
            temperature,
            humidity: weekDayWeatherCondition.humidity,
            sunrise: ISOTimeSunrise,
            sunset: ISOTimeSunset,
            summary: weekDayWeatherCondition.summary
          }
        }
        return weekWeatherConditions
      }
      const weekWeatherData = daily.reduce(getWeekWeatherDataCB, {})
      return new WeekWeatherConditions(weekWeatherData)
    })
  }
}
