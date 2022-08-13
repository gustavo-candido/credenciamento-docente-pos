import { Button, Paper, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
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
    user: { professorId, id },
  } = useUser();
  const methods = useForm({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue } = methods;
  
  const [researchTopics, setResearchTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [professorData, setProfessorData] = useState(
    {} as Record<string, unknown>
    );
  
  const onSubmit = (data: any) => {
    const researchTopicId = researchTopics.find((item:any) => item.value === data.research_topic);
    
    const dto = {
      birth_date: data.birth_date,
      lattes_id: data.lattes_id,
      has_pq_or_dt_sponsor: data.has_pq_or_dt_sponsor,
      name: data.name,
      other_ppg_weekly_workload: data.other_ppg_weekly_workload,
      placement: data.placement,
      ppgco_weekly_workload: data.ppgco_weekly_workload,
      research_topic_id: researchTopicId,
      user_id: id,
    }

    api.patch(`professor/${professorId}/update`, dto);
  };

  useEffect(() => {
    (async () => {
      const request = await api.get("/research-topic");

      if (request.data) {
        const fetchedResearchs = request.data.map((item: any) => ({
          label: item.topic,
          value: item.topic,
          id: item.id,
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

        setProfessorData((d) => ({
          ...d,
          birth_date: formatDate(fetchedProfessorData.birth_date),
          has_pq_or_dt_sponsor: fetchedProfessorData.has_pq_or_dt_sponsor,
          lattes_id: fetchedProfessorData.lattes_id,
          name: fetchedProfessorData.name,
          other_ppg_weekly_workload:fetchedProfessorData.other_ppg_weekly_workload,
          placement:fetchedProfessorData.placement,
          ppgco_weekly_workload:fetchedProfessorData.ppgco_weekly_workload,
          research_topic: fetchedProfessorData.research_topic_id.topic,
        }));

        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <></>;
  }


  console.log(professorData);

  return (
    <Paper>
      <br/>
      <FormInputText
        name="name"
        control={control}
        label="Nome"
        defaultValue={professorData?.name}
      />
     
      <FormInputText
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
        name="research_topic"
        control={control}
        label="Linha de pesquisa"
        options={researchTopics}
        defaultValue={professorData?.research_topic}
      /> 
      <FormInputText
        name="ppgco_weekly_workload"
        control={control}
        label="Tempo dedicado ao PPGCO (horas/semana)"
        defaultValue={professorData?.ppgco_weekly_workload}
      />
      <FormInputText
        name="other_ppg_weekly_workload"
        control={control}
        label="Tempo dedicado em outros PPG (horas/semana)"
        defaultValue={professorData?.other_ppg_weekly_workload}

      />
      <InputLabel htmlFor="has_pq_or_dt_sponsor">Possuí bolsa (PQ/DT)</InputLabel>
      <FormInputDropdown
        name="has_pq_or_dt_sponsor"
        control={control}
        label="Possuí bolsa (PQ/DT)"
        options={optionsBoolean}
        defaultValue={professorData?.has_pq_or_dt_sponsor}
      />
      <InputLabel htmlFor="placement">Tipo de enquadramento</InputLabel>
      <FormInputDropdown
        name="placement"
        control={control}
        label="Tipo de enquadramento"
        options={optionsPlacement}
        defaultValue={professorData?.placement}
      />
      <br/>
      <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
        Submit
      </Button>
    </Paper>
  );
}

