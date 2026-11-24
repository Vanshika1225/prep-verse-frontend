import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import LaptopMacOutlinedIcon from "@mui/icons-material/LaptopMacOutlined";
import { Box, useTheme } from "@mui/material";

import { kanbanBoardInnerStyleBox, kanBanBoardStyle } from "../style";
import type { ColumnConfig, KanbanBoardProps } from "../types";

import { KanbanColumn } from "./KanbanColumn";

const columnConfigs = (theme: any): ColumnConfig[] => [
  {
    key: "applied",
    title: "Applied",
    defaultStatus: "Applied",
    icon: ArticleOutlinedIcon,
    iconColor: theme.palette.primary.main,
    iconBg: theme.palette.primary.main100,
  },
  {
    key: "oa",
    title: "OA / Assessment",
    defaultStatus: "OA / Assessment",
    icon: LaptopMacOutlinedIcon,
    iconColor: theme.palette.secondary.main,
    iconBg: theme.palette.secondary.main100,
  },
  {
    key: "interview",
    title: "Interview",
    defaultStatus: "Interview",
    icon: GroupsOutlinedIcon,
    iconColor: theme.palette.warning.main,
    iconBg: theme.palette.warning.light,
  },
  {
    key: "offer",
    title: "Offer",
    defaultStatus: "Offer",
    icon: CheckCircleOutlineRoundedIcon,
    iconColor: theme.palette.success.main,
    iconBg: theme.palette.success.light,
  },
  {
    key: "rejected",
    title: "Rejected",
    defaultStatus: "Rejected",
    icon: CancelOutlinedIcon,
    iconColor: theme.palette.error.main,
    iconBg: theme.palette.error.light,
  },
];

export const KanbanBoard = ({
  columns,
  isLoading,
  onAddNew,
  onEdit,
  onDelete,
  onUpdateStatus,
}: KanbanBoardProps) => {
  const theme = useTheme();

  return (
    <Box sx={kanBanBoardStyle}>
      <Box sx={kanbanBoardInnerStyleBox}>
        {columnConfigs(theme).map((col) => {
          const colData = columns?.[col.key];

          return (
            <KanbanColumn
              key={col.key}
              title={colData?.title ?? col.title}
              defaultStatus={col.defaultStatus}
              count={colData?.count ?? 0}
              items={colData?.items ?? []}
              icon={col.icon}
              iconColor={col.iconColor}
              iconBg={col.iconBg}
              isLoading={isLoading}
              onAddNew={() => onAddNew(col.defaultStatus)}
              onEdit={onEdit}
              onDelete={onDelete}
              onUpdateStatus={onUpdateStatus}
            />
          );
        })}
      </Box>
    </Box>
  );
};
