import { env } from '@/main/config/env'
import { JwtTokenHandler } from '@/infra/gateways'

export const makeJwtTokenHandler = (): JwtTokenHandler => new JwtTokenHandler(env.jwtSecret)
