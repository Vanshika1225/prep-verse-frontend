import type { SxProps, Theme } from "@mui/material";

import type { Difficulty } from "./types";

export const pageStyles = {
  container: {
    width: "100%",
    display: "flex",
    alignItems: "stretch",
    gap: "2%",
    flexDirection: {
      md: "row",
      xs: "column",
    },
    height: {
      lg: "90vh",
      md: "100vh",
      xs: "auto",
    },
    overflow: "hidden",
  },
} satisfies Record<string, SxProps<Theme>>;

export const card = (theme: Theme): SxProps<Theme> => ({
  p: 2,
  borderRadius: "12px",
  border: `1px solid ${theme.palette.divider}`,
  bgcolor: theme.palette.white.main,
});

export const sectionTitle: SxProps<Theme> = {
  alignSelf: "flex-start",
  fontSize: "16px",
};

export const difficultyChip = (theme: Theme, difficulty: Difficulty) => {
  const map: Record<Difficulty, { color: string; bg: string }> = {
    Easy: {
      color: theme.palette.success.main,
      bg: theme.palette.success.light,
    },
    Medium: {
      color: theme.palette.warning.main100 ?? theme.palette.warning.main,
      bg: theme.palette.warning.light,
    },
    Hard: {
      color: theme.palette.error.main,
      bg: theme.palette.error.light,
    },
  };

  const tone = map[difficulty] ?? {
    color: theme.palette.black.secondary,
    bg: theme.palette.white.main300,
  };

  return {
    color: tone.color,
    bgcolor: tone.bg,
    fontWeight: 600,
    borderRadius: "6px",
    height: 26,
    "& .MuiChip-label": {
      px: 1.2,
      fontSize: "12px",
    },
  };
};

export const leftSectionStyles = (theme: Theme) => ({
  root: {
    mt: { md: 0, xs: 5 },
    width: { md: "85%", xs: "100%" },
    minWidth: 0,
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
  },

  heading: {
    mb: 2.5,
  },

  headingCaption: {
    color: theme.palette.black.secondary,
    display: "block",
  },

  generatorBar: {
    display: "flex",
    gap: 1,
    mb: 2,
    flexDirection: { lg: "row", xs: "column" },
  },

  generatorGroup: {
    p: 1.5,
    borderRadius: "12px",
    border: `1px solid ${theme.palette.divider}`,
    bgcolor: theme.palette.white.main,
  },

  generatorLabel: {
    display: "block",
    mb: 1.2,
  },

  optionRow: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    flexWrap: "wrap",  
  },

  difficultyOption: (selected: boolean, color: string, bg: string) => ({
    display: "flex",
    alignItems: "center",
    gap: 0.6,
    px: 1.4,
    py: 0.8,
    borderRadius: "8px",
    cursor: "pointer",
    border: `1px solid ${selected ? color : theme.palette.divider}`,
    bgcolor: selected ? bg : "transparent",
    color: selected ? color : theme.palette.black.secondary,

    "&:hover": {
      borderColor: color,
    },
  }),

  countOption: (selected: boolean) => ({
    minWidth: 44,
    py: 0.8,
    borderRadius: "8px",
    cursor: "pointer",
    textAlign: "center",
    border: `1px solid ${
      selected ? theme.palette.primary.main : theme.palette.divider
    }`,
    bgcolor: selected ? theme.palette.primary.main100 : "transparent",
    color: selected
      ? theme.palette.primary.main
      : theme.palette.black.secondary,

    "&:hover": {
      borderColor: theme.palette.primary.main,
    },
  }),

  generateButton: {
    alignSelf: "center",
    minWidth: 190,
    height: 44,
    borderRadius: "8px",
    fontWeight: 500,
  },

  setHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 1.5,
  },

  tableWrapper: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "12px",
    bgcolor: theme.palette.white.main,
    overflow: "hidden",
  },

  emptyState: {
    minHeight: 260,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  cellStack: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 0.3,
    overflow: "hidden",
  },

  cellTitle: {
    display: "block",
    fontWeight: 550,
    lineHeight: 1.3,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  cellTopics: {
    display: "block",
    color: theme.palette.black.secondary,
    lineHeight: 1.3,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  companyCell: {
    width: 30,
    height: 30,
    borderRadius: "8px",
    bgcolor: theme.palette.white.main300,
    border: `1px solid ${theme.palette.divider}`,
    fontSize: "13px",
    color: theme.palette.black.main,
  },

  timeCell: {
    display: "flex",
    alignItems: "center",
    gap: 0.6,
    color: theme.palette.black.secondary,
  },

  solveButton: {
    minWidth: 76,
    borderRadius: "7px",
    fontWeight: 600,
  },

  bookmarkButton: (active: boolean) => ({
    borderRadius: "7px",
    border: `1px solid ${theme.palette.divider}`,
    color: active ? theme.palette.warning.main : theme.palette.black.secondary,
    p: 0.6,
  }),

  footerBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 1,
    mt: 2,
    mb: 1,
    flexDirection: { sm: "row", xs: "column" },
  },

  regenerateButton: {
    borderRadius: "8px",
    fontWeight: 600,
  },

  clearButton: {
    borderRadius: "8px",
    fontWeight: 600,
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,

    "&:hover": {
      borderColor: theme.palette.error.main,
      bgcolor: theme.palette.error.light,
      color: theme.palette.error.main,
    },
  },
});

export const rightSectionStyles = (theme: Theme) => ({
  root: {
    width: "30%",
    flexShrink: 0,
    mt: { md: 0, xs: 2 },
    minWidth: { md: 150, xs: "100%" },
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },

  mobileRow: {
    display: "flex",
    gap: 2,
    mt: 2,
    width: "100%",
    flexDirection: { xs: "column", sm: "row" },
  },

  progressBody: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    mt: 1.5,
  },

  dialWrapper: {
    position: "relative",
    display: "inline-flex",
    flexShrink: 0,
  },

  dialTrack: {
    color: theme.palette.white.main200,
  },

  dialValue: {
    color: theme.palette.primary.main,
    position: "absolute",
    left: 0,
    "& .MuiCircularProgress-circle": {
      strokeLinecap: "round",
    },
  },

  dialLabel: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  statList: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: 1.1,
  },

  statRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 1,
  },

  statLabel: {
    color: theme.palette.black.secondary,
  },

  streakValue: {
    display: "flex",
    alignItems: "center",
    gap: 0.4,
    color: theme.palette.error.main,
    fontWeight: 600,
  },

  filterHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 1.5,
  },

  clearLink: {
    color: theme.palette.primary.main,
    cursor: "pointer",
  },

  filterField: {
    mb: 1.5,
  },

  filterLabel: {
    display: "block",
    color: theme.palette.black.secondary,
    mb: 0.6,
  },

  toggleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    py: 0.4,
  },

  sessionRow: (isLast: boolean) => ({
    py: 1.25,
    borderBottom: isLast ? "none" : `1px solid ${theme.palette.divider}`,
  }),

  sessionTop: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    mb: 0.4,
  },

  sessionTitle: {
    flex: 1,
    minWidth: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  sessionMeta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 1,
    color: theme.palette.black.secondary,
  },

  tipsCard: {
    p: 2,
    borderRadius: "12px",
    border: `1px solid ${theme.palette.divider}`,
    bgcolor: theme.palette.primary.main100,
  },

  tipsHeader: {
    display: "flex",
    alignItems: "center",
    gap: 0.8,
    mb: 0.8,
  },

  tipsText: {
    display: "block",
    color: theme.palette.black.secondary,
    lineHeight: 1.5,
  },
});
