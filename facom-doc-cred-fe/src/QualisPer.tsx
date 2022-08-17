import { Button, InputLabel, Paper } from "@mui/material";
import Box from "@mui/system/Box";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormInputDropdown } from "./FormInputDropdown";
import { FormInputText } from "./FormInputText";
import api from "./services/api";
import EditableTable from "./Table";

const qualisOptions = [
  {
    label: "A1",
    value: "A1",
  },
  {
    label: "A2",
    value: "A2",
  },
  {
    label: "A3",
    value: "A3",
  },
  {
    label: "A4",
    value: "A4",
  },
  {
    label: "B1",
    value: "B1",
  },
  {
    label: "B2",
    value: "B2",
  },
  {
    label: "B3",
    value: "B3",
  },
  {
    label: "B4",
    value: "B4",
  },
];

export default function QualisPer() {
  const methods = useForm();
  const { handleSubmit, control } = methods;

  const [data, setData] = useState<Record<string, any>[]>([]);

  const onSearch = async (data: any) => {
    const fetchedQualis = await api.get(`/qualis-per/${data.search}`);

    if (!fetchedQualis.data) {
      setData([]);
      return;
    }

    setData([
      {
        issn: fetchedQualis.data.issn,
        title: fetchedQualis.data.title,
        qualis: fetchedQualis.data.qualis,
      },
    ]);
  };

  const onInsert = async (data: any) => {
    await api.post(`/qualis-per/`, {
      title: data.Per,
      qualis: data.qualis,
      issn: data.ISSN,
    });
  };

  return (
    <Paper
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
        }}
      >
        <FormInputText name="search" control={control} label="ISSN" />

        <Button
          onClick={handleSubmit(onSearch)}
          variant={"contained"}
          sx={{ marginLeft: 1 }}
        >
          Pesquisar
        </Button>
      </div>
      <Paper
        sx={{
          maxWidth: "720px",
          minHeight: "130px",
          maxHeight: "130px",
          marginTop: "12px",
          overflowY: "hide",
        }}
      >
        <EditableTable
          updateRow={async (index: number, args: Record<string, any>) => {
            let sanitizedArgs = {
              ...args,
            };

            delete sanitizedArgs.id;
            delete sanitizedArgs.isEditMode;

            api.patch(`/qualis-per/${data[index].issn}/update`, sanitizedArgs);
          }}
          inputType={["text", "text", "qualis"]}
          labels={["ISSN", "Periódico", "Qualis"]}
          data={data}
        />
      </Paper>

      {/* <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
          marginTop: "12px",
        }}
        noValidate
        autoComplete="off"
      > */}
      <Paper elevation={3} sx={{ marginTop: 8, padding: 2 }}>
        <FormInputText name="ISSN" control={control} label="ISSN" />
        <div style={{ marginTop: 12 }}>
          <FormInputText name="Per" control={control} label="Periódico" />
        </div>

        <div>
          <InputLabel htmlFor="qualis">Qualis</InputLabel>

          <FormInputDropdown
            name="qualis"
            control={control}
            label="Qualis"
            options={qualisOptions}
            defaultValue={qualisOptions[0]}
          />
          <Button
            onClick={handleSubmit(onInsert)}
            variant={"contained"}
            sx={{ marginLeft: 2 }}
          >
            Criar novo
          </Button>
        </div>
      </Paper>
      {/* </Box> */}
    </Paper>
  );
}
