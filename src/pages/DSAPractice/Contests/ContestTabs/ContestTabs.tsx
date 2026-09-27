import { ArrowForwardRounded } from "@mui/icons-material";
import { Box, Button, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { useState } from "react";

import ContestCard from "../ContestCard/ContestCard";
import ContestFilters from "../ContestFilters/ContestFilters";
import { filterContests } from "../ContestsUtils";
import ContestCardSkeleton from "../LoadingSkeletonComponents/ContestDataLoading";
import UpcomingContestsModal from "../UpcommingContestModal/UpcommingContestModal";
import { card } from "../style";
import { defaultContestFilters, type ContestFilterState } from "../types";

import {
  useGetCompletedContestsQuery,
  useGetLiveContestsQuery,
  useGetUpcomingContestsQuery,
} from "@/services/contestsApi";

const PAGE_SIZE = 6;

const ContestTabs = () => {
  const theme = useTheme();

  const [tab, setTab] = useState(0);
  const [modalPage, setModalPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState<ContestFilterState>(
    defaultContestFilters,
  );
  const [modalFilters, setModalFilters] = useState<ContestFilterState>(
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

  const contestsForFiltering = source.map((contest) => ({
    ...contest,
    registrationUrl: contest.url ?? "",
  })) as Parameters<typeof filterContests>[0];

  const filteredContests = filterContests(contestsForFiltering, filters);
  const contests = filteredContests.slice(0, 4);

  const modalFilteredContests = filterContests(
    contestsForFiltering,
    modalFilters,
  );

  const modalTotalPages = Math.max(
    1,
    Math.ceil(modalFilteredContests.length / PAGE_SIZE),
  );

  const currentModalPage = Math.min(modalPage, modalTotalPages);

  const modalContests = modalFilteredContests.slice(
    (currentModalPage - 1) * PAGE_SIZE,
    currentModalPage * PAGE_SIZE,
  );

  const loading =
    tab === 0 ? upcomingLoading : tab === 1 ? liveLoading : completedLoading;

  const title =
    tab === 0
      ? "Upcoming Contests"
      : tab === 1
        ? "Ongoing Contests"
        : "Completed Contests";

  const handleTabChange = (_: unknown, value: number) => {
    setTab(value);
    setModalOpen(false);
    setModalPage(1);
    setModalFilters(defaultContestFilters);
  };

  const handleOpenModal = () => {
    setModalFilters(filters);
    setModalPage(1);
    setModalOpen(true);
  };

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
      <Tabs value={tab} onChange={handleTabChange} sx={ContestTabStyle}>
        <Tab label="Upcoming" disableRipple />
        <Tab label="Ongoing" disableRipple />
        <Tab label="Completed" disableRipple />
      </Tabs>

      <ContestFilters value={filters} onChange={setFilters} />

      <Typography
        variant="h6-bold"
        sx={{
          mt: "20px",
          mb: "14px",
          color: theme.palette.appText.main,
        }}
      >
        {title}
      </Typography>

      <Box sx={{ ...card, overflow: "hidden" }}>
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <ContestCardSkeleton key={i} />
          ))
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

        {!loading && contests.length > 0 && (
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
              onClick={handleOpenModal}
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
              View All {title}
            </Button>
          </Box>
        )}

        <UpcomingContestsModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          contests={modalContests}
          filters={modalFilters}
          onFiltersChange={setModalFilters}
          page={currentModalPage}
          totalPages={modalTotalPages}
          totalCount={modalFilteredContests.length}
          onPageChange={setModalPage}
          title={title}
        />
      </Box>
    </Box>
  );
};

export default ContestTabs;
