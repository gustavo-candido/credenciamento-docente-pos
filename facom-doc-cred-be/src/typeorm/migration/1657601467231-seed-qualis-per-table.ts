import { QualisPer } from "@typeorm/entity/QualisPer";
import QualisPerSeedService from "@typeorm/seed/QualisPerSeedService";
import { MigrationInterface, QueryRunner } from "typeorm";

export class seedQualisPerTable1657601467231 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const qualisPerSeeds = new QualisPerSeedService().run();

    await queryRunner.manager.insert(QualisPer, qualisPerSeeds.slice(0, 10000));
    await queryRunner.manager.insert(QualisPer, qualisPerSeeds.slice(10000));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(QualisPer, {});
  }
}
