export const moreOptionSTyle = {
  position: "absolute",
  visibility: "hidden",
  pointerEvents: "none",
  opacity: 0,
  zIndex: -1000,
  top: -9999,
  left: -9999,
  display: "flex",
  gap: "10px",
  whiteSpace: "nowrap",
};

export const mainContentStyle = {
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    lg: "1fr 340px",
    xl: "1fr 380px",
  },
  gap: "24px",
  alignItems: "start",
};

export const headerRowStyle = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: 2,
  mb: 2.5,
};

export const roadmapTabsStyle = (theme: any) => ({
  minHeight: 40,

  "& .MuiTab-root": {
    textTransform: "none",
    fontSize: "14px",
    fontWeight: 500,
    color: theme.palette.black.secondary,
    minHeight: 40,
    px: 1.5,
    mr: 2,

    "&.Mui-selected": {
      color: theme.palette.primary.main,
      fontWeight: 700,
    },
  },

  "& .MuiTabs-indicator": {
    bgcolor: theme.palette.primary.main,
    height: 3,
    borderRadius: "3px 3px 0 0",
  },
});

export const createRoadmapButton = (theme: any) => ({
  bgcolor: theme.palette.primary.main,
  color: theme.palette.white.main,
  textTransform: "none",
  borderRadius: "10px",
  px: 2.5,
  py: 1,
  fontWeight: 600,
  boxShadow: `0 4px 14px ${theme.palette.primary.main300}`,
  "&:hover": { bgcolor: theme.palette.primary.dark },
});

export const containerRefStyle = {
  display: "flex",
  alignItems: "center",
  gap: 1.2,
  flexWrap: "nowrap",
  minWidth: 0,
  width: "100%",
  mb: 3,
  overflow: "hidden",
};

export const allButton = (isSelected: boolean, theme: any) => ({
  borderRadius: "999px",
  px: 2,
  py: 0.6,
  bgcolor: isSelected ? theme.palette.primary.main : theme.palette.white.main,
  color: isSelected ? theme.palette.white.main : theme.palette.black.main200,
  border: "1px solid",
  borderColor: isSelected
    ? theme.palette.primary.main
    : theme.palette.border.main,
  "&:hover": {
    bgcolor: isSelected
      ? theme.palette.primary.main400
      : theme.palette.black.main300,
  },
});

export const moreButtonStyle = (theme: any) => ({
  flexShrink: 0,
  borderRadius: "999px",
  textTransform: "none",
  fontSize: "13px",
  px: 1.8,
  py: 0.6,
  bgcolor: theme.palette.white.main,
  color: theme.palette.black.main200,
  border: theme.palette.border.main,
  "&:hover": {
    bgcolor: theme.palette.black.main300,
  },
});

export const menuItem = (theme: any) => ({
  fontSize: "13px",
  fontWeight: 500,
  color: theme.palette.primary.main500,
  borderRadius: "8px",
  py: 0.8,
  px: 1.5,
  "&:hover": {
    bgcolor: theme.palette.primary.main100,
    color: theme.palette.primary.main,
  },
});

export const noDataFoundBox = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
};

export const myRoadmapStyle = (theme: any) => ({
  maxHeight: "710px",
  overflowY: "auto",
  overflowX: "hidden",
  pr: 1,
  mt: 2,
  scrollbarWidth: "thin",
  "&::-webkit-scrollbar": { width: "6px" },
  "&::-webkit-scrollbar-thumb": {
    bgcolor: theme.palette.secondary.main200,
    borderRadius: "10px",
  },
});

export const startRoadmapLoading = {
  display: "flex",
  flexDirection: "column",
  gap: 1.5,
  mt: 1,
};

export const startRoadMapInnerBox = (theme: any) => ({
  p: 1.5,
  border: theme.palette.border.main,
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
});

export const deleteButtonStyle = (theme: any) => ({
  bgcolor: theme.palette.main300,
  color: theme.palette.white.main,
  textTransform: "none",
  fontWeight: 600,
  borderRadius: "8px",
  "&:hover": { bgcolor: theme.palette.main400 },
});

export const cancelButton = (theme: any) => ({
  color: theme.palette.black.main200,
  textTransform: "none",
  fontWeight: 600,
  borderRadius: "8px",
});

export const startButton = (theme: any) => ({
  bgcolor: theme.palette.primary.main,
  textTransform: "none",
  fontSize: "12px",
  borderRadius: "8px",
  "&:hover": { bgcolor: theme.palette.primary.main400 },
});

export const mileStoneActionButtonWrapper = {
  display: "flex",
  gap: 1.5,
  justifyContent: "flex-end",
  width: "100%",
};

export const updateButtonStyle = (theme: any) => ({
  bgcolor: theme.palette.success.main,
  borderRadius: "8px",
  fontWeight: 600,
  "&:hover": { bgcolor: theme.palette.success.main100 },
});

