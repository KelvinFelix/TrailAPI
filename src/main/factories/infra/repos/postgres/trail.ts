import { TrailRepository } from '@/infra/repos/postgres'

export const makeTrailRepository = (): TrailRepository => new TrailRepository()
