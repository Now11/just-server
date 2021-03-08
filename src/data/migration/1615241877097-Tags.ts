import { MigrationInterface, QueryRunner } from 'typeorm';

export class Tags1615241877097 implements MigrationInterface {
	name = 'Tags1615241877097';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_b15e7d39aa644053a0321fc9e7c"`);
		await queryRunner.query(
			`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "title" character varying(20) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`
		);
		await queryRunner.query(
			`CREATE TABLE "post_tags" ("postId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_ba869415ada9d211d8af980499f" PRIMARY KEY ("postId", "tagId"))`
		);
		await queryRunner.query(`CREATE INDEX "IDX_76e701b89d9bba541e1543adfa" ON "post_tags" ("postId") `);
		await queryRunner.query(`CREATE INDEX "IDX_86fabcae8483f7cc4fbd36cf6a" ON "post_tags" ("tagId") `);
		await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "owner_id"`);
		await queryRunner.query(`ALTER TABLE "post" ADD "ownerId" uuid`);
		await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee"`);
		await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "id"`);
		await queryRunner.query(`ALTER TABLE "post" ADD "id" SERIAL NOT NULL`);
		await queryRunner.query(
			`ALTER TABLE "post" ADD CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id")`
		);
		await queryRunner.query(`COMMENT ON COLUMN "post"."isPrivate" IS NULL`);
		await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "isPrivate" SET DEFAULT 'false'`);
		await queryRunner.query(
			`ALTER TABLE "post" ADD CONSTRAINT "FK_4490d00e1925ca046a1f52ddf04" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "post_tags" ADD CONSTRAINT "FK_76e701b89d9bba541e1543adfac" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "post_tags" ADD CONSTRAINT "FK_86fabcae8483f7cc4fbd36cf6a2" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "post_tags" DROP CONSTRAINT "FK_86fabcae8483f7cc4fbd36cf6a2"`);
		await queryRunner.query(`ALTER TABLE "post_tags" DROP CONSTRAINT "FK_76e701b89d9bba541e1543adfac"`);
		await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_4490d00e1925ca046a1f52ddf04"`);
		await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "isPrivate" SET DEFAULT false`);
		await queryRunner.query(`COMMENT ON COLUMN "post"."isPrivate" IS NULL`);
		await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee"`);
		await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "id"`);
		await queryRunner.query(`ALTER TABLE "post" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
		await queryRunner.query(
			`ALTER TABLE "post" ADD CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id")`
		);
		await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "ownerId"`);
		await queryRunner.query(`ALTER TABLE "post" ADD "owner_id" uuid`);
		await queryRunner.query(`DROP INDEX "IDX_86fabcae8483f7cc4fbd36cf6a"`);
		await queryRunner.query(`DROP INDEX "IDX_76e701b89d9bba541e1543adfa"`);
		await queryRunner.query(`DROP TABLE "post_tags"`);
		await queryRunner.query(`DROP TABLE "tag"`);
		await queryRunner.query(
			`ALTER TABLE "post" ADD CONSTRAINT "FK_b15e7d39aa644053a0321fc9e7c" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}
}
