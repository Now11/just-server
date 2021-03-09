import {
	Entity,
	Column,
	ManyToOne,
	JoinColumn,
	CreateDateColumn,
	UpdateDateColumn,
	PrimaryGeneratedColumn,
	ManyToMany,
	JoinTable
} from 'typeorm';

import { MinLength, IsNotEmpty } from 'class-validator';
import { User } from './User';
import { Tag } from './Tag';

@Entity()
export class Post {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ length: 20, nullable: false })
	@MinLength(6)
	@IsNotEmpty()
	title: string;

	@Column({ length: 100, nullable: true })
	description: string;

	@Column({ nullable: false, type: 'boolean', default: 'false' })
	@IsNotEmpty()
	isPrivate: boolean;

	@ManyToOne(() => User, user => user.posts)
	@JoinColumn({ name: 'ownerId' })
	owner: User;

	@ManyToMany(() => Tag)
	@JoinTable({ name: 'post_tags' })
	tags: Tag[];

	@CreateDateColumn()
	createdAt?: Date;

	@UpdateDateColumn()
	updatedAt?: Date;
}
