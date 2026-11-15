import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

import {
  jobCardAvatar,
  jobCardChip,
  jobCardCompanyBox,
  jobCardCompanyName,
  jobCardFooter,
  jobCardHeaderBox,
  jobCardLocationBox,
  jobCardLocationIcon,
  jobCardLocationText,
  jobCardRole,
  jobCardStageSubtitle,
  jobCardWrapper,
} from "../style";
import { ALL_STATUSES, type JobCardProps } from "../types";

const getTagColor = (theme: any, tag: string, status: string) => {
  switch (tag.toLowerCase() ?? status.toLowerCase()) {
    case "new":
    case "applied":
      return {
        color: theme.palette.primary.main,
        bgcolor: theme.palette.primary.main100,
      };
    case "oa":
    case "oa / assessment":
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

export const JobCard = ({
  item,
  onEdit,
  onDelete,
  onUpdateStatus,
}: JobCardProps) => {
  const theme = useTheme();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const tagStyle = getTagColor(theme, item.tag ?? item.status, item.status);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
    e.dataTransfer.effectAllowed = "move";
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <Box
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sx={jobCardWrapper(theme, isDragging)}
    >
      <Box sx={jobCardHeaderBox}>
        <Box sx={jobCardCompanyBox}>
          <Avatar
            src={item.companyLogo ?? undefined}
            alt={item.company}
            variant="rounded"
            sx={jobCardAvatar(theme, item.companyLogo)}
          >
            {item.company.charAt(0).toUpperCase()}
          </Avatar>

          <Typography variant="body-bold" sx={jobCardCompanyName}>
            {item.company}
          </Typography>
        </Box>

        <Chip
          label={item.tag ?? item.status}
          size="small"
          sx={jobCardChip(tagStyle)}
        />
      </Box>

      <Typography variant="body-medium" sx={jobCardRole(theme)}>
        {item.role}
      </Typography>

      {item.location && (
        <Box sx={jobCardLocationBox}>
          <LocationOnOutlinedIcon sx={jobCardLocationIcon(theme)} />
          <Typography variant="caption" sx={jobCardLocationText(theme)}>
            {item.location}
          </Typography>
        </Box>
      )}

      <Typography variant="caption" sx={jobCardStageSubtitle(theme)}>
        {item.stageSubtitle ?? "In Progress"}
      </Typography>

      <Box sx={jobCardFooter(theme)}>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <Tooltip title="Edit Application">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(item);
              }}
              sx={{ color: theme.palette.black.secondary, p: 0.4 }}
            >
              <EditOutlinedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>

          {item.jobUrl ? (
            <Tooltip title="Open Job Link">
              <IconButton
                size="small"
                component="a"
                href={item.jobUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                sx={{ color: theme.palette.black.secondary, p: 0.4 }}
              >
                <OpenInNewRoundedIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Notes">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(item);
                }}
                sx={{ color: theme.palette.black.secondary, p: 0.4 }}
              >
                <InsertDriveFileOutlinedIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            setMenuAnchor(e.currentTarget);
          }}
          sx={{ color: theme.palette.black.secondary, p: 0.4 }}
        >
          <MoreHorizRoundedIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
      >
        {ALL_STATUSES.map((status) => (
          <MenuItem
            key={status}
            selected={item.status === status}
            onClick={() => {
              onUpdateStatus(item, status);
              setMenuAnchor(null);
            }}
          >
            Move to {status}
          </MenuItem>
        ))}

        <MenuItem
          onClick={() => {
            onDelete(item);
            setMenuAnchor(null);
          }}
          sx={{ color: theme.palette.error.main }}
        >
          Delete Application
        </MenuItem>
      </Menu>
    </Box>
  );
};
