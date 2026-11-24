import { alpha, type SxProps, type Theme } from "@mui/material";

type StyleValue = SxProps<Theme> | ((...args: never[]) => SxProps<Theme>);
const create = <T extends Record<string, StyleValue>>(s: T): T => s;

export const topBarStyles = create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 1.5,
  },

  streakChip: (theme: Theme): SxProps<Theme> => ({
    bgcolor: theme.palette.warning.light,
    color: theme.palette.warning.main100,
    height: 36,
    borderRadius: "20px",
    px: 0.5,
    cursor: "default",
    "& .MuiChip-icon": {
      color: theme.palette.warning.main,
      fontSize: 20,
    },
    "& .MuiChip-label": {
      fontSize: 13,
      fontWeight: 600,
      px: 1,
    },
  }),

  notificationBtn: (theme: Theme): SxProps<Theme> => ({
    width: 38,
    height: 38,
    bgcolor: theme.palette.white.main,
    border: `1px solid ${theme.palette.border.main}`,
    color: theme.palette.black.secondary,
    "&:hover": {
      bgcolor: theme.palette.primary.main100,
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main200,
    },
  }),

  avatarButton: {
    p: 0,
    borderRadius: "50%",
  },

  avatar: (theme: Theme): SxProps<Theme> => ({
    width: 38,
    height: 38,
    bgcolor: theme.palette.primary.main,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    "&:hover": {
      boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.25)}`,
    },
  }),

  menuPaper: (theme: Theme): SxProps<Theme> => ({
    overflow: "visible",
    mt: 1,
    borderRadius: 3,
    minWidth: 220,
    border: `1px solid ${theme.palette.border.main}`,
    boxShadow: `0 10px 40px ${alpha(theme.palette.black.main, 0.1)}`,
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 18,
      width: 12,
      height: 12,
      bgcolor: theme.palette.white.main,
      transform: "translateY(-50%) rotate(45deg)",
      borderLeft: `1px solid ${theme.palette.border.main}`,
      borderTop: `1px solid ${theme.palette.border.main}`,
    },
  }),

  menuHeader: (theme: Theme): SxProps<Theme> => ({
    px: 2,
    py: 1.5,
    borderBottom: `1px solid ${theme.palette.border.main}`,
  }),

  menuHeaderEmail: (theme: Theme): SxProps<Theme> => ({
    display: "block",
    color: theme.palette.black.secondary,
  }),

  menuItem: (theme: Theme): SxProps<Theme> => ({
    py: 1.2,
    px: 2,
    gap: 1.5,
    color: theme.palette.black.main,
    "&:hover": {
      bgcolor: theme.palette.primary.main100,
      color: theme.palette.primary.main,
    },
  }),

  menuItemIcon: {
    minWidth: "auto !important",
    color: "inherit",
  },

  logoutItem: (theme: Theme): SxProps<Theme> => ({
    py: 1.2,
    px: 2,
    gap: 1.5,
    color: theme.palette.error.main,
    "&:hover": {
      bgcolor: theme.palette.error.light,
    },
  }),

  divider: (theme: Theme): SxProps<Theme> => ({
    borderColor: theme.palette.border.main,
  }),
});