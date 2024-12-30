import { GetWeekWeatherConditions, HttpGetClient, HumanReadableDateFromUnix } from '@/domain/contracts/gateways'
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
    private readonly dateConverter: HumanReadableDateFromUnix,
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
          const day = this.dateConverter.convertFromUnix(weekDayWeatherCondition.dt)
          const weekdayName = weekDayResolver[day.getDay()]
          if (weekWeatherConditions[weekdayName as keyof WeekWeatherConditionsData] === undefined) {
            weekWeatherConditions[weekdayName as keyof WeekWeatherConditionsData] = {
              time: day,
              temperature: {
                day: weekDayWeatherCondition.temp.day,
                highest: weekDayWeatherCondition.temp.max,
                lowest: weekDayWeatherCondition.temp.min
              },
              humidity: weekDayWeatherCondition.humidity,
              sunrise: this.dateConverter.convertFromUnix(weekDayWeatherCondition.sunrise),
              sunset: this.dateConverter.convertFromUnix(weekDayWeatherCondition.sunset),
              summary: weekDayWeatherCondition.summary
            }
          }
          return weekWeatherConditions
        }, {})
    ))
  }
}
