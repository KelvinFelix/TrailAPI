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
    }).then(({ daily }) => new WeekWeatherConditions(
      daily.reduce(
        (weekWeatherConditions: Partial<WeekWeatherConditionsData>, weekDayWeatherCondition: DataFromAPI.WeekDayWeatherConditions) => {
          const day = this.dateConverter.convertFromUnixTime(weekDayWeatherCondition.dt)
          const weekdayName = weekDayResolver[day.getDay()]
          if (weekWeatherConditions[weekdayName as keyof WeekWeatherConditionsData] === undefined) {
            const ISODateTimeSunrise = this.dateConverter.convertFromUnixTime(weekDayWeatherCondition.sunrise)
            const ISOTimeSunrise = this.dateConverter.convertToISO9075Time(ISODateTimeSunrise)
            const ISODateTimeSunset = this.dateConverter.convertFromUnixTime(weekDayWeatherCondition.sunset)
            const ISOTimeSunset = this.dateConverter.convertToISO9075Time(ISODateTimeSunset)

            weekWeatherConditions[weekdayName as keyof WeekWeatherConditionsData] = {
              date: this.dateConverter.convertToISO9075Date(day),
              temperature: {
                day: weekDayWeatherCondition.temp.day,
                highest: weekDayWeatherCondition.temp.max,
                lowest: weekDayWeatherCondition.temp.min
              },
              humidity: weekDayWeatherCondition.humidity,
              sunrise: ISOTimeSunrise,
              sunset: ISOTimeSunset,
              summary: weekDayWeatherCondition.summary
            }
          }
          return weekWeatherConditions
        }, {})
    ))
  }
}
