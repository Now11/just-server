import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '../abstract/AbstractEntity';

@Entity()
export class User extends AbstractEntity {
	@Column({ length: 100, nullable: true })
	firstName: string;

	@Column({ length: 100, nullable: true })
	lastName: string;

	@Column({ unique: true, nullable: false })
	email: string;

	@Column({ nullable: false })
	password: string;
}
