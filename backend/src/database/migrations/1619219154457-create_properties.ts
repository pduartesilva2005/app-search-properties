import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createProperties1619219154457 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'properties',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: "image",
          type: 'varchar'
        },
        {
          name: 'type_property',
          type: 'varchar'
        },
        {
          name: 'city',
          type: 'varchar'
        },
        {
          name: 'state',
          type: 'varchar'
        },
        {
          name: 'neighborhood',
          type: 'varchar'
        },
        {
          name: 'price',
          type: 'integer'
        },
        {
          name: 'dependencies',
          type: 'varchar'
        },
      ]
    }));
  }
  
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('properties');
  }
}