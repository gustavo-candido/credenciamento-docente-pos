import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("qualis_per")
export class QualisPer {
  @PrimaryColumn()
  issn: string;

  @Column()
  title: string;

  @Column()
  qualis: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
