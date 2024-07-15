import { CardPriority } from '@cards/models';
import { ColumnEntity } from '@columns/entities';
import { BaseEntity } from '@common/entities';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class CardEntity extends BaseEntity {
  @Column({ length: 64 })
    name: string;

  @Column({ length: 180 })
    description: string;
  
  @Column({ type: 'enum', enum: CardPriority })
    priority: CardPriority;

  @Column({ type: 'date' , nullable: true, default: null })
    deadline: null | Date;

  @ManyToOne(() => ColumnEntity, (column) => column.cards)
    column: ColumnEntity;
}
