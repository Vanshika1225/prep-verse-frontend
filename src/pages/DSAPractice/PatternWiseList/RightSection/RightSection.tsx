import {
  ChevronRightRounded as ChevronRightRoundedIcon,
  TrendingUpRounded,
} from "@mui/icons-material";
import { Box, Button, Skeleton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PatternsModal from "../ViewAllModal/ViewALlModal";
import { getColorSet, PATTERNS, QUICK_ACTIONS } from "../data";
import { CircularGauge, IconBadge, LinearBar } from "../shared";
import { styles } from "../style";

import NoDataFound from "@/components/NoDataFound/NoDataFound";
import {
  useGetPatternWiseProblemsQuery,
  useGetRecommendedProblemsQuery,
} from "@/services/dsaApi";

const OverallProgress = () => {
  const theme = useTheme();

  const { data: patternWiseData, isLoading } = useGetPatternWiseProblemsQuery();

  const patternData = patternWiseData?.data.overall;

  const hasData = (patternData?.totalProblems ?? 0) > 0;

  return (
    <Box
      sx={{
        ...styles.overallProgressOuterBox,
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.white.main,
      }}
    >
      <Typography variant="h6-bold" sx={{ ...styles.headingStyles, mb: 3 }}>
        Overall Progress
      </Typography>

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Skeleton variant="circular" width={140} height={140} />

          <Skeleton variant="text" width={170} height={28} sx={{ mt: 1 }} />

          <Skeleton variant="text" width={180} height={22} />
        </Box>
      ) : !hasData ? (
        <NoDataFound message="Solve some problems to see your overall progress." />
      ) : (
        <>
          <CircularGauge
            value={patternData?.progress ?? 0}
            size={140}
            thickness={11}
            color={theme.palette.primary.main}
            sweep={200}
          >
            <Typography variant="h4-bold">
              {patternData?.progress ?? 0}%
            </Typography>

            <Typography
              variant="body1-medium"
              sx={{ color: theme.palette.text.secondary }}
            >
              Overall DSA Progress
            </Typography>
          </CircularGauge>

          <Typography
            variant="p-medium"
            sx={{ color: theme.palette.text.secondary, mt: -3 }}
          >
            Solved {patternData?.solvedProblems ?? 0} /{" "}
            {patternData?.totalProblems ?? 0} Problems
          </Typography>
        </>
      )}
    </Box>
  );
};

const PatternProgress = () => {
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState(false);

  const { data: patternWiseData, isLoading } = useGetPatternWiseProblemsQuery();

  const patternData = patternWiseData?.data.patterns ?? [];

  return (
    <>
      <Box
        sx={{
          p: 2,
          borderRadius: "12px",
          border: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.white.main,
        }}
      >
        <Box sx={styles.patternProgressBox}>
          <Typography variant="h6-bold" sx={styles.headingStyles}>
            Patterns Progress
          </Typography>

          {isLoading ? (
            <Skeleton variant="text" width={60} height={24} />
          ) : (
            patternData.length > 0 && (
              <Typography
                variant="body-medium"
                onClick={() => setModalOpen(true)}
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                View All
              </Typography>
            )
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.3,
          }}
        >
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Skeleton variant="rounded" width={30} height={30} />

                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="45%" height={22} />

                  <Skeleton variant="rounded" width="100%" height={6} />
                </Box>
              </Box>
            ))
          ) : patternData.length === 0 ? (
            <NoDataFound message="Solve some problems to see your pattern progress." />
          ) : (
            patternData.slice(0, 5).map((pattern, index) => {
              const patternInfo = PATTERNS[index];

              const colorKey = patternInfo?.colorKey ?? "primary";
              const icon = patternInfo?.icon ?? TrendingUpRounded;

              const { color, bg } = getColorSet(theme, colorKey);

              return (
                <Box
                  key={pattern.name}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <IconBadge icon={icon} color={color} bg={bg} size={30} />

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body-medium">
                      {pattern.name}
                    </Typography>

                    <LinearBar percent={pattern.progress} color={color} />
                  </Box>
                </Box>
              );
            })
          )}
        </Box>
      </Box>

      <PatternsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        patterns={patternData}
      />
    </>
  );
};

const RecommendedForYou = ({ pattern }: { pattern: string }) => {
  const theme = useTheme();
  const primaryTint = `${theme.palette.primary.main}12`;

  const { data: recommended, isLoading } = useGetRecommendedProblemsQuery(
    { pattern },
    {
      skip: !pattern,
    },
  );

  const recommendedData = recommended?.data ?? [];

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: "12px",
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.white.main,
      }}
    >
      <Typography variant="h6-bold" sx={styles.headingStyles}>
        Recommended for You
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mt: 2,
        }}
      >
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1.2,
              }}
            >
              <Box sx={styles.flexStyles}>
                <Skeleton variant="rounded" width={34} height={34} />

                <Box>
                  <Skeleton variant="text" width={150} height={22} />

                  <Skeleton variant="text" width={65} height={18} />
                </Box>
              </Box>

              <Skeleton variant="rounded" width={45} height={30} />
            </Box>
          ))
        ) : recommendedData.length === 0 ? (
          <NoDataFound message="No recommended problems are available right now." />
        ) : (
          recommendedData.map((item) => (
            <Box
              key={item._id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1.2,
              }}
            >
              <Box sx={styles.flexStyles}>
                <IconBadge
                  icon={TrendingUpRounded}
                  color={theme.palette.primary.main}
                  bg={primaryTint}
                  size={34}
                />

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="p-medium">{item.title}</Typography>

                  <Typography
                    variant="body-medium"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    {item.difficulty}
                  </Typography>
                </Box>
              </Box>

              <Button
                size="small"
                variant="text"
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  minWidth: "auto",
                }}
                onClick={() => window.open(item.problemLink, "_blank")}
              >
                Start
              </Button>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

const QuickAction = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const primaryTint = `${theme.palette.primary.main}12`;

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: "12px",
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.white.main,
      }}
    >
      <Typography variant="h6-bold" sx={styles.headingStyles}>
        Quick Actions
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          mt: 2,
        }}
      >
        {QUICK_ACTIONS.map((item) => (
          <Box
            key={item.title}
            onClick={() => {
              void navigate(item.route);
            }}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1.2,
              cursor: "pointer",
            }}
          >
            <Box sx={styles.flexStyles}>
              <IconBadge
                icon={item.icon}
                color={theme.palette.primary.main}
                bg={primaryTint}
                size={34}
              />

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="p-medium" sx={{ fontWeight: 600 }}>
                  {item.title}
                </Typography>

                <Typography
                  variant="body-medium"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {item.subtitle}
                </Typography>
              </Box>
            </Box>

            <ChevronRightRoundedIcon
              sx={{
                color: theme.palette.text.secondary,
                fontSize: 20,
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

interface RightSectionProps {
  pattern: string;
}

const RightSection = ({ pattern }: RightSectionProps) => {
  return (
    <Box sx={styles.rightSectionContainer}>
      <OverallProgress />
      <PatternProgress />
      <RecommendedForYou pattern={pattern} />
      <QuickAction />
    </Box>
  );
};

export default RightSection;
