import { ISODate, ISOTime } from '@/domain/entities'

export interface ConvertFromUnix {
  convertFromUnixTime: (unixTime: number) => Date
}

export interface ConvertToISO9075Date {
  convertToISO9075Date: (date: Date) => ISODate
}

export interface ConvertToISO9075Time {
  convertToISO9075Time: (date: Date) => ISOTime
}
