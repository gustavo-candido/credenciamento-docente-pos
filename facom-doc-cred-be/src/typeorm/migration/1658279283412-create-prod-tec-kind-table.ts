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
          {
            name: "score",
            type: "numeric",
          },
        ],
      })
    );

    const data = [
      {
        kind: "Desenvolvimento de produto ou processo com depósito de patente",
        score: "1",
      },
      {
        kind: "Desenvolvimento de produto ou processo com concessão de patente",
        score: "1",
      },
      {
        kind: "Software (programa de computador) com solicitação de Registro no INPI",
        score: "1",
      },
      {
        kind: "Software (programa de computador) disponível em repositório público (por repositório)",
        score: "0.5",
      },
      {
        kind: "Base de dados técnico-científica disponível em repositório público",
        score: "0.75",
      },
      {
        kind: "Membro de Comissões de Associações (SBC, IEEE, ACM)",
        score: "0.85",
      },
      {
        kind: "Participação em Corpo Editorial de Revista Internacional (Periódico ou Special Issue)",
        score: "0.7",
      },
      {
        kind: "Participação em Corpo Editorial de Revista Nacional",
        score: "0.5",
      },
      {
        kind: "Organização de livro, catálogo, coletânea e enciclopédia",
        score: "0.5",
      },
      {
        kind: "Organização anais (incluindo editoria e corpo editorial)",
        score: "0.5",
      },
      { kind: "Revisão de Artigo em Periódico (por revisão)", score: "0.3" },
      {
        kind: "Revisão de Artigo em evento Internacional Qualificado (por revisão)",
        score: "0.2",
      },
      {
        kind: "Revisão de Artigo em evento Nacional Qualificado (por revisão)",
        score: "0.1",
      },
    ];

    await queryRunner.manager.insert(ProdTecKind, data);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(ProdTecKind, {});
    await queryRunner.dropTable("prod_tec_kind");
  }
}
