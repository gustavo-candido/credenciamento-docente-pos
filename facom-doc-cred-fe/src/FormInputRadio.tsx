import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import React, { ReactElement } from "react";

import { Controller, useFormContext } from "react-hook-form";

const options = [
  {
    label: "Radio Option 1",
    value: "1",
  },
  {
    label: "Radio Option 2",
    value: "2",
  },
];

export const FormInputRadio = ({
  name,
  control,
  label,
}: Record<string, any>): ReactElement => {
  const generateRadioOptions = () => {
    return options.map((singleOption) => (
      <FormControlLabel
        value={singleOption.value}
        label={singleOption.label}
        control={<Radio />}
      />
    ));
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <RadioGroup value={value} onChange={onChange}>
          {generateRadioOptions()}
        </RadioGroup>
      )}
    />
  );
};
