import {
  KeyboardArrowDownRounded,
  SearchRounded,
} from "@mui/icons-material";
import {
  Box,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from "@mui/material";

import { contestFiletrWrapper, contestFilterStyle, outline } from "../style";
import type { ContestFilterState } from "../types";

interface Props {
  value: ContestFilterState;
  onChange: (next: ContestFilterState) => void;
}

const CONTROL_HEIGHT = 36;

const selectSx = () => ({
  ...contestFilterStyle,
  height: CONTROL_HEIGHT,
});

const ContestFilters = ({ value, onChange }: Props) => {
  const theme = useTheme();

  const set = (patch: Partial<ContestFilterState>) =>
    onChange({ ...value, ...patch });

  return (
    <Box
      sx={{
        ...contestFiletrWrapper,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <TextField
        placeholder="Search contests..."
        value={value.search}
        onChange={(e) => set({ search: e.target.value })}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start" sx={{ mr: "8px" }}>
                <SearchRounded
                  sx={{ fontSize: 18, color: theme.palette.appText.secondary }}
                />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            height: CONTROL_HEIGHT,
            bgcolor: theme.palette.white.main,
            borderRadius: "6px",
            fontSize: 13,
            pl: "12px",
            ...outline,
          },
          "& .MuiOutlinedInput-input": {
            p: 0,
            "&::placeholder": {
              color: theme.palette.appText.label,
              opacity: 1,
            },
          },
        }}
      />

      <Select
        displayEmpty
        value={value.platform}
        onChange={(e) => set({ platform: e.target.value })}
        IconComponent={KeyboardArrowDownRounded}
        sx={selectSx}
      >
        <MenuItem value="">All Platforms</MenuItem>
        <MenuItem value="LeetCode">LeetCode</MenuItem>
        <MenuItem value="Codeforces">Codeforces</MenuItem>
        <MenuItem value="CodeChef">CodeChef</MenuItem>
      </Select>

      <Select
        displayEmpty
        value={value.level}
        onChange={(e) => set({ level: e.target.value })}
        IconComponent={KeyboardArrowDownRounded}
        sx={selectSx}
      >
        <MenuItem value="">All Levels</MenuItem>
        <MenuItem value="Easy">Easy</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="Hard">Hard</MenuItem>
      </Select>

      <Select
        displayEmpty
        value={value.duration}
        onChange={(e) => set({ duration: e.target.value })}
        IconComponent={KeyboardArrowDownRounded}
        sx={selectSx}
      >
        <MenuItem value="">All Durations</MenuItem>
        <MenuItem value="short">Under 1 Hour</MenuItem>
        <MenuItem value="medium">1–2 Hours</MenuItem>
        <MenuItem value="long">2+ Hours</MenuItem>
      </Select>
      </Box>
  );
};

export default ContestFilters;
