import GridIcon from "@mui/icons-material/GridView";
import ListIcon from "@mui/icons-material/List";
import MoreIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Pagination,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
  useTheme,
  type Theme,
} from "@mui/material";
import { type GridColDef } from "@mui/x-data-grid";
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";

import { TABS, type Problem } from "../types";

import MuiTableComponent from "@/components/MuiTableComponent";
import SelectComponent from "@/components/SelectComponent";
import {
  useGetAllProblemsQuery,
  useUpdateProblemMutation,
} from "@/services/dsaApi";

const diffMap = (theme: Theme) => ({
  Easy: {
    color: theme.palette.success.main,
    bg: theme.palette.success.light,
  },

  Medium: {
    color: theme.palette.warning.main,
    bg: theme.palette.warning.light,
  },

  Hard: {
    color: theme.palette.error.main,
    bg: theme.palette.error.light,
  },
});

const statusMap = (theme: Theme) => ({
  Solved: {
    color: theme.palette.success.main,
    bg: theme.palette.success.light,
  },

  Attempted: {
    color: theme.palette.primary.main,
    bg: theme.palette.secondary.light,
  },
  "Not Started": {
    color: theme.palette.black.secondary,
    bg: theme.palette.secondary.light,
  },
  Review: {
    color: theme.palette.warning.main,
    bg: theme.palette.warning.light,
  },
});

const TAB_STATUS_MAP: Record<number, string> = {
  0: "",
  2: "Solved",
  3: "Attempted",
  4: "Review",
};

const BOOKMARKED_TAB_INDEX = 1;

const STATUS_OPTIONS = ["Not Started", "Attempted", "Review", "Solved"];

const StarIcon = ({
  active,
  color,
  onClick,
}: {
  active: boolean;
  color: string;
  onClick?: (e: React.MouseEvent) => void;
}) => {
  return (
    <Box
      component="span"
      onClick={onClick}
      sx={{
        color,
        fontSize: 20,
        lineHeight: 1,
        cursor: onClick ? "pointer" : "default",
        userSelect: "none",
      }}
    >
      {active ? "★" : "☆"}
    </Box>
  );
};

