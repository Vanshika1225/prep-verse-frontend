import { ChevronRightRounded as ChevronRightRoundedIcon } from "@mui/icons-material";
import { Box, Button, Typography, useTheme } from "@mui/material";

import {
  getColorSet,
  OVERALL_SOLVED,
  OVERALL_TOTAL,
  PATTERNS,
  QUICK_ACTIONS,
  RECOMMENDED,
} from "../data";
import { CircularGauge, IconBadge, LinearBar } from "../shared";
import { styles } from "../style";

const OVERALL_PERCENT = Math.round((OVERALL_SOLVED / OVERALL_TOTAL) * 100);

const OverallProgress = () => {
  const theme = useTheme();

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
        value={OVERALL_PERCENT}
        size={140}
        thickness={11}
        color={theme.palette.primary.main}
        sweep={200}
      >
        <Typography variant="h4-bold">{OVERALL_PERCENT}%</Typography>
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
        Solved {OVERALL_SOLVED} / {OVERALL_TOTAL} Problems
      </Typography>
    </Box>
  );
};

const PatternProgress = () => {
  const theme = useTheme();

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

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.3 }}>
        {PATTERNS.slice(0, 5).map((pattern) => {
          const { color, bg } = getColorSet(theme, pattern.colorKey);
          return (
            <Box
              key={pattern.key}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <IconBadge icon={pattern.icon} color={color} bg={bg} size={30} />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="body-medium">{pattern.name}</Typography>
                <LinearBar percent={pattern.percent} color={color} />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

const RecommendedForYou = () => {
  const theme = useTheme();
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
        Recommended for You
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
        {RECOMMENDED.map((item) => (
          <Box
            key={item.title}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1.2,
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
                <Typography variant="p-medium">{item.title}</Typography>
                <Typography
                  variant="body-medium"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {item.subtitle}
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

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 2 }}>
        {QUICK_ACTIONS.map((item) => (
          <Box
            key={item.title}
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
              <Box sx={{ display: "Flex", flexDirection: "column" }}>
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
              sx={{ color: theme.palette.text.secondary, fontSize: 20 }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export const RightSection = () => {
  return (
    <Box sx={styles.rightSectionContainer}>
      <OverallProgress />
      <PatternProgress />
      <RecommendedForYou />
      <QuickAction />
    </Box>
  );
};

export default RightSection;
