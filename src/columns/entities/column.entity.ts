import { CardEntity } from '@cards/entities';
import { BaseEntity } from '@common/entities';
import { DashboardEntity } from '@dashboards/entities';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class ColumnEntity extends BaseEntity {
  @Column({ length: 64 })
    name: string;
  
  @ManyToOne(() => DashboardEntity, (dashboard) => dashboard.columns)
    dashboard: DashboardEntity;

  @OneToMany(() => CardEntity, (card) => card.column, { eager: true })
    cards: CardEntity[];
}
