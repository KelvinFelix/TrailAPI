import { TrailKind, TrailData } from '@/domain/entities'

export const mockTrail = (): TrailData => ({
  id: 1,
  description: 'Discover an incredible signposted trail',
  length: 10100,
  elevationGain: 365,
  averageTime: 11040,
  kind: TrailKind.LOOP
})
