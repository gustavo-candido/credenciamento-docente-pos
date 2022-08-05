import { Label } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormInputDropdown } from "./FormInputDropdown";
import { FormInputRadio } from "./FormInputRadio";
import { FormInputText } from "./FormInputText";
import api from "./services/api";
import { useUser } from "./user";

const defaultValues = {
  textValue: "",
  radioValue: "",
  checkboxValue: [],
  dateValue: new Date(),
  dropdownValue: "",
  sliderValue: 0,
};

const optionsBoolean = [
  {
    label: "Sim",
    value: true,
  },
  {
    label: "Não",
    value: false,
  },
];

const optionsPlacement = [
  {
    label: "Permanente",
    value: "PERMANENTE",
  },
  {
    label: "Visitante",
    value: "VISITANTE",
  },
  {
    label: "Colaborador",
    value: "COLABORADOR",
  },
];
function formatDate(time: string) {
  const date = new Date(time);
  return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
}

export default function Perfil() {
  const {
    user: { professorId },
  } = useUser();
  const methods = useForm({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue } = methods;
  const onSubmit = (data: any) => console.log(data);

  const [researchTopics, setResearchTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [professorData, setProfessorData] = useState(
    {} as Record<string, unknown>
  );

  useEffect(() => {
    (async () => {
      const request = await api.get("/research-topic");

      if (request.data) {
        const fetchedResearchs = request.data.map((item: any) => ({
          label: item.topic,
          value: item.topic,
        }));

        setResearchTopics(fetchedResearchs);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const request = await api.get(`/professor/${professorId}`);

      if (request.data) {
        const fetchedProfessorData = request.data;

        console.log(fetchedProfessorData);

        setProfessorData((d) => ({
          ...d,
          name: fetchedProfessorData.name,
          lattes_id: fetchedProfessorData.lattes_id,
          birth_date: formatDate(fetchedProfessorData.birth_date),
          research_topic: fetchedProfessorData.research_topic_id.topic,
        }));

        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    // console.log(professorData);
  }, [professorData]);

  if (loading) {
    return <></>;
  }

  return (
    <Paper>
      <FormInputText
        name="name"
        control={control}
        label="Nome"
        defaultValue={professorData?.name}
      />
      {/* <FormInputText
        name="lattes_id"
        control={control}
        label="ID currículo Lattes"
        defaultValue={professorData?.lattes_id}
      />
      <FormInputText
        name="birth_date"
        control={control}
        label="Data de nascimento (YYYY/MM/DD)"
        defaultValue={professorData?.birth_date}
      />
      <FormInputDropdown
        name="research_topic_id"
        control={control}
        label="Linha de pesquisa"
        options={researchTopics}
        defaultValue={professorData?.research_topic}
      /> */}
      {/*<FormInputText
        name="ppgco_weekly_workload"
        control={control}
        label="Tempo dedicado ao PPGCO (horas/semana)"
      />
      <FormInputText
        name="other_ppg_weekly_workload"
        control={control}
        label="Tempo dedicado em outros PPG (horas/semana)"
      />
      <FormInputDropdown
        name="has_pq_or_dt_sponsor"
        control={control}
        label="Possuí bolsa (PQ/DT)"
        options={optionsBoolean}
      />
      <FormInputDropdown
        name="placement"
        control={control}
        label="Tipo de enquadramento"
        options={optionsPlacement}
      />
 */}
      <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
        Submit
      </Button>
    </Paper>
  );
}
