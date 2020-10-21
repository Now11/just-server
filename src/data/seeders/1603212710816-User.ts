import { MigrationInterface, QueryRunner } from 'typeorm';
import { users } from '../seed-data';

export class User1603212710816 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager.save('User', users);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
