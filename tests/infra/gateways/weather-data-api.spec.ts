import { WeatherDataApi } from '@/infra/gateways'
import { HttpGetClient } from '@/domain/contracts/gateways'

import { mock, MockProxy } from 'jest-mock-extended'

describe('WeatherDataApi', () => {
  let latitude: number
  let longitude: number
  let appid: string
  let httpClient: MockProxy<HttpGetClient>
  let sut: WeatherDataApi

  beforeAll(() => {
    latitude = -22.99757558338544
    longitude = -43.28349922207635
    appid = 'q1w2e3r4'

    httpClient = mock()
  })

  beforeEach(() => {
    httpClient.get.mockResolvedValue({
      daily: [{
        dt: 1734637035,
        temp: {
          day: 297.3,
          min: 293.4,
          max: 298.9
        },
        humidity: 89,
        sunrise: 1734595444,
        sunset: 1734644210,
        summary: 'Expect a day of partly cloudy with clear spells'
      }]
    })
    sut = new WeatherDataApi(httpClient, appid)
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

  it('should return week weather conditions', async () => {
    const weekWeatherConditions = await sut.getWeekWeatherConditions({ latitude, longitude })

    expect(weekWeatherConditions).toEqual([{
      time: new Date(1734637035 * 1000),
      temperature: {
        day: 297.3,
        highest: 298.9,
        lowest: 293.4
      },
      humidity: 89,
      sunrise: new Date(1734595444 * 1000),
      sunset: new Date(1734644210 * 1000),
      summary: 'Expect a day of partly cloudy with clear spells'
    }])
  })

  it('should return undefined if HttpGetClient throws', async () => {
    httpClient.get.mockReset().mockRejectedValueOnce(new Error())

    const weekWeatherConditions = await sut.getWeekWeatherConditions({ latitude, longitude })

    expect(weekWeatherConditions).toBeUndefined()
  })
})
