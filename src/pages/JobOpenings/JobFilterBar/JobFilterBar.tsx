import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import {
  Box,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import {
  clearAllBtn,
  filterBarCard,
  filterTopRow,
  quickFilterChip,
  quickFiltersRow,
  searchInputStyle,
  selectDropdownStyle,
} from "../style";
import type { JobFilterBarProps } from "../types";

const quickFilterItems = [
  {
    id: "remote",
    label: "Remote",
    icon: <PublicOutlinedIcon sx={{ fontSize: 14 }} />,
  },
  {
    id: "wfh",
    label: "Work From Home",
    icon: <HomeOutlinedIcon sx={{ fontSize: 14 }} />,
  },
  {
    id: "internship",
    label: "Internship",
    icon: <SchoolOutlinedIcon sx={{ fontSize: 14 }} />,
  },
  {
    id: "entry-level",
    label: "Entry Level",
    icon: <TrendingUpOutlinedIcon sx={{ fontSize: 14 }} />,
  },
  {
    id: "full-time",
    label: "Full Time",
    icon: <BusinessCenterOutlinedIcon sx={{ fontSize: 14 }} />,
  },
  {
    id: "part-time",
    label: "Part Time",
    icon: <BusinessCenterOutlinedIcon sx={{ fontSize: 14 }} />,
  },
];

const JobFilterBar = ({
  filters,
  filterOptions,
  onChange,
  onClear,
}: JobFilterBarProps) => {
  const theme = useTheme();

  const handleQuickFilterClick = (id: string) => {
    if (filters.quickFilter === id) {
      onChange({ quickFilter: "", page: 1 });
    } else {
      onChange({ quickFilter: id, page: 1 });
    }
  };

  return (
    <Box sx={filterBarCard}>
      <Box sx={filterTopRow}>
        <TextField
          placeholder="Search by title, company, or skill..."
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value, page: 1 })}
          sx={searchInputStyle}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{ color: theme.palette.black.secondary, fontSize: 19 }}
                  />
                </InputAdornment>
              ),
            },
          }}
        />

        <Select
          displayEmpty
          value={filters.location}
          onChange={(e) => onChange({ location: e.target.value, page: 1 })}
          sx={selectDropdownStyle}
        >
          <MenuItem value="">All Locations</MenuItem>
          {(filterOptions?.locations ?? []).map((loc) => (
            <MenuItem key={loc} value={loc}>
              {loc}
            </MenuItem>
          ))}
        </Select>

        <Select
          displayEmpty
          value={filters.experience}
          onChange={(e) => onChange({ experience: e.target.value, page: 1 })}
          sx={selectDropdownStyle}
        >
          <MenuItem value="">All Experience</MenuItem>
          {(filterOptions?.experience ?? ["0-1", "1-3", "3-5", "5+"]).map(
            (exp) => (
              <MenuItem key={exp} value={exp}>
                {exp} Yrs
              </MenuItem>
            ),
          )}
        </Select>

        <Select
          displayEmpty
          value={filters.jobType}
          onChange={(e) => onChange({ jobType: e.target.value, page: 1 })}
          sx={selectDropdownStyle}
        >
          <MenuItem value="">All Job Types</MenuItem>
          {(
            filterOptions?.jobTypes ?? [
              "Full Time",
              "Part Time",
              "Internship",
              "Contract",
            ]
          ).map((jt) => (
            <MenuItem key={jt} value={jt}>
              {jt}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box sx={quickFiltersRow}>
        {quickFilterItems.map((chip) => {
          const isActive = filters.quickFilter === chip.id;
          return (
            <Box
              key={chip.id}
              onClick={() => handleQuickFilterClick(chip.id)}
              sx={quickFilterChip(theme, isActive)}
            >
              {chip.icon}
              <span>{chip.label}</span>
            </Box>
          );
        })}

        <Typography onClick={onClear} sx={clearAllBtn}>
          Clear All
        </Typography>
      </Box>
    </Box>
  );
};

export default JobFilterBar;
