import TextField from "@mui/material/TextField";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

export const FormInputText = ({
  name,
  control,
  label,
  defaultValue,
}: Record<string, any>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          defaultValue={defaultValue}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          sx={{ minWidth: "460px" }}
        />
      )}
    />
  );
};
