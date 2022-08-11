import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Professor } from "./Professor";

@Entity("prod_bib")
export class ProdBib {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Professor, { onDelete: "CASCADE" })
  @JoinColumn({ name: "professor_id" })
  professor_id: Professor["id"];

  @Column()
  issn_or_sigla: string;

  @Column()
  year: number;

  @Column()
  title: string;

  @Column({ default: null })
  veic_conf: string;

  @Column({ default: 0 })
  i_geral: number;

  @Column({ default: 0 })
  i_restrito: number;

  @Column()
  kind: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
