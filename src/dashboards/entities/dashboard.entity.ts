import { ColumnEntity } from '@columns/entities';
import { BaseEntity } from '@common/entities';
import { DashboardBackgrounds, DashboardIcons } from '@dashboards/models';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class DashboardEntity extends BaseEntity {
  @Column({ length: 64 })
    name: string;

  @Column({ type: 'enum', enum: DashboardIcons })
    icon: DashboardIcons;

  @Column({ type: 'enum', enum: DashboardBackgrounds })
    background: DashboardBackgrounds;

  @Column({ length: 256 })
    ownerEmail: string;

  @OneToMany(() => ColumnEntity, (column) => column.dashboard, { eager: true })
    columns: ColumnEntity[];
}
