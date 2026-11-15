import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import LaptopMacOutlinedIcon from "@mui/icons-material/LaptopMacOutlined";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useMemo, useState, type Dispatch, type SetStateAction } from "react";

import {
  applicationModalCancelButton,
  applicationModalCategoryChip,
  applicationModalCategoryWrapper,
  applicationModalChipWrapper,
  applicationModalContent,
  applicationModalFieldLabel,
  applicationModalInterviewChip,
  applicationModalInterviewChipWrapper,
  applicationModalInterviewField,
  applicationModalInterviewFieldLabel,
  applicationModalInterviewQuickLabel,
  applicationModalLabel,
  applicationModalNotesTextarea,
  applicationModalOAPlatformChip,
  applicationModalRejectionChip,
  applicationModalRejectionChipWrapper,
  applicationModalSmallLabel,
  applicationModalStageHeader,
  applicationModalStagePanel,
  applicationModalStatusGrid,
  applicationModalStatusIconBox,
  applicationModalStatusItem,
  applicationModalSubmitButton,
  applicationModalWorkModeItem,
  applicationModalWorkModeWrapper,
} from "../style";
import {
  COMMON_INTERVIEW_ROUNDS,
  OA_PLATFORMS,
  REJECTION_REASONS,
  type ApplicationModalProps,
  type CreateApplicationPayload,
  type StatusConfig,
} from "../types";

import ReusableModal from "@/components/ModalBox/ModalBox";
import {
  useCreateApplicationMutation,
  useGetFilterOptionsQuery,
  useUpdateApplicationMutation,
} from "@/services/jobTrackerApi";

const statusConfigs = (theme: any): StatusConfig[] => [
  {
    key: "Applied",
    label: "Applied",
    icon: ArticleOutlinedIcon,
    color: theme.palette.primary.main,
    bg: theme.palette.primary.main100,
  },
  {
    key: "OA / Assessment",
    label: "OA / Test",
    icon: LaptopMacOutlinedIcon,
    color: theme.palette.secondary.main,
    bg: theme.palette.secondary.main100,
  },
  {
    key: "Interview",
    label: "Interview",
    icon: GroupsOutlinedIcon,
    color: theme.palette.warning.main,
    bg: theme.palette.warning.light,
  },
  {
    key: "Offer",
    label: "Offer",
    icon: CheckCircleOutlineRoundedIcon,
    color: theme.palette.success.main,
    bg: theme.palette.success.light,
  },
  {
    key: "Rejected",
    label: "Rejected",
    icon: CancelOutlinedIcon,
    color: theme.palette.error.main,
    bg: theme.palette.error.light,
  },
];

const WORK_MODE = [
  { label: "On-site", icon: BusinessRoundedIcon },
  { label: "Hybrid", icon: ApartmentRoundedIcon },
  { label: "Remote", icon: HomeWorkRoundedIcon },
];

