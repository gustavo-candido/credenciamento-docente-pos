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
  const [allKinds, setAllKinds] = useState([]);
  const [loading, setLoading] = useState(true);
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
          kind: d.kind,
        }))
      );

      const reqKindTec = await api.get("/prod-tec-kind/");

      setAllKinds(reqKindTec.data);

      setDataID(resData.map((d: any) => d.id));

      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 9 }}>
      <EditableTable
        updateRow={async (index: number, args: Record<string, any>) => {
          const prod_tec_kind_id = allKinds.find(
            (item: any) => item.kind === args.kind
          );
          let sanitizedArgs = {
            ...args,
            prod_tec_kind_id,
          };

          delete sanitizedArgs.kind;
          delete sanitizedArgs.id;
          delete sanitizedArgs.isEditMode;

          api.patch(`/prod-tec/${dataId[index]}/update`, sanitizedArgs);
        }}
        inputType={["text", "text", "text", "prodTecKind"]}
        labels={["Descrição", "Ano", "N° de revisões", "Tipo"]}
        data={data}
        prodTecKind={allKinds}
      />
    </Container>
  );
}
