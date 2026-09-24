import type { Theme } from "@mui/material";

export const mainGrid = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    lg: "7fr 3fr",
  },
  gap: 4,
  alignItems: "start",
};

export const card = (theme: Theme) => ({
  border: `1px solid ${theme.palette.border.main}`,
  borderRadius: "10px",
});

export const levelStyle = (theme: Theme, level?: string) => {
  const value = (level ?? "").toLowerCase();

  if (value.includes("hard")) {
    return {
      color: theme.palette.error.main,
      bgcolor: theme.palette.error.light,
      borderColor: theme.palette.error.light,
    };
  }

  if (value.includes("easy")) {
    return {
      color: theme.palette.success.main,
      bgcolor: theme.palette.success.light,
      borderColor: theme.palette.success.light,
    };
  }

  return {
    color: theme.palette.warning.main,
    bgcolor: theme.palette.warning.light,
    borderColor: theme.palette.warning.light,
  };
};

export const badgeStyle = (theme: Theme, badge?: string) => {
  if (badge === "Official") {
    return {
      color: theme.palette.primary.main,
      bgcolor: theme.palette.primary.main100,
      borderColor: theme.palette.primary.main200,
    };
  }

  return {
    color: theme.palette.success.main,
    bgcolor: theme.palette.success.light,
    borderColor: theme.palette.success.light,
  };
};

export const logoImageStyle = {
  width: "100%",
  height: "100%",
  display: "block",
  objectFit: "cover",
};

export const labelSx = (theme: Theme) => ({
  lineHeight: "14px",
  color: theme.palette.appText.label,
});

export const valueSx = (theme: Theme) => ({
  mt: "8px",
  lineHeight: "18px",
  color: theme.palette.appText.main,
});

export const contestWrapperStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  height: 26,
  paddingLeft: "10px",
  paddingRight: "6px",
  borderRadius: "6px",
  fontSize: 11,
  cursor: "pointer",
  userSelect: "none",
};

export const statBoxWrapper = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "8px",
};

export const deltaStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "2px",
  fontSize: 11.5,
  fontWeight: 600,
};

export const ratingCardStyle = {
  borderRadius: "8px",
  p: "12px 14px",
  display: "grid",
  gridTemplateColumns: "30px minmax(0, 1fr)",
  columnGap: "10px",
  alignItems: "center",
};

export const iconStyle = {
  width: 30,
  height: 30,
  borderRadius: "8px",
  display: "grid",
  placeItems: "center",
};

export const chartBoxStyle = {
  display: "grid",
  gridTemplateColumns: "111px minmax(0, 1fr)",
  columnGap: "32px",
  alignItems: "center",
  mt: "20px",
};

export const contentHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 2,
  mb: "18px",
};

export const outline = (theme: Theme) => ({
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

export const contestFilterStyle = (theme: Theme) => ({
  bgcolor: theme.palette.white.main,
  borderRadius: "6px",
  fontSize: 13,
  color: theme.palette.appText.main,
  ...outline,
  "& .MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    height: "100%",
    boxSizing: "border-box" as const,
    py: 0,
    pl: "14px",
    fontSize: 13,
  },
  "& .MuiSelect-icon": {
    right: 8,
    color: theme.palette.appText.secondary,
  },
});

export const contestFiletrWrapper = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "1fr 1fr",
    md: "minmax(0, 1.9fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.1fr) auto",
  },
  gap: "14px",
  pt: "20px",
  pb: "15px",
};

export const contestCardOuterBox = {
  display: "grid",
  columnGap: { xs: 2, md: 0 },
  rowGap: { xs: 2, md: 0 },
  alignItems: "center",
  minHeight: 86,
  py: { xs: 2, md: 0 },
  pl: { xs: 2, md: "14px" },
  pr: { xs: 2, md: "20px" },
  "&:first-of-type": { borderTop: 0 },
};

export const contestCardInnerBox = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  minWidth: 0,
  gridColumn: { xs: "1 / -1", md: "auto" },
};

export const cardNameWrapper = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
  mb: "4px",
};

export const badgeStylingNew = {
  border: "1px solid",
  borderRadius: "4px",
  px: "6px",
  height: 18,
  display: "inline-flex",
  alignItems: "center",
  fontSize: 10.5,
  fontWeight: 600,
};

export const livebUtton = (theme: Theme) => ({
  bgcolor: theme.palette.error.main100,
  color: theme.palette.error.main,
  border: `1px solid ${theme.palette.error.main200}`,
  borderRadius: "4px",
  px: "6px",
  height: 18,
  display: "inline-flex",
  alignItems: "center",
  fontSize: 10.5,
  fontWeight: 700,
});
