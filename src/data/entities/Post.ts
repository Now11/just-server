import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { MinLength, IsNotEmpty } from 'class-validator';
import { AbstractEntity } from '../abstract/AbstractEntity';
import { User } from './User';

@Entity()
export class Post extends AbstractEntity {
	@Column({ length: 20, nullable: false })
	@MinLength(6)
	@IsNotEmpty()
	title: string;

	@Column({ length: 100, nullable: true })
	description: string;

	@Column({ nullable: false, type: 'boolean', default: 'false' })
	@IsNotEmpty()
	isPrivate: boolean;

	@ManyToOne(() => User, user => user.posts, { cascade: true })
	@JoinColumn({ name: 'owner_id' })
	ownerId: User;
}
