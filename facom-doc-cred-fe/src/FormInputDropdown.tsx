import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useFormContext, Controller } from "react-hook-form";

export const FormInputDropdown = ({
  name,
  control,
  label,
  options = [],
}: Record<string, any>) => {
  const generateSelectOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Select onChange={onChange} value={value}>
          {generateSelectOptions()}
        </Select>
      )}
    />
  );
};
