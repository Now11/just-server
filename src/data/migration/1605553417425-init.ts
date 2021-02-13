import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1605553417425 implements MigrationInterface {
	name = 'init1605553417425';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying(100), "lastName" character varying(100), "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))',
		);
		await queryRunner.query(
			'CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(20), "description" character varying(100), "isPrivate" boolean NOT NULL, "ownerId" uuid, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))',
		);
		await queryRunner.query(
			'ALTER TABLE "post" ADD CONSTRAINT "FK_4490d00e1925ca046a1f52ddf04" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query('ALTER TABLE "post" DROP CONSTRAINT "FK_4490d00e1925ca046a1f52ddf04"');
		await queryRunner.query('DROP TABLE "post"');
		await queryRunner.query('DROP TABLE "user"');
	}
}
