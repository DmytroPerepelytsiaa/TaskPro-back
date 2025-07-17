import { MigrationInterface, QueryRunner } from 'typeorm';

export class Dashboards1718558531401 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE dashboard_entity
      ADD COLUMN "ownerEmail" VARCHAR(256) NOT NULL DEFAULT 'admin@gmail.com';    
    `);

    await queryRunner.query(`
      UPDATE dashboard_entity
      SET "ownerEmail" = 'admin@gmail.com'
      WHERE "ownerEmail" IS NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE dashboard_entity
      DROP COLUMN "ownerEmail";
    `);
  }
}
