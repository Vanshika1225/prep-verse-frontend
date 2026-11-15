import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  InputAdornment,
  Skeleton,
  TextField,
  useTheme,
} from "@mui/material";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";

import {
  commonBorderRadius,
  filterBarMainBox,
  searchJobTextField,
} from "../style";
import type { FilterBarProps } from "../types";

import SelectComponent from "@/components/SelectComponent";
import { useGetFilterOptionsQuery } from "@/services/jobTrackerApi";

export const FilterBar = ({ filters, onFilterChange }: FilterBarProps) => {
  const theme = useTheme();
  const [searchInput, setSearchInput] = useState(filters.search ?? "");

  const { data: filterOptionsResponse, isLoading } = useGetFilterOptionsQuery();
  const filterData = filterOptionsResponse?.data;

  const debouncedSearch = useMemo(
    () =>
      debounce((val: string) => {
        onFilterChange({ ...filters, search: val });
      }, 400),
    [filters, onFilterChange],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchChange = (val: string) => {
    setSearchInput(val);
    debouncedSearch(val);
  };

  const categoryOptions = useMemo(
    () => [
      { label: "All Categories", value: "" },
      ...(filterData?.categories.map((c) => ({ label: c, value: c })) ?? []),
    ],
    [filterData],
  );

  const locationOptions = useMemo(
    () => [
      { label: "All Locations", value: "" },
      ...(filterData?.locations.map((l) => ({ label: l, value: l })) ?? []),
    ],
    [filterData],
  );

  const statusOptions = useMemo(
    () => [
      { label: "All Status", value: "" },
      ...(filterData?.statuses.map((s) => ({ label: s, value: s })) ?? []),
    ],
    [filterData],
  );

  return (
    <Box sx={filterBarMainBox}>
      <TextField
        value={searchInput}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="Search jobs, companies..."
        size="small"
        sx={searchJobTextField(theme)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{ color: theme.palette.black.secondary, fontSize: 20 }}
                />
              </InputAdornment>
            ),
          },
        }}
      />

      {isLoading ? (
        <>
          <Skeleton
            variant="rounded"
            width={160}
            height={40}
            sx={commonBorderRadius}
          />
          <Skeleton
            variant="rounded"
            width={160}
            height={40}
            sx={commonBorderRadius}
          />
          <Skeleton
            variant="rounded"
            width={160}
            height={40}
            sx={commonBorderRadius}
          />
        </>
      ) : (
        <>
          <SelectComponent
            label="Category"
            value={filters.category ?? ""}
            onChange={(val) => onFilterChange({ ...filters, category: val })}
            options={categoryOptions}
            minWidth={170}
            width={220}
          />

          <SelectComponent
            label="Location"
            value={filters.location ?? ""}
            onChange={(val) => onFilterChange({ ...filters, location: val })}
            options={locationOptions}
            minWidth={165}
            width={200}
          />

          <SelectComponent
            label="Status"
            value={filters.status ?? ""}
            onChange={(val) => onFilterChange({ ...filters, status: val })}
            options={statusOptions}
            minWidth={150}
            width={180}
          />
        </>
      )}
    </Box>
  );
};