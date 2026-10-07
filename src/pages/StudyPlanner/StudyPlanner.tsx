import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useState } from "react";

import CalendarCard from "./CalendarCard/CalendarCard";
import CreatePlanModal from "./CreatePlanModal/CreatePlanModal";
import PlannerSidebar from "./PlannerSidebar/PlannerSidebar";
import PlannerStats from "./PlannerStats/PlannerStats";
import TodaysFocus from "./TodaysFocus/TodaysFocus";
import WeekSchedule from "./WeekSchedule/WeekSchedule";
import { FOCUS_TASKS, PLANS, SCHEDULE } from "./data";
import { innerBox, mainContentWrapper } from "./style";
import type { CreatePlanData } from "./types";

const StudyPlanner = () => {
  const theme = useTheme();

  const [plans, setPlans] = useState(PLANS);
  const [selectedPlan, setSelectedPlan] = useState(PLANS[0]?.id ?? "");
  const [createPlanOpen, setCreatePlanOpen] = useState(false);

  const handleCreatePlan = (data: CreatePlanData) => {
    const newPlan = {
      id: Date.now().toString(),
      name: data.name,
      dateRange: `${data.duration} months`,
    };

    setPlans((current) => [...current, newPlan]);
    setSelectedPlan(newPlan.id);
  };

  return (
    <Box
      sx={{
        padding: 0.7,
      }}
    >
      <Box sx={innerBox}>
        <Box>
          <Typography variant="h4-bold">Study Planner</Typography>

          <Typography
            variant="body-medium"
            sx={{
              color: theme.palette.black.secondary,
              display: "block",
            }}
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
          selectedPlan={selectedPlan}
          onSelect={setSelectedPlan}
          onCreate={() => setCreatePlanOpen(true)}
        />

        <WeekSchedule
          schedule={SCHEDULE}
          planStart={new Date("2024-05-20")}
          planMonths={6}
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
