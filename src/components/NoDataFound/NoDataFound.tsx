import image from "@assets/no-data-found.png";
import { Box, Typography } from "@mui/material";

import Theme from "@/theme/theme";

interface NoDataFoundProps {
  message?: string;
  noImage?: boolean;
}

const NoDataFound = ({
  noImage = false,
  message = "Once you add something, it'll show up in this space.",
}: NoDataFoundProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        py: 5,
        px: 3,
      }}
    >
      {noImage && (
        <Box
          component="img"
          src={image}
          alt=""
          sx={{
            width: 180,
            height: "auto",
            mb: 2,
          }}
        />
      )}

      <Typography
        variant="p-medium"
        sx={{
          fontWeight: 550,
          color: `${Theme.palette.black.main}ea`,
        }}
      >
        Nothing Here Yet
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          maxWidth: 320,
          mt: 0.5,
          mb: 3,
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default NoDataFound;
