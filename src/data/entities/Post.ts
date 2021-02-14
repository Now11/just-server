import { Entity, Column } from 'typeorm';
import { MinLength, IsNotEmpty } from 'class-validator';
import { AbstractEntity } from '../abstract/AbstractEntity';
// import { User } from './User';

@Entity()
export class Post extends AbstractEntity {
	@Column({ length: 20, nullable: true })
	@MinLength(2)
	@IsNotEmpty()
	title: string;

	@Column({ length: 100, nullable: true })
	description: string;

	@Column({ nullable: false, type: 'boolean' })
	@IsNotEmpty()
	isPrivate: boolean;

	// @ManyToOne(() => User, (user) => user.posts)
	// @JoinColumn({ name: 'ownerId' })
	// owner: User;
}
