import { ReactNode, useState } from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  LinearProgress,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { Cell, Pie, PieChart } from "recharts";
import AddIcon from "@mui/icons-material/Add";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BarChartIcon from "@mui/icons-material/BarChart";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import CodeIcon from "@mui/icons-material/Code";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import EastIcon from "@mui/icons-material/East";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LanguageIcon from "@mui/icons-material/Language";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import type { SvgIconComponent } from "@mui/icons-material";import type { ChipProps } from "@mui/material";
/* ---------------- data ---------------- */
const tones = {
  primary: ["primary.main100", "primary.main"],
  success: ["success.light", "success.main"],
  warning: ["warning.light", "warning.main"],
};

const roadmaps = [
  {
    title: "DSA Mastery Roadmap",
    status: "In Progress",
    tone: "primary",
    Icon: CodeIcon,
    desc: "Master Data Structures & Algorithms step by step and crack coding interviews.",
    ms: 25,
    hrs: 120,
    level: "Advanced",
    progress: 65,
    current: 3,
    steps: [
      "Learn Basics",
      "Arrays & Strings",
      "Linked List",
      "Stacks & Queues",
      "Trees",
      "Graphs",
      "Dynamic Programming",
      "Advanced Topics",
    ],
  },
  {
    title: "Full Stack Web Developer",
    status: "In Progress",
    tone: "success",
    Icon: LanguageIcon,
    desc: "Become a full stack developer from scratch.",
    ms: 28,
    hrs: 140,
    level: "Intermediate",
    progress: 42,
    current: 3,
    steps: [
      "HTML, CSS, JS",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Authentication",
      "Deployment",
      "Advanced",
    ],
  },
  {
    title: "System Design Roadmap",
    status: "Not Started",
    tone: "warning",
    Icon: DesktopWindowsOutlinedIcon,
    desc: "Learn system design from fundamentals to advanced scale.",
    ms: 20,
    hrs: 80,
    level: "Advanced",
    progress: 0,
    current: -1,
    steps: [
      "Basics",
      "Scaling",
      "Caching",
      "Databases",
      "Load Balancing",
      "Microservices",
      "Messaging Queues",
      "Design HLD & LLD",
    ],
  },
  {
    title: "Machine Learning Roadmap",
    status: "In Progress",
    tone: "primary",
    Icon: PsychologyOutlinedIcon,
    desc: "Learn ML algorithms and build real-world projects.",
    ms: 22,
    hrs: 100,
    level: "Intermediate",
    progress: 30,
    current: 2,
    steps: [
      "Maths & Stats",
      "Python Basics",
      "ML Algorithms",
      "Model Evaluation",
      "Advanced ML",
      "Projects",
      "Deployment",
      "MLOps",
    ],
  },
];

const stats = [
  ["Roadmaps in Progress", "3"],
  ["Completed Milestones", "24 / 67"],
  ["Total Roadmaps", "4"],
  ["Total Time Invested", "86 hrs"],
];
const recommended = [
  {
    Icon: RocketLaunchOutlinedIcon,
    title: "Front End Developer Roadmap",
    sub: "HTML, CSS, JavaScript, React and more.",
  },
  {
    Icon: SmartphoneOutlinedIcon,
    title: "Mobile Developer Roadmap",
    sub: "React Native, Flutter, Firebase and more.",
  },
  {
    Icon: CloudOutlinedIcon,
    title: "DevOps Roadmap",
    sub: "Docker, Kubernetes, AWS, CI/CD and more.",
  },
];
const upcoming = [
  ["21", "Trees in Depth", "DSA Mastery Roadmap"],
  ["23", "Learn Express.js", "Full Stack Web Developer"],
  ["25", "Database Indexing", "System Design Roadmap"],
  ["28", "Model Evaluation Metrics", "Machine Learning Roadmap"],
];
const actions = [
  [AddIcon, "Create Roadmap"],
  [GridViewOutlinedIcon, "Browse Templates"],
  [TrackChangesIcon, "Roadmap Goals"],
  [TrendingUpIcon, "My Progress"],
] as [SvgIconComponent, string][];
const filters = [
  "All",
  "Data Structures & Algorithms",
  "Web Development",
  "System Design",
  "Machine Learning",
  "Interview Prep",
];

/* ---------------- shared bits ---------------- */
const Pill = ({
  label,
  sx,
  ...p
}: Omit<ChipProps, "label"> & { label: ReactNode }) => (
  <Chip
    {...p}
    label={
      <Typography variant="body1-medium" color="inherit">
        {label}
      </Typography>
    }
    sx={{ borderRadius: 1, ...sx }}
  />
);

const Meta = ({ Icon, text }: { Icon: SvgIconComponent; text: string }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 0.75,
      color: "appText.muted",
    }}
  >
    <Icon sx={{ fontSize: 14 }} />
    <Typography variant="body1-medium" color="inherit">
      {text}
    </Typography>
  </Box>
);

