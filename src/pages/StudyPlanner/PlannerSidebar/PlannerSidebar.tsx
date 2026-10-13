import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {
  Box,
  Button,
  Divider,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";

import { plannerSidebarStyle } from "../style";
import type { StudyPlan } from "../types";

import NoDataFound from "@/components/NoDataFound/NoDataFound";

interface Props {
  plans: StudyPlan[];
  selectedPlan: string;
  onSelect: (id: string) => void;
  onCreate: () => void;
  isLoading?: boolean;
}

const PlannerSidebar = ({
  plans,
  selectedPlan,
  onSelect,
  onCreate,
  isLoading = false,
}: Props) => {
  const theme = useTheme();

  const currentPlan = plans.find((plan) => plan.id === selectedPlan);

  const overview = [
    ["Total Tasks", currentPlan?.totalTasks ?? 0],
    ["Completed", currentPlan?.completedTasks ?? 0],
    ["Remaining", currentPlan?.remaining ?? 0],
    ["Completion", `${currentPlan?.completion ?? 0}%`],
  ];

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

        {isLoading ? (
          <Box sx={{ py: 0.5 }}>
            {[1, 2, 3].map((item) => (
              <Box
                key={item}
                sx={{
                  px: 2,
                  py: 1.5,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Skeleton variant="circular" width={14} height={14} />

                  <Skeleton
                    variant="text"
                    width={item === 2 ? "55%" : "70%"}
                    height={34}
                  />
                </Box>

                <Skeleton
                  variant="text"
                  width="65%"
                  height={25}
                  sx={{ ml: 2.8 }}
                />
              </Box>
            ))}
          </Box>
        ) : plans.length === 0 ? (
          <NoDataFound message="Create your first study plan to organize your learning schedule." />
        ) : (
          plans.map((plan) => {
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
                      bgcolor: plan.isActive ? "primary.main" : "text.disabled",
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
          })
        )}

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

        {isLoading ? (
          <Box sx={{ mt: 1.5 }}>
            {[1, 2, 3, 4].map((item) => (
              <Box
                key={item}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: item === 1 ? 0 : 1.5,
                }}
              >
                <Skeleton variant="text" width="42%" height={30} />
                <Skeleton variant="text" width="15%" height={30} />
              </Box>
            ))}

            <Skeleton
              variant="rounded"
              height={10}
              sx={{ mt: 2, borderRadius: 3 }}
            />
          </Box>
        ) : !currentPlan ? (
          <Typography sx={{ mt: 1.5 }} variant="body2">
            Select a plan to view its overview.
          </Typography>
        ) : (
          <>
            {overview.map(([label, value]) => (
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

                <Typography variant="body-medium">{value ?? "0"}</Typography>
              </Box>
            ))}

            <Box
              sx={{
                mt: 2,
                height: 5,
                borderRadius: 3,
                bgcolor: theme.palette.action.hover,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: `${Math.min(
                    100,
                    Math.max(0, currentPlan.completion ?? 0),
                  )}%`,
                  height: "100%",
                  bgcolor: theme.palette.primary.main,
                  borderRadius: 3,
                  transition: "width 0.3s ease",
                }}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default PlannerSidebar;
