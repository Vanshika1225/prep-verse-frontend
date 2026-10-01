import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";

import { plannerSidebarStyle } from "../style";
import type { StudyPlan } from "../types";

interface Props {
  plans: StudyPlan[];
  selectedPlan: string;
  onSelect: (id: string) => void;
  onCreate: () => void;
}

const PlannerSidebar = ({ plans, selectedPlan, onSelect, onCreate }: Props) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Box sx={plannerSidebarStyle}>
          <Typography variant="p-bold">My Plans</Typography>

          <AddRoundedIcon
            fontSize="small"
            sx={{ color: theme.palette.primary.main, cursor: "pointer" }}
            onClick={onCreate}
          />
        </Box>

        <Divider />

        {plans.map((plan) => {
          const selected = selectedPlan === plan.id;

          return (
            <Box
              key={plan.id}
              onClick={() => onSelect(plan.id)}
              sx={{
                px: 2,
                py: 1.5,
                cursor: "pointer",
                borderRadius: 3,
                bgcolor: selected
                  ? theme.palette.primary.main200
                  : "transparent",
                borderLeft: selected
                  ? `3px solid ${theme.palette.primary.main}`
                  : "3px solid transparent",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                  }}
                />

                <Typography variant="body1-bold">{plan.name}</Typography>
              </Box>

              <Typography
                variant="body1-medium"
                color={theme.palette.black.secondary}
                sx={{ display: "block", ml: 2 }}
              >
                {plan.dateRange}
              </Typography>
            </Box>
          );
        })}

        <Box sx={{ p: 1.5 }}>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            startIcon={<AddRoundedIcon />}
            onClick={onCreate}
          >
            Create New Plan
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          p: 2,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
        }}
      >
        <Typography variant="p-bold">Plan Overview</Typography>

        {[
          ["Total Tasks", "86"],
          ["Completed", "46"],
          ["Remaining", "40"],
          ["Completion", "68%"],
        ].map(([label, value]) => (
          <Box
            key={label}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 1.5,
            }}
          >
            <Typography
              variant="body-medium"
              color={theme.palette.black.secondary}
            >
              {label}
            </Typography>

            <Typography variant="body-medium">{value}</Typography>
          </Box>
        ))}

        <Box
          sx={{
            mt: 2,
            height: 5,
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              width: "68%",
              height: "100%",
              bgcolor: theme.palette.primary.main,
              borderRadius: 3,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PlannerSidebar;
