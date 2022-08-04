import { Table } from "@mui/material";
import { useEffect, useState } from "react";
import api from "./services/api";
import EditableTable from "./Table";
import { useUser } from "./user";

export default function MentorshipForm() {
  const {
    user: { professorId },
  } = useUser();

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await api.get(`/mentorship-work/professor/${professorId}`);

      const resData = res?.data ?? [];

      setData(
        resData.map((d: any) => ({
          is_concluded: d.is_concluded ? "Sim" : "Não",
        }))
      );
    })();
  }, []);

  return (
    <EditableTable inputType={["bool"]} labels={["Concluído"]} data={data} />
  );
}

// @PrimaryGeneratedColumn("uuid")
//   id: string;

// @Column()
// is_concluded: boolean;

// @Column()
// role: string;

// @Column()
// year: number;

// @Column()
// title: string;

// @Column()
// degree: string;

// @Column()
// student_name: string;

// @Column({ default: null })
// sponsor_code: string;

// @Column({ default: null })
// sponsor_name: string;

// @Column({ default: 0 })
// nmonths: number;

// @CreateDateColumn()
// created_at: Date;

// @UpdateDateColumn()
// updated_at: Date;
