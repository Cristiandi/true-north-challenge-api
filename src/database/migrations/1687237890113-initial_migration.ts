import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1687237890113 implements MigrationInterface {
  name = 'InitialMigration1687237890113';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "auth_uid" character varying NOT NULL, "email" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "uk_user_email" UNIQUE ("email"), CONSTRAINT "uk_user_auth_uid" UNIQUE ("auth_uid"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "operation" ("id" SERIAL NOT NULL, "uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "cost" integer NOT NULL, CONSTRAINT "uk_operation_type" UNIQUE ("type"), CONSTRAINT "uk_operation_uid" UNIQUE ("uid"), CONSTRAINT "PK_18556ee6e49c005fc108078f3ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "record" ("id" SERIAL NOT NULL, "uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_balance" integer NOT NULL, "operation_response" json NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer, "operation_id" integer, CONSTRAINT "uk_record_uid" UNIQUE ("uid"), CONSTRAINT "PK_5cb1f4d1aff275cf9001f4343b9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "record" ADD CONSTRAINT "FK_e28cccb0d33870ac1f81f7a727d" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "record" ADD CONSTRAINT "FK_dfb4a21d5021ce5c510d4855ed1" FOREIGN KEY ("operation_id") REFERENCES "operation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "record" DROP CONSTRAINT "FK_dfb4a21d5021ce5c510d4855ed1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "record" DROP CONSTRAINT "FK_e28cccb0d33870ac1f81f7a727d"`,
    );
    await queryRunner.query(`DROP TABLE "record"`);
    await queryRunner.query(`DROP TABLE "operation"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