const RowActionsMenu = ({
  problem,
  onUpdateStatus,
}: {
  problem: Problem;
  onUpdateStatus: (problem: Problem, status: string) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (
    _event: "",
    _reason: "backdropClick" | "escapeKeyDown",
  ) => {
    setAnchorEl(null);
  };

  const handleSelect = (e: React.MouseEvent, nextStatus: string) => {
    e.stopPropagation();
    onUpdateStatus(problem, nextStatus);
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton size="small" onClick={handleOpen}>
        <MoreIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {STATUS_OPTIONS.map((option) => (
          <MenuItem
            key={option}
            selected={problem.status === option}
            onClick={(e) => handleSelect(e, option)}
          >
            Mark as {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const getColumns = (
  theme: Theme,
  onToggleBookmark: (problem: Problem, e: React.MouseEvent) => void,
  onUpdateStatus: (problem: Problem, status: string) => void,
): GridColDef<Problem>[] => [
  {
    field: "bookmarked",
    headerName: "",
    width: 50,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: ({ row }) => (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <StarIcon
          active={row.bookmarked ?? false}
          color={
            row.bookmarked
              ? theme.palette.warning.main
              : theme.palette.black.main
          }
          onClick={(e) => onToggleBookmark(row, e)}
        />
      </Box>
    ),
  },
  {
    field: "title",
    headerName: "Title",
    flex: 1,
    minWidth: 200,
    renderCell: ({ row }) => (
      <Tooltip title={row.title || "-"} arrow>
        <Typography
          variant="body-secondary-bold"
          sx={{
            fontWeight: 550,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {row.title || "-"}
        </Typography>
      </Tooltip>
    ),
  },
  {
    field: "topics",
    headerName: "Topics",
    flex: 1,
    minWidth: 220,
    sortable: false,
    renderCell: ({ row }) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          flexWrap: "wrap",
          width: "100%",
          py: 0.5,
        }}
      >
        {row.topics?.length ? (
          row.topics.map((topic) => (
            <Chip
              key={topic}
              label={topic}
              size="small"
              sx={{
                height: 26,
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: 500,
                bgcolor: theme.palette.white.main300,
                color: theme.palette.black.secondary,
                border: `1px solid ${theme.palette.divider}`,
                "& .MuiChip-label": {
                  px: 1,
                },
              }}
            />
          ))
        ) : (
          <Typography
            variant="body-medium"
            sx={{
              color: theme.palette.black.secondary,
            }}
          >
            -
          </Typography>
        )}
      </Box>
    ),
  },

  {
    field: "difficulty",
    headerName: "Difficulty",
    width: 110,
    renderCell: ({ value }) => {
      const diff = diffMap(theme)[value as Problem["difficulty"]];

      if (!diff) {
        return <Chip label={String(value ?? "-")} size="small" />;
      }

      return (
        <Chip
          label={String(value)}
          size="small"
          sx={{
            color: diff.color,
            bgcolor: diff.bg,
            fontWeight: 600,
            borderRadius: "6px",
            height: 28,
            "& .MuiChip-label": {
              px: 1.2,
            },
          }}
        />
      );
    },
  },

  {
    field: "status",
    headerName: "Status",
    width: 125,
    renderCell: ({ value }) => {
      const statusStyles = statusMap(theme);

      const status =
        typeof value === "string" && value in statusStyles
          ? statusStyles[value as keyof typeof statusStyles]
          : undefined;

      if (!status) {
        return (
          <Chip
            label={String(value ?? "-")}
            size="small"
            sx={{
              fontWeight: 600,
              borderRadius: "6px",
              height: 28,
            }}
          />
        );
      }

      return (
        <Chip
          label={String(value)}
          size="small"
          sx={{
            color: status.color,
            bgcolor: status.bg,
            fontWeight: 600,
            borderRadius: "6px",
            height: 28,
            "& .MuiChip-label": {
              px: 1.2,
            },
          }}
        />
      );
    },
  },

  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    align: "right",
    headerAlign: "right",

    renderCell: ({ row }) => (
      <Box
        sx={{
          display: "flex",
          gap: 0.5,
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Button
          size="small"
          variant={row.status === "Solved" ? "text" : "contained"}
          href={row.problemLink}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            minWidth: 88,
            textTransform: "none",
            borderRadius: "7px",
            fontWeight: "bold",
          }}
        >
          {row.status === "Solved" ? "Solve Again" : "Solve"}
        </Button>

        <RowActionsMenu problem={row} onUpdateStatus={onUpdateStatus} />
      </Box>
    ),
  },
];

const ProblemCard = ({
  problem,
  theme,
  onToggleBookmark,
}: {
  problem: Problem;
  theme: Theme;
  onToggleBookmark: (problem: Problem, e: React.MouseEvent) => void;
}) => {
  const diff = diffMap(theme)[problem.difficulty];

  return (
    <Box
      sx={{
        p: 2,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "10px",
        bgcolor: "white",

        "&:hover": {
          borderColor: theme.palette.primary.main,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <StarIcon
          active={problem?.bookmarked ?? false}
          color={
            problem.bookmarked
              ? theme.palette.warning.main
              : theme.palette.white.main400
          }
          onClick={(e) => onToggleBookmark(problem, e)}
        />

        <Chip
          label={problem.difficulty}
          size="small"
          sx={{
            color: diff.color,
            bgcolor: diff.bg,
            fontWeight: 600,
            borderRadius: "6px",
            height: 28,
            "& .MuiChip-label": {
              px: 1.2,
            },
          }}
        />
      </Box>

      <Tooltip title={problem.title ?? "-"} arrow>
        <Typography
          variant="p-bold"
          sx={{
            display: "block",
            fontWeight: "bold",
            my: 1.5,
            whiteSpace: "nowrap",
            overflow: "hidden",
            width: "250px",
            textOverflow: "ellipsis",
          }}
        >
          {problem.title ?? "-"}
        </Typography>
      </Tooltip>

      <Typography
        variant="body-secondary-medium"
        sx={{
          display: "block",
          color: theme.palette.black.secondary,
        }}
      >
        {problem.topics.join(", ")}
      </Typography>
    </Box>
  );
};

const PAGE_SIZE = 10;

export const LeftSection = () => {
  const theme = useTheme();

  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(1);
  const [topic, setTopic] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [view, setView] = useState("list");
  const [difficulty, setDifficulty] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [pendingUpdates, setPendingUpdates] = useState<
    Record<string, Partial<Pick<Problem, "bookmarked" | "status">>>
  >({});

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value);
        setPage(1);
      }, 400),
    [],
  );

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    debouncedSetSearch(value);
  };

  const effectiveStatus = tab === 0 ? status : (TAB_STATUS_MAP[tab] ?? "");

  const [updateProblem] = useUpdateProblemMutation();
  const { data: problemsResponse } = useGetAllProblemsQuery({
    topic,
    difficulty,
    status: effectiveStatus,
    search,
    page,
    limit: PAGE_SIZE,
    ...(tab === BOOKMARKED_TAB_INDEX ? { bookmarked: true } : {}),
  });

  const filters = problemsResponse?.data?.filters;
  const pagination = problemsResponse?.data?.pagination;

  const totalProblems = pagination?.totalProblems ?? 0;
  const totalPages = pagination?.totalPages ?? 1;
  const currentPage = pagination?.currentPage ?? page;
  const limit = pagination?.limit ?? PAGE_SIZE;

  const from = totalProblems === 0 ? 0 : (currentPage - 1) * limit + 1;
  const to = Math.min(currentPage * limit, totalProblems);

  const allProblems = useMemo(() => {
    const raw = problemsResponse?.data?.problems ?? [];

    return raw.map((problem) => ({
      ...problem,
      ...pendingUpdates[problem._id],
    }));
  }, [problemsResponse, pendingUpdates]);

  const filteredProblems = useMemo(() => {
    if (tab === BOOKMARKED_TAB_INDEX) {
      return allProblems.filter((problem) => problem.bookmarked);
    }

    return allProblems;
  }, [allProblems, tab]);

  const options = useMemo(() => {
    const topicValues = filters?.topics ?? [];
    const difficultyValues = filters?.difficulties ?? [];
    const statusValues = filters?.statuses ?? [];

    return {
      topic: topicValues.map((value) => ({ label: value, value })),
      difficulty: difficultyValues.map((value) => ({ label: value, value })),
      status: statusValues.map((value) => ({ label: value, value })),
    };
  }, [filters]);

  const handleToggleBookmark = useCallback(
    (problem: Problem, e: React.MouseEvent) => {
      e.stopPropagation();

      const next = !(problem.bookmarked ?? false);

      setPendingUpdates((prev) => ({
        ...prev,
        [problem._id]: { ...prev[problem._id], bookmarked: next },
      }));

      updateProblem({
        id: problem._id,
        data: { bookmarked: next, status: problem.status },
      })
        .unwrap()
        .catch(() => {
          setPendingUpdates((prev) => ({
            ...prev,
            [problem._id]: {
              ...prev[problem._id],
              bookmarked: problem.bookmarked ?? false,
            },
          }));
        });
    },
    [updateProblem],
  );

  const handleUpdateStatus = useCallback(
    (problem: Problem, nextStatus: string) => {
      setPendingUpdates((prev) => ({
        ...prev,
        [problem._id]: {
          ...prev[problem._id],
          status: nextStatus,
        },
      }));

      updateProblem({
        id: problem._id,
        data: { bookmarked: problem.bookmarked ?? false, status: nextStatus },
      })
        .unwrap()
        .catch(() => {
          setPendingUpdates((prev) => ({
            ...prev,
            [problem._id]: { ...prev[problem._id], status: problem.status },
          }));
        });
    },
    [updateProblem],
  );

  const columns = useMemo(
    () => getColumns(theme, handleToggleBookmark, handleUpdateStatus),
    [theme, handleToggleBookmark, handleUpdateStatus],
  );

  const handleTabChange = (_: React.SyntheticEvent, value: number) => {
    setTab(value);
    setPage(1);
  };

  return (
    <Box
      sx={{
        mt: { md: 0, xs: 5 },
        width: { md: "70%", xs: "100%" },
        minWidth: 0,
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        pr: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { md: "row", xs: "column" },
          alignItems: { md: "center", xs: "flex-start" },
          mb: 2.5,
        }}
      >
        <Box>
          <Typography variant="h4-bold">Problem List</Typography>

          <Typography
            variant="body-medium"
            sx={{
              color: theme.palette.black.secondary,
              display: "block",
            }}
          >
            Practice coding problems and improve your skills
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography
            variant="body1-medium"
            sx={{
              color: theme.palette.black.secondary,
            }}
          >
            View:
          </Typography>

          <Box>
            <IconButton
              size="small"
              onClick={() => setView("list")}
              sx={{
                borderRadius: "6px",
                bgcolor:
                  view === "list" ? theme.palette.white.main400 : "transparent",

                color:
                  view === "list"
                    ? theme.palette.primary.main
                    : theme.palette.black.secondary,
              }}
            >
              <ListIcon />
            </IconButton>

            <IconButton
              size="small"
              onClick={() => setView("grid")}
              sx={{
                borderRadius: "6px",
                bgcolor:
                  view === "grid" ? theme.palette.white.main400 : "transparent",

                color:
                  view === "grid"
                    ? theme.palette.primary.main
                    : theme.palette.black.secondary,
              }}
            >
              <GridIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { md: "row", xs: "column" },
          alignItems: { md: "center", xs: "flex-start" },
          textAlign: "center",
          mb: 0.7,
        }}
      >
        <TextField
          value={searchInput}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search problems..."
          size="small"
          sx={{
            minWidth: { md: 220, xs: "100%" },
            bgcolor: "white",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Box
                    sx={{
                      color: theme.palette.black.secondary,
                      display: "flex",
                    }}
                  >
                    <SearchIcon />
                  </Box>
                </InputAdornment>
              ),
            },
          }}
        />

        <SelectComponent
          label="Topic"
          value={topic}
          onChange={(value) => {
            setTopic(value);
            setPage(1);
          }}
          options={options.topic}
          minWidth={155}
          width={100}
        />

        <SelectComponent
          label="Difficulty"
          value={difficulty}
          onChange={(value) => {
            setDifficulty(value);
            setPage(1);
          }}
          options={options.difficulty}
          minWidth={155}
          width={100}
        />

        <SelectComponent
          label="Status"
          value={status}
          onChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
          options={options.status}
          minWidth={155}
          width={100}
        />
      </Box>

      <Tabs
        value={tab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons={false}
        sx={{
          mb: 1,
          minHeight: 0,
          borderBottom: `1px solid ${theme.palette.divider}`,

          "& .MuiTab-root": {
            textTransform: "none",
            fontWeight: 500,
            minHeight: 42,
            px: 1.5,
          },

          "& .Mui-selected": {
            color: `${theme.palette.primary.main} !important`,
          },

          "& .MuiTabs-indicator": {
            bgcolor: theme.palette.primary.main,
            height: 2,
          },
        }}
      >
        {TABS.map((tabName) => (
          <Tab key={tabName} label={tabName} />
        ))}
      </Tabs>

      <Box
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: "12px",
          bgcolor: "white",
          overflow: "hidden",
        }}
      >
        {view === "list" && (
          <Box sx={{ height: "100%", width: "100%", minHeight: 0 }}>
            <MuiTableComponent
              rows={filteredProblems}
              columns={columns}
              theme={theme}
            />
          </Box>
        )}

        {view === "grid" && (
          <Box
            sx={{
              p: 2,
              display: "grid",
              gridTemplateColumns: {
                md: "repeat(2, minmax(0, 1fr))",
                xs: "repeat(1, minmax(0, 1fr))",
              },
              gap: 1.5,
            }}
          >
            {filteredProblems?.map((problem) => (
              <ProblemCard
                key={problem._id}
                problem={problem}
                theme={theme}
                onToggleBookmark={handleToggleBookmark}
              />
            ))}
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography
          variant="body1-medium"
          sx={{
            color: theme.palette.black.secondary,
          }}
        >
          {totalProblems === 0
            ? "No problems found"
            : `Showing ${from} to ${to} of ${totalProblems} problems`}
        </Typography>

        <Pagination
          page={currentPage}
          onChange={(_, value) => setPage(value)}
          count={totalPages}
          siblingCount={1}
          boundaryCount={1}
          shape="rounded"
          disabled={totalPages <= 1}
          sx={{
            "& .MuiPaginationItem-root": {
              borderRadius: "7px",
            },

            "& .Mui-selected": {
              bgcolor: `${theme.palette.primary.main} !important`,
              color: `${theme.palette.white.main} !important`,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default LeftSection;
