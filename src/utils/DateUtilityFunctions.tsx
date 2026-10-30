const TIME_ZONE = "Asia/Kolkata";

/** 5400 -> "1h 30m", 7200 -> "2h 00m", 2700 -> "45m" */
export const formatDuration = (seconds: number) => {
  const totalMinutes = Math.floor(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes}m`;

  return `${hours}h ${String(minutes).padStart(2, "0")}m`;
};

/** "25 May 2024 (Sat)"  — or "25 May 2024" when withWeekday is false */
export const formatDate = (value: string, withWeekday = true) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    day: "numeric",
    month: "short",
    year: "numeric",
    weekday: "short",
  }).formatToParts(new Date(value));

  const get = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const date = `${get("day")} ${get("month")} ${get("year")}`;

  return withWeekday ? `${date} (${get("weekday")})` : date;
};

/** "8:00 PM IST" */
export const formatTime = (value: string) => {
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(new Date(value))
    .replace(/\u202f/g, " ");

  return `${time} IST`;
};

/** 24400 -> "24.4K" */
export const formatCompact = (value?: number | null) => {
  if (value === undefined || value === null) return "-";

  if (value >= 1000) {
    return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  }

  return String(value);
};

/** 18932 -> "18,932" */
export const formatNumber = (value?: number | null) =>
  value === undefined || value === null ? "-" : value.toLocaleString("en-US");
