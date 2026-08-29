import { MenuItem, Select, Typography } from "@mui/material";

interface CustomSelectProps {
  value: string;
  options: {
    label: string;
    value: string;
  }[];
  onChange: (value: string) => void;
  label: string;
  minWidth: number;
  width: number;
}

const SelectComponent = ({
  label,
  value,
  onChange,
  options = [],
  minWidth = 125,
  width,
}: CustomSelectProps) => {
  return (
    <Select
      size="small"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      displayEmpty
      sx={{
        width: { md: minWidth, xs: "100%" },
        bgcolor: "white",
        borderRadius: "8px",
      }}
      MenuProps={{
        slotProps: {
          paper: {
            sx: {
              maxHeight: 300,
              overflowY: "auto",
              width: { md: width, cs: "100%" },
            },
          },
        },
      }}
      renderValue={(selected) => (
        <Typography variant="body-medium">
          {label}:{" "}
          <Typography component="span" variant="body-bold">
            {selected}
          </Typography>
        </Typography>
      )}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectComponent;
