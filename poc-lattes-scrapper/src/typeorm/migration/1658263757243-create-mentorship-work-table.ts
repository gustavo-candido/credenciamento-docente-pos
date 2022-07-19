import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class createMentorshipWorkTable1658263757243
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "mentorship_work",
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
            name: "is_concluded",
            type: "boolean",
          },
          {
            name: "role",
            type: "varchar",
          },
          {
            name: "year",
            type: "int",
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "degree",
            type: "varchar",
          },
          {
            name: "student_name",
            type: "varchar",
          },
          {
            name: "sponsor_code",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "sponsor_name",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "nmonths",
            type: "int",
            default: 0,
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
      "mentorship_work",
      new TableForeignKey({
        name: "professor_mentorship",
        columnNames: ["professor_id"],
        referencedTableName: "professor",
        referencedColumnNames: ["id"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("mentorship_work", "professor_mentorship");
    await queryRunner.dropTable("mentorship_work");
  }
}
