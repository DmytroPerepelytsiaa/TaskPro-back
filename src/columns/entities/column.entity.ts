import { BaseEntity } from 'src/common/entities/base.entity';
import { DashboardEntity } from 'src/dashboards/entities/dashboard.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class ColumnEntity extends BaseEntity {
  @Column({ length: 72 })
    name: string;
  
  @ManyToOne(() => DashboardEntity, (dashboard) => dashboard.columns)
    dashboard: DashboardEntity;
}
