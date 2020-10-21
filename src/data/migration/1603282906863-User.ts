import { MigrationInterface, QueryRunner } from 'typeorm';
import { users } from '../seed-data';

export class User1603282906863 implements MigrationInterface {
	name = 'User1603282906863';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying(100), "lastName" character varying(100), "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))',
		);

		await queryRunner.manager.save('User', users);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('DROP TABLE "user"');
	}
}
