type Temperature = {
  day: number
  highest: number
  lowest: number
}

export type WeatherConditionsData = {
  id?: number
  time: Date
  temperature: Temperature
  humidity: number
  sunrise: Date
  sunset: Date
  summary: string
}

export class WeatherConditions {
  id?: number
  time: Date
  temperature: Temperature
  humidity: number
  sunrise: Date
  sunset: Date
  summary: string

  constructor (weatherConditionsData: WeatherConditionsData) {
    this.id = weatherConditionsData.id
    this.time = weatherConditionsData.time
    this.temperature = weatherConditionsData.temperature
    this.humidity = weatherConditionsData.humidity
    this.sunrise = weatherConditionsData.sunrise
    this.sunset = weatherConditionsData.sunset
    this.summary = weatherConditionsData.summary
  }
}