export const flexColumn = {
  display: "flex",
  flexDirection: "column",
};

export const estDurWrapper = (theme: any) => ({
  display: "flex",
  alignItems: "center",
  gap: 1,
  color: theme.palette.black.secondary,
  fontSize: "13px",
});

export const mainStyleWrapper = (theme: any) => ({
  bgcolor: theme.palette.white.main,
  borderRadius: "16px",
  border: `1px solid ${theme.palette.border.main}`,
  p: 2.5,
  mb: 2.5,
});

export const chartStyle = {
  display: "flex",
  alignItems: "center",
  gap: 2.5,
  mt: 2,
};

export const chartValue = {
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export const statListStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 1,
  minWidth: 0,
};

export const statContentinnerBox = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 1,
};

export const quickActionOuterBox = (theme: any) => ({
  bgcolor: theme.palette.white.main,
  borderRadius: "16px",
  border: `1px solid ${theme.palette.border.main}`,
  p: 2.5,
});

export const actionButton = (theme: any) => ({
  p: 1.5,
  minHeight: 46,
  borderRadius: "10px",
  border: `1px solid ${theme.palette.border.main}`,
  color: theme.palette.black.main,
  bgcolor: theme.palette.white.main,
  textTransform: "none",
  fontSize: "12px",
  fontWeight: 600,
  justifyContent: "flex-start",
  "&:hover": {
    bgcolor: theme.palette.primary.main100,
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
});

export const recommendationInnerBox = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 2,
};

export const skeletonBox = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  p: 1,
};

export const displayItemBox = (theme: any) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1.5,
  p: 1,
  borderRadius: "10px",
  transition: "background 0.15s ease",
  "&:hover": { bgcolor: theme.palette.white.main300 },
});

export const displayItemInnerBox = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  minWidth: 0,
  flex: 1,
  cursor: "pointer",
};

export const titleStyle = (theme: any) => ({
  width: 38,
  height: 38,
  borderRadius: "10px",
  bgcolor: theme.palette.primary.main100,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

export const newitem = (theme: any) => ({
  fontSize: "13px",
  fontWeight: 600,
  color: theme.palette.black.main,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const descriptionStyle = (theme: any) => ({
  fontSize: "11px",
  color: theme.palette.black.secondary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const roadmapCardSkeleton = (theme: any) => ({
  bgcolor: theme.palette.white.main,
  borderRadius: "16px",
  border: `1px solid ${theme.palette.border.main}`,
  p: { xs: 2, sm: 3 },
  mb: 2.5,
});

export const roadmapMetaData = {
  display: "flex",
  gap: 2.5,
  mt: 1.5,
  flexWrap: "wrap",
};

export const innerStyleOfRoadmapSkeleton = (theme: any) => ({
  mt: 1,
  pt: 2.5,
  borderTop: `1px solid ${theme.palette.white.main500}`,
  overflow: "hidden",
});

export const otherStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: 2,
  minWidth: 0,
};

export const arrayBoxWrapper = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  flex: 1,
  minWidth: 0,
};

export const upcommingMilestoneMainStyle = (theme: any) => ({
  display: "flex",
  alignItems: "center",
  gap: 1.8,
  p: 0.8,
  borderRadius: "10px",
  cursor: "pointer",
  transition: "background 0.15s ease",
  "&:hover": { bgcolor: theme.palette.white.main300 },
});

export const dataCardBadge = (theme: any) => ({
  width: 44,
  height: 44,
  borderRadius: "10px",
  bgcolor: theme.palette.primary.main100,
  border: `1px solid ${theme.palette.primary.main200}`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

export const hiddenNoWrap = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const headingOuterBox = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 2,
};

export const fieldSx = (theme: any) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    bgcolor: theme.palette.white.main,
    fontSize: "13px",
    "& fieldset": { borderColor: theme.palette.border.main },
    "&:hover fieldset": { borderColor: theme.palette.secondary.main300 },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: "1px",
    },
  },
  "& .MuiInputLabel-root": { fontSize: "13px" },
  "& .MuiFormHelperText-root": { mx: 0 },
});

export const sectionTitleSx = (theme: any) => ({
  fontSize: "13px",
  fontWeight: 700,
  color: theme.palette.black.main400,
});

export const iconOuterBox = (theme: any) => ({
  width: 44,
  height: 44,
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: theme.palette.white.main200,
  color: theme.palette.primary.main,
  borderRadius: "13px",
  border: `1px solid ${theme.palette.border.main200}`,
});

export const createYourRoadmapStyle = (theme: any) => ({
  fontSize: { xs: "17px", sm: "20px" },
  fontWeight: 750,
  color: theme.palette.black.main400,
  letterSpacing: "-0.5px",
});

export const loadSampleButton = (theme: any) => ({
  flexShrink: 0,
  textTransform: "none",
  borderRadius: "9px",
  borderColor: theme.palette.white.main200,
  color: theme.palette.primary.main,
  fontSize: "12px",
  fontWeight: 650,
  px: 1.3,
  mt: 1,
  minWidth: "auto",
  "&:hover": {
    bgcolor: theme.palette.white.main100,
    borderColor: theme.palette.primary.main,
  },
});

export const actionContentWrapper = {
  display: "flex",
  alignItems: { xs: "stretch", sm: "center" },
  justifyContent: "space-between",
  flexDirection: { xs: "column", sm: "row" },
  gap: 1.5,
  width: "100%",
  pt: 0.5,
};

export const actionContentInnerBox = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  minWidth: 0,
};

