import { Box, useTheme } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { type Dayjs } from "dayjs";
import "dayjs/locale/en-gb";
import { useState } from "react";

interface Props {
  onSelect?: (date: Date) => void;
}

const CalendarCard = ({ onSelect }: Props) => {
  const theme = useTheme();

  const [selected, setSelected] = useState<Dayjs>(dayjs());

  const handleChange = (value: Dayjs | null) => {
    if (!value) return;
    setSelected(value);
    onSelect?.(value.toDate());
  };

  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <DateCalendar
          value={selected}
          onChange={handleChange}
          showDaysOutsideCurrentMonth
          sx={{ width: "100%", mx: 0 }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default CalendarCard;
