import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("prod_tec_kind")
export class ProdTecKind {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  kind: string;

  // the type is string
  @Column()
  score: string;
}
