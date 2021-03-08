import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

import { IsNotEmpty } from 'class-validator';

@Entity()
export class Tag {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ length: 20, nullable: false })
	@IsNotEmpty()
	title!: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
