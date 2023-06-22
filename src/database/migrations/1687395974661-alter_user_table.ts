import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUserTable1687395974661 implements MigrationInterface {
  name = 'AlterUserTable1687395974661';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "balance" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "balance"`);
  }
}
