import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useState } from "react";

import CalendarCard from "./CalendarCard/CalendarCard";
import CreatePlanModal from "./CreatePlanModal/CreatePlanModal";
import PlannerSidebar from "./PlannerSidebar/PlannerSidebar";
import PlannerStats from "./PlannerStats/PlannerStats";
import TodaysFocus from "./TodaysFocus/TodaysFocus";
import WeekSchedule from "./WeekSchedule/WeekSchedule";
import { FOCUS_TASKS, SCHEDULE } from "./data";
import { innerBox, mainContentWrapper } from "./style";
import type { CreatePlanData, StudyPlan } from "./types";

import { useGetStudyPlansQuery } from "@/services/studyPlannerApi";

const StudyPlanner = () => {
  const theme = useTheme();

  const [selectedPlan, setSelectedPlan] = useState("");
  const [createPlanOpen, setCreatePlanOpen] = useState(false);

  const { data: response, isLoading } = useGetStudyPlansQuery();

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

  const handleCreatePlan = (data: CreatePlanData) => {
    setCreatePlanOpen(false);
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

        <WeekSchedule
          schedule={SCHEDULE}
          planStart={activePlan ? new Date(activePlan.startDate) : new Date()}
          planMonths={activePlan ? Number.parseInt(activePlan.duration, 10) : 6}
        />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <CalendarCard />
          <TodaysFocus tasks={FOCUS_TASKS} />
        </Box>
      </Box>

      <CreatePlanModal
        open={createPlanOpen}
        onClose={() => setCreatePlanOpen(false)}
        onCreate={handleCreatePlan}
      />
    </Box>
  );
};

export default StudyPlanner;
