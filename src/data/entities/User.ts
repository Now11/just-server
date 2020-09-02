import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';

@Entity()
export class User extends AbstractEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  surname: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;
}
