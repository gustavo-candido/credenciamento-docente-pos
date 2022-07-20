import { ProdTecKind } from "@typeorm/entity/ProdTecKind";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createProdTecKindTable1658279283412 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "prod_tec_kind",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "kind",
            type: "varchar",
          },
        ],
      })
    );

    await queryRunner.manager.insert(ProdTecKind, [
      {
        kind: "Desenvolvimento de produto ou processo com depósito de patente",
      },
      {
        kind: "Desenvolvimento de produto ou processo com concessão de patente",
      },
      {
        kind: "Software (programa de computador) com solicitação de Registro no INPI",
      },
      {
        kind: "Software (programa de computador) disponível em repositório público (por repositório)",
      },
      {
        kind: "Base de dados técnico-científica disponível em repositório público",
      },
      { kind: "Membro de Comissões de Associações (SBC, IEEE, ACM)" },
      {
        kind: "Participação em Corpo Editorial de Revista Internacional (Periódico ou Special Issue)",
      },
      { kind: "Participação em Corpo Editorial de Revista Nacional" },
      { kind: "Organização de livro, catálogo, coletânea e enciclopédia" },
      { kind: "Organização anais (incluindo editoria e corpo editorial)" },
      { kind: "Revisão de Artigo em Periódico (por revisão)" },
      {
        kind: "Revisão de Artigo em evento Internacional Qualificado (por revisão)",
      },
      {
        kind: "Revisão de Artigo em evento Nacional Qualificado (por revisão)",
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(ProdTecKind, {});
    await queryRunner.dropTable("prod_tec_kind");
  }
}
