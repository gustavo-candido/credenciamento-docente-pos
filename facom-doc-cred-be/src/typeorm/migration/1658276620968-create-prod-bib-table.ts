import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class createProdBibTable1658276620968 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "prod_bib",
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
            name: "issn_or_sigla",
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
            name: "event_name",
            type: "varchar",
            isNullable: true,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "prod_bib",
      new TableForeignKey({
        name: "professor_prod_bib",
        columnNames: ["professor_id"],
        referencedTableName: "professor",
        referencedColumnNames: ["id"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("prod_bib", "professor_prod_bib");
    await queryRunner.dropTable("prod_bib");
  }
}
