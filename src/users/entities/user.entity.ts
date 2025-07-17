import { BaseEntity } from '@common/entities';
import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @Column({ length: 32 })
    name: string;

  @Column({ length: 256 })
    email: string;

  @Exclude()
  @Column()
    password: string;

  @Column({ nullable: true, length: 256 })
    avatarUrl: string;  
}
