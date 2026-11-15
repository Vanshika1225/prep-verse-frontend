import {
  Avatar,
  Box,
  Chip,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";

import {
  recentActivityAvatar,
  recentActivityChip,
  recentActivityCompanyBox,
  recentActivityHeader,
  recentActivityList,
  recentActivityRow,
  recentActivitySkeletonRow,
  recentActivityTitle,
  recentActivityWrapper,
} from "../style";
import type { RecentActivityItem } from "../types";

import NoDataFound from "@/components/NoDataFound/NoDataFound";
import { useGetRecentActivityQuery } from "@/services/jobTrackerApi";

const getTypeStyle = (theme: any, type: string) => {
  switch (type.toLowerCase()) {
    case "applied":
      return {
        color: theme.palette.primary.main,
        bgcolor: theme.palette.primary.main100,
      };
    case "oa / assessment":
    case "oa":
      return {
        color: theme.palette.secondary.main,
        bgcolor: theme.palette.secondary.main100,
      };
    case "interview":
      return {
        color: theme.palette.warning.main100,
        bgcolor: theme.palette.warning.light,
      };
    case "offer":
      return {
        color: theme.palette.success.main100,
        bgcolor: theme.palette.success.light,
      };
    case "rejected":
      return {
        color: theme.palette.error.main,
        bgcolor: theme.palette.error.light,
      };
    default:
      return {
        color: theme.palette.black.secondary,
        bgcolor: theme.palette.white.main400,
      };
  }
};

export const RecentActivity = () => {
  const theme = useTheme();
  const { data: activityResponse, isLoading } = useGetRecentActivityQuery();
  const activities: RecentActivityItem[] = activityResponse?.data ?? [];

  return (
    <Box sx={recentActivityWrapper(theme)}>
      <Box sx={recentActivityHeader}>
        <Typography variant="h6-bold">Recent Activity</Typography>
      </Box>

      <Box sx={recentActivityList}>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <Box key={idx} sx={recentActivitySkeletonRow(theme)}>
              <Skeleton
                variant="rounded"
                width={36}
                height={36}
                sx={{ borderRadius: "8px" }}
              />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="60%" height={20} />
                <Skeleton variant="text" width="30%" height={16} />
              </Box>
              <Skeleton
                variant="rounded"
                width={70}
                height={24}
                sx={{ borderRadius: "6px" }}
              />
              <Skeleton variant="text" width={60} height={16} />
            </Box>
          ))
        ) : activities.length === 0 ? (
          <NoDataFound
            noImage={false}
            message="Recent application activities will appear here."
          />
        ) : (
          activities.map((act, index) => {
            const typeStyle = getTypeStyle(theme,act.type);

            return (
              <Box
                key={act._id}
                sx={recentActivityRow(theme, index === activities.length - 1)}
              >
                <Box sx={recentActivityCompanyBox}>
                  <Avatar
                    src={act.companyLogo ?? undefined}
                    alt={act.company}
                    variant="rounded"
                    sx={recentActivityAvatar(theme)}
                  >
                    {act.company?.charAt(0).toUpperCase()}
                  </Avatar>

                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography variant="body-bold" sx={recentActivityTitle}>
                      {act.title}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.palette.black.secondary,
                        display: "block",
                      }}
                    >
                      {act.role}
                    </Typography>
                  </Box>
                </Box>

                <Chip
                  label={act.type}
                  size="small"
                  sx={recentActivityChip(typeStyle)}
                />
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
};
