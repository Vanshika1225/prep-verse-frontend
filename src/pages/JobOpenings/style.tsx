export const flexColumn = { display: "flex", flexDirection: "column" };

export const mainGrid = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    lg: "minmax(0, 7.3fr) minmax(0, 2.7fr)",
  },
  gap: 3.5,
  alignItems: "start",
};

export const filterBarCard = (theme: any) => ({
  bgcolor: theme.palette.white.main,
  border: `1px solid ${theme.palette.border.main}`,
  borderRadius: "12px",
  p: 2,
  mb: 2.5,
});

export const filterTopRow = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "1.6fr 1fr",
    md: "2fr 1fr 1fr 1fr auto",
  },
  gap: 1.5,
  alignItems: "center",
};

export const outline = (theme: any) => ({
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.border.main,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
    borderWidth: 1,
  },
});

export const searchInputStyle = (theme: any) => ({
  width: "100%",
  borderRadius: "8px",
  bgcolor: theme.palette.white.main,
  fontSize: 13,
  ...outline(theme),
  "& .MuiInputBase-input": {
    py: 1,
    fontSize: 13,
    color: theme.palette.appText.main,
  },
});

export const selectDropdownStyle = (theme: any) => ({
  bgcolor: theme.palette.white.main,
  borderRadius: "8px",
  fontSize: 13,
  color: theme.palette.appText.main,
  ...outline(theme),
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    py: 1,
    px: 1.5,
    fontSize: 13,
  },
});

export const allFiltersBtn = (theme: any) => ({
  height: 38,
  borderRadius: "8px",
  border: `1px solid ${theme.palette.border.main}`,
  color: theme.palette.appText.main,
  bgcolor: theme.palette.white.main,
  textTransform: "none" as const,
  px: 2,
  fontSize: 13,
  fontWeight: 600,
  whiteSpace: "nowrap" as const,
  "&:hover": {
    borderColor: theme.palette.primary.main,
    bgcolor: theme.palette.white.main300,
  },
});

export const quickFiltersRow = {
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 1.2,
  mt: 1.5,
  pt: 1.5,
  borderTop: (theme: any) => `1px dashed ${theme.palette.border.main}`,
};

export const quickFilterChip = (theme: any, isActive: boolean) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 0.6,
  px: 1.5,
  py: 0.6,
  borderRadius: "999px",
  border: `1px solid ${
    isActive ? theme.palette.primary.main : theme.palette.border.main
  }`,
  bgcolor: isActive ? theme.palette.primary.main100 : theme.palette.white.main,
  color: isActive
    ? theme.palette.primary.main
    : theme.palette.appText.secondary,
  fontSize: 12,
  fontWeight: 500,
  cursor: "pointer",
  userSelect: "none" as const,
  transition: "all 0.15s ease",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    bgcolor: theme.palette.primary.main100,
  },
});

export const clearAllBtn = (theme: any) => ({
  color: theme.palette.primary.main,
  fontSize: 12.5,
  fontWeight: 600,
  cursor: "pointer",
  ml: "auto",
  userSelect: "none" as const,
  "&:hover": {
    textDecoration: "underline",
  },
});

export const resultsMetaBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 2,
};

export const sortSelectStyle = (theme: any) => ({
  bgcolor: "transparent",
  fontSize: 13,
  fontWeight: 500,
  color: theme.palette.appText.main,
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiSelect-select": {
    py: 0.5,
    pr: 3,
    fontSize: 13,
  },
});

export const jobCardContainer = (theme: any) => ({
  bgcolor: theme.palette.white.main,
  border: `1px solid ${theme.palette.border.main}`,
  borderRadius: "12px",
  p: { xs: 2, sm: 2.5 },
  mb: 2,
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  justifyContent: "space-between",
  alignItems: { xs: "flex-start", md: "center" },
  gap: 2,
  transition: "all 0.2s ease",
  "&:hover": {
    borderColor: theme.palette.primary.main200,
    boxShadow: "0 4px 18px rgba(80, 35, 231, 0.06)",
  },
});

export const jobCardLeft = {
  display: "flex",
  alignItems: "flex-start",
  gap: 2,
  minWidth: 0,
};

export const companyLogoBox = (theme: any) => ({
  width: 48,
  height: 48,
  borderRadius: "10px",
  border: `1px solid ${theme.palette.border.main}`,
  bgcolor: theme.palette.white.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  flexShrink: 0,
});

export const companyLogoImg = {
  width: "100%",
  height: "100%",
  objectFit: "contain" as const,
};

