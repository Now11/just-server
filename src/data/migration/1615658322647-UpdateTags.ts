import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTags1615658322647 implements MigrationInterface {
	name = 'UpdateTags1615658322647';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`COMMENT ON COLUMN "post"."isPrivate" IS NULL`);
		await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "isPrivate" SET DEFAULT 'false'`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "isPrivate" SET DEFAULT false`);
		await queryRunner.query(`COMMENT ON COLUMN "post"."isPrivate" IS NULL`);
	}
}
