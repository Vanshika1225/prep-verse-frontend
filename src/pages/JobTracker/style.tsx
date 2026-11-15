export const flexColumn = { display: "flex", flexDirection: "column" };

export const jobTrackerInnerBox = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: { sm: "center", xs: "flex-start" },
  flexDirection: { sm: "row", xs: "column" },
  gap: 1.5,
  mb: 2,
};

export const addNewApplicationButton = (theme: any) => ({
  bgcolor: theme.palette.primary.main,
  color: theme.palette.white.main,
  borderRadius: "8px",
});

export const kanbanBoardMainStyle = {
  display: "flex",
  flexDirection: { lg: "row", xs: "column" },
  alignItems: "stretch",
  gap: 2.5,
  mt: 2,
};

export const kanbanBoardInnerStyle = {
  ...flexColumn,
  width: { lg: "74%", xs: "100%" },
  minWidth: 0,
  gap: 2.5,
};

export const rightSectionMainBox = {
  width: { lg: "26%", xs: "100%" },
  minWidth: { lg: 320, xs: "100%" },
  flexShrink: 0,
};

export const applicationModalContent = {
  ...flexColumn,
  gap: 2.5,
};

export const applicationModalCancelButton = (theme: any) => ({
  borderColor: theme.palette.divider,
  color: theme.palette.black.secondary,
  borderRadius: "8px",
  "&:hover": {
    borderColor: theme.palette.black.main,
  },
});

export const applicationModalSubmitButton = (theme: any) => ({
  bgcolor: theme.palette.primary.main,
  color: theme.palette.white.main,
  borderRadius: "8px",
  px: 3,
  "&:hover": {
    bgcolor: theme.palette.primary.dark,
  },
});

export const applicationModalLabel = (theme: any) => ({
  mb: 0.8,
  display: "flex",
  alignItems: "center",
  color: theme.palette.black.main,
});

export const applicationModalStatusGrid = {
  display: "grid",
  gridTemplateColumns: {
    sm: "repeat(5, 1fr)",
    xs: "repeat(2, 1fr)",
  },
  gap: 1,
};

export const applicationModalStatusItem = (
  theme: any,
  isActive: boolean,
  statusItem: any,
) => ({
  ...flexColumn,
  p: 1.2,
  borderRadius: "10px",
  cursor: "pointer",
  userSelect: "none",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  gap: 0.6,
  border: `1.5px solid ${isActive ? statusItem.color : theme.palette.divider}`,
  bgcolor: isActive ? statusItem.bg : theme.palette.white.main,
  color: isActive ? statusItem.color : theme.palette.black.secondary,
  transition: "all 0.2s ease",
  "&:hover": {
    borderColor: statusItem.color,
    bgcolor: statusItem.bg,
    transform: "translateY(-1px)",
  },
});