export const jobCardInfo = {
  ...flexColumn,
  minWidth: 0,
};

export const jobTitleRow = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  flexWrap: "wrap",
};

export const newBadge = (theme: any) => ({
  bgcolor: theme.palette.primary.main100,
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main200}`,
  borderRadius: "4px",
  px: 0.8,
  py: 0.1,
  fontSize: 10.5,
  fontWeight: 700,
});

export const jobMetaList = {
  display: "flex",
  alignItems: "center",
  gap: 2,
  flexWrap: "wrap",
  mt: 0.8,
};

export const jobMetaItem = (theme: any) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 0.5,
  fontSize: 12,
  color: theme.palette.black.secondary,
});

export const jobCardRight = {
  display: "flex",
  flexDirection: { xs: "row", md: "column" },
  alignItems: { xs: "center", md: "flex-end" },
  justifyContent: "space-between",
  width: { xs: "100%", md: "auto" },
  gap: 1.5,
  flexShrink: 0,
};

export const workModeBadge = (theme: any, mode?: string) => {
  const normalized = (mode ?? "").toLowerCase();

  if (normalized.includes("remote")) {
    return {
      color: theme.palette.primary.main,
      bgcolor: theme.palette.primary.main100,
      border: `1px solid ${theme.palette.primary.main200}`,
      borderRadius: "4px",
      px: 1,
      py: 0.2,
      fontSize: 11,
      fontWeight: 600,
    };
  }

  if (normalized.includes("hybrid")) {
    return {
      color: theme.palette.primary.main800,
      bgcolor: theme.palette.secondary.main400,
      border: `1px solid ${theme.palette.secondary.main500}`,
      borderRadius: "4px",
      px: 1,
      py: 0.2,
      fontSize: 11,
      fontWeight: 600,
    };
  }

  return {
    color: theme.palette.success.main100,
    bgcolor: theme.palette.success.light,
    border: `1px solid ${theme.palette.success.main}`,
    borderRadius: "4px",
    px: 1,
    py: 0.2,
    fontSize: 11,
    fontWeight: 600,
  };
};

export const actionButtonsRow = {
  display: "flex",
  alignItems: "center",
  gap: 1.2,
};

export const applyNowBtn = (theme: any) => ({
  bgcolor: theme.palette.primary.main,
  color: theme.palette.white.main,
  borderRadius: "8px",
  px: 2.2,
  py: 0.7,
  fontSize: 12.5,
  fontWeight: 600,
  textTransform: "none" as const,
  boxShadow: "none",
  "&:hover": {
    bgcolor: theme.palette.primary.dark,
    boxShadow: "none",
  },
});

export const appliedBadgeBtn = (theme: any) => ({
  bgcolor: theme.palette.success.light,
  color: theme.palette.success.main100,
  border: `1px solid ${theme.palette.success.main}`,
  borderRadius: "8px",
  px: 2,
  py: 0.7,
  fontSize: 12.5,
  fontWeight: 600,
  textTransform: "none" as const,
  cursor: "default",
});

export const paginationWrapper = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 1,
  my: 4,
};

export const pageNumberBtn = (theme: any, isActive: boolean) => ({
  minWidth: 36,
  height: 36,
  borderRadius: "8px",
  border: isActive ? "none" : `1px solid ${theme.palette.border.main}`,
  bgcolor: isActive ? theme.palette.primary.main : theme.palette.white.main,
  color: isActive ? theme.palette.white.main : theme.palette.appText.main,
  fontSize: 13,
  fontWeight: 600,
  display: "grid",
  placeItems: "center",
  cursor: "pointer",
  userSelect: "none" as const,
  transition: "all 0.15s ease",
  "&:hover": {
    bgcolor: isActive
      ? theme.palette.primary.dark
      : theme.palette.white.main300,
  },
});

export const sidebarCard = (theme: any) => ({
  bgcolor: theme.palette.white.main,
  border: `1px solid ${theme.palette.border.main}`,
  borderRadius: "14px",
  p: 2.5,
  mb: 3,
});

export const recommendedItemContainer = (theme: any) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 1.5,
  py: 1.5,
  borderBottom: `1px solid ${theme.palette.border.main}`,
  "&:last-of-type": {
    borderBottom: "none",
    pb: 0,
  },
  "&:first-of-type": {
    pt: 0,
  },
});

export const topCompanyRow = (theme: any) => ({
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  py: 1.2,
  borderBottom: `1px solid ${theme.palette.border.main}`,
  "&:last-of-type": {
    borderBottom: "none",
    pb: 0,
  },
  "&:first-of-type": {
    pt: 0,
  },
  cursor: "pointer",
  borderRadius: "8px",
  px: 1,
  mx: -1,
  transition: "background-color 0.2s ease",
  "&:hover": {
    bgcolor: theme.palette.white.main300++,
  },
});

export const skillsChipGrid = {
  display: "flex",
  flexWrap: "wrap",
  gap: 1,
  mt: 2,
};
export const skillChipStyle = (theme: any, isSelected: boolean) => ({
  borderRadius: "8px",
  bgcolor: isSelected
    ? theme.palette.primary.main
    : theme.palette.primary.main100,
  color: isSelected ? theme.palette.white.main : theme.palette.appText.main,
  fontSize: 12,
  fontWeight: 500,
  px: 1.5,
  py: 0.6,
  cursor: "pointer",
  userSelect: "none" as const,
  transition: "all 0.15s ease",
  "&:hover": {
    bgcolor: isSelected
      ? theme.palette.primary.dark
      : theme.palette.primary.main200,
  },
});

export const promoBannerContainer = (theme: any) => ({
  ...flexColumn,
  bgcolor: theme.palette.primary.main100,
  borderRadius: "14px",
  p: 2.5,
  position: "relative" as const,
  overflow: "hidden",
});

export const promoBannerBtn = (theme: any) => ({
  bgcolor: theme.palette.white.main,
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.border.main}`,
  borderRadius: "8px",
  px: 2,
  py: 0.8,
  fontSize: 12.5,
  fontWeight: 600,
  textTransform: "none" as const,
  boxShadow: "none",
  mt: 2,
  display: "inline-flex",
  alignItems: "center",
  gap: 0.5,
  "&:hover": {
    bgcolor: theme.palette.white.main300,
    boxShadow: "none",
  },
});