const Panel = ({
  title,
  link = true,
  children,
}: {
  title: string;
  link?: boolean;
  children: ReactNode;
}) => (
  <Box sx={{ border: 1, borderColor: "border.main", borderRadius: 3, p: 2.5 }}>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Typography variant="body-bold">{title}</Typography>
      {link && (
        <Button variant="borderless" size="small" sx={{ p: 0 }}>
          View All
        </Button>
      )}
    </Box>
    {children}
  </Box>
);

/* ---------------- main column ---------------- */
const Steps = ({ steps, current }: { steps: string[]; current: number }) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: `repeat(${steps.length}, minmax(72px, 1fr))`,
      mt: 3,
      overflowX: "auto",
    }}
  >
    {steps.map((s, i) => {
      const done = i < current,
        active = i === current;
      return (
        <Box
          key={s}
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          {i < steps.length - 1 && (
            <Box
              sx={{
                position: "absolute",
                top: 9,
                left: "50%",
                width: "100%",
                height: 2,
                bgcolor: done
                  ? "success.main"
                  : active
                    ? "primary.main200"
                    : "border.main",
              }}
            />
          )}
          <Box
            sx={{
              zIndex: 1,
              width: 20,
              height: 20,
              display: "grid",
              placeItems: "center",
              borderRadius: "50%",
              bgcolor: "white.main",
            }}
          >
            {done ? (
              <CheckCircleIcon sx={{ fontSize: 20, color: "success.main" }} />
            ) : active ? (
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  border: "5px solid",
                  borderColor: "primary.main",
                  outline: "0",
                  boxSizing: "border-box",
                  backgroundClip: "content-box",
                  p: "3px",
                }}
              />
            ) : (
              <LockOutlinedIcon sx={{ fontSize: 16, color: "appText.label" }} />
            )}
          </Box>
          <Typography
            variant={active ? "body1-bold" : "body1-medium"}
            color="appText.secondary"
            textAlign="center"
          >
            {s}
          </Typography>
        </Box>
      );
    })}
  </Box>
);

