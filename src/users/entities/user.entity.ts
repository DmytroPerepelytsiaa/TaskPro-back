import { Column } from 'typeorm';

export class User {
  @Column({ length: 36 })
    name: string;

  @Column({ length: 256 })
    email: string;

  @Column()
    password: string;
}
