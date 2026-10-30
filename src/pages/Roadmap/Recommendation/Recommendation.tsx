import CloudQueueRoundedIcon from "@mui/icons-material/CloudQueueRounded";
import PhoneAndroidRoundedIcon from "@mui/icons-material/PhoneAndroidRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import { Box, Skeleton, Typography, useTheme } from "@mui/material";

import {
  descriptionStyle,
  displayItemBox,
  displayItemInnerBox,
  flexColumn,
  mainStyleWrapper,
  newitem,
  noDataFoundBox,
  recommendationInnerBox,
  skeletonBox,
  titleStyle,
} from "../style";
import type { RecommendedRoadmap } from "../type";

import NoDataFound from "@/components/NoDataFound/NoDataFound";

interface RecommendedWidgetProps {
  items?: RecommendedRoadmap[];
  isLoading?: boolean;
  onViewAll?: () => void;
  onSelectRoadmap?: (roadmap: RecommendedRoadmap) => void;
}

const Recommendation = ({
  items = [],
  isLoading = false,
  onViewAll,
  onSelectRoadmap,
}: RecommendedWidgetProps) => {
  const theme = useTheme();

  const getIcon = (title: string) => {
    const lower = title.toLowerCase();

    if (lower.includes("mobile")) {
      return (
        <PhoneAndroidRoundedIcon
          sx={{ fontSize: 20, color: theme.palette.primary.main }}
        />
      );
    }

    if (lower.includes("devops") || lower.includes("cloud")) {
      return (
        <CloudQueueRoundedIcon
          sx={{ fontSize: 20, color: theme.palette.primary.main }}
        />
      );
    }

    return (
      <RocketLaunchRoundedIcon
        sx={{ fontSize: 20, color: theme.palette.primary.main }}
      />
    );
  };

  const displayItems = items.slice(0, 3);

  return (
    <Box sx={mainStyleWrapper}>
      <Box sx={recommendationInnerBox}>
        <Typography
          variant="p-bold"
          sx={{
            color: theme.palette.black.main,
          }}
        >
          Recommended for You
        </Typography>

        {!isLoading && items.length > 3 && (
          <Typography
            onClick={onViewAll}
            variant="body1-medium"
            sx={{
              color: theme.palette.primary.main,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            View All
          </Typography>
        )}
      </Box>

      <Box sx={{ ...flexColumn, gap: 1.5 }}>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Box key={index} sx={skeletonBox}>
              <Skeleton
                variant="rounded"
                width={38}
                height={38}
                sx={{ borderRadius: "10px", flexShrink: 0 }}
              />

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Skeleton variant="text" width="65%" height={20} />
                <Skeleton variant="text" width="90%" height={16} />
              </Box>
            </Box>
          ))
        ) : displayItems.length === 0 ? (
          <Box sx={{ ...noDataFoundBox, minHeight: 180 }}>
            <NoDataFound message="No recommended roadmaps found." />
          </Box>
        ) : (
          displayItems.map((item) => (
            <Box key={item.title} sx={displayItemBox}>
              <Box
                sx={displayItemInnerBox}
                onClick={() => onSelectRoadmap?.(item)}
              >
                <Box sx={titleStyle}>{getIcon(item.title)}</Box>

                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={newitem}>{item.title}</Typography>

                  <Typography sx={descriptionStyle}>
                    {item.description}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default Recommendation;
