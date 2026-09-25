import { Box, Button, Typography, useTheme } from "@mui/material";

import PlatformLogo from "../PlatformLogo";
import { card, labelSx, valueSx } from "../style";

import { useGetContestAnalyticsQuery } from "@/services/contestsApi";
import { formatDate, formatNumber } from "@/utils/DateUtilityFunctions";

const RecentCompleted = () => {
  const theme = useTheme();

  const { data } = useGetContestAnalyticsQuery();

  const contests = data?.data.recentContests ?? [];

  if (!contests.length) {
    return null;
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "12px",
        }}
      >
        <Typography
          variant="h6-bold"
          sx={{
            color: theme.palette.appText.main,
          }}
        >
          Recent Completed Contests
        </Typography>

        <Typography
          variant="body1-bold"
          sx={{
            color: theme.palette.primary.main,
            cursor: "pointer",
          }}
        >
          View All
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: "12px",
        }}
      >
        {contests.slice(0, 4).map((contest) => {
          const change = contest.ratingChange;
          const positive = change !== null && change > 0;

          return (
            <Box key={contest.contestId} sx={{ ...card, p: "14px 13px 12px" }}>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <PlatformLogo platform={contest.platform} size={24} />

                <Box
                  sx={{ minWidth: 0, display: "flex", flexDirection: "column" }}
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

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1.7fr 1fr",
                  mt: "22px",
                  mb: "16px",
                }}
              >
                <Box>
                  <Typography variant="body1-medium" sx={labelSx}>
                    Rank
                  </Typography>

                  <Typography sx={valueSx}>
                    {contest.rank === null
                      ? "-"
                      : contest.totalParticipants
                        ? `${formatNumber(contest.rank)} / ${formatNumber(contest.totalParticipants)}`
                        : formatNumber(contest.rank)}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="body1-medium" sx={labelSx}>
                    Rating Change
                  </Typography>

                  <Typography
                    sx={{
                      ...valueSx,
                      color: positive
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
  );
};

export default RecentCompleted;
