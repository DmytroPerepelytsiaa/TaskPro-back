import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { DashboardBackgrounds, DashboardIcons } from '../models';

@Entity()
export class DashboardEntity extends BaseEntity {
  @Column({ length: 120 })
    name: string;

  @Column({ type: 'enum', enum: DashboardIcons })
    icon: DashboardIcons;

  @Column({ type: 'enum', enum: DashboardBackgrounds })
    background: DashboardBackgrounds;
}
