import { Box, Skeleton, Typography, useTheme } from "@mui/material";

import {
  dataCardBadge,
  flexColumn,
  hiddenNoWrap,
  mainStyleWrapper,
  noDataFoundBox,
  upcommingMilestoneMainStyle,
} from "../style";
import type { UpcomingMilestone } from "../type";

import NoDataFound from "@/components/NoDataFound/NoDataFound";

interface UpcomingMilestonesWidgetProps {
  milestones?: UpcomingMilestone[];
  isLoading?: boolean;
  onViewAll?: () => void;
  onMilestoneSelect?: (milestone: UpcomingMilestone) => void;
}

const parseDateParts = (dueDateStr: string) => {
  const date = new Date(dueDateStr);

  if (isNaN(date.getTime())) {
    return { month: "MAY", day: "21" };
  }

  const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const day = String(date.getDate()).padStart(2, "0");

  return { month, day };
};

const UpcomingMilestonesWidget = ({
  milestones = [],
  isLoading = false,
  onMilestoneSelect,
}: UpcomingMilestonesWidgetProps) => {
  const theme = useTheme();

  const displayItems = milestones.slice(0, 4);

  return (
    <Box sx={mainStyleWrapper}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="p-bold"
          sx={{
            color: theme.palette.black.main,
          }}
        >
          Upcoming Milestones
        </Typography>
      </Box>

      <Box sx={{ ...flexColumn, gap: 1.5 }}>
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.8,
                p: 0.8,
              }}
            >
              <Skeleton
                variant="rounded"
                width={44}
                height={44}
                sx={{ borderRadius: "10px", flexShrink: 0 }}
              />

              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Skeleton variant="text" width="75%" height={20} />
                <Skeleton variant="text" width="90%" height={16} />
              </Box>
            </Box>
          ))
        ) : displayItems.length === 0 ? (
          <Box
            sx={{
              ...noDataFoundBox,
              minHeight: 180,
            }}
          >
            <NoDataFound message="No upcoming milestones found." />
          </Box>
        ) : (
          displayItems.map((item) => {
            const { month, day } = parseDateParts(item.dueDate);

            return (
              <Box
                key={item.milestoneId || item.title}
                sx={upcommingMilestoneMainStyle}
                onClick={() => onMilestoneSelect?.(item)}
              >
                <Box sx={dataCardBadge}>
                  <Typography
                    sx={{
                      fontSize: "9px",
                      fontWeight: 700,
                      color: theme.palette.primary.main,
                      lineHeight: 1,
                    }}
                  >
                    {month}
                  </Typography>

                  <Typography
                    variant="p-bold"
                    sx={{
                      color: theme.palette.black.main,
                      lineHeight: 1.2,
                    }}
                  >
                    {day}
                  </Typography>
                </Box>

                <Box sx={{...flexColumn}}>
                  <Typography
                    variant="body-medium"
                    sx={{
                      ...hiddenNoWrap,
                      color: theme.palette.black.main,
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    variant="body1-medium"
                    sx={{
                      ...hiddenNoWrap,
                      color: theme.palette.black.secondary,
                    }}
                  >
                    {item.roadmapTitle}
                  </Typography>
                </Box>
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default UpcomingMilestonesWidget;
