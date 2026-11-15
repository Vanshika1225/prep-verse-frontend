import { Box, Skeleton, useTheme } from "@mui/material";

const JobCardSkeleton = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        p: 2,
        mb: 2,
        borderRadius: "12px",
        border: `1px solid ${theme.palette.border.main}`,
        bgcolor: theme.palette.white.main,
      }}
    >
      {/* Company logo + Job details */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Skeleton
          variant="rounded"
          width={48}
          height={48}
          sx={{ borderRadius: "10px", flexShrink: 0 }}
        />

        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="55%" height={25} />
          <Skeleton variant="text" width="35%" height={20} />
        </Box>
      </Box>

      {/* Job information */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          mt: 2,
        }}
      >
        <Skeleton variant="text" width={100} height={22} />
        <Skeleton variant="text" width={100} height={22} />
        <Skeleton variant="text" width={100} height={22} />
      </Box>

      {/* Description */}
      <Box sx={{ mt: 1 }}>
        <Skeleton variant="text" width="100%" height={20} />
        <Skeleton variant="text" width="75%" height={20} />
      </Box>

      {/* Footer */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
          gap: 2,
        }}
      >
        <Skeleton variant="text" width={110} height={24} />
        <Skeleton
          variant="rounded"
          width={100}
          height={36}
          sx={{ borderRadius: "8px" }}
        />
      </Box>
    </Box>
  );
};

export default JobCardSkeleton;
