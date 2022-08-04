import { Container, Table } from "@mui/material";
import { useEffect, useState } from "react";
import api from "./services/api";
import EditableTable from "./Table";
import { useUser } from "./user";

export default function MentorshipForm() {
  const {
    user: { professorId },
  } = useUser();

  const [data, setData] = useState([]);
  const [dataId, setDataID] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await api.get(`/mentorship-work/professor/${professorId}`);

      const resData = res?.data ?? [];

      setData(
        resData.map((d: any) => ({
          is_concluded: d.is_concluded ? "Sim" : "Não",
          role: d.role,
          year: d.year,
          title: d.title,
          degree: d.degree,
          student_name: d.student_name,
          sponsor_name: d.sponsor_name,
          nmonths: d.nmonths,
        }))
      );

      setDataID(resData.map((d: any) => d.id));
    })();
  }, []);

  return (
    <Container maxWidth="xl">
      <EditableTable
        updateRow={async (index: number, args: Record<string, any>) => {
          let sanitizedArgs = {
            ...args,
            is_concluded: args.is_concluded === "Sim",
          };

          //@ts-expect-error
          delete sanitizedArgs.id;
          //@ts-expect-error
          delete sanitizedArgs.isEditMode;

          api.patch(`/mentorship-work/${dataId[index]}/update`, sanitizedArgs);
        }}
        inputType={[
          "bool",
          "role",
          "year",
          "title",
          "degree",
          "student",
          "sponsor_name",
          "nmonths",
        ]}
        labels={[
          "Concluído",
          "Tipo de Orient.",
          "Ano",
          "Titulo",
          "Grau",
          "Aluno",
          "Patrocinador",
          "Meses supervisionados (apenas pós)",
        ]}
        data={data}
      />
    </Container>
  );
}
