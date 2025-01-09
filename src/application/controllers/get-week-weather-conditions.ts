import { Controller } from '@/application/controllers'
import { Validator } from '@/application/contracts'
import { HttpResponse, ok } from '@/application/helpers'
import { ValidationBuilder as Builder } from '@/application/validation'
import { WeekWeatherConditions } from '@/domain/entities'
import { GetWeekWeatherConditions } from '@/domain/use-cases'

type HttpRequest = { name: string }

export class GetWeekWeatherConditionsController extends Controller {
  constructor (private readonly getWeekWeatherConditions: GetWeekWeatherConditions) {
    super()
  }

  async perform ({ name }: HttpRequest): Promise<HttpResponse<WeekWeatherConditions>> {
    const accessToken = await this.getWeekWeatherConditions({ name })
    return ok(accessToken)
  }

  override buildValidators ({ name }: HttpRequest): Validator[] {
    if (name === undefined) return []
    return [
      ...Builder.of({ value: name, fieldName: 'name' }).required().build()
    ]
  }
}
