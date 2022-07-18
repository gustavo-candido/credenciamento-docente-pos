import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("research_topic")
export class ResearchTopic {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  topic: string;
}
