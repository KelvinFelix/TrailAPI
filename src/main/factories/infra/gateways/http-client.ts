import { AxiosHttpClient } from '@/infra/gateways'

export const makeAxiosHttpClient = (): AxiosHttpClient => new AxiosHttpClient()
