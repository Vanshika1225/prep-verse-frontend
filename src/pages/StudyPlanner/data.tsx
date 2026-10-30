export const PLAN_DURATIONS = [
  { value: 3, label: "3 Months" },
  { value: 6, label: "6 Months" },
  { value: 9, label: "9 Months" },
];

export const PLANNING_STYLES = [
  {
    value: "daily",
    label: "Daily",
    description: "Get specific tasks for each day",
  },
  {
    value: "weekly",
    label: "Weekly",
    description: "Focus on weekly goals and tasks",
  },
  {
    value: "monthly",
    label: "Monthly",
    description: "Plan your preparation month by month",
  },
];

export const TRACKS = [
  {
    value: "frontend",
    label: "Frontend Development",
  },
  {
    value: "fullstack",
    label: "Full Stack Development",
  },
  {
    value: "devops",
    label: "DevOps",
  },
  {
    value: "dsa",
    label: "DSA",
  },
  {
    value: "system-design",
    label: "System Design",
  },
  {
    value: "custom",
    label: "Custom",
  },
];

export const TRACK_OPTIONS = {
  frontend: [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Redux Toolkit",
    "Testing",
    "Web Performance",
  ],

  fullstack: ["MERN", "Java + React", ".NET + React"],

  devops: [
    "Linux",
    "Git & GitHub",
    "Docker",
    "Kubernetes",
    "AWS",
    "CI/CD",
    "Terraform",
    "Monitoring",
  ],

  dsa: [
    "Arrays",
    "Strings",
    "Linked List",
    "Stack & Queue",
    "Trees",
    "Graphs",
    "Dynamic Programming",
    "Greedy",
    "Recursion & Backtracking",
    "Binary Search",
  ],

  "system-design": [
    "System Design Fundamentals",
    "API Design",
    "Caching",
    "Database",
    "Load Balancing",
    "Message Queues",
    "Microservices",
    "Distributed Systems",
    "Scalability",
  ],
};

export const DAYS = [
  { value: "monday", label: "Mon" },
  { value: "tuesday", label: "Tue" },
  { value: "wednesday", label: "Wed" },
  { value: "thursday", label: "Thu" },
  { value: "friday", label: "Fri" },
  { value: "saturday", label: "Sat" },
  { value: "sunday", label: "Sun" },
];
