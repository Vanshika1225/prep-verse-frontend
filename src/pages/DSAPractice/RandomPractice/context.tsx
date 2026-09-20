/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  DEFAULT_FILTERS,
  type Difficulty,
  type RandomPracticeContextValue,
  type RandomPracticeFilters,
  type RandomProblemItem,
} from "./types";

import { useLazyGenerateRandomProblemsQuery } from "@/services/randomPracticeApi";

const RandomPracticeContext = createContext<RandomPracticeContextValue | null>(
  null,
);

export const useRandomPractice = () => {
  const context = useContext(RandomPracticeContext);

  if (!context) {
    throw new Error(
      "useRandomPractice must be used inside <RandomPracticeProvider />",
    );
  }

  return context;
};

export const RandomPracticeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [filters, setFilters] = useState<RandomPracticeFilters>(() => ({
    ...DEFAULT_FILTERS,
  }));

  const [problems, setProblems] = useState<RandomProblemItem[]>([]);
  const [hasGenerated, setHasGenerated] = useState(false);

  const [generateRandomProblems, { isFetching: isGenerating }] =
    useLazyGenerateRandomProblemsQuery();

  const isMixed = filters.difficulty.length === 3;

  const toggleDifficulty = useCallback((value: Difficulty) => {
    setFilters((prev) => {
      const selected = prev.difficulty.includes(value)
        ? prev.difficulty.filter((item) => item !== value)
        : [...prev.difficulty, value];

      return {
        ...prev,
        difficulty: selected,
      };
    });
  }, []);

  const selectMixed = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      difficulty:
        prev.difficulty.length === 3 ? [] : ["Easy", "Medium", "Hard"],
    }));
  }, []);

  const setCount = useCallback((value: number) => {
    setFilters((prev) => ({
      ...prev,
      count: value,
    }));
  }, []);

  const setTopics = useCallback((value: string[]) => {
    setFilters((prev) => ({
      ...prev,
      topics: value,
    }));
  }, []);

  const setExcludeSolved = useCallback((value: boolean) => {
    setFilters((prev) => ({
      ...prev,
      excludeSolved: value,
    }));
  }, []);

  const setBookmarkedOnly = useCallback((value: boolean) => {
    setFilters((prev) => ({
      ...prev,
      bookmarkedOnly: value,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      ...DEFAULT_FILTERS,
    });
  }, []);

  const setDifficulty = useCallback((value: Difficulty[]) => {
    setFilters((prev) => ({
      ...prev,
      difficulty: value,
    }));
  }, []);

  const generate = useCallback(async () => {
    try {
      const response = await generateRandomProblems({
        difficulty: filters.difficulty,
        topics: filters.topics,
        count: filters.count,
        excludeSolved: filters.excludeSolved,
        bookmarkedOnly: filters.bookmarkedOnly,
      }).unwrap();

      setProblems(response.data?.problems ?? []);
    } catch {
      setProblems([]);
    } finally {
      setHasGenerated(true);
    }
  }, [generateRandomProblems, filters]);

  const clearSet = useCallback(() => {
    setProblems([]);
    setHasGenerated(false);
  }, []);

  const value = useMemo(
    () => ({
      filters,
      problems,
      isGenerating,
      hasGenerated,
      isMixed,
      toggleDifficulty,
      selectMixed,
      setCount,
      setTopics,
      setExcludeSolved,
      setBookmarkedOnly,
      resetFilters,
      generate,
      clearSet,
      setDifficulty,
    }),
    [
      filters,
      problems,
      isGenerating,
      hasGenerated,
      isMixed,
      toggleDifficulty,
      selectMixed,
      setCount,
      setTopics,
      setExcludeSolved,
      setBookmarkedOnly,
      resetFilters,
      generate,
      clearSet,
      setDifficulty,
    ],
  );

  return (
    <RandomPracticeContext.Provider value={value}>
      {children}
    </RandomPracticeContext.Provider>
  );
};
