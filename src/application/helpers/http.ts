import { ServerError } from '@/domain/entities'

export type HttpResponse<T = any> = {
  statusCode: number
  data: T
}

export const serverError = (error: unknown): HttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error instanceof Error ? error : undefined)
})
