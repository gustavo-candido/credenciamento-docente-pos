import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ResearchTopic } from "./ResearchTopic";

@Entity("professor")
export class Professor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

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
