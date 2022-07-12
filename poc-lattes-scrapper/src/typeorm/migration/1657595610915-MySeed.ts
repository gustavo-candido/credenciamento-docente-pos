import { User } from "@typeorm/entity/User";
import { MigrationInterface, QueryRunner } from "typeorm";

export class MySeed1657595610915 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(User, {
      firstName: "John",
      lastName: "Due",
      age: 25,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(User, {});
  }
}
