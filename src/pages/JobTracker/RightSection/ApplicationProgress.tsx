import { Box, Skeleton, Typography, useTheme } from "@mui/material";

import {
  applicationProgressContent,
  applicationProgressLegend,
  applicationProgressLegendDot,
  applicationProgressLegendLabelBox,
  applicationProgressLegendRow,
  applicationProgressSkeletonLines,
  applicationProgressSkeletonWrapper,
  applicationProgressWrapper,
} from "../style";

import PieChart from "@/components/ChartComponent/PieChart";
import NoDataFound from "@/components/NoDataFound/NoDataFound";
import { useGetApplicationStatsQuery } from "@/services/jobTrackerApi";

export const ApplicationProgress = () => {
  const theme = useTheme();
  const { data: statsResponse, isLoading } = useGetApplicationStatsQuery();
  const progress = statsResponse?.data?.progress;

  const colorMapping: Record<string, string> = {
    Applied: theme.palette.primary.main,
    OA: theme.palette.secondary.main,
    Interview: theme.palette.warning.main,
    Offer: theme.palette.success.main,
    Rejected: theme.palette.error.main,
  };

  const breakdown = progress?.breakdown ?? [];

  const visibleItems = breakdown.filter((item) => item.percentage > 0);
  const hasData = visibleItems.length > 0;

  const chartData = visibleItems.map((item) => ({
    name: item.status,
    value: item.count,
  }));

  const chartColors = visibleItems.map(
    (item) => colorMapping[item.status] ?? theme.palette.primary.main,
  );

  return (
    <Box sx={applicationProgressWrapper(theme)}>
      <Typography variant="h6-bold">Application Progress</Typography>

      {isLoading ? (
        <Box sx={applicationProgressSkeletonWrapper}>
          <Skeleton variant="circular" width={110} height={110} />
          <Box sx={applicationProgressSkeletonLines}>
            <Skeleton variant="text" width="90%" height={20} />
            <Skeleton variant="text" width="80%" height={20} />
            <Skeleton variant="text" width="70%" height={20} />
          </Box>
        </Box>
      ) : !hasData ? (
        <NoDataFound
          noImage={false}
          message="Application progress will appear here."
        />
      ) : (
        <Box sx={applicationProgressContent}>
          <Box sx={{ width: 140, flexShrink: 0 }}>
            <PieChart
              data={chartData}
              colors={chartColors}
              height={140}
              showLegend={false}
            />
          </Box>

          <Box sx={applicationProgressLegend}>
            {breakdown.map((item) => (
              <Box key={item.status} sx={applicationProgressLegendRow}>
                <Box sx={applicationProgressLegendLabelBox}>
                  <Box
                    sx={applicationProgressLegendDot(
                      colorMapping[item.status] ?? theme.palette.primary.main,
                    )}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: theme.palette.black.main200 }}
                  >
                    {item.status}
                  </Typography>
                </Box>

                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.black.main }}
                >
                  {item.count} ({item.percentage}%)
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};