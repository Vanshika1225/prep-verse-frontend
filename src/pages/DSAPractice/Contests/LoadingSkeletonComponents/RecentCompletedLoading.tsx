import { Box, Skeleton } from "@mui/material";

import { card } from "../style";

const RecentCompletedSkeleton = () => (
  <Box
    sx={{
      ...card,
      p: "14px 13px 12px",
    }}
  >
    <Box sx={{ display: "flex", gap: "10px" }}>
      <Skeleton
        variant="rounded"
        width={24}
        height={24}
        sx={{ flexShrink: 0 }}
      />

      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Skeleton
          variant="text"
          width="75%"
          height={20}
          sx={{ transform: "none" }}
        />

        <Skeleton
          variant="text"
          width="40%"
          height={18}
          sx={{
            transform: "none",
            mt: "6px",
          }}
        />
      </Box>
    </Box>

    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 2,
        mt: 2,
        mb: 2,
      }}
    >
      <Box>
        <Skeleton
          variant="text"
          width={40}
          height={16}
          sx={{ transform: "none" }}
        />
        <Skeleton
          variant="text"
          width={55}
          height={22}
          sx={{ transform: "none", mt: 0.5 }}
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
          width={50}
          height={22}
          sx={{ transform: "none", mt: 0.5 }}
        />
      </Box>
    </Box>

    <Skeleton
      variant="rounded"
      width="100%"
      height={32}
      sx={{ borderRadius: "6px" }}
    />
  </Box>
);

export default RecentCompletedSkeleton;
