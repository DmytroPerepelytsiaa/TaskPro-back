import { BaseEntity } from '@common/entities';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @Column({ length: 32 })
    name: string;

  @Column({ length: 256 })
    email: string;

  @Column()
    password: string;
}
