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

@Entity("mentorship_work")
export class MentorshipWork {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Professor, { onDelete: "CASCADE" })
  @JoinColumn({ name: "professor_id" })
  professor_id: Professor;

  @Column()
  is_concluded: boolean;

  @Column()
  role: string;

  @Column()
  year: number;

  @Column()
  title: string;

  @Column()
  degree: string;

  @Column()
  student_name: string;

  @Column({ default: null })
  sponsor_code: string;

  @Column({ default: null })
  sponsor_name: string;

  @Column({ default: 0 })
  nmonths: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
