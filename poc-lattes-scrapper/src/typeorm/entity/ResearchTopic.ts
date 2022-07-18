import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("research_topic")
export class Professor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  topic: string;
}
