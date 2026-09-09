import { Box } from "@mui/material";
import { useState } from "react";

import LeftSection from "./LeftSection/LeftSection";
import RightSection from "./RightSection/RightSection";
import { styles } from "./style";

const PatternWiseList = () => {
  const [selectedPattern, setSelectedPattern] = useState("");

  return (
    <Box sx={{ p: 0.7 }}>
      <Box sx={styles.container}>
        <LeftSection
          setSelectedPattern={setSelectedPattern}
        />
        <RightSection pattern={selectedPattern} />
      </Box>
    </Box>
  );
};

export default PatternWiseList;
