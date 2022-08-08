import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("prod_tec_kind")
export class ProdTecKind {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  kind: string;

  @Column({ default: 0.0 })
  score: number;
}
