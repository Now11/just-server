import { Entity, Column } from 'typeorm';
import { MinLength, IsEmail, IsNotEmpty, Length } from 'class-validator';
import { AbstractEntity } from '../abstract/AbstractEntity';

@Entity()
export class User extends AbstractEntity {
	@Column({ length: 100, nullable: true })
	@IsNotEmpty()
	firstName: string;

	@Column({ length: 100, nullable: true })
	@IsNotEmpty()
	lastName: string;

	@Column({ unique: true, nullable: false })
	@Length(6, 30)
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@Column({ nullable: false })
	@MinLength(6)
	password: string;

	constructor(data?: Partial<User>) {
		super();
		if (data) {
			const { email, password, firstName, lastName } = data;
			this.email = email;
			this.password = password;
			this.firstName = firstName;
			this.lastName = lastName;
		}
	}
}
