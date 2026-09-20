import { Box } from "@mui/material";

import { LeftSection } from "./LeftSection/LeftSection";
import { RightSection } from "./RightSection/RightSection";
import { RandomPracticeProvider } from "./context";
import { pageStyles } from "./style";

export default function RandomPractice() {
  return (
    <RandomPracticeProvider>
      <Box>
        <Box sx={pageStyles.container}>
          <LeftSection />
          <RightSection />
        </Box>
      </Box>
    </RandomPracticeProvider>
  );
}
