import type { Contest, ContestFilterState } from "./types";

export const filterContests = <T extends Contest>(
  contests: T[],
  filters: ContestFilterState,
) => {
  const query = filters.search.trim().toLowerCase();

  return contests.filter((contest) => {
    if (query && !contest.name.toLowerCase().includes(query)) return false;

    if (filters.platform && contest.platform !== filters.platform) return false;

    if (
      filters.level &&
      !(contest.level ?? "").toLowerCase().includes(filters.level.toLowerCase())
    ) {
      return false;
    }

    if (filters.duration === "short" && contest.duration >= 3600) return false;

    if (
      filters.duration === "medium" &&
      (contest.duration < 3600 || contest.duration > 7200)
    ) {
      return false;
    }

    if (filters.duration === "long" && contest.duration <= 7200) return false;

    return true;
  });
};

export const parseYMD = (value: string) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);

  if (match) {
    return { month: Number(match[2]) - 1, day: Number(match[3]) };
  }

  const date = new Date(value);
  return { month: date.getMonth(), day: date.getDate() };
};