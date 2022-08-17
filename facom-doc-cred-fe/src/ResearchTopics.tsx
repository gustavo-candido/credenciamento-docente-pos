import { Button, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormInputText } from "./FormInputText";
import api from "./services/api";
import EditableTable from "./Table";

const defaultValues = {
  textValue: "",
  radioValue: "",
  checkboxValue: [],
  dateValue: new Date(),
  dropdownValue: "",
  sliderValue: 0,
};

export default function ResearchTopics() {
  const methods = useForm({ defaultValues: defaultValues });
  const { handleSubmit, control } = methods;

  const [researchTopics, setResearchTopics] = useState([]);
  const [dataId, setDataID] = useState([]);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    await api.post("/research-topic", {
      topic: data.researchTopic,
    });

    await refetchResearchTopic();
  };

  const refetchResearchTopic = async () => {
    const request = await api.get("/research-topic");

    if (request.data) {
      const fetchedResearchs = request.data.map((item: any) => ({
        researchTopic: item.topic,
      }));

      setDataID(request.data.map((d: any) => d.id));

      setResearchTopics(fetchedResearchs);
    }
  };

  useEffect(() => {
    (async () => {
      await refetchResearchTopic();
    })();
  }, []);

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
      <Paper
        sx={{
          maxWidth: "720px",
          minHeight: "360px",
          maxHeight: "360px",
          marginTop: "78px",
          overflowY: "scroll",
        }}
      >
        <EditableTable
          updateRow={async (index: number, args: Record<string, any>) => {
            let sanitizedArgs = {
              topic: args.researchTopic,
            };

            api.patch(`/research-topic/${dataId[index]}/update`, sanitizedArgs);
          }}
          inputType={["text"]}
          labels={["Linha de pesquisa"]}
          data={researchTopics}
        />
      </Paper>
      <div style={{ marginTop: "12px" }}>
        <FormInputText
          name="researchTopic"
          control={control}
          label="Linha de pesquisa"
        />

        <Button
          onClick={handleSubmit(onSubmit)}
          variant={"contained"}
          sx={{ marginTop: 2, marginBottom: 4 }}
        >
          Submit
        </Button>
      </div>
    </Paper>
  );
}