const commonSchedule = (theme: any) => ({
  width: 34,
  height: 34,
  borderRadius: "10px",
  color: theme.palette.primary.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

export const scheduleIconStyle = (theme: any) => ({
  ...commonSchedule,
  bgcolor: theme.palette.white.main100,
});

export const newSchedule = (theme: any) => ({
  ...commonSchedule,
  bgcolor: theme.palette.white.main,
});

export const cancelButtonWrapper = {
  display: "flex",
  gap: 1,
  justifyContent: "flex-end",
  flexShrink: 0,
};

const commonStyle = {
  textTransform: "none",
  borderRadius: "9px",
  px: 2.2,
  py: 1,
  fontSize: "12px",
  fontWeight: 650,
};

export const cancelButtonStyle = (theme: any) => ({
  ...commonStyle,
  mr: 1,
  borderColor: theme.palette.border.main,
  color: theme.palette.black.main200,
  "&:hover": {
    borderColor: theme.palette.border.main200,
    bgcolor: theme.palette.black.main300,
  },
});

export const createRoadMapButtonStyle = (theme: any) => ({
  ...commonStyle,
  bgcolor: theme.palette.primary.main,
  boxShadow: "0 4px 12px rgba(80, 35, 231, 0.20)",
  "&:hover": {
    bgcolor: theme.palette.primary.main400,
    boxShadow: "0 5px 14px rgba(80, 35, 231, 0.25)",
  },
});

export const basicInfoStyle = (theme: any) => ({
  display: "flex",
  flexDirection: "column",
  gap: 2.5,
  px: { xs: 0, sm: 0.5 },
  py: 0.5,
  pr: 1,
  "&::-webkit-scrollbar": { width: 5 },
  "&::-webkit-scrollbar-thumb": {
    bgcolor: theme.palette.white.main400,
    borderRadius: 10,
  },
  "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
});

export const textAreaStyle = (theme: any) => ({
  width: "100%",
  boxSizing: "border-box",
  resize: "vertical",
  padding: "12px 14px",
  borderRadius: "12px",
  border: `1px solid ${theme.palette.border.main}`,
  backgroundColor: "transparent",
  fontFamily: "inherit",
  fontSize: "14px",
  lineHeight: 1.6,
  outline: "none",
});

export const innerCommonStyle = (theme: any) => ({
  p: { xs: 1.5, sm: 2 },
  border: `1px solid ${theme.palette.border.main100}`,
  borderRadius: "13px",
  bgcolor: theme.palette.white.main,
});

export const addButtonStyle = {
  ...loadSampleButton,
  mt: 1,
  minWidth: "auto",
};

export const chipStyle = (theme: any) => ({
  height: 29,
  bgcolor: theme.palette.primary.main100,
  color: theme.palette.primary.dark,
  fontWeight: 600,
  border: `1px solid ${theme.palette.white.main200}`,
  borderRadius: "7px",
  fontSize: "11px",
  "& .MuiChip-deleteIcon": {
    color: theme.palette.secondary.main,
    "&:hover": { color: theme.palette.error.main },
  },
});

export const noTopic = (theme: any) => ({
  border: `1px dashed ${theme.palette.white.main200}`,
  borderRadius: "9px",
  p: 1.5,
  textAlign: "center",
  bgcolor: theme.palette.primary.main200,
});

export const weeklyCommitmentWrapper = (theme: any) => ({
  p: { xs: 1.8, sm: 2.2 },
  borderRadius: "13px",
  border: `1px dashed ${theme.palette.white.main200}`,
  background: theme.palette.white.main,
});

export const sliderStyle = (theme: any) => ({
  color: theme.palette.primary.main,
  py: 1,
  "& .MuiSlider-thumb": {
    width: 17,
    height: 17,
    bgcolor: theme.palette.white.main,
    border: `4px solid ${theme.palette.primary.main}`,
    boxShadow: "0 1px 5px rgba(80,35,231,0.2)",
    "&:hover, &.Mui-focusVisible": {
      boxShadow: "0 0 0 7px rgba(80,35,231,0.10)",
    },
  },
  "& .MuiSlider-rail": {
    bgcolor: theme.palette.primary.main100,
    opacity: 1,
  },
});

export const learningMileStoneStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 1,
  mb: 1.5,
};

export const mileStoneChip = (theme: any) => ({
  bgcolor: theme.palette.white.main100,
  color: theme.palette.primary.main,
  fontSize: "10px",
  fontWeight: 700,
  borderRadius: "7px",
  flexShrink: 0,
});

export const formDataMapStyle = (theme: any) => ({
  display: "flex",
  gap: { xs: 1, sm: 1.5 },
  alignItems: "flex-start",
  p: { xs: 1.2, sm: 1.6 },
  borderRadius: "12px",
  border: `1px solid ${theme.palette.border.main100}`,
  bgcolor: theme.palette.white.main,
  transition: "border-color 0.2s, box-shadow 0.2s",
  "&:hover": {
    borderColor: theme.palette.primary.main200,
    boxShadow: "0 3px 12px rgba(35, 20, 80, 0.04)",
  },
});

export const formDataInnerBox = (theme: any) => ({
  width: 30,
  height: 30,
  borderRadius: "9px",
  bgcolor: theme.palette.primary.main100,
  color: theme.palette.primary.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  fontWeight: 800,
  flexShrink: 0,
  mt: 0.2,
});

export const deleteButtonIcon = (theme: any) => ({
  minWidth: 30,
  width: 30,
  height: 30,
  p: 0,
  borderRadius: "8px",
  color: theme.palette.border.main200,
  "&:hover": {
    color: theme.palette.error.main,
    bgcolor: theme.palette.primary.main100,
  },
  "&.Mui-disabled": {
    color: theme.palette.white.main400,
  },
});

export const addAnotherMileStone = (theme: any) => ({
  mt: 1.2,
  py: 1.1,
  border: `1px dashed ${theme.palette.white.main400}`,
  borderRadius: "10px",
  color: theme.palette.black.main100,
  bgcolor: theme.palette.primary.main100,
  fontSize: "12px",
  fontWeight: 650,
  textTransform: "none",
  "&:hover": {
    borderColor: theme.palette.white.main,
    bgcolor: theme.palette.white.main100,
  },
});

export const roadmapCardWrapper = (theme: any) => ({
  bgcolor: theme.palette.white.main,
  borderRadius: "16px",
  border: `1px solid ${theme.palette.border.main}`,
  p: { xs: 2, sm: 3 },
  mb: 2.5,
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
    borderColor: theme.palette.primary.main200,
  },
});

