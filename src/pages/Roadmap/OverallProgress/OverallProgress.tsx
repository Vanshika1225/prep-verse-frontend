import { Box, Skeleton, Typography, useTheme } from "@mui/material";

import {
  chartStyle,
  chartValue,
  mainStyleWrapper,
  statContentinnerBox,
  statListStyle,
} from "../style";
import type { OverallProgressData } from "../type";

interface OverallProgressWidgetProps {
  progress?: OverallProgressData;
  isLoading?: boolean;
}

const OverallProgress = ({
  progress,
  isLoading = false,
}: OverallProgressWidgetProps) => {
  const theme = useTheme();

  const percentage = progress?.overallPercentage ?? 0;
  const inProgressCount = progress?.roadmapsInProgress ?? 0;
  const completedMilestones = progress?.completedMilestones ?? 0;
  const totalMilestones = progress?.totalMilestones ?? 0;
  const totalRoadmaps = progress?.totalRoadmaps ?? 0;
  const totalInvestedDisplay = progress?.totalTimeInvested?.display ?? "0 hrs";

  const size = 110;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const statListData = [
    {
      label: "Roadmaps in Progress",
      value: inProgressCount,
    },
    {
      label: "Completed Milestones",
      value: `${completedMilestones} / ${totalMilestones}`,
    },
    {
      label: "Total Roadmaps",
      value: totalRoadmaps,
    },
    {
      label: "Total Time Invested",
      value: totalInvestedDisplay,
    },
  ];

  return (
    <Box sx={mainStyleWrapper}>
      <Typography
        variant="h6-bold"
        sx={{
          color: theme.palette.black.main,
        }}
      >
        Overall Progress
      </Typography>

      <Box sx={chartStyle}>
        <Box
          sx={{
            position: "relative",
            width: size,
            height: size,
            flexShrink: 0,
          }}
        >
          {isLoading ? (
            <Skeleton
              variant="circular"
              width={size}
              height={size}
              animation="wave"
            />
          ) : (
            <>
              <svg width={size} height={size}>
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="#F3EEFF"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />

                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="#5023e7"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                  style={{ transition: "stroke-dashoffset 0.6s ease" }}
                />
              </svg>

              <Box sx={chartValue}>
                <Typography
                  variant="h6-bold"
                  sx={{
                    color: theme.palette.black.main,
                    lineHeight: 1.1,
                  }}
                >
                  {percentage}%
                </Typography>

                <Typography
                  variant="body1-medium"
                  sx={{
                    color: theme.palette.black.secondary,
                  }}
                >
                  Overall
                </Typography>
              </Box>
            </>
          )}
        </Box>

        <Box sx={statListStyle}>
          {statListData.map((item) => (
            <Box key={item.label} sx={statContentinnerBox}>
              <Typography
                variant="body1-medium"
                sx={{
                  color: theme.palette.black.secondary,
                  flexShrink: 0,
                }}
              >
                {item.label}
              </Typography>

              {isLoading ? (
                <Skeleton
                  variant="text"
                  width={45}
                  height={22}
                  animation="wave"
                  sx={{ flexShrink: 0 }}
                />
              ) : (
                <Typography
                  variant="body1-bold"
                  sx={{
                    color: theme.palette.black.main,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.value}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default OverallProgress;
