import { alpha, type SxProps, type Theme } from "@mui/material";

type StyleValue = SxProps<Theme> | ((...args: never[]) => SxProps<Theme>);
const create = <T extends Record<string, StyleValue>>(s: T): T => s;

export const profileStyles = create({
  container: {
    maxWidth: 1000,
    mx: "auto",
    pb: 4,
  },

  banner: (theme: Theme): SxProps<Theme> => ({
    position: "relative",
    height: { xs: 140, md: 180 },
    borderRadius: 4,
    overflow: "hidden",
    background: `linear-gradient(135deg, ${theme.palette.sidebar.main} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.light} 100%)`,
  }),

  bannerPattern: (theme: Theme): SxProps<Theme> => ({
    position: "absolute",
    inset: 0,
    opacity: 0.1,
    backgroundImage: `radial-gradient(circle, ${theme.palette.white.main} 1.5px, transparent 1.5px)`,
    backgroundSize: "28px 28px",
  }),

  bannerGlow: (theme: Theme): SxProps<Theme> => ({
    position: "absolute",
    top: -80,
    right: -60,
    width: 280,
    height: 280,
    borderRadius: "50%",
    background: `radial-gradient(circle, ${alpha(theme.palette.white.main, 0.25)} 0%, transparent 70%)`,
  }),

  profileInfoRow: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: { xs: "column", md: "row" },
    gap: 2.5,
    px: { xs: 2.5, md: 4 },
    pb: 3,
  },

  avatarWrap: {
    position: "relative",
    width: 110,
    height: 110,
    mt: -7,
    flexShrink: 0,
    borderRadius: "50%",
    "&:hover .avatar-overlay, &.Mui-focusVisible .avatar-overlay": {
      opacity: 1,
    },
  },

  avatarOuter: (theme: Theme): SxProps<Theme> => ({
    width: 110,
    height: 110,
    borderRadius: "50%",
    border: `4px solid ${theme.palette.white.main}`,
    boxShadow: `0 4px 20px ${alpha(theme.palette.black.main, 0.15)}`,
    bgcolor: theme.palette.primary.main,
  }),

  avatar: (theme: Theme): SxProps<Theme> => ({
    width: "100%",
    height: "100%",
    fontSize: 38,
    fontWeight: 700,
    bgcolor: theme.palette.primary.main,
  }),

  avatarOverlay: (theme: Theme, visible: boolean): SxProps<Theme> => ({
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 0.25,
    borderRadius: "50%",
    bgcolor: alpha(theme.palette.sidebar.main, 0.6),
    color: theme.palette.white.main,
    opacity: visible ? 1 : 0,
    transition: "opacity 0.2s ease",
    pointerEvents: "none",
  }),

  headerInfo: {
    flex: 1,
    minWidth: 0,
    pt: 1.5,
  },

  headerEmail: (theme: Theme): SxProps<Theme> => ({
    display: "block",
    color: theme.palette.black.secondary,
    mt: 0.3,
  }),

  headerMeta: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 1,
    mt: 1.5,
  },

  metaChip: (theme: Theme): SxProps<Theme> => ({
    height: 26,
    fontSize: 12,
    bgcolor: theme.palette.white.main500,
    color: theme.palette.black.secondary,
    "& .MuiChip-icon": {
      color: "inherit",
      fontSize: 15,
    },
  }),

  removePhotoBtn: {
    mt: 0.5,
    px: 0,
  },

  avatarError: (theme: Theme): SxProps<Theme> => ({
    display: "block",
    color: theme.palette.error.main,
    mt: 1,
  }),

  editBtn: {
    alignSelf: { xs: "stretch", md: "flex-start" },
    mt: { xs: 0, md: 1.5 },
  },

  statsRow: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
    gap: 2,
    mb: 3,
  },

  statCard: (theme: Theme): SxProps<Theme> => ({
    display: "flex",
    alignItems: "center",
    gap: 2,
    p: 2.5,
    borderRadius: 3,
    border: `1px solid ${theme.palette.border.main}`,
    bgcolor: theme.palette.white.main,
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: theme.palette.primary.main200,
      boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.1)}`,
      transform: "translateY(-2px)",
    },
  }),

  statIcon: (theme: Theme, tone: "primary" | "warning"): SxProps<Theme> => ({
    width: 44,
    height: 44,
    flexShrink: 0,
    borderRadius: 2.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor:
      tone === "warning"
        ? theme.palette.warning.light
        : theme.palette.primary.main100,
    color:
      tone === "warning"
        ? theme.palette.warning.main
        : theme.palette.primary.main,
  }),

  statLabel: (theme: Theme): SxProps<Theme> => ({
    display: "block",
    color: theme.palette.black.secondary,
  }),

  layout: {
    display: "grid",
    gap: 2.5,
    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
    alignItems: "stretch",
  },

  column: {
    display: "grid",
    gap: 2.5,
  },

  sectionCard: (theme: Theme): SxProps<Theme> => ({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    p: 3,
    borderRadius: 3,
    border: `1px solid ${theme.palette.border.main}`,
    bgcolor: theme.palette.white.main,
  }),

  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: 1.2,
    mb: 2.5,
  },

  headerEnd: {
    ml: "auto",
  },

  sectionIcon: (theme: Theme): SxProps<Theme> => ({
    width: 36,
    height: 36,
    borderRadius: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: theme.palette.primary.main100,
    color: theme.palette.primary.main,
  }),

  mutedText: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.black.secondary,
  }),

  bioBox: (theme: Theme): SxProps<Theme> => ({
    p: 2,
    mb: 1,
    borderRadius: 2.5,
    bgcolor: theme.palette.white.main300,
    border: `1px solid ${theme.palette.border.main}`,
    borderLeft: `3px solid ${theme.palette.primary.main}`,
  }),

  bioEmpty: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 1,
  },

  detailList: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  detailRow: (theme: Theme): SxProps<Theme> => ({
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    py: 1.25,
    borderBottom: `1px solid ${theme.palette.border.main}`,
    "&:last-of-type": {
      borderBottom: "none",
    },
  }),

  detailIcon: (theme: Theme): SxProps<Theme> => ({
    width: 34,
    height: 34,
    flexShrink: 0,
    borderRadius: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: theme.palette.white.main500,
    color: theme.palette.black.secondary,
  }),

  detailText: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  addBtn: {
    px: 0,
    py: 0,
    minWidth: "auto",
  },

  completionValue: (theme: Theme): SxProps<Theme> => ({
    ml: "auto",
    color: theme.palette.primary.main,
  }),

  progress: (theme: Theme): SxProps<Theme> => ({
    height: 8,
    borderRadius: 4,
    bgcolor: theme.palette.primary.main100,
    "& .MuiLinearProgress-bar": {
      borderRadius: 4,
      backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
    },
  }),

  completeNote: (theme: Theme): SxProps<Theme> => ({
    display: "flex",
    alignItems: "center",
    gap: 1,
    mt: 2,
    px: 1.5,
    py: 1,
    borderRadius: 2,
    bgcolor: theme.palette.success.light,
    color: theme.palette.success.main100,
  }),

  chipRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
    mt: 1.5,
  },

  missingChip: (theme: Theme): SxProps<Theme> => ({
    height: 30,
    bgcolor: theme.palette.white.main,
    color: theme.palette.primary.main,
    border: `1px dashed ${theme.palette.primary.main200}`,
    "& .MuiChip-icon": {
      color: theme.palette.primary.main,
      fontSize: 16,
    },
    "&:hover": {
      bgcolor: theme.palette.primary.main100,
      border: `1px dashed ${theme.palette.primary.main}`,
    },
  }),

  platformList: {
    flex: 1,
    display: "grid",
    gridAutoRows: "1fr",
    gap: 1.25,
  },

  platformCard: (theme: Theme, linked: boolean): SxProps<Theme> => ({
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    p: 1.5,
    borderRadius: 3,
    textDecoration: "none",
    color: theme.palette.black.main,
    border: `1px ${linked ? "solid" : "dashed"} ${theme.palette.border.main}`,
    transition: "all 0.2s ease",
    ...(linked && {
      cursor: "pointer",
      "&:hover": {
        borderColor: theme.palette.primary.main200,
        bgcolor: theme.palette.primary.main100,
        "& .platform-arrow": {
          color: theme.palette.primary.main,
        },
      },
    }),
  }),

  platformIcon: (color: string): SxProps<Theme> => ({
    width: 38,
    height: 38,
    flexShrink: 0,
    borderRadius: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: alpha(color, 0.12),
    color,
  }),

  platformText: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
  },

  platformArrow: (theme: Theme): SxProps<Theme> => ({
    fontSize: 18,
    color: theme.palette.black.secondary,
    transition: "color 0.2s ease",
  }),

  modalBackdrop: {
    backdropFilter: "blur(4px)",
  },

  modalPaper: (theme: Theme): SxProps<Theme> => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "92%", sm: 560 },
    maxHeight: "88vh",
    bgcolor: theme.palette.white.main,
    borderRadius: 4,
    boxShadow: `0 24px 64px ${alpha(theme.palette.black.main, 0.15)}`,
    outline: "none",
    overflow: "hidden",
  }),

  modalHeader: (theme: Theme): SxProps<Theme> => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    px: 3,
    py: 2,
    borderBottom: `1px solid ${theme.palette.border.main}`,
    bgcolor: theme.palette.white.main300,
  }),

  modalBody: {
    px: 3,
    py: 2.5,
    maxHeight: "60vh",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },

  groupTitle: (theme: Theme): SxProps<Theme> => ({
    display: "block",
    mb: 1.5,
    color: theme.palette.primary.main,
  }),

  formGrid: {
    display: "grid",
    gap: 2,
    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
  },

  formField: (half: boolean): SxProps<Theme> => ({
    gridColumn: half ? "auto" : "1 / -1",
  }),

  textFieldLabel: (theme: Theme): SxProps<Theme> => ({
    display: "block",
    color: theme.palette.black.main,
    mb: 0.8,
  }),

  adornment: (theme: Theme): SxProps<Theme> => ({
    color: theme.palette.black.secondary,
  }),

  inputMultiline: {
    "& .MuiOutlinedInput-root": {
      height: "auto",
      alignItems: "flex-start",
    },
  },

  fieldCounter: (theme: Theme): SxProps<Theme> => ({
    display: "block",
    textAlign: "right",
    mt: 0.5,
    color: theme.palette.black.secondary,
  }),

  modalFooter: (theme: Theme): SxProps<Theme> => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 1.5,
    px: 3,
    py: 2,
    borderTop: `1px solid ${theme.palette.border.main}`,
    bgcolor: theme.palette.white.main300,
  }),

  footerHint: (theme: Theme): SxProps<Theme> => ({
    mr: "auto",
    color: theme.palette.black.secondary,
  }),

  skeletonHeader: {
    display: "flex",
    gap: 2.5,
    px: 4,
    pb: 3,
  },

  skeletonInfo: {
    flex: 1,
    pt: 3,
  },
});
