import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProdTecKind } from "./ProdTecKind";
import { Professor } from "./Professor";

@Entity("prod_tec")
export class ProdTec {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Professor, { onDelete: "CASCADE" })
  @JoinColumn({ name: "professor_id" })
  professor_id: Professor;

  @ManyToOne(() => ProdTecKind, { onDelete: "CASCADE" })
  @JoinColumn({ name: "prod_tec_kind_id" })
  prod_tec_kind_id: ProdTecKind;

  @Column()
  year: number;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
