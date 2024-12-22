import { GetWeekWeatherConditions, HttpGetClient, HumanReadableDateFromUnix } from '@/domain/contracts/gateways'

type WeatherConditionsFromAPI = {
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
    }).then(({ daily }) =>
      daily.map((weekdayWeatherCondition: WeatherConditionsFromAPI) => ({
        time: this.dateConverter.convertFromUnix(weekdayWeatherCondition.dt),
        temperature: {
          day: weekdayWeatherCondition.temp.day,
          highest: weekdayWeatherCondition.temp.max,
          lowest: weekdayWeatherCondition.temp.min
        },
        humidity: weekdayWeatherCondition.humidity,
        sunrise: this.dateConverter.convertFromUnix(weekdayWeatherCondition.sunrise),
        sunset: this.dateConverter.convertFromUnix(weekdayWeatherCondition.sunset),
        summary: weekdayWeatherCondition.summary
      }))).catch(() => undefined)
  }
}