const RoadmapCard = ({ r }: { r: (typeof roadmaps)[number] }) => {
  const [bg, fg] = tones[r.tone as keyof typeof tones];
  return (
    <Box sx={{ p: 3, borderBottom: 1, borderColor: "border.main" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
        <Box
          sx={{
            width: 62,
            height: 62,
            borderRadius: 2,
            bgcolor: bg,
            color: fg,
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          <r.Icon sx={{ fontSize: 32 }} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography variant="p-bold">{r.title}</Typography>
            <Pill
              label={r.status}
              sx={{ bgcolor: bg, color: fg, height: 20 }}
            />
          </Box>
          <Typography
            variant="body1-medium"
            color="appText.secondary"
            sx={{ my: 1 }}
          >
            {r.desc}
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Meta Icon={ListAltIcon} text={`${r.ms} Milestones`} />
            <Meta Icon={AccessTimeIcon} text={`~ ${r.hrs} hrs`} />
            <Meta Icon={BarChartIcon} text={r.level} />
          </Box>
        </Box>
        <Box sx={{ width: 220, mr: 2, display: { xs: "none", md: "block" } }}>
          <Typography
            variant="body1-medium"
            color="appText.secondary"
            sx={{ mb: 1 }}
          >
            {r.progress}% Completed
          </Typography>
          <LinearProgress
            variant="determinate"
            value={r.progress}
            sx={{
              height: 5,
              borderRadius: 9,
              bgcolor: "border.main",
              "& .MuiLinearProgress-bar": {
                borderRadius: 9,
                bgcolor: "primary.main",
              },
            }}
          />
        </Box>
        <ChevronRightIcon sx={{ color: "appText.muted" }} />
      </Box>
      <Steps steps={r.steps} current={r.current} />
    </Box>
  );
};

const MainColumn = () => {
  const [tab, setTab] = useState(0);
  const [filter, setFilter] = useState(0);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Typography variant="h5-bold">Roadmap</Typography>
          <Typography
            variant="body1-medium"
            color="appText.secondary"
            sx={{ mt: 0.5 }}
          >
            Step-by-step guides to help you achieve your goals
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />}>
          Create Roadmap
        </Button>
      </Box>

      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{
          mt: 3,
          borderBottom: 1,
          borderColor: "border.main",
          minHeight: 40,
        }}
      >
        {["All Roadmaps", "In Progress", "Completed", "Saved"].map((t) => (
          <Tab
            key={t}
            disableRipple
            sx={{
              minWidth: 0,
              minHeight: 40,
              px: 0,
              mr: 4,
              color: "appText.muted",
              "&.Mui-selected": { color: "primary.main" },
            }}
            label={
              <Typography variant="body1-medium" color="inherit">
                {t}
              </Typography>
            }
          />
        ))}
      </Tabs>

      <Box sx={{ display: "flex", gap: 1.5, my: 2.5, flexWrap: "wrap" }}>
        {filters.map((f, i) => (
          <Pill
            key={f}
            label={f}
            onClick={() => setFilter(i)}
            variant="outlined"
            sx={{
              height: 34,
              px: 1,
              borderColor: "border.main",
              ...(filter === i && {
                bgcolor: "primary.main",
                color: "white.main",
                borderColor: "primary.main",
                "&:hover": { bgcolor: "primary.main" },
              }),
            }}
          />
        ))}
        <Pill
          variant="outlined"
          sx={{ height: 34, px: 1, borderColor: "border.main" }}
          label={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              More <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
            </Box>
          }
        />
      </Box>

      <Typography variant="p-bold" sx={{ mb: 1.5, display: "block" }}>
        My Roadmaps
      </Typography>
      <Box
        sx={{
          border: 1,
          borderColor: "border.main",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {roadmaps.map((r) => (
          <RoadmapCard key={r.title} r={r} />
        ))}
        <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
          <Button variant="outlined" endIcon={<EastIcon />}>
            Explore More Roadmaps
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

/* ---------------- right column ---------------- */
const OverallProgress = () => {
  const c: any = useTheme().palette;
  return (
    <Panel title="Overall Progress" link={false}>
      <Select
        size="small"
        value="m"
        IconComponent={KeyboardArrowDownIcon}
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          height: 30,
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "border.main" },
        }}
      >
        <MenuItem value="m">
          <Typography variant="body1-medium">This Month</Typography>
        </MenuItem>
      </Select>
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <Box
          sx={{ position: "relative", width: 130, height: 130, flexShrink: 0 }}
        >
          <PieChart width={130} height={130}>
            <Pie
              data={[{ v: 48 }, { v: 52 }]}
              dataKey="v"
              innerRadius={52}
              outerRadius={62}
              startAngle={90}
              endAngle={-270}
              stroke="none"
              cornerRadius={10}
            >
              <Cell fill={c.primary.main} />
              <Cell fill={c.border.main} />
            </Pie>
          </PieChart>
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeContent: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="h5-bold">48%</Typography>
            <Typography variant="body1-medium" color="appText.muted">
              Overall
            </Typography>
          </Box>
        </Box>
        <Box sx={{ flex: 1, display: "grid", gap: 1.5 }}>
          {stats.map(([l, v]) => (
            <Box
              key={l}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="body1-medium" color="appText.muted">
                {l}
              </Typography>
              <Typography variant="body1-bold">{v}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Panel>
  );
};

const Recommended = () => (
  <Panel title="Recommended for You">
    <Box sx={{ display: "grid", gap: 2 }}>
      {recommended.map(({ Icon, title, sub }) => (
        <Box
          key={title}
          sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              bgcolor: "primary.main100",
              color: "primary.main",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Icon />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body-bold">{title}</Typography>
            <Typography
              variant="body1-medium"
              color="appText.muted"
              display="block"
            >
              {sub}
            </Typography>
          </Box>
          <IconButton
            sx={{
              border: 1,
              borderColor: "border.main",
              borderRadius: 2,
              color: "primary.main",
              width: 34,
              height: 34,
            }}
          >
            <BookmarkBorderIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}
    </Box>
  </Panel>
);

const Upcoming = () => (
  <Panel title="Upcoming Milestones">
    <Box sx={{ display: "grid", gap: 2 }}>
      {upcoming.map(([d, t, s]) => (
        <Box key={t} sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ width: 40, textAlign: "center" }}>
            <Typography
              variant="body1-medium"
              color="primary.main"
              display="block"
            >
              MAY
            </Typography>
            <Typography variant="body-bold">{d}</Typography>
          </Box>
          <Box>
            <Typography variant="body-bold" display="block">
              {t}
            </Typography>
            <Typography variant="body1-medium" color="appText.muted">
              {s}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  </Panel>
);

const QuickActions = () => (
  <Panel title="Quick Actions" link={false}>
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
      {actions.map(([Icon, label]) => (
        <Button
          key={label}
          variant="outlined"
          size="small"
          startIcon={<Icon />}
          sx={{
            justifyContent: "flex-start",
            py: 1.5,
            borderColor: "border.main",
            color: "appText.secondary",
            "& .MuiButton-startIcon": { color: "primary.main" },
          }}
        >
          {label}
        </Button>
      ))}
    </Box>
  </Panel>
);

/* ---------------- page ---------------- */
const Roadmap = () => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: { xs: "1fr", lg: "minmax(0,1fr) 340px" },
      gap: 3,
      p: 3,
    }}
  >
    <MainColumn />
    <Box
      sx={{
        display: "grid",
        gap: 2.5,
        alignContent: "start",
        "& > *": { position: "relative" },
      }}
    >
      <OverallProgress />
      <Recommended />
      <Upcoming />
      <QuickActions />
    </Box>
  </Box>
);

export default Roadmap;
