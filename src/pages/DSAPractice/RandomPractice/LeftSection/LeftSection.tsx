import {
  AutoAwesomeRounded as AutoAwesomeRoundedIcon,
  DeleteOutlineRounded as DeleteOutlineRoundedIcon,
  LocalFireDepartmentRounded as LocalFireDepartmentRoundedIcon,
  RefreshRounded as RefreshRoundedIcon,
  SentimentSatisfiedAltRounded as SentimentSatisfiedAltRoundedIcon,
  ShuffleRounded as ShuffleRoundedIcon,
  WhatshotRounded as WhatshotRoundedIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Tooltip,
  Typography,
  useTheme,
  type SxProps,
  type Theme,
} from "@mui/material";
import { type GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";

import { useRandomPractice } from "../context";
import { difficultyChip, leftSectionStyles } from "../style";
import {
  DIFFICULTY_OPTIONS,
  QUESTION_COUNT_OPTIONS,
  type Difficulty,
  type Row,
} from "../types";

import MuiTableComponent from "@/components/MuiTableComponent";
import NoDataFound from "@/components/NoDataFound/NoDataFound";

type DifficultyIcon = typeof SentimentSatisfiedAltRoundedIcon;

const DIFFICULTY_ICONS: Record<Difficulty, DifficultyIcon> = {
  Easy: SentimentSatisfiedAltRoundedIcon,
  Medium: LocalFireDepartmentRoundedIcon,
  Hard: WhatshotRoundedIcon,
};

const getColumns = (
  theme: Theme,
  styles: ReturnType<typeof leftSectionStyles>,
): GridColDef<Row>[] => [
  {
    field: "serial",
    headerName: "#",
    width: 60,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: ({ row }) => (
      <Typography
        variant="body-medium"
        sx={{ color: theme.palette.black.secondary }}
      >
        {row.serial}
      </Typography>
    ),
  },
  {
    field: "title",
    headerName: "Problem",
    flex: 1,
    minWidth: 240,
    renderCell: ({ row }) => (
      <Box sx={styles.cellStack}>
        <Tooltip title={row.title || "-"} arrow>
          <Typography
            variant="body-secondary-bold"
            sx={{
              ...styles.cellTitle,
            }}
          >
            {row.title || "-"}
          </Typography>
        </Tooltip>

        <Tooltip title={row.topics?.join(", ") || "-"} arrow>
          <Typography
            variant="body1-medium"
            sx={{
              ...styles.cellTopics,
            }}
          >
            {row.topics?.length ? row.topics.join(", ") : "-"}
          </Typography>
        </Tooltip>
      </Box>
    ),
  },
  {
    field: "difficulty",
    headerName: "Difficulty",
    width: 120,
    renderCell: ({ row }) => (
      <Chip
        label={row.difficulty ?? "-"}
        size="small"
        sx={difficultyChip(theme, row.difficulty)}
      />
    ),
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    sortable: false,
    renderCell: ({ row }) => (
      <Typography
        variant="body-medium"
        sx={{ color: theme.palette.black.secondary }}
      >
        {row.status ?? "Not Started"}
      </Typography>
    ),
  },
  {
    field: "actions",
    headerName: "Action",
    width: 150,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: "right",
    headerAlign: "right",
    renderCell: ({ row }) => (
      <Box>
        <Button
          size="small"
          variant={row.status === "Solved" ? "outlined" : "contained"}
          href={row.problemLink}
          target="_blank"
          rel="noopener noreferrer"
          sx={styles.solveButton}
        >
          {row.status === "Solved" ? "Again" : "Solve"}
        </Button>
      </Box>
    ),
  },
];

export const LeftSection = () => {
  const theme = useTheme();
  const styles = leftSectionStyles(theme);

  const {
    filters,
    problems,
    isGenerating,
    hasGenerated,
    isMixed,
    toggleDifficulty,
    selectMixed,
    setCount,
    generate,
    clearSet,
  } = useRandomPractice();

  const rows: Row[] = useMemo(() => {
    const filteredProblems = problems.filter((problem) => {
      if (
        filters.difficulty.length > 0 &&
        !filters.difficulty.includes(problem.difficulty)
      ) {
        return false;
      }

      if (
        filters.topics.length > 0 &&
        !filters.topics.some((topic) => problem.topics?.includes(topic))
      ) {
        return false;
      }

      if (filters.excludeSolved && problem.status === "Solved") {
        return false;
      }

      if (filters.bookmarkedOnly && !problem.bookmarked) {
        return false;
      }

      return true;
    });

    return filteredProblems.map((problem, index) => ({
      ...problem,
      id: problem._id,
      serial: index + 1,
      status: problem.status ?? "Not Started",
      bookmarked: problem.bookmarked ?? false,
    }));
  }, [problems, filters]);

  const columns = useMemo(() => getColumns(theme, styles), [theme, styles]);

  const getDifficultyTone = (option: Difficulty) => {
    switch (option) {
      case "Easy":
        return {
          color: theme.palette.success.main,
          bg: theme.palette.success.light,
        };

      case "Medium":
        return {
          color: theme.palette.warning.main100 ?? theme.palette.warning.main,
          bg: theme.palette.warning.light,
        };

      default:
        return {
          color: theme.palette.error.main,
          bg: theme.palette.error.light,
        };
    }
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.heading}>
        <Typography variant="h4-bold">Random Practice</Typography>

        <Typography variant="body-medium" sx={styles.headingCaption}>
          Practice random problems and level up your coding skills
        </Typography>
      </Box>

      <Box sx={styles.generatorBar}>
        <Box sx={styles.generatorGroup}>
          <Typography variant="p-bold" sx={styles.generatorLabel}>
            1. Select Difficulty
          </Typography>

          <Box sx={styles.optionRow}>
            {DIFFICULTY_OPTIONS.map((option) => {
              const Icon = DIFFICULTY_ICONS[option];
              const tone = getDifficultyTone(option);

              return (
                <Box
                  key={option}
                  onClick={() => toggleDifficulty(option)}
                  sx={styles.difficultyOption(
                    filters.difficulty.includes(option),
                    tone.color,
                    tone.bg,
                  )}
                >
                  <Icon sx={{ fontSize: 16 }} />

                  <Typography
                    variant="body-bold"
                    sx={{ color: "inherit", fontWeight: 600 }}
                  >
                    {option}
                  </Typography>
                </Box>
              );
            })}

            <Box
              onClick={selectMixed}
              sx={styles.difficultyOption(
                isMixed,
                theme.palette.primary.main,
                theme.palette.primary.main100 ?? theme.palette.primary.light,
              )}
            >
              <ShuffleRoundedIcon sx={{ fontSize: 16 }} />

              <Typography
                variant="body-bold"
                sx={{ color: "inherit", fontWeight: 600 }}
              >
                Mixed
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={styles.generatorGroup}>
          <Typography variant="p-bold" sx={styles.generatorLabel}>
            2. Number of Questions
          </Typography>

          <Box sx={styles.optionRow}>
            {QUESTION_COUNT_OPTIONS.map((option) => (
              <Box
                key={option}
                onClick={() => setCount(option)}
                sx={
                  styles.countOption(filters.count === option) as SxProps<Theme>
                }
              >
                <Typography
                  variant="body-bold"
                  sx={{ color: "inherit", fontWeight: 600 }}
                >
                  {option}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Button
          variant="contained"
          size="medium"
          onClick={() => void generate()}
          disabled={isGenerating || filters.difficulty.length === 0}
          startIcon={<AutoAwesomeRoundedIcon />}
          sx={styles.generateButton}
        >
          {isGenerating ? "Generating..." : "Generate Practice Set"}
        </Button>
      </Box>

      <Box sx={styles.setHeader}>
        <Typography variant="h6-bold" sx={{ fontSize: "16px" }}>
          Your Random Practice Set
          {rows.length > 0 ? ` (${rows.length} Problems)` : ""}
        </Typography>
      </Box>

      <Box sx={styles.tableWrapper}>
        {!isGenerating && rows.length === 0 ? (
          <Box sx={styles.emptyState}>
            <NoDataFound
              noImage={false}
              message={
                hasGenerated
                  ? "No problems matched these filters. Try widening them."
                  : "Pick a difficulty and generate your first practice set"
              }
            />
          </Box>
        ) : (
          <MuiTableComponent
            rows={rows}
            columns={columns}
            theme={theme}
            loading={isGenerating}
          />
        )}
      </Box>

      <Box sx={styles.footerBar}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => void generate()}
          disabled={isGenerating || rows.length === 0}
          startIcon={<RefreshRoundedIcon />}
          sx={styles.regenerateButton}
        >
          Regenerate Set
        </Button>

        <Button
          variant="outlined"
          size="small"
          onClick={clearSet}
          disabled={rows.length === 0}
          startIcon={<DeleteOutlineRoundedIcon />}
          sx={styles.clearButton}
        >
          Clear Set
        </Button>
      </Box>
    </Box>
  );
};

export default LeftSection;
