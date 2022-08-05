import { Label } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormInputDropdown } from "./FormInputDropdown";
import { FormInputRadio } from "./FormInputRadio";
import { FormInputText } from "./FormInputText";

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

export default function Perfil() {
  const methods = useForm({ defaultValues: defaultValues });
  const { handleSubmit, reset, control, setValue } = methods;
  const onSubmit = (data: any) => console.log(data);

  return (
    <Paper>
      <FormInputText name="name" control={control} label="Nome" />
      <FormInputText
        name="lattes_id"
        control={control}
        label="ID currículo Lattes"
      />
      <FormInputText
        name="birth_date"
        control={control}
        label="Data de nascimento (YYYY/MM/DD)"
      />
      <FormInputDropdown
        name="research_topic_id"
        control={control}
        label="Linha de pesquisa"
      />
      <FormInputText
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

      <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
        Submit
      </Button>
    </Paper>
  );
}
