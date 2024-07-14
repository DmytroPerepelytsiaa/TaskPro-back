import { BaseEntity } from '@common/entities';
import { DashboardEntity } from '@dashboards/entities';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class ColumnEntity extends BaseEntity {
  @Column({ length: 72 })
    name: string;
  
  @ManyToOne(() => DashboardEntity, (dashboard) => dashboard.columns)
    dashboard: DashboardEntity;
}
