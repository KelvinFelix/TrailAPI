import { Trail } from '@/domain/entities'

export interface LoadTrail {
  load: (input: LoadTrail.Input) => Promise<LoadTrail.Output>
}

export namespace LoadTrail {
  export type Input = { name: string }
  export type Output = undefined | Trail
}
