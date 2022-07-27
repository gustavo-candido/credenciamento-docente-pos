import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createQualisPerTable1657600858196 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "qualis_per",
        columns: [
          {
            name: "issn",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "qualis",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("qualis_per");
  }
}
