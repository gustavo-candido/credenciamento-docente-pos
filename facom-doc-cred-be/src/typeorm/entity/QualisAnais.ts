import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("qualis_anais")
export class QualisAnais {
  @PrimaryColumn()
  sigla: string;

  @Column()
  name: string;

  @Column()
  qualis: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
