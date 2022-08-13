import { Container, Table } from "@mui/material";
import { useEffect, useState } from "react";
import api from "./services/api";
import EditableTable from "./Table";
import { useUser } from "./user";

export default function ProdTecForm() {
  const {
    user: { professorId },
  } = useUser();

  const [data, setData] = useState([]);
  const [dataId, setDataID] = useState([]);

  useEffect(() => {
    (async () => {
      const reqProdTec = await api.get(`/prod-tec/professor/${professorId}`);

      const resData = reqProdTec?.data ?? [];
      setData(
        resData.map((d: any) => ({
          description: d.description,
          year: d.year,
          quantity: d.quantity,
          prod_tec_kind_id: d.prod_tec_kind_id,
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

          api.patch(`/prod-tec/${dataId[index]}/update`, sanitizedArgs);
        }}
        inputType={["text", "text", "text", "text"]}
        labels={["Descrição", "Ano", "N° de revisões", "Tipo"]}
        data={data}
      />
    </Container>
  );
}
