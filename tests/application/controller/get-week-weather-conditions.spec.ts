import { Controller, GetWeekWeatherConditionsController } from '@/application/controllers'
import { RequiredString } from '@/application/validation'
import { ServerError, WeekWeatherConditions } from '@/domain/entities'
import { mockWeekWeatherConditions } from '@/tests/domain/mocks'

describe('GetWeekWeatherConditionsController', () => {
  let sut: GetWeekWeatherConditionsController
  let getWeekWeatherConditions: jest.Mock
  let name: string
  let mockedWeekWeatherConditions: WeekWeatherConditions

  beforeAll(() => {
    name = 'Pedra da Gávea'
    mockedWeekWeatherConditions = mockWeekWeatherConditions()
    getWeekWeatherConditions = jest.fn()
    getWeekWeatherConditions.mockResolvedValue(mockedWeekWeatherConditions)
  })

  beforeEach(() => {
    sut = new GetWeekWeatherConditionsController(getWeekWeatherConditions)
  })

  it('should extend Controller', async () => {
    expect(sut).toBeInstanceOf(Controller)
  })

  it('should build Validators correctly', async () => {
    const validators = sut.buildValidators({ name })

    expect(validators).toEqual([
      new RequiredString(name, 'name')
    ])
  })

  it('should call GetWeekWeatherConditionsController with correct input', async () => {
    await sut.handle({ name })

    expect(getWeekWeatherConditions).toHaveBeenCalledWith({ name })
    expect(getWeekWeatherConditions).toHaveBeenCalledTimes(1)
  })

  it('should return 500 on infra error', async () => {
    const error = new Error('infra_error')
    getWeekWeatherConditions.mockRejectedValueOnce(error)

    const httpResponse = await sut.handle({ name })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })

  it('should return 200 if the search succeeds', async () => {
    const httpResponse = await sut.handle({ name })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        ...mockedWeekWeatherConditions
      }
    })
  })
})
