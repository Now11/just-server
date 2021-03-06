import { Entity, Column, OneToMany } from 'typeorm';
import { MinLength, IsEmail, IsNotEmpty, Length } from 'class-validator';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { Post } from './Post';

@Entity()
export class User extends AbstractEntity {
	@Column({ length: 100, nullable: true })
	@IsNotEmpty()
	firstName: string;

	@Column({ length: 100, nullable: true })
	@IsNotEmpty()
	lastName: string;

	@Column({ unique: true, nullable: false })
	@Length(6, 100)
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@Column({ nullable: false })
	@MinLength(6)
	password: string;

	@OneToMany(() => Post, post => post.owner, { cascade: true })
	posts: Post[];
}
