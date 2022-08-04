import { Container, Table } from "@mui/material";
import { useEffect, useState } from "react";
import api from "./services/api";
import EditableTable from "./Table";
import { useUser } from "./user";

export default function ProjectForm() {
  const {
    user: { professorId },
  } = useUser();

  const [data, setData] = useState([]);
  const [dataId, setDataID] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await api.get(`/project/professor/${professorId}`);

      const resData = res?.data ?? [];

      console.log(resData);

      setData(
        resData.map((d: any) => ({
          has_sponsor: d.has_sponsor ? "Sim" : "Não",
          kind: d.kind, // Create input for this
          year: d.year,
          title: d.title,
          responsible_id: d.responsible_id,
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
            has_sponsor: args.has_sponsor === "Sim",
          };

          //@ts-expect-error
          delete sanitizedArgs.id;
          //@ts-expect-error
          delete sanitizedArgs.isEditMode;

          api.patch(`/project/${dataId[index]}/update`, sanitizedArgs);
        }}
        inputType={["bool", "text", "text", "text", "text"]}
        labels={["Possuí patrocínio", "Tipo", "Ano", "Título", "Responsável"]}
        data={data}
      />
    </Container>
  );
}
