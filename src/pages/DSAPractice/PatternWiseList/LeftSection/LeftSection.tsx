import {
  AppsRounded as AppsRoundedIcon,
  CheckCircleRounded as CheckCircleRoundedIcon,
  ChevronRightRounded as ChevronRightRoundedIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";

import { PATTERNS, getColorSet, type Pattern } from "../data";
import { CircularGauge, IconBadge, LinearBar } from "../shared";
import { styles } from "../style";

import PieChart from "@/components/ChartComponent/PieChart";
import {
  useGetDifficultyOverviewQuery,
  useGetLearningOutcomeQuery,
  useGetPatternWiseProblemsQuery,
} from "@/services/dsaApi";

const PatternCard = ({
  pattern,
  active,
  onClick,
}: {
  pattern: Pattern;
  active: boolean;
  onClick: () => void;
}) => {
  const theme = useTheme();
  const { color, bg } = getColorSet(theme, pattern.colorKey);

  return (
    <Box
      onClick={onClick}
      sx={{
        p: 1.5,
        borderRadius: "12px",
        border: `1.5px solid ${active ? theme.palette.primary.main : theme.palette.divider}`,
        bgcolor: active ? `${theme.palette.primary.main}08` : "white",
        cursor: "pointer",
        "&:hover": { borderColor: theme.palette.primary.main },
      }}
    >
      <IconBadge icon={pattern.icon} color={color} bg={bg} size={40} />
      <Typography variant="p-bold" sx={{ display: "block", mt: 1.2 }}>
        {pattern.name}
      </Typography>
      <Typography
        variant="body1-medium"
        sx={{ color: theme.palette.text.secondary, display: "block", mb: 1 }}
      >
        {pattern.count} Problems
      </Typography>
      <LinearBar percent={pattern.percent} color={color} />
    </Box>
  );
};

export const LeftSection = () => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [visibleTabs, setVisibleTabs] = useState<string[]>([]);
  const [activeKey, setActiveKey] = useState<string>();
  const [overflowTabs, setOverflowTabs] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState("All Patterns");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { data: patternWiseData } = useGetPatternWiseProblemsQuery();

  const apiPatterns = useMemo(
    (): Pattern[] =>
      (patternWiseData?.data.patterns ?? []).map((pattern, index) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const fallbackPattern = PATTERNS[index % PATTERNS.length]!;

        const matchingPattern = PATTERNS.find(
          (localPattern) => localPattern.name === pattern.name,
        );

        return {
          key: pattern.name.toLowerCase().replace(/\s+/g, "-"),
          name: pattern.name,
          count: pattern.totalProblems,
          solved: pattern.solvedProblems,
          percent: pattern.progress,
          icon: matchingPattern?.icon ?? fallbackPattern.icon,
          colorKey: matchingPattern?.colorKey ?? fallbackPattern.colorKey,
        };
      }),
    [patternWiseData],
  );

  const filteredPatterns =
    activeFilter === "All Patterns"
      ? apiPatterns
      : apiPatterns.filter((pattern) => pattern.name === activeFilter);

  const active = apiPatterns.find((pattern) => pattern.key === activeKey) ??
    apiPatterns[0] ?? {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ...PATTERNS[0]!,
      count: 0,
      solved: 0,
      percent: 0,
    };

  const { data: difficultyData } = useGetDifficultyOverviewQuery(
    { pattern: active?.name ?? "" },
    {
      skip: apiPatterns.length === 0,
    },
  );

  const { data: learningOutcomes } = useGetLearningOutcomeQuery(
    { pattern: active?.name ?? "" },
    {
      skip: apiPatterns.length === 0,
    },
  );

  useEffect(() => {
    const calculateTabs = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const availableWidth = containerWidth - 45;

      const allTabs = [
        "All Patterns",
        ...apiPatterns.map((pattern) => pattern.name),
      ];

      const tabsWithWidths = allTabs.map((label) => ({
        label,
        width:
          label === "All Patterns" ? 125 : Math.max(80, label.length * 8 + 40),
      }));

      const visible: string[] = [];
      const overflow: string[] = [];
      let usedWidth = 0;

      tabsWithWidths.forEach(({ label, width }) => {
        if (usedWidth + width <= availableWidth) {
          visible.push(label);
          usedWidth += width + 8;
        } else {
          overflow.push(label);
        }
      });

      setVisibleTabs(visible);
      setOverflowTabs(overflow);
    };

    calculateTabs();

    window.addEventListener("resize", calculateTabs);
    return () => window.removeEventListener("resize", calculateTabs);
  }, [apiPatterns]);

  const handleButtonClick = (label: string) => {
    setActiveFilter(label);
    setAnchorEl(null);

    if (label !== "All Patterns") {
      const selectedPattern = apiPatterns.find(
        (pattern) => pattern.name === label,
      );

      if (selectedPattern) {
        setActiveKey(selectedPattern.key);
      }
    }
  };

  const difficultyBreakdown = useMemo(() => {
    if (!difficultyData?.data) return [];

    const raw = difficultyData.data as unknown as {
      easy: { total: number } | number;
      medium: { total: number } | number;
      hard: { total: number } | number;
    };

    const easy = typeof raw.easy === "number" ? raw.easy : raw.easy.total;
    const medium =
      typeof raw.medium === "number" ? raw.medium : raw.medium.total;
    const hard = typeof raw.hard === "number" ? raw.hard : raw.hard.total;

    const total = easy + medium + hard;

    return [
      {
        label: "Easy",
        count: easy,
        percent: total ? Math.round((easy / total) * 100) : 0,
        colorKey: "success" as const,
      },
      {
        label: "Medium",
        count: medium,
        percent: total ? Math.round((medium / total) * 100) : 0,
        colorKey: "warning" as const,
      },
      {
        label: "Hard",
        count: hard,
        percent: total ? Math.round((hard / total) * 100) : 0,
        colorKey: "error" as const,
      },
    ];
  }, [difficultyData]);

  const LearningItems = learningOutcomes?.data?.learningPoints ?? [];

  const activeColors = getColorSet(theme, active?.colorKey);
  const solved = active?.solved;

  return (
    <Box sx={styles.leftMainBox}>
      <Box sx={styles.innerBox}>
        <Box>
          <Typography variant="h4-bold">Pattern-wise Practice</Typography>
          <Typography
            variant="body-medium"
            sx={{ color: theme.palette.text.secondary, display: "block" }}
          >
            Master DSA patterns step by step
          </Typography>
        </Box>
      </Box>

      <Box ref={containerRef} sx={styles.tabStyle}>
        {visibleTabs.map((label) => (
          <Button
            key={label}
            onClick={() => handleButtonClick(label)}
            startIcon={
              label === "All Patterns" ? (
                <AppsRoundedIcon sx={{ fontSize: 14 }} />
              ) : undefined
            }
            variant={activeFilter === label ? "contained" : "outlined"}
            sx={styles.tabLabel}
          >
            {label}
          </Button>
        ))}

        {overflowTabs.length > 0 && (
          <>
            <IconButton
              size="small"
              onClick={(event) => setAnchorEl(event.currentTarget)}
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: "8px",
                flexShrink: 0,
              }}
            >
              <ChevronRightRoundedIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              slotProps={{
                paper: {
                  sx: {
                    maxHeight: 250,
                    mt: 0.5,
                  },
                },
              }}
            >
              {overflowTabs.map((label) => (
                <MenuItem
                  key={label}
                  selected={activeFilter === label}
                  onClick={() => handleButtonClick(label)}
                >
                  {label}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </Box>

      <Box sx={styles.allPattern}>
        {filteredPatterns.map((pattern) => (
          <PatternCard
            key={pattern.key}
            pattern={pattern}
            active={pattern.key === activeKey}
            onClick={() => setActiveKey(pattern.key)}
          />
        ))}
      </Box>

      <Box
        sx={{
          p: 1.5,
          borderRadius: "12px",
          border: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.white.main,
        }}
      >
        <Box sx={styles.patternOverview}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <IconBadge
              icon={active?.icon}
              color={activeColors?.color}
              bg={activeColors?.bg}
              size={42}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h6-bold">
                {active?.name} Pattern Overview
              </Typography>
              <Typography
                variant="body-medium"
                sx={{ color: theme.palette.text.secondary }}
              >
                Learn {active?.name.toLowerCase()} techniques including
                traversal, manipulation, and advanced problem solving.
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={styles.patternOverviewInnerStyle}>
          <Box
            sx={{
              p: 2,
              borderRadius: "10px",
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="p-bold" sx={{ display: "block", mb: 1 }}>
              Difficulty Breakdown
            </Typography>

            <Box sx={styles.chartOuterBox}>
              <Box sx={{ width: 130, height: 140 }}>
                <PieChart
                  data={difficultyBreakdown.map((d) => ({
                    name: d.label,
                    value: d.count,
                  }))}
                  showLegend={false}
                  height={140}
                />
              </Box>

              <Box>
                {difficultyBreakdown.map((d) => (
                  <Box
                    key={d.label}
                    sx={{ display: "flex", alignItems: "center", gap: 0.8 }}
                  >
                    <Box
                      sx={{
                        width: 9,
                        height: 9,
                        borderRadius: "50%",
                        bgcolor: theme.palette[d.colorKey].main,
                        flexShrink: 0,
                      }}
                    />

                    <Typography
                      variant="body1-medium"
                      sx={{
                        color: theme.palette.text.secondary,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {d.label} {d.count} ({d.percent}%)
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              ...styles.progressBox,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography
              variant="p-bold"
              sx={{ alignSelf: "flex-start", mb: 1 }}
            >
              Your Progress
            </Typography>

            <CircularGauge
              value={active?.percent}
              size={110}
              thickness={9}
              color={theme.palette.success.main}
              sweep={360}
            >
              <Typography variant="h6-bold">{active?.percent}%</Typography>
              <Typography
                variant="caption"
                sx={{ color: theme.palette.text.secondary }}
              >
                {solved} / {active?.count}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: theme.palette.text.secondary }}
              >
                Solved
              </Typography>
            </CircularGauge>

            <Chip
              label="Excellent! Keep going 🚀"
              size="small"
              sx={{
                mt: 1.2,
                bgcolor: theme.palette.success.light,
                color: theme.palette.success.main,
                fontWeight: 600,
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            p: 2,
            borderRadius: "10px",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="p-bold" sx={{ display: "block", mb: 1.5 }}>
            What you will learn
          </Typography>

          <Box sx={styles.learnItemBox}>
            {LearningItems?.map((item) => (
              <Box
                key={item}
                sx={{ display: "flex", alignItems: "start", gap: 1 }}
              >
                <CheckCircleRoundedIcon
                  sx={{
                    fontSize: 18,
                    color: theme.palette.success.main,
                    mt: 0.2,
                  }}
                />
                <Typography variant="body2">{item}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LeftSection;
