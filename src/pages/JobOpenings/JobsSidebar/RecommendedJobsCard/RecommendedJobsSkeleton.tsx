import { Box, Skeleton } from "@mui/material";

import { recommendedItemContainer } from "../../style";

const RecommendedJobsSkeleton = () => {
  return (
    <>
      {[1, 2, 3].map((item) => (
        <Box key={item} sx={recommendedItemContainer}>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Skeleton
              variant="rounded"
              width={38}
              height={38}
              sx={{ flexShrink: 0, borderRadius: "8px" }}
            />

            <Box>
              <Skeleton variant="text" width={100} height={22} />
              <Skeleton variant="text" width={80} height={20} />

              <Box sx={{ mt: 0.5 }}>
                <Skeleton variant="text" width={60} height={16} />
                <Skeleton variant="text" width={65} height={16} />
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default RecommendedJobsSkeleton;