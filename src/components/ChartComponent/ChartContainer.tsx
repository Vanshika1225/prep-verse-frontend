import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface ChartContainerProps {
  title?: string;
  children: ReactNode;
  height?: number;
}

const ChartContainer = ({
  title,
  children,
  height = 280,
}: ChartContainerProps) => {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {title && (
        <Typography
          variant="h6-bold"
          sx={{
            mb: 1.5,
          }}
        >
          {title}
        </Typography>
      )}

      <Box
        sx={{
          width: "100%",
          height,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ChartContainer;
