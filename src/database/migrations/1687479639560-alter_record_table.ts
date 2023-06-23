import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterRecordTable1687479639560 implements MigrationInterface {
  name = 'AlterRecordTable1687479639560';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "record" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "record" DROP COLUMN "deleted_at"`);
  }
}
