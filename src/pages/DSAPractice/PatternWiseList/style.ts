export const styles = {
  container: {
    width: "100%",
    display: "flex",
    alignItems: "stretch",
    gap: "2%",
    flexDirection: { md: "row", xs: "column" },
    height: { lg: "90vh", md: "100vh", xs: "auto" },
    overflow: "hidden",
  },

  leftMainBox: {
    mt: { md: 0, xs: 5 },
    width: { md: "70%", xs: "100%" },
    minWidth: 0,
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
    pr: 1,
  },

  innerBox: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: { md: "row", xs: "column" },
    alignItems: { md: "center", xs: "flex-start" },
    gap: 1.5,
    mb: 2.5,
  },

  tabStyle: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    mb: 2.5,
    width: "100%",
    overflow: "hidden",
    pb: 0.5,
  },

  tabLabel: {
    textTransform: "none",
    borderRadius: "8px",
    fontWeight: 500,
    whiteSpace: "nowrap",
    flexShrink: 0,
    padding: "6px 12px",
  },

  allPattern: {
    display: "grid",
    gridTemplateColumns: {
      md: "repeat(4, minmax(0,1fr))",
      sm: "repeat(2, minmax(0,1fr))",
      xs: "1fr",
    },
    gap: 2,
    mb: 2.5,
  },

  patternOverview: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: { md: "row", xs: "column" },
    alignItems: { md: "center", xs: "flex-start" },
    gap: 1.5,
    mb: 2,
  },

  buttonStyle: {
    textTransform: "none",
    borderRadius: "8px",
    fontWeight: 500,
  },

  patternOverviewInnerStyle: {
    display: "grid",
    gridTemplateColumns: {
      md: "repeat(2, minmax(0,1fr))",
      xs: "1fr",
    },
    gap: 2,
    mb: 2.5,
  },

  chartOuterBox: {
    display: "flex",
    alignItems: "center",
    gap: 0.5,
    justifyContent: "center",
  },

  progressBox: {
    p: 2,
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  learnItemBox: {
    display: "grid",
    gridTemplateColumns: {
      md: "repeat(3, minmax(0,1fr))",
      xs: "1fr",
    },
    gap: 1.2,
  },

  overallProgressOuterBox: {
    p: 2,
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  headingStyles: {
    alignSelf: "flex-start",
    fontSize: "16px",
  },

  patternProgressBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
  },

  flexStyles: { display: "flex", alignItems: "center", gap: 2 },

  rightSectionContainer: {
    width: { md: "30%", xs: "100%" },
    flexShrink: 0,
    mt: { md: 0, xs: 2 },
    minWidth: { md: 280, xs: "100%" },
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
};
