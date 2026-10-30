import { Box, Typography, useTheme } from "@mui/material";

import { styles } from "../../style";

export const PasswordRule = ({
  valid,
  text,
}: {
  valid: boolean;
  text: string;
}) => {
  const theme = useTheme();

  return (
    <Box sx={styles.passwordRule}>
      <Typography
        component="span"
        sx={{
          color: valid ? theme.palette.success.main : theme.palette.black.main,
          fontSize: 16,
          lineHeight: 1,
        }}
      >
        {valid ? "✓" : "○"}
      </Typography>

      <Typography
        variant="body1-medium"
        color={valid ? theme.palette.success.main : theme.palette.black.main}
      >
        {text}
      </Typography>
    </Box>
  );
};
