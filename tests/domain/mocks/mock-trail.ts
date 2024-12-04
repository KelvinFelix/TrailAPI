import { TrailKind, TrailData } from '@/domain/entities'

export const mockTrail = (): TrailData => ({
  id: 1,
  name: 'Pedra da Gávea',
  description: 'Pedra da Gávea is the largest monolithic block by the sea in the world',
  length: 10100,
  elevationGain: 365,
  averageTime: 11040,
  kind: TrailKind.LOOP
})