export const applicationModalStatusIconBox = (statusItem: any) => ({
  width: 32,
  height: 32,
  borderRadius: "8px",
  bgcolor: statusItem.bg,
  color: statusItem.color,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const applicationModalFieldLabel = {
  mb: 0.8,
  display: "block",
};

export const applicationModalWorkModeWrapper = (theme: any) => ({
  display: "flex",
  gap: 1,
  p: 0.4,
  borderRadius: "8px",
  bgcolor: theme.palette.white.main300,
  border: `1px solid ${theme.palette.divider}`,
});

export const applicationModalWorkModeItem = (
  theme: any,
  isActive: boolean,
) => ({
  py: 0.5,
  px: 1,
  borderRadius: "6px",
  cursor: "pointer",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 0.6,
  color: isActive ? theme.palette.primary.main : theme.palette.black.secondary,
  bgcolor: isActive ? theme.palette.white.main : "transparent",
  boxShadow: isActive ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
  transition: "all 0.18s ease",
  border: isActive
    ? `1px solid ${theme.palette.divider}`
    : "1px solid transparent",
  "&:hover": {
    color: theme.palette.primary.main,
  },
});

export const applicationModalCategoryWrapper = {
  display: "flex",
  gap: 0.8,
  flexWrap: "wrap",
  mt: 0.5,
};

export const applicationModalCategoryChip = (
  theme: any,
  isSelected: boolean,
) => ({
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: isSelected ? 600 : 400,
  bgcolor: isSelected
    ? theme.palette.primary.main100
    : theme.palette.white.main,
  color: isSelected
    ? theme.palette.primary.main
    : theme.palette.black.secondary,
  border: `1px solid ${
    isSelected ? theme.palette.primary.main : theme.palette.divider
  }`,
  "&:hover": {
    bgcolor: theme.palette.primary.main100,
    borderColor: theme.palette.primary.main,
  },
});

export const applicationModalStagePanel = (
  color: string,
  background: string,
) => ({
  ...flexColumn,
  p: 2,
  borderRadius: "10px",
  border: `1px solid ${color}`,
  bgcolor: background,
  gap: 1.5,
});

export const applicationModalStageHeader = {
  display: "flex",
  alignItems: "center",
  gap: 1,
};

export const applicationModalSmallLabel = {
  mb: 0.5,
  display: "block",
};

export const applicationModalChipWrapper = {
  display: "flex",
  gap: 1,
  flexWrap: "wrap",
};

export const applicationModalOAPlatformChip = (theme: any) => ({
  borderRadius: "5px",
  bgcolor: theme.palette.white.main,
  border: `1px solid ${theme.palette.divider}`,
  cursor: "pointer",
});

export const applicationModalInterviewQuickLabel = (theme: any) => ({
  mb: 0.6,
  display: "block",
  color: theme.palette.black.secondary,
});

export const applicationModalInterviewChipWrapper = {
  display: "flex",
  gap: 0.8,
  flexWrap: "wrap",
};

export const applicationModalInterviewChip = (
  theme: any,
  isSelected: boolean,
) => ({
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: isSelected ? 600 : 400,
  bgcolor: isSelected
    ? theme.palette.warning.main100
    : theme.palette.white.main,
  color: isSelected ? theme.palette.white.main : theme.palette.black.main,
  border: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    borderColor: theme.palette.warning.main,
  },
});

export const applicationModalInterviewFieldLabel = {
  mb: 0.5,
  display: "block",
  fontWeight: 600,
};

export const applicationModalInterviewField = (theme: any) => ({
  bgcolor: theme.palette.white.main,
});

export const applicationModalRejectionChipWrapper = {
  display: "flex",
  gap: 0.8,
  flexWrap: "wrap",
  mb: 1,
};

export const applicationModalRejectionChip = (
  theme: any,
  isSelected: boolean,
) => ({
  borderRadius: "5px",
  cursor: "pointer",
  bgcolor: isSelected ? theme.palette.error.main : theme.palette.white.main,
  color: isSelected ? theme.palette.white.main : theme.palette.black.main,
});

export const applicationModalNotesTextarea = (theme: any) => ({
  width: "100%",
  boxSizing: "border-box",
  p: 1.2,
  borderRadius: "8px",
  border: `1px solid ${theme.palette.black.secondary}`,
  outline: "none",
  resize: "vertical",
  fontFamily: "inherit",
  fontSize: "14px",
  color: theme.palette.black.main,
  bgcolor: theme.palette.white.main,
  lineHeight: 1.5,
  "&::placeholder": {
    color: theme.palette.black.secondary,
    opacity: 0.8,
  },
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
  "&:focus": {
    borderColor: theme.palette.primary.main,
  },
});

export const commonBorderRadius = { borderRadius: "8px" };

export const filterBarLoadingMainStyle = { display: "flex", gap: 1.5, my: 1 };

export const filterBarMainBox = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  flexWrap: "wrap",
  mb: 2,
};

export const searchJobTextField = (theme: any) => ({
  minWidth: { md: 260, xs: "100%" },
  bgcolor: theme.palette.white.main,
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
  },
});

export const kanBanBoardStyle = (theme: any) => ({
  width: "100%",
  overflowX: "auto",
  pb: 1.5,
  "&::-webkit-scrollbar": {
    height: 6,
  },
  "&::-webkit-scrollbar-track": {
    bgcolor: theme.palette.white.main300,
    borderRadius: "999px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.white.main400,
    borderRadius: "999px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: theme.palette.black.secondary,
  },
});

export const kanbanBoardInnerStyleBox = {
  display: "grid",
  gridTemplateColumns: "repeat(5, minmax(260px, 1fr))",
  minWidth: "1350px",
  width: "100%",
  gap: 1.5,
  alignItems: "stretch",
};

export const deleteButtonStyle = (theme: any) => ({
  bgcolor: theme.palette.error.main,
  color: theme.palette.white.main,
  "&:hover": {
    bgcolor: theme.palette.error.main300,
  },
});

export const applicationOverviewStyleBox = (theme: any) => ({
  p: 2,
  borderRadius: "12px",
  border: `1px solid ${theme.palette.divider}`,
  bgcolor: theme.palette.white.main,
});

export const statCardBox = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: 1.5,
};

export const outerBoxOfStatCard = (theme: any) => ({
  p: 1.5,
  borderRadius: "10px",
  border: `1px solid ${theme.palette.divider}`,
  bgcolor: theme.palette.white.main300,
  mt: 2,
});

export const innerBoxOfStatCard = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  mb: 1,
};

