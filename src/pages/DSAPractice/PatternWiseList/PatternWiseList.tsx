import { Box } from "@mui/material";

import LeftSection from "./LeftSection/LeftSection";
import RightSection from "./RightSection/RightSection";
import { styles } from "./style";

const PatternWiseList = () => {
  return (
    <Box sx={{ p: 0.7 }}>
      <Box sx={styles.container}>
        <LeftSection />
        <RightSection />
      </Box>
    </Box>
  );
};

export default PatternWiseList;
