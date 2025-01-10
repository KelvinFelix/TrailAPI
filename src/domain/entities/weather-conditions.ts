import { ISODate, ISOTime } from '@/domain/common-types'

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
