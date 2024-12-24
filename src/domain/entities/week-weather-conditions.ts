import { WeatherConditions } from './weather-conditions'

export type WeekWeatherConditionsData = {
  sunday: WeatherConditions
  monday: WeatherConditions
  tuesday: WeatherConditions
  wednesday: WeatherConditions
  thursday: WeatherConditions
  friday: WeatherConditions
  saturday: WeatherConditions
}

export class WeekWeatherConditions {
  sunday: WeatherConditions
  monday: WeatherConditions
  tuesday: WeatherConditions
  wednesday: WeatherConditions
  thursday: WeatherConditions
  friday: WeatherConditions
  saturday: WeatherConditions

  constructor (weekWeatherConditionsData: WeekWeatherConditionsData) {
    this.sunday = weekWeatherConditionsData.sunday
    this.monday = weekWeatherConditionsData.monday
    this.tuesday = weekWeatherConditionsData.tuesday
    this.wednesday = weekWeatherConditionsData.wednesday
    this.thursday = weekWeatherConditionsData.thursday
    this.friday = weekWeatherConditionsData.friday
    this.saturday = weekWeatherConditionsData.saturday
  }
}
