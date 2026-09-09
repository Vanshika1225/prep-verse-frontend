// import { ChevronRightRounded as ChevronRightRoundedIcon } from "@mui/icons-material";
import {
  ChevronRightRounded as ChevronRightRoundedIcon,
  TrendingUpRounded,
} from "@mui/icons-material";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { getColorSet, PATTERNS, QUICK_ACTIONS } from "../data";
import { CircularGauge, IconBadge, LinearBar } from "../shared";
import { styles } from "../style";

import {
  useGetPatternWiseProblemsQuery,
  useGetRecommendedProblemsQuery,
} from "@/services/dsaApi";

const OverallProgress = () => {
  const theme = useTheme();
  const { data: patternWiseData } = useGetPatternWiseProblemsQuery();

  const patternData = patternWiseData?.data.overall;

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

      <CircularGauge
        value={patternData?.progress ?? 0}
        size={140}
        thickness={11}
        color={theme.palette.primary.main}
        sweep={200}
      >
        <Typography variant="h4-bold">{patternData?.progress ?? 0}%</Typography>

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
    </Box>
  );
};

const PatternProgress = () => {
  const theme = useTheme();

  const { data: patternWiseData } = useGetPatternWiseProblemsQuery();

  const patternData = patternWiseData?.data.patterns ?? [];

  return (
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

        <Typography
          variant="body-medium"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          View All
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.3,
        }}
      >
        {patternData.slice(0, 5).map((pattern, index) => {
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
                <Typography variant="body-medium">{pattern.name}</Typography>

                <LinearBar percent={pattern.progress} color={color} />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

const RecommendedForYou = ({ pattern }: { pattern: string }) => {
  const theme = useTheme();
  const primaryTint = `${theme.palette.primary.main}12`;

  const { data: recommended } = useGetRecommendedProblemsQuery(
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
        {recommendedData.map((item) => (
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
        ))}
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
