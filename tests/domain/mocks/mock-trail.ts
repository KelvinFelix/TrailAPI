import { TrailKind, Trail } from '@/domain/entities'

export const mockTrail = (): Trail => ({
  id: 1,
  name: 'Pedra da Gávea',
  areaName: 'Rio de Janeiro',
  description: 'Pedra da Gávea is the largest monolithic block by the sea in the world',
  latitude: -22.99708152654489,
  longitude: -43.28480818424458,
  length: 10100,
  elevationGain: 365,
  averageTime: 11040,
  kind: TrailKind.LOOP
})
