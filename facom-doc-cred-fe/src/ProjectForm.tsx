import { Co2Sharp } from "@mui/icons-material";
import { Container, Table } from "@mui/material";
import { useEffect, useState } from "react";
import api from "./services/api";
import EditableTable from "./Table";
import { useUser } from "./user";

export default function ProjectForm() {
  const {
    user: { professorId, professorLattes },
  } = useUser();

  const [data, setData] = useState([]);
  const [dataId, setDataID] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await api.get(`/project/professor/${professorId}`);

      const resData = res?.data ?? [];

      setData(
        resData.map((d: any) => ({
          has_sponsor: d.has_sponsor ? "Sim" : "Não",
          kind: d.kind,
          year_start: d.year_start,
          year_end: d.year_end,
          title: d.title,
          coordinator: d.responsible_id === professorLattes ? "Sim" : "Não",
        }))
      );

      setDataID(resData.map((d: any) => d.id));
    })();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mt: 9 }}>
      <EditableTable
        updateRow={async (index: number, args: Record<string, any>) => {
          let sanitizedArgs = {
            ...args,
            has_sponsor: args.has_sponsor === "Sim",
            responsible_id:
              args.coordinator === "Sim" ? professorLattes : "unknown",
          };
          //@ts-expect-error
          delete sanitizedArgs.id;
          //@ts-expect-error
          delete sanitizedArgs.isEditMode;

          api.patch(`/project/${dataId[index]}/update`, sanitizedArgs);
        }}
        inputType={["bool", "project", "text", "text", "text", "bool"]}
        labels={[
          "Possuí financiamento",
          "Tipo",
          "Início",
          "Fim",
          "Título",
          "Coordenador",
        ]}
        data={data}
      />
    </Container>
  );
}
