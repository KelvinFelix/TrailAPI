import { ISODateConverter } from '@/infra/gateways'

export const makeIsoDateConverter = (): ISODateConverter => new ISODateConverter()
