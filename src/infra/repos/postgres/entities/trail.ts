import { TrailKind } from '@/domain/entities'

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'trail' })
export class PgTrail {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', length: 50 })
  name!: string

  @Column({ type: 'varchar', length: 40 })
  areaName!: string

  @Column({ type: 'varchar', length: 200 })
  description!: string

  @Column({ type: 'double precision' })
  latitude!: number

  @Column({ type: 'double precision' })
  longitude!: number

  @Column({ type: 'real' })
  length!: number

  @Column({ name: 'elevation_gain', type: 'smallint' })
  elevationGain!: number

  @Column({ name: 'average_time', type: 'integer' })
  averageTime!: number

  @Column({
    type: "enum",
    enum: TrailKind,
    default: TrailKind.LOOP
    })
  kind!: TrailKind
}
