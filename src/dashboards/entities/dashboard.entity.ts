import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ColumnEntity } from 'src/columns/entities/column.entity';
import { DashboardBackgrounds, DashboardIcons } from '../models';

@Entity()
export class DashboardEntity extends BaseEntity {
  @Column({ length: 120 })
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
