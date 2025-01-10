type Year = `${number}${number}${number}${number}`
type Month = `${number}${number}`
type Day = `${number}${number}`
export type ISODate = `${Year}-${Month}-${Day}`

type Hours = `${number}${number}`
type Minutes = `${number}${number}`
type Seconds = `${number}${number}`
export type ISOTime = `${Hours}:${Minutes}:${Seconds}`
