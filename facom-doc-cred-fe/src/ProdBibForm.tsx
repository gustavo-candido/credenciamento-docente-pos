// @PrimaryGeneratedColumn("uuid")
//   id: string;

import { Table } from "@mui/material";
import EditableTable from "./Table";

//   @ManyToOne(() => Professor, { onDelete: "CASCADE" })
//   @JoinColumn({ name: "professor_id" })
//   professor_id: Professor["id"];

//   @Column()
//   issn_or_sigla: string;

//   @Column()
//   year: number;

//   @Column()
//   title: string;

//   @Column({ default: null })
//   event_name: string;

//   @CreateDateColumn()
//   created_at: Date;

//   @UpdateDateColumn()
//   updated_at: Date;

export default function FunctionProdBibForm() {
  return (
    <EditableTable
      labels={["Foo", "Bar"]}
      data={[
        { foo: 800, bar: `hey` },
        { foo: 800, bar: `hey` },
      ]}
    />
  );
}
