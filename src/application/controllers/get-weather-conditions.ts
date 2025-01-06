import { Controller } from '@/application/controllers'
import { Validator } from '@/application/contracts'
import { HttpResponse, ok } from '@/application/helpers'
import { ValidationBuilder as Builder } from '@/application/validation'
import { WeekWeatherConditions } from '@/domain/entities'
import { GetWeatherConditions } from '@/domain/use-cases'

type HttpRequest = { name: string }

export class GetWeatherConditionsController extends Controller {
  constructor (private readonly getWeatherConditions: GetWeatherConditions) {
    super()
  }

  async perform ({ name }: HttpRequest): Promise<HttpResponse<WeekWeatherConditions>> {
    const accessToken = await this.getWeatherConditions({ name })
    return ok(accessToken)
  }

  override buildValidators ({ name }: HttpRequest): Validator[] {
    if (name === undefined) return []
    return [
      ...Builder.of({ value: name, fieldName: 'name' }).required().build()
    ]
  }
}
