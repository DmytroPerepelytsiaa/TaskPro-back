import { DashboardBackgrounds, DashboardIcons } from 'src/dashboards/models';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Dashboards1716484655977 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'dashboard_entity',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '120',
            isNullable: false,
          },
          {
            name: 'icon',
            type: 'enum',
            enum: Object.values(DashboardIcons),
            isNullable: false,
          },
          {
            name: 'background',
            type: 'enum',
            enum: Object.values(DashboardBackgrounds),
            isNullable: false
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()'
          }
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('dashboard_entity');
  }
}
