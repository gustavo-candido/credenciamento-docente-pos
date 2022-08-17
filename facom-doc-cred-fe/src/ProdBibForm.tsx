import { Container, Paper, Table } from "@mui/material";
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
          veic_conf: d.veic_conf,
          title: d.title,
          year: d.year,
          i_restrito: d.i_restrito,
          i_geral: d.i_geral,
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
          };

          delete sanitizedArgs.id;
          delete sanitizedArgs.isEditMode;

          api.patch(`/prod-bib/${dataId[index]}/update`, sanitizedArgs);
        }}
        inputType={["text", "text", "text", "text", "text", "text"]}
        labels={[
          "ISSN/SIGLA",
          "VEICULO/CONF",
          "Título",
          "Ano",
          "Ind. Restrito",
          "Ind. Geral",
        ]}
        data={data}
      />
    </Container>
  );
}
