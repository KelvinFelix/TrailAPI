type Year = `${number}${number}${number}${number}`
type Month = `${number}${number}`
type Day = `${number}${number}`
export type ISODate = `${Year}-${Month}-${Day}`

type Hours = `${number}${number}`
type Minutes = `${number}${number}`
type Seconds = `${number}${number}`
export type ISOTime = `${Hours}:${Minutes}:${Seconds}`

type Temperature = {
  day: number
  highest: number
  lowest: number
}

export type WeatherConditionsData = {
  date: ISODate
  temperature: Temperature
  humidity: number
  sunrise: ISOTime
  sunset: ISOTime
  summary: string
}

export class WeatherConditions {
  date: ISODate
  temperature: Temperature
  humidity: number
  sunrise: ISOTime
  sunset: ISOTime
  summary: string

  constructor (weatherConditionsData: WeatherConditionsData) {
    this.date = weatherConditionsData.date
    this.temperature = weatherConditionsData.temperature
    this.humidity = weatherConditionsData.humidity
    this.sunrise = weatherConditionsData.sunrise
    this.sunset = weatherConditionsData.sunset
    this.summary = weatherConditionsData.summary
  }
}
