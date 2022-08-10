import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class createProjectTable1659155140643 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "project",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "professor_id",
            type: "uuid",
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "responsible_id",
            type: "varchar",
          },
          {
            name: "year_start",
            type: "int",
          },
          {
            name: "year_end",
            type: "int",
            isNullable: true,
          },
          {
            name: "has_sponsor",
            type: "boolean",
          },
          {
            name: "kind",
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

    await queryRunner.createForeignKey(
      "project",
      new TableForeignKey({
        name: "professor_project",
        columnNames: ["professor_id"],
        referencedTableName: "professor",
        referencedColumnNames: ["id"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("project", "professor_project");
    await queryRunner.dropTable("project");
  }
}
