import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class createProdTecTable1658280857689 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "prod_tec",
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
            name: "prod_tec_kind_id",
            type: "uuid",
          },
          {
            name: "year",
            type: "int",
          },
          {
            name: "description",
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
      "prod_tec",
      new TableForeignKey({
        name: "professor_prod_tec",
        columnNames: ["professor_id"],
        referencedTableName: "professor",
        referencedColumnNames: ["id"],
      })
    );

    await queryRunner.createForeignKey(
      "prod_tec",
      new TableForeignKey({
        name: "fk_prod_tec_id",
        columnNames: ["prod_tec_kind_id"],
        referencedTableName: "prod_tec_kind",
        referencedColumnNames: ["id"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("prod_tec", "professor_prod_tec");
    await queryRunner.dropForeignKey("prod_tec", "fk_prod_tec_id");
    await queryRunner.dropTable("prod_tec");
  }
}
