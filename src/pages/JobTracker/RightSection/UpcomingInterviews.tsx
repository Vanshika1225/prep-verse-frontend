import { Avatar, Box, Skeleton, Typography, useTheme } from "@mui/material";

import {
  upcomingInterviewsAvatar,
  upcomingInterviewsCompanyBox,
  upcomingInterviewsCompanyName,
  upcomingInterviewsList,
  upcomingInterviewsRole,
  upcomingInterviewsRow,
  upcomingInterviewsSkeletonRow,
  upcomingInterviewsWrapper,
} from "../style";
import type { UpcomingInterviewItem } from "../types";

import NoDataFound from "@/components/NoDataFound/NoDataFound";
import { useGetUpcomingInterviewsQuery } from "@/services/jobTrackerApi";

export const UpcomingInterviews = () => {
  const theme = useTheme();
  const { data: interviewResponse, isLoading } =
    useGetUpcomingInterviewsQuery();
  const interviews: UpcomingInterviewItem[] = interviewResponse?.data ?? [];

  return (
    <Box sx={upcomingInterviewsWrapper(theme)}>
      <Typography variant="h6-bold">Upcoming Interviews</Typography>

      <Box sx={upcomingInterviewsList}>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <Box key={idx} sx={upcomingInterviewsSkeletonRow(theme)}>
              <Skeleton
                variant="rounded"
                width={32}
                height={32}
                sx={{ borderRadius: "6px" }}
              />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="60%" height={18} />
                <Skeleton variant="text" width="40%" height={14} />
              </Box>
              <Skeleton variant="text" width={50} height={20} />
            </Box>
          ))
        ) : interviews.length === 0 ? (
          <NoDataFound
            noImage={false}
            message="No upcoming interviews scheduled"
          />
        ) : (
          interviews.map((item, index) => (
            <Box
              key={item._id}
              sx={upcomingInterviewsRow(theme, index === interviews.length - 1)}
            >
              <Box sx={upcomingInterviewsCompanyBox}>
                <Avatar
                  src={item.companyLogo ?? undefined}
                  alt={item.company}
                  variant="rounded"
                  sx={upcomingInterviewsAvatar(theme)}
                >
                  {item.company.charAt(0).toUpperCase()}
                </Avatar>

                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    variant="body-bold"
                    sx={upcomingInterviewsCompanyName}
                  >
                    {item.company}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={upcomingInterviewsRole(theme)}
                  >
                    {item.role} {item.round ? `(${item.round})` : ""}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.black.main, display: "block" }}
                >
                  {item.displayDate}
                </Typography>
                {item.interviewTime && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.black.secondary,
                      display: "block",
                    }}
                  >
                    {item.interviewTime}
                  </Typography>
                )}
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};
