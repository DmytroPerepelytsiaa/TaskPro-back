import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Columns1720901678589 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'column_entity',
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
            length: '72',
          },
          {
            name: 'dashboardId',
            type: 'int',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      'column_entity',
      new TableForeignKey({
        columnNames: ['dashboardId'],
        referencedTableName: 'dashboard_entity',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('column_entity');
    const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('dashboardId') !== -1);
    await queryRunner.dropForeignKey('column_entity', foreignKey);
    await queryRunner.dropTable('column_entity');
  }
}
