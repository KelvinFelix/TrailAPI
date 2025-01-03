import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
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
}
