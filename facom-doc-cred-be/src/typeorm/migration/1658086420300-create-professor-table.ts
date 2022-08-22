import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createProfessorTable1658086420300 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "professor",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "lattes_id",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "name",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "birth_date",
            type: "date",
            isNullable: true,
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
    await queryRunner.dropTable("professor");
  }
}
