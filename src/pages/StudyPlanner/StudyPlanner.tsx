import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useState } from "react";

import CalendarCard from "./CalendarCard/CalendarCard";
import CreatePlanModal from "./CreatePlanModal/CreatePlanModal";
import PlannerSidebar from "./PlannerSidebar/PlannerSidebar";
import PlannerStats from "./PlannerStats/PlannerStats";
import TodaysFocus from "./TodaysFocus/TodaysFocus";
import WeekSchedule from "./WeekSchedule/WeekSchedule";
import { innerBox, mainContentWrapper } from "./style";
import type { CreatePlanData, StudyPlan } from "./types";

import {
  useGetStudyPlansQuery,
  useCreateStudyPlanMutation,
} from "@/services/studyPlannerApi";

const DAY_ABBREVIATIONS: Record<string, string> = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};

const StudyPlanner = () => {
  const theme = useTheme();

  const [selectedPlan, setSelectedPlan] = useState("");
  const [createPlanOpen, setCreatePlanOpen] = useState(false);

  const { data: response, isLoading } = useGetStudyPlansQuery();

  const [createStudyPlan, { isLoading: isCreating }] =
    useCreateStudyPlanMutation();

  const plans: StudyPlan[] = (response?.data ?? []).map((plan) => ({
    ...plan,
    id: plan._id,
    dateRange: `${plan.duration} • ${new Date(
      plan.startDate,
    ).toLocaleDateString("en-IN", {
      month: "short",
      year: "numeric",
    })} - ${new Date(plan.endDate).toLocaleDateString("en-IN", {
      month: "short",
      year: "numeric",
    })}`,
  }));

  const activePlan = plans.find((plan) => plan.id === selectedPlan) ?? plans[0];

  const handleCreatePlan = async (data: CreatePlanData) => {
    try {
      const payload = {
        name: data.name.trim(),
        duration: `${data.duration} Months`,
        organizationType:
          data.planningStyle.charAt(0).toUpperCase() +
          data.planningStyle.slice(1),
        learningTrack:
          data.track === "frontend"
            ? "Frontend Development"
            : data.track === "devops"
              ? "DevOps"
              : "Custom",
        specializations: data.subjects,
        availableDays: data.days.map(
          (day) => DAY_ABBREVIATIONS[day.toLowerCase()] ?? day,
        ),
        availableFrom: data.startTime,
        availableUntil: data.endTime,
      };

      const result = await createStudyPlan(payload).unwrap();
      const newPlan = result.data.plan;

      setSelectedPlan(newPlan._id);
      setCreatePlanOpen(false);
    } catch (error) {
      console.error("Failed to create study plan:", error);
      throw error;
    }
  };

  return (
    <Box sx={{ p: 0.7 }}>
      <Box sx={innerBox}>
        <Box>
          <Typography variant="h4-bold">Study Planner</Typography>

          <Typography
            variant="body-medium"
            sx={{ color: theme.palette.black.secondary, display: "block" }}
          >
            Plan your study schedule and stay consistent
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={() => setCreatePlanOpen(true)}
        >
          New Plan
        </Button>
      </Box>

      <PlannerStats />

      <Box sx={mainContentWrapper}>
        <PlannerSidebar
          plans={plans}
          selectedPlan={activePlan?.id ?? ""}
          onSelect={setSelectedPlan}
          onCreate={() => setCreatePlanOpen(true)}
          isLoading={isLoading}
        />

        {activePlan ? (
          <WeekSchedule
            key={activePlan.id}
            planId={activePlan.id}
            planStart={new Date(activePlan.startDate)}
            planMonths={Number.parseInt(activePlan.duration, 10) || 3}
          />
        ) : (
          <WeekSchedule />
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <CalendarCard />
          <TodaysFocus />
        </Box>
      </Box>

      <CreatePlanModal
        open={createPlanOpen}
        onClose={() => setCreatePlanOpen(false)}
        onCreate={handleCreatePlan}
        isLoading={isCreating}
      />
    </Box>
  );
};

export default StudyPlanner;
