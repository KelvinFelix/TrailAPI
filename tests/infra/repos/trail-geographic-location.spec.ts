import { PgConnection } from '@/infra/repos/postgres/helpers'

import { ObjectLiteral, ObjectType, Repository } from 'typeorm'

abstract class PgRepository {
  constructor (private readonly connection: PgConnection = PgConnection.getInstance()) {}

  getRepository<Entity extends ObjectLiteral> (entity: ObjectType<Entity>): Repository<Entity> {
    return this.connection.getRepository(entity)
  }
}

class TrailGeographicLocationRepository extends PgRepository {}

describe('TrailGeographicLocationRepository', () => {
  it('should extend PgRepository', () => {
    const sut = new TrailGeographicLocationRepository()

    expect(sut).toBeInstanceOf(TrailGeographicLocationRepository)
  })
})
