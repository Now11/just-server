import { Entity, Column, OneToMany, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { MinLength, IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Post } from './Post';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

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
	posts?: Post[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
