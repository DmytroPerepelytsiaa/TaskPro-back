import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class UserEntity extends BaseEntity {
  @Column({ length: 36 })
    name: string;

  @Column({ length: 256 })
    email: string;

  @Column()
    password: string;
}
