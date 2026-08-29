import { Box } from "@mui/material";

import { LeftSection } from "./LeftSection/LeftSection";
import { RightSection } from "./RightSection/RightSection";

export default function ProblemList() {
  return (
    <Box sx={{ p: 0.7 }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          msFlexDirection: { md: "row", xs: "column" },
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
        }}
      >
        <LeftSection />
        <RightSection />
      </Box>
    </Box>
  );
}
