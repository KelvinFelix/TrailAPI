import { TrailRepository } from '@/infra/repos/postgres'
import { PgConnection } from '@/infra/repos/postgres/helpers'
import { PgTrail } from '@/infra/repos/postgres/entities'
import { makeFakeDb } from '@/tests/infra/repos/postgres/mocks'
import { Trail } from '@/domain/entities'
import { mockTrail } from '@/tests/domain/mocks'

import { IBackup } from 'pg-mem'
import { Repository } from 'typeorm'

describe('TrailRepository', () => {
  let sut: TrailRepository
  let connection: PgConnection
  let pgTrailRepo: Repository<PgTrail>
  let backup: IBackup
  let mockedTrail: Trail

  beforeAll(async () => {
    connection = PgConnection.getInstance()
    backup = await makeFakeDb([PgTrail]).then(db => db.backup())
    pgTrailRepo = connection.getRepository(PgTrail)
    mockedTrail = mockTrail()
  })

  afterAll(async () => {
    await connection.disconnect()
  })

  beforeEach(async () => {
    backup.restore()
    await pgTrailRepo.save(mockedTrail)
    sut = new TrailRepository()
  })

  it('should extend PgRepository', () => {
    const sut = new TrailRepository()

    expect(sut).toBeInstanceOf(TrailRepository)
  })

  describe('load', () => {
    describe('when an existing trail was requested', () => {
      it('should return a trail', async () => {
        const trailLocation = await sut.load({ name: mockedTrail.name })

        expect(trailLocation).toEqual(mockedTrail)
      })
    })

    describe('when a non existing trail was requested', () => {
      it('should return undefined', async () => {
        const trailLocation = await sut.load({ name: 'Paranapiacaba' })

        expect(trailLocation).toEqual(undefined)
      })
    })
  })
})
