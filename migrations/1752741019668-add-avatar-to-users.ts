import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1752741019668 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE user_entity
      ADD COLUMN "avatarUrl" VARCHAR(256);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE user_entity
      DROP COLUMN "avatarUrl";
    `);
  }
}
