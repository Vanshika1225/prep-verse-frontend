import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Box, Button, Skeleton, Typography, useTheme } from "@mui/material";
import { useState } from "react";

import {
  kanbanColumnCardsList,
  kanbanColumnCountBadge,
  kanbanColumnEmptyState,
  kanbanColumnHeader,
  kanbanColumnIconBox,
  kanbanColumnSkeletonCard,
  kanbanColumnSkeletonHeader,
  kanbanColumnTitle,
  kanbanColumnTitleBox,
  kanbanColumnTopAddButton,
  kanbanColumnWrapper,
} from "../style";
import type { ApplicationItem, KanbanColumnProps } from "../types";

import { JobCard } from "./JobCard";

export const KanbanColumn = ({
  title,
  defaultStatus,
  count,
  items,
  icon: Icon,
  iconColor,
  iconBg,
  isLoading,
  onAddNew,
  onEdit,
  onDelete,
  onUpdateStatus,
}: KanbanColumnProps) => {
  const theme = useTheme();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const dataStr = e.dataTransfer.getData("application/json");
    if (!dataStr) return;

    const droppedItem: ApplicationItem = JSON.parse(dataStr);
    if (droppedItem.status !== defaultStatus) {
      onUpdateStatus(droppedItem, defaultStatus);
    }
  };

  return (
    <Box
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={kanbanColumnWrapper(theme, isDragOver)}
    >
      <Box sx={kanbanColumnHeader}>
        <Box sx={kanbanColumnTitleBox}>
          <Box sx={kanbanColumnIconBox(iconBg, iconColor)}>
            <Icon sx={{ fontSize: 18 }} />
          </Box>

          <Typography variant="body-bold" sx={kanbanColumnTitle}>
            {title}
          </Typography>
        </Box>

        <Box sx={kanbanColumnCountBadge(theme)}>
          <Typography
            variant="caption"
            sx={{ color: theme.palette.black.secondary }}
          >
            {count}
          </Typography>
        </Box>
      </Box>

      <Button
        variant="outlined"
        size="small"
        fullWidth
        startIcon={<AddRoundedIcon sx={{ fontSize: 16 }} />}
        onClick={onAddNew}
        sx={kanbanColumnTopAddButton(theme)}
      >
        <Typography
          variant="caption"
          sx={{ color: theme.palette.primary.main, whiteSpace: "nowrap" }}
        >
          Add Application
        </Typography>
      </Button>

      <Box sx={kanbanColumnCardsList}>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <Box key={idx} sx={kanbanColumnSkeletonCard(theme)}>
              <Box sx={kanbanColumnSkeletonHeader}>
                <Skeleton variant="circular" width={28} height={28} />
                <Skeleton
                  variant="rounded"
                  width={45}
                  height={20}
                  sx={{ borderRadius: "4px" }}
                />
              </Box>
              <Skeleton variant="text" width="80%" height={20} />
              <Skeleton variant="text" width="60%" height={16} />
              <Skeleton variant="text" width="50%" height={14} sx={{ mt: 1 }} />
            </Box>
          ))
        ) : items.length === 0 ? (
          <Box sx={kanbanColumnEmptyState(theme, isDragOver)}>
            <Typography
              variant="caption"
              sx={{ color: theme.palette.black.secondary }}
            >
              {isDragOver ? "Drop here" : "No applications"}
            </Typography>
          </Box>
        ) : (
          items.map((item) => (
            <JobCard
              key={item._id}
              item={item}
              onEdit={onEdit}
              onDelete={onDelete}
              onUpdateStatus={onUpdateStatus}
            />
          ))
        )}
      </Box>
    </Box>
  );
};
