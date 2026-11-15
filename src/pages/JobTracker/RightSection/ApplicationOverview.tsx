import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import { Box, Skeleton, Typography, useTheme } from "@mui/material";

import {
  applicationOverviewStyleBox,
  innerBoxOfStatCard,
  outerBoxOfStatCard,
  statCardBox,
  statCradIcon,
} from "../style";

import { useGetApplicationStatsQuery } from "@/services/jobTrackerApi";

export const ApplicationOverview = () => {
  const theme = useTheme();
  const { data: statsResponse, isLoading } = useGetApplicationStatsQuery();
  const overview = statsResponse?.data?.overview;

  const statCards = [
    {
      title: "Applications",
      value: overview?.totalApplications ?? 0,
      icon: ArticleOutlinedIcon,
      color: theme.palette.primary.main,
      bg: theme.palette.primary.main100,
    },
    {
      title: "Interviews",
      value: overview?.interviews ?? 0,
      icon: ForumOutlinedIcon,
      color: theme.palette.warning.main,
      bg: theme.palette.warning.light,
    },
    {
      title: "Offers",
      value: overview?.offers ?? 0,
      icon: CardGiftcardOutlinedIcon,
      color: theme.palette.success.main,
      bg: theme.palette.success.light,
    },
    {
      title: "Rejections",
      value: overview?.rejections ?? 0,
      icon: CancelOutlinedIcon,
      color: theme.palette.error.main,
      bg: theme.palette.error.light,
    },
  ];

  return (
    <Box sx={applicationOverviewStyleBox}>
      <Typography variant="h6-bold">Application Overview</Typography>

      <Box sx={statCardBox}>
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <Box key={stat.title} sx={outerBoxOfStatCard}>
              <Box sx={innerBoxOfStatCard}>
                <Box
                  sx={{ ...statCradIcon, bgcolor: stat.bg, color: stat.color }}
                >
                  <Icon sx={{ fontSize: 18 }} />
                </Box>
              </Box>

              {isLoading ? (
                <Skeleton variant="text" width={40} height={32} />
              ) : (
                <Typography variant="h5-medium" sx={{ display: "block" }}>
                  {stat?.value ?? 0}
                </Typography>
              )}

              <Typography
                variant="caption"
                sx={{ color: theme.palette.black.secondary }}
              >
                {stat.title}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
