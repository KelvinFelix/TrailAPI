/* eslint-disable @typescript-eslint/no-misused-promises */
import { PgTrail } from '@/infra/repos/postgres/entities'
import { PgConnection } from '@/infra/repos/postgres/helpers'
import { app } from '@/main/config/app'
import { env } from '@/main/config/env'
import { ForbiddenError } from '@/application/errors'
import { Trail, WeekWeatherConditions } from '@/domain/entities'
import { makeFakeDb } from '@/tests/infra/repos/postgres/mocks'
import { mockWeekWeatherConditions, mockTrail } from '@/tests/domain/mocks'

import { IBackup } from 'pg-mem'
import { getConnection, Repository } from 'typeorm'
import { sign } from 'jsonwebtoken'
import request from 'supertest'

describe('Weather Conditions Routes', () => {
  describe('GET /weather-conditions/week', () => {
    let backup: IBackup
    let connection: PgConnection
    let pgTrailRepo: Repository<PgTrail>
    let mockedWeekWeatherConditions: WeekWeatherConditions
    let mockedTrail: Trail
    let path: string
    const getWeekWeatherConditionsSpy = jest.fn()

    jest.mock('@/infra/gateways/weather-data-api', () => ({
      WeatherDataApi: jest.fn().mockReturnValue({ getWeekWeatherConditions: getWeekWeatherConditionsSpy })
    }))

    beforeAll(async () => {
      connection = PgConnection.getInstance()
      const db = await makeFakeDb([PgTrail])
      backup = db.backup()
      pgTrailRepo = connection.getRepository(PgTrail)
      mockedWeekWeatherConditions = mockWeekWeatherConditions()
      mockedTrail = mockTrail()
      path = `/api/weather-conditions/week/${mockedTrail.name}`
    })

    afterAll(async () => {
      await getConnection().close()
    })

    beforeEach(() => {
      backup.restore()
    })

    it('should return 200 with week weather conditions', async () => {
      getWeekWeatherConditionsSpy.mockResolvedValueOnce(mockedWeekWeatherConditions)
      const { id } = await pgTrailRepo.save(mockedTrail)
      const authorization = sign({ key: id }, env.jwtSecret)

      const { status, body } = await request(app)
        .get(path)
        .set({ authorization })

      expect(status).toBe(200)
      expect(body).toEqual(mockedWeekWeatherConditions)
    })

    describe('when authorization header is not present', () => {
      it('should return 403 with forbidden error', async () => {
        const { status, body } = await request(app)
          .get(path)
          .set({ authorization: '' })

        expect(status).toBe(403)
        expect(body.error).toBe(new ForbiddenError().message)
      })
    })
  })
})
