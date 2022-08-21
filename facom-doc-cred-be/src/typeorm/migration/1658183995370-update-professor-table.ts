import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class updateProfessorTable1658183995370 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("professor", [
      new TableColumn({
        name: "research_topic_id",
        type: "uuid",
        isNullable: true,
      }),
      new TableColumn({ name: "placement", type: "varchar", isNullable: true }),
      new TableColumn({
        name: "ppgco_weekly_workload",
        type: "int",
        default: 0,
      }),
      new TableColumn({
        name: "other_ppg_weekly_workload",
        type: "int",
        default: 0,
      }),
      new TableColumn({
        name: "has_pq_or_dt_sponsor",
        type: "boolean",
        default: false,
      }),
    ]);

    await queryRunner.createForeignKey(
      "professor",
      new TableForeignKey({
        name: "professor_research_topic",
        columnNames: ["research_topic_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "research_topic",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("professor", "professor_research_topic");
    await queryRunner.dropColumns("professor", [
      "research_topic_id",
      "placement",
      "ppgco_weekly_workload",
      "other_ppg_weekly_workload",
      "has_pq_or_dt_sponsor",
    ]);
  }
}
