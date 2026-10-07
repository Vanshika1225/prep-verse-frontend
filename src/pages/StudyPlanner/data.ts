import type {  PlannerTask, ScheduleItem, StudyPlan } from "./types";

export const PLANS: StudyPlan[] = [
  {
    id: "faang-prep",
    name: "FAANG Prep Plan",
    dateRange: "May 20 – Aug 20, 2024",
  },
  {
    id: "dsa-mastery",
    name: "DSA Mastery Plan",
    dateRange: "Apr 1 – Jul 1, 2024",
  },
  {
    id: "web-development",
    name: "Web Development",
    dateRange: "May 1 – Jun 30, 2024",
  },
  {
    id: "system-design",
    name: "System Design Plan",
    dateRange: "May 10 – Aug 10, 2024",
  },
];

export const FOCUS_TASKS: PlannerTask[] = [
  {
    id: "1",
    title: "Solve 2 Medium DSA Problems",
    completed: true,
  },
  {
    id: "2",
    title: "Study Dynamic Programming",
    completed: true,
  },
  {
    id: "3",
    title: "System Design: Rate Limiter",
    completed: false,
  },
  {
    id: "4",
    title: "Revise Notes (Graphs)",
    completed: false,
  },
  {
    id: "5",
    title: "Take 1 Mock Test",
    completed: false,
  },
];

export const SCHEDULE: ScheduleItem[] = [
  {
    id: "1",
    title: "Morning Routine",
    start: "6 AM",
    end: "8 AM",
    type: "other",
  },
  {
    id: "2",
    title: "DSA Practice",
    subtitle: "(2 Problems)",
    start: "8 AM",
    end: "10 AM",
    type: "dsa",
  },
  {
    id: "3",
    title: "Data Structures",
    start: "10 AM",
    end: "12 PM",
    type: "revision",
  },
  {
    id: "4",
    title: "System Design Learning",
    start: "2 PM",
    end: "4 PM",
    type: "system",
  },
  {
    id: "5",
    title: "Web Dev Practice",
    start: "4 PM",
    end: "6 PM",
    type: "web",
  },
  {
    id: "6",
    title: "Revision & Notes",
    start: "6 PM",
    end: "8 PM",
    type: "revision",
  },
  {
    id: "7",
    title: "Read / Watch",
    subtitle: "(30 mins)",
    start: "8 PM",
    end: "10 PM",
    type: "other",
  },
];

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
