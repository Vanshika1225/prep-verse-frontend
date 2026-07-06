import type { Theme } from "@mui/material";

export const menuItemStyle = (theme: Theme, active = false) => ({
  bgcolor: active ? theme.palette.sidebar.active : "transparent",
  color: theme.palette.white.main,
  borderRadius: "8px",
  transition: "all 0.2s ease",
  marginBottom: "8px",
  "& .MuiListItemIcon-root": {
    color: theme.palette.white.main,
  },

  "&:hover": {
    bgcolor: theme.palette.sidebar.active,

    "& .MuiListItemIcon-root": {
      color: theme.palette.white.main,
    },
  },
});

export const practiceItemStyle = (theme: Theme, active = false) => ({
  bgcolor:  "transparent",

  borderRadius: "8px",
  color: theme.palette.white.main,
  transition: "all 0.2s ease",
  marginBottom: "8px",

  "& .MuiListItemIcon-root": {
    color: theme.palette.white.main,
  },

  "&:hover": {
    bgcolor: theme.palette.sidebar.active,

    "& .MuiListItemIcon-root": {
      color: theme.palette.white.main,
    },
  },
});

export const subMenuStyle = (theme: Theme, active = false) => ({
  minHeight: 34,
  ml: 2,
  pl: 5.5,
  py: 0.2,
  borderRadius: "10px",
  position: "relative",
  color: theme.palette.white.main,
  mb: "8px",

  bgcolor: active ? theme.palette.sidebar.active : "transparent",

  "&::before": {
    content: '""',
    position: "absolute",
    left: 22,
    width: 5,
    height: 5,
    borderRadius: "50%",
    bgcolor: active ? theme.palette.white.main : theme.palette.black.secondary,
  },

  "&:hover": {
    bgcolor: theme.palette.sidebar.active,

    "&::before": {
      bgcolor: theme.palette.white.main,
    },
  },
});

export const CardStyle = (theme: Theme) => ({
  mt: 3,
  p: 2,
  borderRadius: 4,
  bgcolor: theme.palette.sidebar.main100,
  color: theme.palette.white.main,
  border: "1px solid rgba(255,255,255,.05)",
  display: "flex",
  flexDirection: "column",
});

export const badgeStyle = (theme: Theme) => ({
  bgcolor: theme.palette.error.main,
  color: theme.palette.white.main,
  height: 18,
  borderRadius: "20px",
  "& .MuiChip-label": {
    px: 1,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 0.3,
  },
});
