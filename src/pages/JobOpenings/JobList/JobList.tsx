import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Box,
  MenuItem,
  Pagination,
  Select,
  Typography,
  useTheme,
} from "@mui/material";

import JobCard from "../JobCard/JobCard";
import {
  jobListingScroll,
  paginationStyle,
  paginationWrapper,
  resultsMetaBar,
  sortSelectStyle,
} from "../style";
import type { JobListProps } from "../types";

import JobCardSkeleton from "./JobListSkeleton";

import NoDataFound from "@/components/NoDataFound/NoDataFound";

const JobList = ({
  jobs,
  pagination,
  sort,
  isLoading,
  onSortChange,
  onPageChange,
  onApply,
}: JobListProps) => {
  const theme = useTheme();

  return (
    <>
      <Box sx={resultsMetaBar}>
        <Typography
          variant="body-medium"
          sx={{ color: theme.palette.black.secondary }}
        >
          Showing{" "}
          <strong style={{ color: theme.palette.black.main }}>
            {pagination?.from ?? 1} - {pagination?.to ?? jobs.length}
          </strong>{" "}
          of{" "}
          <strong style={{ color: theme.palette.black.main }}>
            {pagination?.total ?? jobs.length}
          </strong>{" "}
          jobs
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography
            variant="body1-medium"
            sx={{ color: theme.palette.black.secondary }}
          >
            Sort by:
          </Typography>
          <Select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            IconComponent={KeyboardArrowDownIcon}
            sx={sortSelectStyle}
          >
            <MenuItem value="recent">Most Recent</MenuItem>
            <MenuItem value="salary-high">Salary: High to Low</MenuItem>
            <MenuItem value="salary-low">Salary: Low to High</MenuItem>
            <MenuItem value="experience">Experience: Low to High</MenuItem>
          </Select>
        </Box>
      </Box>
      <Box sx={jobListingScroll}>
        {isLoading && (
          <Box>
            {[1, 2, 3, 4].map((i) => (
              <JobCardSkeleton key={i} />
            ))}
          </Box>
        )}

        {!isLoading && jobs.length > 0 && (
          <Box>
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} onApply={onApply} />
            ))}
          </Box>
        )}

        {!isLoading && jobs.length === 0 && (
          <NoDataFound
            noImage
            message="No job openings match your criteria. Try adjusting your filters or search keywords."
          />
        )}
      </Box>

      {pagination && pagination.totalPages > 1 && (
        <Box sx={paginationWrapper}>
          <Pagination
            count={pagination.totalPages}
            page={pagination.page}
            onChange={(_, page) => onPageChange(page)}
            siblingCount={1}
            boundaryCount={1}
            shape="rounded"
            sx={paginationStyle}
          />
        </Box>
      )}
    </>
  );
};

export default JobList;