export const statCradIcon = {
  width: 32,
  height: 32,
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const jobCardWrapper = (theme: any, isDragging: boolean) => ({
  width: "100%",
  minWidth: 0,
  boxSizing: "border-box",
  p: 1.5,
  borderRadius: "10px",
  bgcolor: theme.palette.white.main,
  border: `1px solid ${theme.palette.divider}`,
  transition: "all 0.2s ease",
  cursor: "grab",
  userSelect: "none",
  opacity: isDragging ? 0.4 : 1,
  transform: isDragging ? "scale(0.97)" : "none",
  "&:active": {
    cursor: "grabbing",
  },
  "&:hover": {
    borderColor: theme.palette.primary.light,
    boxShadow: `0 4px 12px ${theme.palette.primary.main300}`,
  },
});

export const jobCardHeaderBox = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 1,
  mb: 0.8,
  minWidth: 0,
};

export const jobCardCompanyBox = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  minWidth: 0,
  flex: 1,
};

export const jobCardAvatar = (theme: any, companyLogo?: string | null) => ({
  width: 28,
  height: 28,
  minWidth: 28,
  borderRadius: "6px",
  bgcolor: companyLogo
    ? theme.palette.white.main
    : theme.palette.primary.main100,
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.primary.main,
  fontSize: 13,
  p: companyLogo ? 0.3 : 0,
  "& .MuiAvatar-img": {
    objectFit: "contain",
    width: "100%",
    height: "100%",
  },
});

export const jobCardCompanyName = {
  whiteSpace: "normal",
  wordBreak: "break-word",
  lineHeight: 1.3,
};

export const jobCardChip = (tagStyle: { color: string; bgcolor: string }) => ({
  height: 22,
  borderRadius: "5px",
  fontSize: "11px",
  color: tagStyle.color,
  bgcolor: tagStyle.bgcolor,
  flexShrink: 0,
  "& .MuiChip-label": { px: 0.8 },
});

export const jobCardRole = (theme: any) => ({
  color: theme.palette.black.main200,
  whiteSpace: "normal",
  wordBreak: "break-word",
  mb: 0.5,
});

export const jobCardLocationBox = {
  display: "flex",
  alignItems: "center",
  gap: 0.5,
  mb: 1,
  minWidth: 0,
};

export const jobCardLocationIcon = (theme: any) => ({
  fontSize: 14,
  color: theme.palette.black.secondary,
  flexShrink: 0,
});

export const jobCardLocationText = (theme: any) => ({
  color: theme.palette.black.secondary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  minWidth: 0,
});

export const jobCardStageSubtitle = (theme: any) => ({
  color: theme.palette.black.secondary,
  display: "block",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  mb: 1,
  minWidth: 0,
});

export const jobCardFooter = (theme: any) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  pt: 0.8,
  borderTop: `1px solid ${theme.palette.divider}`,
  minWidth: 0,
});

export const kanbanColumnWrapper = (theme: any, isDragOver: boolean) => ({
  ...flexColumn,
  width: "100%",
  minWidth: 0,
  boxSizing: "border-box",
  p: 1.5,
  borderRadius: "12px",
  bgcolor: isDragOver
    ? theme.palette.primary.main100
    : theme.palette.white.main,
  border: isDragOver
    ? `2px dashed ${theme.palette.primary.main}`
    : `1px solid ${theme.palette.divider}`,
  height: 610,
  overflow: "hidden",
  transition: "background-color 0.2s ease, border-color 0.2s ease",
});

export const kanbanColumnHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  mb: 1.5,
  minWidth: 0,
};

export const kanbanColumnTitleBox = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  minWidth: 0,
};

export const kanbanColumnIconBox = (iconBg: string, iconColor: string) => ({
  width: 28,
  height: 28,
  minWidth: 28,
  borderRadius: "6px",
  bgcolor: iconBg,
  color: iconColor,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

export const kanbanColumnTitle = {
  whiteSpace: "normal",
  wordBreak: "break-word",
  lineHeight: 1.3,
};

export const kanbanColumnCountBadge = (theme: any) => ({
  px: 1,
  py: 0.2,
  borderRadius: "999px",
  bgcolor: theme.palette.white.main500,
  border: `1px solid ${theme.palette.divider}`,
  flexShrink: 0,
});

export const kanbanColumnTopAddButton = (theme: any) => ({
  py: 0.8,
  mb: 1.5,
  minWidth: 0,
  borderStyle: "dashed",
  borderColor: theme.palette.divider,
  color: theme.palette.primary.main,
  bgcolor: theme.palette.white.main300,
  borderRadius: "8px",
  "&:hover": {
    borderStyle: "dashed",
    borderColor: theme.palette.primary.main,
    bgcolor: theme.palette.primary.main100,
  },
});

export const kanbanColumnCardsList = {
  ...flexColumn,
  gap: 1.25,
  flex: 1,
  minWidth: 0,
  overflowY: "auto",
};

export const kanbanColumnSkeletonCard = (theme: any) => ({
  p: 1.5,
  borderRadius: "10px",
  border: `1px solid ${theme.palette.divider}`,
  minWidth: 0,
});

export const kanbanColumnSkeletonHeader = {
  display: "flex",
  justifyContent: "space-between",
  mb: 1,
};

export const kanbanColumnEmptyState = (theme: any, isDragOver: boolean) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  p: 2,
  borderRadius: "8px",
  border: `1px dashed ${theme.palette.divider}`,
  bgcolor: isDragOver
    ? theme.palette.primary.main100
    : theme.palette.white.main300,
});

