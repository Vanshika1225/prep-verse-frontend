export const innerBox = {
  display: "flex",
  alignItems: { xs: "flex-start", sm: "center" },
  justifyContent: "space-between",
  gap: "16px",
  marginBottom: "24px",
  flexWrap: "wrap",
};

export const mainContentWrapper = {
  display: "grid",
  gridTemplateColumns: "205px minmax(0, 1fr) 290px",
  gap: "16px",
  mt: "16px",

  "@media (max-width: 1250px)": {
    gridTemplateColumns: "200px minmax(0, 1fr)",
  },

  "@media (max-width: 900px)": {
    gridTemplateColumns: "1fr",
  },
};

export const plannerStatWRapper = {
  display: "grid",
  gridTemplateColumns: "1.15fr repeat(3, 1fr)",
  gap: "16px",
  "@media (max-width: 1100px)": {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
};

export const plannerInnerBox = {
  padding: "16px",
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

export const circularProgressStyle = {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const lineStyle = {
  marginTop: "8px",
  height: "5px",
  borderRadius: "24px",
  bgcolor: "action.hover",
  overflow: "hidden",
};

export const plannerSidebarStyle = {
  padding: "16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const weekScheduleTopBar = {
  padding: "16px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
};

export const gridStyle = {
  display: "grid",
  gridTemplateColumns: "64px repeat(7, minmax(100px, 1fr))",
  minWidth: "760px",
};

export const dateStyle = {
  marginTop: "4px",
  mx: "auto",
  width: "28px",
  height: "28px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "transparent",
};

export const todaysFocusIneerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "8px",
};

export const taskNameStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  py: "6px",
  cursor: "pointer",
};
