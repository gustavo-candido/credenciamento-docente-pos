import { User } from "@typeorm/entity/User";
import { MigrationInterface, QueryRunner } from "typeorm";

export class seedAdmin1661118156871 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(User, {
      email: "admin@ufu.br",
      is_adm: true,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(User, {});
  }
}
