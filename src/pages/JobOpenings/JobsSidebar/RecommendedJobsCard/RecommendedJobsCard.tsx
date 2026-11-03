import { Avatar, Box, Typography, useTheme } from "@mui/material";

import {
  companyLogoBox,
  companyLogoImg,
  companyNameAvatar,
  flexColumn,
  recommendationTitleSTyle,
  recommendedItemContainer,
  sidebarCard,
} from "../../style";
import type { RecommendedJobsCardProps } from "../../types";

const RecommendedJobsCard = ({
  jobs,
  onSelectJob,
}: RecommendedJobsCardProps) => {
  const theme = useTheme();

  return (
    <Box sx={sidebarCard}>
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="p-bold"
          sx={{ color: theme.palette.black.main, fontSize: 15, mb: 2 }}
        >
          Recommended for You
        </Typography>
      </Box>

      {jobs.slice(0, 3).map((job) => (
        <Box
          key={job._id}
          onClick={() => onSelectJob?.(job)}
          sx={{ ...recommendedItemContainer, cursor: "pointer" }}
        >
          <Box sx={{ display: "flex", gap: 1.5, minWidth: 0 }}>
            <Box sx={{ ...companyLogoBox, width: 38, height: 38 }}>
              {job.companyLogo ? (
                <Box
                  component="img"
                  src={job.companyLogo}
                  alt={job.company}
                  sx={companyLogoImg}
                />
              ) : (
                <Avatar sx={companyNameAvatar}>{job.company.charAt(0)}</Avatar>
              )}
            </Box>

            <Box sx={flexColumn}>
              <Typography variant="body-bold" sx={recommendationTitleSTyle}>
                {job.title}
              </Typography>
              <Typography
                variant="body1-medium"
                sx={{ color: theme.palette.black.secondary }}
              >
                {job.company}
              </Typography>

              <Box sx={{ ...flexColumn, flexWrap: "wrap", mb: 2, gap: 1 }}>
                <Typography
                  variant="body1-medium"
                  sx={{ color: theme.palette.black.secondary, fontSize: 11 }}
                >
                  {job.location}
                </Typography>
                <Typography
                  variant="body1-medium"
                  sx={{ color: theme.palette.black.main, fontSize: 11 }}
                >
                  Salary: {job.salary?.display ?? "Not Disclosed"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default RecommendedJobsCard;
