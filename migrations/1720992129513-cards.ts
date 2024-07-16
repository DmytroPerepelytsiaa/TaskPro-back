import { CardPriority } from '@cards/models';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Cards1720992129513 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'card_entity',
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
            length: '64',
          },
          {
            name: 'description',
            type: 'varchar',
            length: '180',
            isNullable: true,
            default: null,
          },
          {
            name: 'priority',
            type: 'enum',
            enum: Object.values(CardPriority),
          },
          {
            name: 'deadline',
            type: 'date',
            isNullable: true,
            default: null,
          },
          {
            name: 'columnId',
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
      'card_entity',
      new TableForeignKey({
        columnNames: ['columnId'],
        referencedTableName: 'column_entity',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('card_entity');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('columnId') !== -1
    );
    await queryRunner.dropForeignKey('card_entity', foreignKey);
    await queryRunner.dropTable('card_entity');
  }
}
