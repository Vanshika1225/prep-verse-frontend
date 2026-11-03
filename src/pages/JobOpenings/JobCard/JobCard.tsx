import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import { Avatar, Box, Button, Typography, useTheme } from "@mui/material";
import { useState } from "react";

import {
  actionButtonsRow,
  appliedBadgeBtn,
  applyNowBtn,
  companyLogoBox,
  companyLogoImg,
  jobCardAvatarStyle,
  jobCardContainer,
  jobCardInfo,
  jobCardLeft,
  jobCardRight,
  jobCardRightInnerBox,
  jobMetaItem,
  jobMetaList,
  jobTitleRow,
  newBadge,
  workModeBadge,
} from "../style";
import type { JobCardProps, JobItem } from "../types";

import { formatRelativeTime } from "@/utils/CommonMethods";

const formatSalary = (salary: JobItem["salary"]): string => {
  if (salary?.display && salary.display !== "Not disclosed") {
    return salary.display;
  }
  if (salary?.min && salary?.max) {
    return `₹${salary.min} - ${salary.max} LPA`;
  }
  return "Salary Disclosed on Apply";
};

const JobCard = ({ job, onApply, onSave }: JobCardProps) => {
  const theme = useTheme();
  const [isSaved, setIsSaved] = useState(Boolean(job.isSaved));

  const handleSaveToggle = () => {
    setIsSaved((prev) => !prev);
    onSave?.(job);
  };

  return (
    <Box sx={jobCardContainer}>
      <Box sx={jobCardLeft}>
        <Box sx={companyLogoBox}>
          {job.companyLogo ? (
            <Box
              component="img"
              src={job.companyLogo}
              alt={job.company}
              sx={companyLogoImg}
              onError={(e: any) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <Avatar sx={jobCardAvatarStyle}>{job.company.charAt(0)}</Avatar>
          )}
        </Box>

        <Box sx={jobCardInfo}>
          <Box sx={jobTitleRow}>
            <Typography
              variant="p-bold"
              sx={{ color: theme.palette.black.main, fontSize: 15 }}
            >
              {job.title}
            </Typography>
            {job.isNew && <Box sx={newBadge}>New</Box>}
          </Box>

          <Typography
            variant="body-medium"
            sx={{ color: theme.palette.black.secondary, mt: 0.3 }}
          >
            {job.company}
          </Typography>

          <Box sx={jobMetaList}>
            <Box sx={jobMetaItem}>
              <PlaceOutlinedIcon sx={{ fontSize: 15 }} />
              <span>{job.location}</span>
            </Box>

            <Box sx={jobMetaItem}>
              <WorkOutlineOutlinedIcon sx={{ fontSize: 15 }} />
              <span>{job.experience?.display ?? "0-2 Yrs"}</span>
            </Box>

            <Box sx={jobMetaItem}>
              <AccessTimeOutlinedIcon sx={{ fontSize: 15 }} />
              <span>{job.jobType}</span>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={jobCardRight}>
        <Box sx={jobCardRightInnerBox}>
          <Typography
            variant="p-bold"
            sx={{ color: theme.palette.black.main, fontWeight: 700 }}
          >
            {formatSalary(job.salary)}
          </Typography>

          <Box sx={workModeBadge(theme, job.workMode)}>{job.workMode}</Box>
        </Box>

        <Typography
          variant="body1-medium"
          sx={{ color: theme.palette.black.secondary, my: { xs: 0, md: 0.5 } }}
        >
          {formatRelativeTime(job.postedAt)}
        </Typography>

        <Box sx={actionButtonsRow}>
          {job.isApplied ? (
            <Button
              startIcon={<span aria-hidden="true">✓</span>}
              sx={appliedBadgeBtn}
            >
              Applied
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => onApply(job)}
              sx={applyNowBtn}
            >
              Apply Now
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default JobCard;
