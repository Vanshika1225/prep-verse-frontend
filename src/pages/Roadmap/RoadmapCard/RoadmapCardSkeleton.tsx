import { Box, Skeleton } from "@mui/material";

import {
  arrayBoxWrapper,
  innerStyleOfRoadmapSkeleton,
  otherStyle,
  roadmapCardSkeleton,
  roadmapMetaData,
} from "../style";

const RoadmapCardSkeleton = () => {
  return (
    <Box sx={roadmapCardSkeleton}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
        <Skeleton
          variant="rounded"
          width={48}
          height={48}
          sx={{ borderRadius: "12px", flexShrink: 0 }}
        />

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
            <Skeleton variant="text" width="45%" height={28} />
            <Skeleton
              variant="rounded"
              width={80}
              height={22}
              sx={{ borderRadius: "999px" }}
            />
          </Box>

          <Skeleton variant="text" width="90%" height={20} />
          <Skeleton variant="text" width="65%" height={20} />

          <Box sx={roadmapMetaData}>
            <Skeleton variant="text" width={95} height={18} />
            <Skeleton variant="text" width={65} height={18} />
            <Skeleton variant="text" width={85} height={18} />
          </Box>
        </Box>
      </Box>

      <Box sx={innerStyleOfRoadmapSkeleton}>
        <Box sx={otherStyle}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Box key={index} sx={arrayBoxWrapper}>
              <Skeleton variant="circular" width={26} height={26} />
              <Skeleton
                variant="text"
                width="100%"
                height={16}
                sx={{ mt: 1 }}
              />
              <Skeleton variant="text" width="70%" height={16} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default RoadmapCardSkeleton;
