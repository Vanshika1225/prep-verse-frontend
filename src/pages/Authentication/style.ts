export const styles = {
  card: {
    p: 5,
    minWidth: 430,
    textAlign: "center",
    boxShadow: "0 30px 80px rgba(40,40,70,.08)",
    borderRadius: "20px",
  },

  headingContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    mb: 2,
  },

  formField: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    alignItems: "flex-start",
    width: "100%",
    mb: 1.5,
  },

  alreadyHaveAcount: {
    minWidth: 0,
    p: 0,
    ml: 0.5,
    fontSize: "inherit",
    fontWeight: 600,
  },

  passwordRule: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    mb: 0.5,
  },

  introSectionContainer: {
    mt: 5,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },

  signUpSectionContainer: {
    maxWidth: 1280,
    mx: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: { xs: 6, lg: 10 },
    flexDirection: { xs: "column", md: "row" },
    maxHeight: "100vh",
  },

  basicStyles: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },

  emailIconStyle: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mx: "auto",
    boxShadow: "0 8px 24px rgba(106, 60, 255, 0.15)",
  },
};
