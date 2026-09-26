import { ArrowForwardRounded } from "@mui/icons-material";
import { Box, Button, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { useState } from "react";

import ContestCard from "../ContestCard/ContestCard";
import ContestFilters from "../ContestFilters/ContestFilters";
import { filterContests } from "../ContestsUtils";
import { card } from "../style";
import { defaultContestFilters, type ContestFilterState } from "../types";

import {
  useGetCompletedContestsQuery,
  useGetLiveContestsQuery,
  useGetUpcomingContestsQuery,
} from "@/services/contestsApi";

const ContestTabs = () => {
  const theme = useTheme();

  const [tab, setTab] = useState(0);
  const [filters, setFilters] = useState<ContestFilterState>(
    defaultContestFilters,
  );

  const { data: upcoming, isLoading: upcomingLoading } =
    useGetUpcomingContestsQuery();

  const { data: live, isLoading: liveLoading } = useGetLiveContestsQuery();

  const { data: completed, isLoading: completedLoading } =
    useGetCompletedContestsQuery({
      page: 1,
      limit: 10,
    });

  const source =
    tab === 0
      ? (upcoming?.contests ?? [])
      : tab === 1
        ? (live?.contests ?? [])
        : (completed?.data.contests ?? []);

  const fileteredContests = filterContests(
    source.map((contest) => ({
      ...contest,
      type: contest.type ?? "",
      phase: contest.phase ?? "",
      registrationUrl: contest.url ?? "",
    })),
    filters,
  );

  const contests = fileteredContests.slice(0, 4);

  const loading =
    tab === 0 ? upcomingLoading : tab === 1 ? liveLoading : completedLoading;

  const title =
    tab === 0
      ? "Upcoming Contests"
      : tab === 1
        ? "Ongoing Contests"
        : "Completed Contests";

  const ContestTabStyle = {
    minHeight: 46,
    borderBottom: `1px solid ${theme.palette.border}`,
    "& .MuiTabs-indicator": {
      height: 2,
      bgcolor: theme.palette.primary.main,
    },
    "& .MuiTab-root": {
      minHeight: 46,
      minWidth: 0,
      px: 2,
      fontSize: 13,
      fontWeight: 500,
      textTransform: "none",
      color: theme.palette.appText.main,
    },
    "& .MuiTab-root.Mui-selected": {
      color: theme.palette.primary.main,
      fontWeight: 600,
    },
  };

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={(_, value) => setTab(value as number)}
        sx={ContestTabStyle}
      >
        <Tab label="Upcoming" disableRipple />
        <Tab label="Ongoing" disableRipple />
        <Tab label="Completed" disableRipple />
        <Tab label="Participated" disableRipple />
      </Tabs>

      <ContestFilters value={filters} onChange={setFilters} />

      <Typography
        variant="h6-bold"
        sx={{
          mt: "14px",
          mb: "14px",
          color: theme.palette.appText.main,
        }}
      >
        {title}
      </Typography>

      <Box sx={{ ...card, overflow: "hidden" }}>
        {loading ? (
          <Typography
            sx={{
              py: 6,
              textAlign: "center",
              color: theme.palette.appText.muted,
            }}
          >
            Loading contests...
          </Typography>
        ) : contests.length === 0 ? (
          <Typography
            sx={{
              py: 6,
              textAlign: "center",
              color: theme.palette.appText.muted,
            }}
          >
            No contests found
          </Typography>
        ) : (
          contests.map((contest) => (
            <ContestCard key={contest._id} contest={contest} live={tab === 1} />
          ))
        )}

        {tab === 0 && !loading && contests.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: "12px",
              borderTop: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Button
              variant="outlined"
              size="medium"
              endIcon={<ArrowForwardRounded sx={{ fontSize: 16 }} />}
              sx={{
                height: 32,
                px: 2,
                color: theme.palette.primary.main,
                borderColor: theme.palette.primary.main200,
                borderRadius: "6px",
                textTransform: "none",
                "&:hover": {
                  bgcolor: theme.palette.primary.main100,
                  borderColor: theme.palette.primary.main,
                },
              }}
            >
              View All Upcoming Contests
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ContestTabs;