export const applyURLStyle = (theme: any) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 0.5,
  fontSize: 12.5,
  color: theme.palette.primary.main,
  textDecoration: "none",
  mb: 2,
  "&:hover": { textDecoration: "underline" },
});

export const appliedConfirm = (theme: any) => ({
  bgcolor: theme.palette.primary.main,
  color: theme.palette.white.main,
  borderRadius: "8px",
  textTransform: "none",
  "&:hover": { bgcolor: theme.palette.primary.dark },
});

export const notYet = (theme: any) => ({
  borderRadius: "8px",
  borderColor: theme.palette.border.main,
  color: theme.palette.black.secondary,
  textTransform: "none",
  "&:hover": { borderColor: theme.palette.black.main },
});

export const jobCardRightInnerBox = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  justifyContent: "flex-end",
};

export const jobCardAvatarStyle = (theme: any) => ({
  width: 32,
  height: 32,
  fontSize: 14,
  bgcolor: theme.palette.primary.main100,
  color: theme.palette.primary.main,
  fontWeight: 700,
});

export const paginationStyle = (theme: any) => ({
  "& .MuiPaginationItem-root": {
    color: theme.palette.black.main,
    fontSize: 14,
    fontWeight: 500,
    minWidth: 36,
    height: 36,
    borderRadius: "8px",
  },
  "& .MuiPaginationItem-root.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.white.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  "& .MuiPaginationItem-root.Mui-disabled": {
    opacity: 0.4,
  },
});

export const jobTrackerIcon = (theme: any) => ({
  position: "absolute",
  right: 12,
  bottom: 12,
  opacity: 0.85,
  color: theme.palette.primary.main,
});

export const trackApplication = (theme: any) => ({
  color: theme.palette.black.secondary,
  mt: 0.5,
  maxWidth: "85%",
  lineHeight: 1.4,
});

export const companyNameAvatar = (theme: any) => ({
  width: 28,
  height: 28,
  fontSize: 12,
  bgcolor: theme.palette.primary.main100,
  color: theme.palette.primary.main,
});

export const recommendationTitleSTyle = (theme: any) => ({
  color: theme.palette.black.main,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const comapnyLogoNameOuterBox = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  minWidth: 0,
  flex: 1,
};

export const companyNameStyle = (theme: any) => ({
  color: theme.palette.black.main,
  fontSize: 13,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const openingStyle = (theme: any) => ({
  color: theme.palette.black.secondary,
  fontSize: 11.5,
  whiteSpace: "nowrap",
  flexShrink: 0,
});
