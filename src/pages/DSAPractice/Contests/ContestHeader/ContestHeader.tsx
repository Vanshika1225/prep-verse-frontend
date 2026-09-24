import { Box, Typography, useTheme } from "@mui/material";

import { contentHeaderStyle } from "../style";

const ContestHeader = () => {
  const theme = useTheme();

  return (
    <Box sx={contentHeaderStyle}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          variant="h4-bold"
          sx={{
            color: theme.palette.appText.main,
          }}
        >
          Contests
        </Typography>

        <Typography
          variant="body-medium"
          sx={{
            color: theme.palette.appText.secondary,
          }}
        >
          Compete with developers and improve your problem solving skills
        </Typography>
      </Box>
    </Box>
  );
};

export default ContestHeader;
