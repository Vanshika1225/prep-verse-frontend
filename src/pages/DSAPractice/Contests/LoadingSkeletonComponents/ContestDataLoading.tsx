import {
  Box,
  Skeleton,
  useTheme,
} from "@mui/material";

const ContestCardSkeleton = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) 82px 84px 150px 112px 74px",
        alignItems: "center",
        gap: 1.5,
        px: 2,
        py: 1.5,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Skeleton
            variant="rounded"
            width={32}
            height={32}
            sx={{ flexShrink: 0 }}
          />

          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Skeleton
              variant="text"
              width="65%"
              height={20}
              sx={{ transform: "none" }}
            />

            <Skeleton
              variant="text"
              width="35%"
              height={16}
              sx={{ transform: "none", mt: 0.25 }}
            />
          </Box>
        </Box>
      </Box>

      <Box>
        <Skeleton
          variant="text"
          width={55}
          height={18}
          sx={{ transform: "none" }}
        />
      </Box>

      <Box>
        <Skeleton
          variant="text"
          width={45}
          height={18}
          sx={{ transform: "none" }}
        />
      </Box>

      <Box>
        <Skeleton
          variant="rounded"
          width={70}
          height={24}
          sx={{ borderRadius: "6px" }}
        />
      </Box>

      <Box>
        <Skeleton
          variant="text"
          width={90}
          height={16}
          sx={{ transform: "none" }}
        />
        <Skeleton
          variant="text"
          width={75}
          height={16}
          sx={{ transform: "none" }}
        />
      </Box>

      <Skeleton
        variant="rounded"
        width={60}
        height={28}
        sx={{ borderRadius: "6px" }}
      />
    </Box>
  );
};

export default ContestCardSkeleton