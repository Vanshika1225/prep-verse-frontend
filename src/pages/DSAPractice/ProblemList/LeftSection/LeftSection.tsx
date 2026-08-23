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
import { useMemo, useState } from "react";

import {
  DIFFICULTY_OPTIONS,
  STATUS_OPTIONS,
  TABS,
  TOPIC_OPTIONS,
  type Problem,
} from "../types";

import MuiTableComponent from "@/components/MuiTableComponent";
import SelectComponent from "@/components/SelectComponent";
import theme from "@/theme/theme";

const PROBLEMS: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    starred: true,
    tags: ["Array", "Hash Table"],
    top150: true,
    difficulty: "Easy",
    acceptance: "53.15%",
    time: "20m",
    status: "Solved",
    action: "Solve Again",
  },
  {
    id: 2,
    title: "Add Two Numbers",
    starred: true,
    tags: ["Linked List", "Math"],
    top150: true,
    difficulty: "Medium",
    acceptance: "43.70%",
    time: "45m",
    status: "Attempted",
    action: "Continue",
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    starred: false,
    tags: ["Hash Table", "String"],
    top150: true,
    difficulty: "Medium",
    acceptance: "33.31%",
    time: "35m",
    status: "Not Solved",
    action: "Solve",
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    starred: false,
    tags: ["Array", "Binary Search"],
    top150: true,
    difficulty: "Hard",
    acceptance: "30.71%",
    time: "60m",
    status: "Not Solved",
    action: "Solve",
  },
  {
    id: 5,
    title: "Maximum Subarray",
    starred: true,
    tags: ["Array", "Divide and Conquer"],
    top150: true,
    difficulty: "Medium",
    acceptance: "53.56%",
    time: "25m",
    status: "Solved",
    action: "Solve Again",
  },
  {
    id: 6,
    title: "Merge k Sorted Lists",
    starred: false,
    tags: ["Linked List", "Heap"],
    top150: true,
    difficulty: "Hard",
    acceptance: "35.17%",
    time: "50m",
    status: "To Revise",
    action: "Solve",
  },
  {
    id: 7,
    title: "Climbing Stairs",
    starred: true,
    tags: ["Dynamic Programming"],
    top150: true,
    difficulty: "Easy",
    acceptance: "60.95%",
    time: "15m",
    status: "Solved",
    action: "Solve Again",
  },
  {
    id: 8,
    title: "Kth Largest Element in an Array",
    starred: true,
    tags: ["Array", "Divide and Conquer"],
    top150: true,
    difficulty: "Medium",
    acceptance: "45.66%",
    time: "30m",
    status: "Attempted",
    action: "Continue",
  },
];

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

  "Not Solved": {
    color: theme.palette.black.secondary,
    bg: theme.palette.secondary.light,
  },

  "To Revise": {
    color: theme.palette.warning.main,
    bg: theme.palette.warning.light,
  },
});

const StarIcon = ({ active, color }: { active: boolean; color: string }) => {
  return (
    <Box
      component="span"
      sx={{
        color,
        fontSize: 20,
        lineHeight: 1,
      }}
    >
      {active ? "★" : "☆"}
    </Box>
  );
};

const columns: GridColDef<Problem>[] = [
  {
    field: "starred",
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
          active={row.starred}
          color={
            row.starred
              ? theme.palette.warning.main
              : theme.palette.white.main300
          }
        />
      </Box>
    ),
  },
  {
    field: "title",
    headerName: "Title",
    flex: 1,
    minWidth: 180,
    renderCell: ({ row }) => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 0.8,
          lineHeight: 1,
        }}
      >
        <Tooltip title={row.title ?? "-"} arrow>
          <Typography
            variant="body-secondary-bold"
            sx={{
              fontWeight: 550,
              lineHeight: "14px",
              m: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              width: "150px",
              textOverflow: "ellipsis",
            }}
          >
            {row.title ?? "-"}
          </Typography>
        </Tooltip>

        <Typography
          variant="body1-secondary-medium"
          sx={{
            color: theme.palette.black.secondary,
            lineHeight: "14px",
            m: 0,
          }}
        >
          {row.tags?.join(", ") || "-"}
        </Typography>
      </Box>
    ),
  },
  {
    field: "difficulty",
    headerName: "Difficulty",
    width: 110,
    renderCell: ({ value }) => {
      const diff = diffMap(theme)[value as Problem["difficulty"]];

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
    field: "acceptance",
    headerName: "Acceptance",
    width: 110,
    renderCell: ({ value }) => (
      <Typography variant="body-medium">{value ?? "-"}</Typography>
    ),
  },
  {
    field: "time",
    headerName: "Time",
    width: 90,
    renderCell: ({ value }) => (
      <Typography variant="body-medium">{value ?? "-"}</Typography>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    width: 125,
    renderCell: ({ value }) => {
      const status = statusMap(theme)[value as Problem["status"]];

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
          variant={row.action === "Solve Again" ? "text" : "contained"}
          sx={{
            minWidth: 88,
            textTransform: "none",
            borderRadius: "7px",
            fontWeight: "bold",
          }}
        >
          {row.action}
        </Button>

        <IconButton size="small">
          <MoreIcon />
        </IconButton>
      </Box>
    ),
  },
];

const ProblemCard = ({
  problem,
  theme,
}: {
  problem: Problem;
  theme: Theme;
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
          active={problem.starred}
          color={
            problem.starred
              ? theme.palette.warning.main
              : theme.palette.white.main400
          }
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
        {problem.tags.join(", ")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Typography variant="p-medium">{problem.time}</Typography>

        <Button
          size="small"
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: "7px",
          }}
        >
          {problem.action}
        </Button>
      </Box>
    </Box>
  );
};

export const LeftSection = () => {
  const theme = useTheme();

  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(1);
  const [view, setView] = useState("list");
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [status, setStatus] = useState("all");

  const filteredProblems = useMemo(() => {
    let result = [...PROBLEMS];
    if (search.trim()) {
      result = result.filter((problem) =>
        problem.title.toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (tab === 1) {
      result = result.filter((problem) => problem.starred);
    }
    if (tab === 2) {
      result = result.filter((problem) => problem.status === "Solved");
    }
    if (tab === 3) {
      result = result.filter((problem) => problem.status === "Attempted");
    }
    if (tab === 4) {
      result = result.filter((problem) => problem.status === "To Revise");
    }
    return result;
  }, [search, tab]);

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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search problems..."
          size="small"
          sx={{
            minWidth: {md:220,xs:"100%"},
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
          onChange={setTopic}
          options={TOPIC_OPTIONS}
          minWidth={155}
        />

        <SelectComponent
          label="Difficulty"
          value={difficulty}
          onChange={setDifficulty}
          options={DIFFICULTY_OPTIONS}
          minWidth={155}
        />

        <SelectComponent
          label="Status"
          value={status}
          onChange={setStatus}
          options={STATUS_OPTIONS}
          minWidth={155}
        />
      </Box>

      <Tabs
        value={tab}
        onChange={(_, value: number) => {
          setTab(value);
          setPage(1);
        }}
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
              gridTemplateColumns: {md:"repeat(2, minmax(0, 1fr))", xs:"repeat(1, minmax(0, 1fr))"},
              gap: 1.5,
            }}
          >
            {filteredProblems.map((problem, index) => (
              <ProblemCard key={index} problem={problem} theme={theme} />
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
          Showing 1 to {filteredProblems.length} of 245 problems
        </Typography>

        <Pagination
          page={page}
          onChange={(_, value) => setPage(value)}
          count={31}
          siblingCount={1}
          boundaryCount={1}
          shape="rounded"
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
