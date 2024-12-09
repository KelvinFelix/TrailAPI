import { PgTrail } from '@/infra/repos/postgres/entities'

import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm'

@Entity({ name: 'trail' })
export class PgTrailGeographicLocation {
  @PrimaryGeneratedColumn()
  id!: number

  @OneToOne(() => PgTrail)
  @JoinColumn()
  trail!: number

  @Column({ type: 'varchar', length: 40 })
  areaName!: string

  @Column({ type: 'double precision' })
  latitude!: number

  @Column({ type: 'double precision' })
  longitude!: number
}