export const ApplicationModal = ({
  open,
  onClose,
  initialData,
  defaultStatus = "Applied",
}: ApplicationModalProps) => {
  const theme = useTheme();

  const { data: filterOptionsResponse } = useGetFilterOptionsQuery();
  const categories = useMemo(
    () => filterOptionsResponse?.data?.categories ?? [],
    [filterOptionsResponse?.data?.categories],
  );

  const [createApplication, { isLoading: isCreating }] =
    useCreateApplicationMutation();
  const [updateApplication, { isLoading: isUpdating }] =
    useUpdateApplicationMutation();

  const createInitialFormData = (): CreateApplicationPayload => {
    if (initialData) {
      return {
        company: initialData.company,
        role: initialData.role,
        status: initialData.status,
        category: initialData.category ?? "",
        location: initialData.location ?? "",
        workMode: initialData.workMode ?? "On-site",
        jobUrl: initialData.jobUrl ?? "",
        notes: initialData.notes ?? "",
        oaDueDate: initialData.oaDueDate ?? null,
        oaLink: initialData.oaLink ?? "",
        interviewDate: initialData.interviewDate ?? null,
        interviewRound: initialData.interviewRound ?? "",
        interviewTime: initialData.interviewTime ?? "",
        offerDate: initialData.offerDate ?? null,
        offeredSalary: initialData.offeredSalary ?? null,
        rejectedDate: initialData.rejectedDate ?? null,
        rejectionReason: initialData.rejectionReason ?? "",
        salary: initialData.salary ?? { min: null, max: null, currency: "INR" },
      };
    }

    return {
      company: "",
      role: "",
      status: defaultStatus,
      category: categories[0] ?? "",
      location: "",
      workMode: "On-site",
      jobUrl: "",
      notes: "",
      oaDueDate: null,
      oaLink: "",
      interviewDate: null,
      interviewRound: "",
      interviewTime: "",
      offerDate: null,
      offeredSalary: null,
      rejectedDate: null,
      rejectionReason: "",
      salary: { min: null, max: null, currency: "INR" },
    };
  };

  const formStateInputs = [
    initialData,
    defaultStatus,
    open,
    categories,
  ] as const;
  const [formState, setFormState] = useState(() => ({
    inputs: formStateInputs,
    data: createInitialFormData(),
  }));

  if (
    formState.inputs[0] !== initialData ||
    formState.inputs[1] !== defaultStatus ||
    formState.inputs[2] !== open ||
    formState.inputs[3] !== categories
  ) {
    setFormState({ inputs: formStateInputs, data: createInitialFormData() });
  }

  const formData = formState.data;
  const setFormData: Dispatch<SetStateAction<CreateApplicationPayload>> = (
    nextData,
  ) => {
    setFormState((current) => ({
      ...current,
      data: typeof nextData === "function" ? nextData(current.data) : nextData,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.company || !formData.role) return;
    let response;
    if (initialData) {
      response = await updateApplication({
        id: initialData._id,
        body: formData,
      });
    } else {
      response = await createApplication(formData);
    }

    if (!response.error) {
      onClose();
    }
  };

  const isSubmitting = isCreating || isUpdating;

  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      maxWidth="md"
      heading={
        <Typography variant="h6-bold">
          {initialData ? "Edit Job Application" : "Track New Job Application"}
        </Typography>
      }
      actions={
        <>
          <Button
            variant="outlined"
            onClick={onClose}
            disabled={isSubmitting}
            sx={applicationModalCancelButton(theme)}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.company || !formData.role}
            sx={applicationModalSubmitButton(theme)}
          >
            {isSubmitting
              ? "Saving..."
              : initialData
                ? "Update Application"
                : "Add to Board"}
          </Button>
        </>
      }
    >
      <Box sx={applicationModalContent}>
        <Box>
          <Typography variant="body-bold" sx={applicationModalLabel(theme)}>
            Application Stage *
          </Typography>

          <Box sx={applicationModalStatusGrid}>
            {statusConfigs(theme).map(
              (statusItem: { icon: any; key: any; color: any; label: any }) => {
                const Icon = statusItem.icon;
                const isActive = formData.status === statusItem.key;

                return (
                  <Box
                    key={statusItem.key}
                    onClick={() =>
                      setFormData({ ...formData, status: statusItem.key })
                    }
                    sx={applicationModalStatusItem(theme, isActive, statusItem)}
                  >
                    <Box sx={applicationModalStatusIconBox(statusItem)}>
                      <Icon sx={{ fontSize: 20 }} />
                    </Box>

                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: isActive ? 600 : 500,
                        color: isActive
                          ? statusItem.color
                          : theme.palette.black.main,
                      }}
                    >
                      {statusItem.label}
                    </Typography>
                  </Box>
                );
              },
            )}
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid sx={{ xs: 12, sm: 6 }}>
            <Typography variant="body-bold" sx={applicationModalFieldLabel}>
              Company Name *
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="e.g. Google, Amazon, Uber"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />
          </Grid>

          <Grid sx={{ xs: 12, sm: 6 }}>
            <Typography variant="body-bold" sx={applicationModalFieldLabel}>
              Job Role *
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="e.g. SDE - II, Frontend Developer"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            />
          </Grid>

          <Grid sx={{ xs: 12, sm: 6 }}>
            <Typography variant="body-bold" sx={applicationModalFieldLabel}>
              Work Mode
            </Typography>

            <Box sx={applicationModalWorkModeWrapper(theme)}>
              {WORK_MODE.map((mode) => {
                const ModeIcon = mode.icon;
                const isActive = formData.workMode === mode.label;

                return (
                  <Box
                    key={mode.label}
                    onClick={() =>
                      setFormData({ ...formData, workMode: mode.label })
                    }
                    sx={applicationModalWorkModeItem(theme, isActive)}
                  >
                    <ModeIcon sx={{ fontSize: 16 }} />
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: isActive ? 600 : 500,
                        color: "inherit",
                      }}
                    >
                      {mode.label}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Grid>

          <Grid sx={{ xs: 12, sm: 6 }}>
            <Typography variant="body-bold" sx={applicationModalFieldLabel}>
              Location
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="e.g. Bangalore, Hyderabad, Remote"
              value={formData.location ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </Grid>
        </Grid>

        <Box>
          <Typography variant="body-bold" sx={applicationModalFieldLabel}>
            Job Category
          </Typography>

          <Box sx={applicationModalCategoryWrapper}>
            {categories.slice(0, 7).map((cat) => {
              const isSelected = formData.category === cat;

              return (
                <Chip
                  key={cat}
                  label={cat}
                  size="small"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      category: isSelected ? "" : cat,
                    })
                  }
                  sx={applicationModalCategoryChip(theme, isSelected)}
                />
              );
            })}
          </Box>
        </Box>

        {formData.status === "OA / Assessment" && (
          <Box
            sx={applicationModalStagePanel(
              theme.palette.secondary.main,
              theme.palette.secondary.main100,
            )}
          >
            <Box sx={applicationModalStageHeader}>
              <LaptopMacOutlinedIcon
                sx={{
                  color: theme.palette.secondary.main,
                }}
              />
              <Typography
                variant="body-bold"
                sx={{
                  color: theme.palette.secondary.main,
                }}
              >
                OA / Assessment Details
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid sx={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={applicationModalSmallLabel}>
                  Due Date
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  value={
                    formData.oaDueDate ? formData.oaDueDate.slice(0, 10) : ""
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, oaDueDate: e.target.value })
                  }
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>

              <Grid sx={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={applicationModalSmallLabel}>
                  Test Assessment Link
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="https://hackerrank.com/..."
                  value={formData.oaLink ?? ""}
                  onChange={(e) =>
                    setFormData({ ...formData, oaLink: e.target.value })
                  }
                  slotProps={{
                    input: {
                      endAdornment: formData.oaLink ? (
                        <InputAdornment position="end">
                          <Tooltip title="Test Link">
                            <IconButton
                              size="small"
                              component="a"
                              href={formData.oaLink}
                              target="_blank"
                            >
                              <OpenInNewRoundedIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ) : null,
                    },
                  }}
                />
              </Grid>

              <Grid sx={{ xs: 12 }}>
                <Typography variant="caption" sx={applicationModalSmallLabel}>
                  Platform Shortcut:
                </Typography>
                <Box sx={applicationModalChipWrapper}>
                  {OA_PLATFORMS.map((plat) => (
                    <Chip
                      key={plat}
                      label={plat}
                      size="small"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          notes: formData.notes
                            ? `${formData.notes} | Platform: ${plat}`
                            : `Platform: ${plat}`,
                        })
                      }
                      sx={applicationModalOAPlatformChip(theme)}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}

        {formData.status === "Interview" && (
          <Box
            sx={applicationModalStagePanel(
              theme.palette.warning.main,
              theme.palette.warning.light,
            )}
          >
            <Box sx={applicationModalStageHeader}>
              <GroupsOutlinedIcon
                sx={{
                  color: theme.palette.warning.main100,
                }}
              />
              <Typography
                variant="body-bold"
                sx={{
                  color: theme.palette.warning.main100,
                }}
              >
                Interview Round Details
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="caption"
                sx={applicationModalInterviewQuickLabel(theme)}
              >
                Quick Select Round:
              </Typography>
              <Box sx={applicationModalInterviewChipWrapper}>
                {COMMON_INTERVIEW_ROUNDS.map((round) => {
                  const isSelected = formData.interviewRound === round;
                  return (
                    <Chip
                      key={round}
                      label={round}
                      size="small"
                      onClick={() =>
                        setFormData({ ...formData, interviewRound: round })
                      }
                      sx={applicationModalInterviewChip(theme, isSelected)}
                    />
                  );
                })}
              </Box>
            </Box>

            <Grid container spacing={2}>
              <Grid sx={{ xs: 12, sm: 4 }}>
                <Typography
                  variant="caption"
                  sx={applicationModalInterviewFieldLabel}
                >
                  Round / Stage Name *
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="e.g. Technical Round 3, Bar Raiser"
                  value={formData.interviewRound ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      interviewRound: e.target.value,
                    })
                  }
                  sx={applicationModalInterviewField(theme)}
                />
              </Grid>

              <Grid sx={{ xs: 12, sm: 4 }}>
                <Typography
                  variant="caption"
                  sx={applicationModalInterviewFieldLabel}
                >
                  Interview Date
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  value={
                    formData.interviewDate
                      ? formData.interviewDate.slice(0, 10)
                      : ""
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, interviewDate: e.target.value })
                  }
                  slotProps={{ inputLabel: { shrink: true } }}
                  sx={applicationModalInterviewField(theme)}
                />
              </Grid>

              <Grid sx={{ xs: 12, sm: 4 }}>
                <Typography
                  variant="caption"
                  sx={applicationModalInterviewFieldLabel}
                >
                  Interview Time
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="e.g. 10:00 AM / 3:30 PM"
                  value={formData.interviewTime ?? ""}
                  onChange={(e) =>
                    setFormData({ ...formData, interviewTime: e.target.value })
                  }
                  sx={applicationModalInterviewField(theme)}
                />
              </Grid>
            </Grid>
          </Box>
        )}

        {formData.status === "Offer" && (
          <Box
            sx={applicationModalStagePanel(
              theme.palette.success.main,
              theme.palette.success.light,
            )}
          >
            <Box sx={applicationModalStageHeader}>
              <CheckCircleOutlineRoundedIcon
                sx={{
                  color: theme.palette.success.main100,
                }}
              />
              <Typography
                variant="body-bold"
                sx={{
                  color: theme.palette.success.main100,
                }}
              >
                Offer Package & Details
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid sx={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={applicationModalSmallLabel}>
                  Offered Salary (LPA / Annual CTC)
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  placeholder="e.g. 24"
                  value={formData.offeredSalary ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      offeredSalary: Number(e.target.value) || null,
                    })
                  }
                />
              </Grid>

              <Grid sx={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={applicationModalSmallLabel}>
                  Offer Date
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  value={
                    formData.offerDate ? formData.offerDate.slice(0, 10) : ""
                  }
                  onChange={(e) =>
                    setFormData({ ...formData, offerDate: e.target.value })
                  }
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Grid>
            </Grid>
          </Box>
        )}

        {formData.status === "Rejected" && (
          <Box
            sx={applicationModalStagePanel(
              theme.palette.error.main,
              theme.palette.error.light,
            )}
          >
            <Box sx={applicationModalStageHeader}>
              <CancelOutlinedIcon
                sx={{
                  color: theme.palette.error.main,
                }}
              />
              <Typography
                variant="body-bold"
                sx={{
                  color: theme.palette.error.main,
                }}
              >
                Rejection Feedback
              </Typography>
            </Box>

            <Box sx={applicationModalRejectionChipWrapper}>
              {REJECTION_REASONS.map((reason) => (
                <Chip
                  key={reason}
                  label={reason}
                  size="small"
                  onClick={() =>
                    setFormData({ ...formData, rejectionReason: reason })
                  }
                  sx={applicationModalRejectionChip(
                    theme,
                    formData.rejectionReason === reason,
                  )}
                />
              ))}
            </Box>

            <TextField
              fullWidth
              size="small"
              placeholder="Reason / Notes..."
              value={formData.rejectionReason ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, rejectionReason: e.target.value })
              }
            />
          </Box>
        )}

        <Box>
          <Typography variant="body-bold" sx={applicationModalFieldLabel}>
            Expected Salary Range (LPA / K)
          </Typography>

          <Grid container spacing={2}>
            <Grid sx={{ xs: 4 }}>
              <Select
                fullWidth
                size="small"
                value={formData.salary?.currency ?? "INR"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    salary: {
                      min: formData.salary?.min ?? null,
                      max: formData.salary?.max ?? null,
                      currency: e.target.value,
                    },
                  })
                }
              >
                <MenuItem value="INR">₹ INR</MenuItem>
                <MenuItem value="USD">$ USD</MenuItem>
                <MenuItem value="EUR">€ EUR</MenuItem>
              </Select>
            </Grid>

            <Grid sx={{ xs: 4 }}>
              <TextField
                fullWidth
                size="small"
                type="number"
                placeholder="Min (e.g. 18)"
                value={formData.salary?.min ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    salary: {
                      min: Number(e.target.value) || null,
                      max: formData.salary?.max ?? null,
                      currency: formData.salary?.currency ?? "INR",
                    },
                  })
                }
              />
            </Grid>

            <Grid sx={{ xs: 4 }}>
              <TextField
                fullWidth
                size="small"
                type="number"
                placeholder="Max (e.g. 26)"
                value={formData.salary?.max ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    salary: {
                      min: formData.salary?.min ?? null,
                      max: Number(e.target.value) || null,
                      currency: formData.salary?.currency ?? "INR",
                    },
                  })
                }
              />
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Typography variant="body-bold" sx={applicationModalFieldLabel}>
            Job Posting Link
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="https://linkedin.com/jobs/view/..."
            value={formData.jobUrl ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, jobUrl: e.target.value })
            }
          />
        </Box>
        <Box>
          <Typography variant="body-bold" sx={applicationModalFieldLabel}>
            Personal Notes & Referral Context
          </Typography>
          <Box
            component="textarea"
            rows={3}
            placeholder="e.g. Referred by Senior SDE on LinkedIn. Used resume version v2."
            value={formData.notes ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            sx={applicationModalNotesTextarea(theme)}
          />
        </Box>
      </Box>
    </ReusableModal>
  );
};
