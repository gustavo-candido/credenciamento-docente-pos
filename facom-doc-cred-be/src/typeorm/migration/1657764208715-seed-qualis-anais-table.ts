import { QualisAnais } from "@typeorm/entity/QualisAnais";
import QualisAnaisSeedService from "@typeorm/seed/QuaisAnaisSeedService";
import { MigrationInterface, QueryRunner } from "typeorm";

export class seedQualisAnaisTable1657764208715 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const qualisAnaisSeeds = new QualisAnaisSeedService().run();

    await queryRunner.manager.insert(QualisAnais, qualisAnaisSeeds);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(QualisAnais, {});
  }
}
