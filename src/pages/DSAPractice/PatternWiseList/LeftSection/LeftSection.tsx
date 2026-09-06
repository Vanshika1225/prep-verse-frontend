import {
  AppsRounded as AppsRoundedIcon,
  BookmarkBorderRounded as BookmarkBorderRoundedIcon,
  CheckCircleRounded as CheckCircleRoundedIcon,
  ChevronRightRounded as ChevronRightRoundedIcon,
  PlayArrowRounded as PlayArrowRoundedIcon,
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
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type SetStateAction,
} from "react";

import {
  DIFFICULTY_BREAKDOWN,
  FILTER_TABS,
  LEARN_ITEMS,
  PATTERNS,
  getColorSet,
  type Pattern,
} from "../data";
import { CircularGauge, IconBadge, LinearBar } from "../shared";
import { styles } from "../style";

import PieChart from "@/components/ChartComponent/PieChart";

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
  const [activeKey, setActiveKey] = useState(PATTERNS[0]?.key);
  const [overflowTabs, setOverflowTabs] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState("All Patterns");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const active = useMemo(() => {
    const pattern = PATTERNS.find((p) => p.key === activeKey) ?? PATTERNS[0];

    if (!pattern) {
      throw new Error("PATTERNS must contain at least one pattern");
    }

    return pattern;
  }, [activeKey]);

  const activeColors = getColorSet(theme, active?.colorKey);
  const solved = Math.round((active.percent / 100) * active.count);

  useEffect(() => {
    const calculateTabs = () => {
      let usedWidth = 0;

      if (!containerRef.current) return;

      const containerWidth = containerRef?.current?.clientWidth;
      const availableWidth = containerWidth - 45;
      const allTabs = ["All Patterns", ...FILTER_TABS];

      const visible: SetStateAction<string[]> = [];
      const overflow: SetStateAction<string[]> = [];

      const tabsWithWidths = allTabs.map((label) => ({
        label,
        width:
          label === "All Patterns" ? 125 : Math.max(80, label.length * 8 + 40),
      }));

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
  }, []);

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
            onClick={() => setActiveFilter(label)}
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
              onClick={(event) => setAnchorEl(event?.currentTarget)}
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
            >
              {overflowTabs.map((label) => (
                <MenuItem
                  key={label}
                  selected={activeFilter === label}
                  onClick={() => {
                    setActiveFilter(label);
                    setAnchorEl(null);
                  }}
                >
                  {label}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </Box>

      <Box sx={styles.allPattern}>
        {PATTERNS.map((pattern) => (
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
              icon={active.icon}
              color={activeColors.color}
              bg={activeColors.bg}
              size={42}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="h6-bold">
                {active.name} Pattern Overview
              </Typography>
              <Typography
                variant="body-medium"
                sx={{ color: theme.palette.text.secondary }}
              >
                Learn {active.name.toLowerCase()} techniques including
                traversal, manipulation, and advanced problem solving.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
            <Button
              variant="outlined"
              startIcon={<BookmarkBorderRoundedIcon />}
              sx={styles.buttonStyle}
            >
              Bookmark
            </Button>
            <Button
              variant="contained"
              startIcon={<PlayArrowRoundedIcon />}
              sx={styles.buttonStyle}
            >
              Start Practice
            </Button>
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
              <Box
                sx={{
                  width: 130,
                  height: 140,
                }}
              >
                <PieChart
                  data={DIFFICULTY_BREAKDOWN.map((d) => ({
                    name: d.label,
                    value: d.count,
                  }))}
                  showLegend={false}
                  height={140}
                />
              </Box>

              <Box>
                {DIFFICULTY_BREAKDOWN.map((d) => (
                  <Box
                    key={d.label}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.8,
                    }}
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
              value={active.percent}
              size={110}
              thickness={9}
              color={theme.palette.success.main}
              sweep={360}
            >
              <Typography variant="h6-bold">{active.percent}%</Typography>
              <Typography
                variant="caption"
                sx={{ color: theme.palette.text.secondary }}
              >
                {solved} / {active.count}
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
            {LEARN_ITEMS.map((item) => (
              <Box
                key={item}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <CheckCircleRoundedIcon
                  sx={{ fontSize: 18, color: theme.palette.success.main }}
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
