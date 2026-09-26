import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useState } from "react";

import PlatformLogo from "../PlatformLogo";
import {
  card,
  contestGrid,
  dateIconBox,
  labelSx,
  rankGrid,
  recentCompletedBox,
  recentModalWrapper,
  valueSx,
} from "../style";
import type { Contest } from "../types";

import ReusableModal from "@/components/ModalBox/ModalBox";
import { useGetContestAnalyticsQuery } from "@/services/contestsApi";
import { formatDate, formatNumber } from "@/utils/DateUtilityFunctions";

interface ContestAnalyticsResponse {
  data: {
    recentContests: Contest[];
    [key: string]: unknown;
  };
}

const RecentCompleted = () => {
  const theme = useTheme();

  const { data } = useGetContestAnalyticsQuery() as {
    data?: ContestAnalyticsResponse;
  };
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);

  const contests: Contest[] = data?.data.recentContests ?? [];

  if (!contests.length) {
    return null;
  }

  return (
    <>
      <Box sx={{ mt: 3 }}>
        <Box sx={recentCompletedBox}>
          <Typography
            variant="h6-bold"
            sx={{
              color: theme.palette.appText.main,
            }}
          >
            Recent Completed Contests
          </Typography>
        </Box>

        <Box sx={contestGrid}>
          {contests.slice(0, 4).map((contest) => {
            const change = contest.ratingChange;
            const positive = change !== null && change > 0;

            return (
              <Box
                key={contest.contestId}
                sx={{ ...card, p: "14px 13px 12px" }}
              >
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <PlatformLogo platform={contest.platform} size={24} />

                  <Box
                    sx={{
                      minWidth: 0,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      variant="body1-bold"
                      sx={{
                        lineHeight: "16px",
                        color: theme.palette.appText.main,
                        mt: "4px",
                      }}
                    >
                      {contest.name}
                    </Typography>

                    <Typography
                      variant="body1-medium"
                      sx={{
                        color: theme.palette.appText.label,
                        mt: "8px",
                      }}
                    >
                      {formatDate(contest.attendedAt, false)}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={rankGrid}>
                  <Box>
                    <Typography variant="body1-medium" sx={labelSx}>
                      Rank
                    </Typography>

                    <Typography sx={valueSx}>
                      {contest.rank === null ? "-" : formatNumber(contest.rank)}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="body1-medium" sx={labelSx}>
                      Rating Change
                    </Typography>

                    <Typography
                      sx={{
                        ...valueSx,
                        color:
                          change === null
                            ? theme.palette.appText.main
                            : positive
                              ? theme.palette.success.main
                              : theme.palette.error.main,
                      }}
                    >
                      {change === null
                        ? "-"
                        : `${change > 0 ? "+" : ""}${Math.round(change)}`}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  fullWidth
                  variant="outlined"
                  size="medium"
                  onClick={() => setSelectedContest(contest)}
                  sx={{
                    height: 32,
                    color: theme.palette.primary.main,
                    borderColor: theme.palette.border.main,
                    "&:hover": {
                      bgcolor: theme.palette.primary.main100,
                      borderColor: theme.palette.primary.main200,
                    },
                  }}
                >
                  View Details
                </Button>
              </Box>
            );
          })}
        </Box>
      </Box>

      {selectedContest && (
        <ReusableModal
          open={Boolean(selectedContest)}
          onClose={() => setSelectedContest(null)}
          maxWidth="sm"
          heading={
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                }}
              >
                <PlatformLogo platform={selectedContest.platform} size={50} />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    variant="h6-bold"
                    sx={{
                      color: theme.palette.appText.main,
                      lineHeight: 1.3,
                    }}
                  >
                    {selectedContest.name}
                  </Typography>
                  <Typography
                    variant="body1-medium"
                    sx={{
                      color: theme.palette.appText.label,
                      mt: 0.5,
                    }}
                  >
                    {selectedContest.platform}
                  </Typography>
                </Box>
              </Box>
            </Box>
          }
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1.5,
              mb: 3,
            }}
          >
            <Box
              sx={{
                ...recentModalWrapper,
                border: `1px solid ${theme.palette.border.main}`,
              }}
            >
              <Box
                sx={{
                  ...dateIconBox,
                  bgcolor: theme.palette.primary.main100,
                }}
              >
                <CalendarMonthRoundedIcon
                  sx={{ fontSize: 18, color: theme.palette.primary.main }}
                />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="body1-medium" sx={labelSx}>
                  Date
                </Typography>
                <Typography sx={{ ...valueSx, fontSize: 15 }}>
                  {formatDate(selectedContest.attendedAt, false)}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                ...recentModalWrapper,
                border: `1px solid ${theme.palette.border.main}`,
              }}
            >
              <Box
                sx={{
                  ...dateIconBox,
                  bgcolor: "#FFF4E5",
                }}
              >
                <EmojiEventsRoundedIcon
                  sx={{ fontSize: 18, color: "#F59E0B" }}
                />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="body1-medium" sx={labelSx}>
                  Rank
                </Typography>
                <Typography sx={{ ...valueSx, fontSize: 15 }}>
                  {selectedContest.rank === null
                    ? "-"
                    : formatNumber(selectedContest.rank)}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                ...recentModalWrapper,
                border: `1px solid ${theme.palette.border.main}`,
              }}
            >
              <Box
                sx={{
                  ...dateIconBox,
                  bgcolor: theme.palette.secondary.main100,
                }}
              >
                <HistoryRoundedIcon
                  sx={{
                    fontSize: 18,
                    color: theme.palette.primary.main,
                  }}
                />
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <Typography variant="body1-medium" sx={labelSx}>
                  Rating Before
                </Typography>

                <Typography sx={{ ...valueSx, fontSize: 15 }}>
                  {selectedContest.ratingBefore !== null &&
                  selectedContest.ratingBefore !== undefined
                    ? Math.round(selectedContest.ratingBefore)
                    : "-"}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                ...recentModalWrapper,
                border: `1px solid ${theme.palette.border.main}`,
              }}
            >
              <Box
                sx={{
                  ...dateIconBox,
                  bgcolor: "#E8F8EE",
                }}
              >
                <TrendingUpRoundedIcon
                  sx={{
                    fontSize: 18,
                    color: theme.palette.success.main,
                  }}
                />
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <Typography variant="body1-medium" sx={labelSx}>
                  Rating After
                </Typography>

                <Typography
                  sx={{
                    ...valueSx,
                    fontSize: 15,
                    color: theme.palette.success.main,
                  }}
                >
                  {selectedContest.ratingAfter !== null &&
                  selectedContest.ratingAfter !== undefined
                    ? Math.round(selectedContest.ratingAfter)
                    : "-"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </ReusableModal>
      )}
    </>
  );
};

export default RecentCompleted;
