import { ConvertFromUnix, ConvertToISO9075Date, ConvertToISO9075Time } from '@/domain/contracts/gateways'
import { ISODate, ISOTime } from '@/domain/common-types'

import { fromUnixTime, formatISO9075 } from 'date-fns'

export class ISODateConverter implements ConvertFromUnix, ConvertToISO9075Date, ConvertToISO9075Time {
  convertFromUnixTime (unixTime: number): Date {
    return fromUnixTime(unixTime)
  }

  convertToISO9075Date (date: Date): ISODate {
    return formatISO9075(date, { representation: 'date' }) as ISODate
  }

  convertToISO9075Time (date: Date): ISOTime {
    return formatISO9075(date, { representation: 'time' }) as ISOTime
  }
}
