import { Container, Table } from "@mui/material";
import { useEffect, useState } from "react";
import api from "./services/api";
import EditableTable from "./Table";
import { useUser } from "./user";

export default function ProdBibForm() {
  const {
    user: { professorId },
  } = useUser();

  const [data, setData] = useState([]);
  const [dataId, setDataID] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await api.get(`/prod-bib/professor/${professorId}`);

      const resData = res?.data ?? [];
      setData(
        resData.map((d: any) => ({
          issn_or_sigla: d.issn_or_sigla,
          title: d.title,
          year: d.year,
          event_ame: d.event_name,
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
          };

          delete sanitizedArgs.id;
          delete sanitizedArgs.isEditMode;

          api.patch(`/prod-bib/${dataId[index]}/update`, sanitizedArgs);
        }}
        inputType={["text", "text", "text", "text"]}
        labels={["ISSN/SIGLA", "Título", "Ano", "Nome do evento"]}
        data={data}
      />
    </Container>
  );
}
