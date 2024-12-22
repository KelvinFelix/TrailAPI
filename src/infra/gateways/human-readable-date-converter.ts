import { HumanReadableDateFromUnix } from '@/domain/contracts/gateways'

export class HumanReadableDateConverter implements HumanReadableDateFromUnix {
  convertFromUnix (unixTime: number): Date {
    return new Date(unixTime * 1000)
  }
}
