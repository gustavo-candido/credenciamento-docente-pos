import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ResearchTopic } from "./ResearchTopic";
import { User } from "./User";

@Entity("professor")
export class Professor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user_id: User["id"];

  @Column()
  name: string;

  @Column()
  lattes_id: string;

  @Column()
  birth_date: Date;

  @ManyToOne(() => ResearchTopic, { onDelete: "SET NULL" })
  @JoinColumn({ name: "research_topic_id" })
  research_topic_id: ResearchTopic;

  @Column()
  placement: string;

  @Column()
  ppgco_weekly_workload: number;

  @Column()
  other_ppg_weekly_workload: number;

  @Column()
  has_pq_or_dt_sponsor: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
