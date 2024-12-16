import { HttpGetClient } from '@/domain/contracts/gateways'

import axios from 'axios'

export class AxiosHttpClient implements HttpGetClient {
  async get ({ url, params }: HttpGetClient.Input): Promise<any> {
    const result = await axios.get(url, { params })
    return result.data
  }
}
