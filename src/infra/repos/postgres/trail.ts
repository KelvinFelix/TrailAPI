import { PgRepository } from '@/infra/repos/postgres/repository'
import { PgTrail } from '@/infra/repos/postgres/entities'
import { LoadTrail } from '@/domain/contracts/repos'
import { Trail } from '@/domain/entities'

export class TrailRepository extends PgRepository implements LoadTrail {
  async load ({ name }: LoadTrail.Input): Promise<Trail | undefined> {
    const pgTrailGeographicLocationRepo = this.getRepository(PgTrail)
    return await pgTrailGeographicLocationRepo.findOne({ name })
  }
}