export const recentActivityWrapper = (theme: any) => ({
  p: 2,
  borderRadius: "12px",
  border: `1px solid ${theme.palette.divider}`,
  bgcolor: theme.palette.white.main,
});

export const recentActivityHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 1.5,
};

export const recentActivityList = {
  ...flexColumn,
  gap: 1,
};

export const recentActivitySkeletonRow = (theme: any) => ({
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  py: 1.2,
  borderBottom: `1px solid ${theme.palette.divider}`,
});

export const recentActivityRow = (theme: any, isLast: boolean) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  py: 1.2,
  borderBottom: isLast ? "none" : `1px solid ${theme.palette.divider}`,
  gap: 1.5,
});

export const recentActivityCompanyBox = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  minWidth: 0,
  flex: 1,
};

export const recentActivityAvatar = (theme: any) => ({
  width: 36,
  height: 36,
  borderRadius: "8px",
  bgcolor: theme.palette.primary.main100,
  color: theme.palette.primary.main,
  fontSize: 14,
});

export const recentActivityTitle = {
  display: "block",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const recentActivityChip = (typeStyle: {
  color: string;
  bgcolor: string;
}) => ({
  borderRadius: "6px",
  color: typeStyle.color,
  bgcolor: typeStyle.bgcolor,
  fontSize: "12px",
  "& .MuiChip-label": { px: 1 },
});

export const applicationProgressWrapper = (theme: any) => ({
  p: 2,
  borderRadius: "12px",
  border: `1px solid ${theme.palette.divider}`,
  bgcolor: theme.palette.white.main,
});

export const applicationProgressSkeletonWrapper = {
  display: "flex",
  gap: 2,
  alignItems: "center",
};

export const applicationProgressSkeletonLines = {
  ...flexColumn,
  flex: 1,
  gap: 1,
};

export const applicationProgressContent = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
  mt: 2,
};

export const applicationProgressDonutBox = {
  position: "relative",
  width: 110,
  height: 110,
  flexShrink: 0,
};

export const applicationProgressDonutCenter = {
  ...flexColumn,
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  alignItems: "center",
  justifyContent: "center",
};

export const applicationProgressLegendRow = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export const applicationProgressLegendLabelBox = {
  display: "flex",
  alignItems: "center",
  gap: 1,
};

export const applicationProgressLegendDot = (color: string) => ({
  width: 8,
  height: 8,
  borderRadius: "2px",
  bgcolor: color,
});

export const upcomingInterviewsWrapper = (theme: any) => ({
  p: 2,
  borderRadius: "12px",
  border: `1px solid ${theme.palette.divider}`,
  bgcolor: theme.palette.white.main,
});

export const upcomingInterviewsList = {
  ...flexColumn,
  gap: 1,
};

export const upcomingInterviewsSkeletonRow = (theme: any) => ({
  display: "flex",
  alignItems: "center",
  gap: 1.2,
  py: 1,
  borderBottom: `1px solid ${theme.palette.divider}`,
});

export const upcomingInterviewsRow = (theme: any, isLast: boolean) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  py: 1,
  mt: 2,
  borderBottom: isLast ? "none" : `1px solid ${theme.palette.divider}`,
  gap: 1,
});

export const upcomingInterviewsCompanyBox = {
  display: "flex",
  alignItems: "center",
  gap: 1.2,
  minWidth: 0,
};

export const upcomingInterviewsAvatar = (theme: any) => ({
  width: 32,
  height: 32,
  borderRadius: "6px",
  bgcolor: theme.palette.primary.main100,
  color: theme.palette.primary.main,
  fontSize: 13,
});

export const upcomingInterviewsCompanyName = {
  display: "block",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "wrap",
};

export const upcomingInterviewsRole = (theme: any) => ({
  color: theme.palette.black.secondary,
  display: "block",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "wrap",
});

export const applicationProgressLegend = {
  ...flexColumn,
  flex: 1,
  gap: 0.8,
};