export const topHeaderOuterBox = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  flexWrap: { xs: "wrap", md: "nowrap" },
  gap: 2,
};

export const topHeadeInnerBox = {
  display: "flex",
  gap: 2,
  alignItems: "flex-start",
  flex: 1,
  minWidth: 0,
};

export const categoryIcon = {
  width: 48,
  height: 48,
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

export const detailBox = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  flexWrap: "wrap",
  mb: 0.5,
};

export const metaRowStyle = (theme: any) => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: { xs: 1.5, sm: 2.5 },
  color: theme.palette.black.secondary,
  fontSize: "12px",
  fontWeight: 500,
});

export const commonRoadmapCardStyle = {
  display: "flex",
  alignItems: "center",
  gap: 0.6,
};

export const progressAndActionStyle = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  minWidth: { xs: "100%", sm: "auto" },
  justifyContent: { xs: "space-between", sm: "flex-end" },
  mt: { xs: 1, md: 0 },
};

export const linearProgress = (theme: any) => ({
  height: 5,
  borderRadius: 4,
  bgcolor: theme.palette.border.main,
  "& .MuiLinearProgress-bar": {
    bgcolor: theme.palette.primary.main,
    borderRadius: 4,
  },
});

export const mainHorizontalStepper = (theme: any) => ({
  mt: 3,
  pt: 2.5,
  borderTop: `1px solid ${theme.palette.white.main500}`,
  overflowX: "auto",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": { display: "none" },
});

export const mainHorizontalInner = {
  display: "flex",
  alignItems: "flex-start",
  position: "relative",
  minWidth: 580,
  py: 1,
  px: 1,
};

export const flexBoxStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  cursor: "pointer",
};

export const connectingLine = {
  position: "absolute",
  top: 13,
  left: "50%",
  width: "100%",
  height: 2,
  zIndex: 1,
};

export const nodeCircle = {
  width: 26,
  height: 26,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
  transition: "transform 0.15s ease",
  "&:hover": {
    transform: "scale(1.15)",
  },
};

export const milestoneTitle = {
  mt: 1,
  textAlign: "center",
  maxWidth: 82,
  lineHeight: 1.25,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

export const commonPadding = { px: 2, py: 0.6 };
