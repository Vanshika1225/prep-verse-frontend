import { alpha, type SxProps, type Theme } from "@mui/material";

type StyleValue = SxProps<Theme> | ((...args: never[]) => SxProps<Theme>);
const create = <T extends Record<string, StyleValue>>(s: T): T => s;

export const flexColumn = { display: "flex", flexDirection: "column" };

export const styles = create({
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 2,
  },

  headerActions: { display: "flex", alignItems: "center", gap: 2 },

  streakChip: (theme: Theme): SxProps<Theme> => ({
    bgcolor: theme.palette.warning.light,
    color: theme.palette.warning.main100,
  }),

  mainGrid: {
    display: "grid",
    gap: 2.5,
    mt:2,
    gridTemplateColumns: { xs: "1fr", lg: "minmax(0,1fr) 380px" },
  },

  column: { display: "grid", gap: 2.5, alignContent: "start", minWidth: 0 },

  planScoreActivityRow: {
    display: "grid",
    gap: 2.5,
    gridTemplateColumns: { xs: "1fr", md: "1.3fr 0.8fr 1.4fr" },
  },

  card: (theme: Theme): SxProps<Theme> => ({
    bgcolor: theme.palette.white.main,
    border: `1px solid ${theme.palette.border.main}`,
    borderRadius: 3,
    p: 2.5,
    minWidth: 0,
  }),

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
  },

  linkText: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.primary.main,
    cursor: "pointer",
    "&:hover": { textDecoration: "underline" },
  }),

  skeletonList: { display: "grid", gap: 1 },

  mutedText: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.black.secondary,
  }),

  primaryChip: (theme: Theme): SxProps<Theme> => ({
    bgcolor: theme.palette.primary.main100,
    color: theme.palette.primary.main,
  }),

  statsGrid: {
    display: "grid",
    gap: 2,
    gridTemplateColumns: {
      xs: "1fr 1fr",
      md: "repeat(3, 1fr)",
      lg: "repeat(5, 1fr)",
    },
  },

  statDelta: (theme: Theme): SxProps<Theme> => ({
    display: "flex",
    alignItems: "center",
    gap: 0.5,
    color: theme.palette.success.main,
  }),

  planRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  planTasks: {
  maxHeight: 150,
  overflowY: "auto",
  pr: 1,
  display: "flex",
  flexDirection: "column",
  gap: 1,

  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    bgcolor: "action.disabled",
    borderRadius: 2,
  },
},

  planLeft: { display: "flex", alignItems: "center" },

  planFooter: { display: "flex", alignItems: "center", gap: 1.5, mt: 2 },

  planProgress: { flex: 1, height: 6, borderRadius: 3 },

  scoreRing: { position: "relative", display: "inline-flex" },

  scoreArc: (theme: Theme): SxProps<Theme> => ({
    position: "absolute",
    left: 0,
    color: theme.palette.primary.main,
  }),

  scoreCenter: {
    ...flexColumn,
    position: "absolute",
    inset: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  scoreMessage: { display: "block", mt: 1 },

  heatGrid: {
    display: "grid",
    gridTemplateColumns: "48px repeat(7, 1fr)",
    gap: 0.8,
    alignItems: "center",
  },

  heatDay: (theme: Theme): SxProps<Theme> => ({
    textAlign: "center",
    color: theme.palette.black.secondary,
  }),

  heatCell: (theme: Theme, level: number): SxProps<Theme> => ({
    height: 18,
    borderRadius: 0.5,
    bgcolor:
      level === 0
        ? theme.palette.grey?.[100] ?? "#f1f5f9"
        : alpha(theme.palette.primary.main, 0.25 + level * 0.18),
  }),

  plannerForm: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 1.5,
    mt: 2,
  },

  durationRow: { gridColumn: "1 / -1", display: "flex", gap: 1 },

  contestRow: { display: "flex", alignItems: "center", gap: 1.5, py: 1.2 },

  contestMeta: (theme: Theme): SxProps<Theme> => ({
    display: "flex",
    alignItems: "center",
    gap: 0.5,
    color: theme.palette.black.secondary,
  }),

  quickGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 },

  quickItem: (theme: Theme): SxProps<Theme> => ({
    display: "flex",
    alignItems: "center",
    gap: 1.2,
    p: 1.2,
    cursor: "pointer",
    borderRadius: 2,
    border: `1px solid ${theme.palette.border.main}`,
    "&:hover": { bgcolor: theme.palette.primary.main100 },
  }),

  patternsScroll: {
    display: "grid",
    gridAutoFlow: "column",
    gridAutoColumns: { xs: "70%", md: "calc(100% / 6 - 10px)" },
    gap: 1.5,
    overflowX: "auto",
    pb: 0.5,
  },

  patternCard: (theme: Theme): SxProps<Theme> => ({
    p: 1.5,
    borderRadius: 2,
    border: `1px solid ${theme.palette.border.main}`,
  }),

  patternHeader: { display: "flex", alignItems: "center", gap: 1 },

  patternProgress: { my: 1, height: 5, borderRadius: 3 },

  jobRow: (theme: Theme): SxProps<Theme> => ({
    display: "grid",
    gridTemplateColumns: {
      xs: "minmax(0, 1fr)",
      md: "minmax(0, 2fr) minmax(0, 2fr) minmax(0, 0.8fr) minmax(0, 1fr)",
    },
    alignItems: "center",
    columnGap: 2,
    py: 1.5,
    borderBottom: `1px solid ${theme.palette.border.main}`,
    "&:last-of-type": { borderBottom: "none" },
  }),

  jobSkills: {
    display: { xs: "none", md: "flex" },
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 0.5,
    minWidth: 0,
  },

  jobMeta: { display: { xs: "none", md: "block" }, textAlign: "left" },
});
