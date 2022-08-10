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

@Entity("project")
export class Project {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Professor, { onDelete: "CASCADE" })
  @JoinColumn({ name: "professor_id" })
  professor_id: Professor["id"];

  @Column()
  title: string;

  @Column()
  responsible_id: string;

  @Column()
  year_start: number;

  @Column({ type: "int", nullable: true })
  year_end?: number | null;

  @Column()
  has_sponsor: boolean;

  @Column()
  kind: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
