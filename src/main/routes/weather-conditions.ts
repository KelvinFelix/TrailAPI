import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeGetWeatherConditionsController } from '@/main/factories/application/controllers'
import { auth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.get('/weather-conditions/week/:name', auth, adapt(makeGetWeatherConditionsController()))
}
