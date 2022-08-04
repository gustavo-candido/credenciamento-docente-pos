import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class updateProfessorTable1659574445593 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("professor", [
      new TableColumn({
        name: "user_id",
        type: "uuid",
        isNullable: true,
      }),
    ]);

    await queryRunner.createForeignKey(
      "professor",
      new TableForeignKey({
        name: "professor_user",
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "user",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("professor", "professor_user");
    await queryRunner.dropColumns("professor", ["user_id"]);
  }
}
