import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useMemo, useState } from "react";

import {
  DAYS,
  PLAN_DURATIONS,
  PLANNING_STYLES,
  TRACK_OPTIONS,
  TRACKS,
} from "../data";
import type { CreatePlanData, Track } from "../types";

import ReusableModal from "@/components/ModalBox/ModalBox";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (data: CreatePlanData) => void;
}

const CreatePlanModal = ({ open, onClose, onCreate }: Props) => {
  const theme = useTheme();

  const [step, setStep] = useState(0);

  const [form, setForm] = useState<CreatePlanData>({
    name: "",
    duration: 3,
    planningStyle: "daily",
    track: "frontend",
    subjects: [],
    days: [],
    startTime: "18:00",
    endTime: "21:00",
  });

  const updateForm = <K extends keyof CreatePlanData>(
    key: K,
    value: CreatePlanData[K],
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const options = useMemo(() => {
    if (form.track === "custom") return [];

    return TRACK_OPTIONS[form.track];
  }, [form.track]);

  const toggleSubject = (subject: string) => {
    setForm((current) => ({
      ...current,
      subjects: current.subjects.includes(subject)
        ? current.subjects.filter((item) => item !== subject)
        : [...current.subjects, subject],
    }));
  };

  const toggleDay = (day: string) => {
    setForm((current) => ({
      ...current,
      days: current.days.includes(day)
        ? current.days.filter((item) => item !== day)
        : [...current.days, day],
    }));
  };

  const selectDays = (days: string[]) => {
    updateForm("days", days);
  };

  const canContinue = () => {
    if (step === 0) {
      return Boolean(form.name.trim());
    }

    if (step === 1) {
      return form.subjects.length > 0;
    }

    return (
      form.days.length > 0 && Boolean(form.startTime) && Boolean(form.endTime)
    );
  };

  const handleTrackChange = (track: Track) => {
    updateForm("track", track);
    updateForm("subjects", []);
  };

  const handleCreate = () => {
    if (!canContinue()) return;

    onCreate(form);

    setStep(0);
    setForm({
      name: "",
      duration: 3,
      planningStyle: "daily",
      track: "frontend",
      subjects: [],
      days: [],
      startTime: "18:00",
      endTime: "21:00",
    });

    onClose();
  };

  const handleClose = () => {
    setStep(0);
    onClose();
  };

  const heading = (
    <Box>
      <Typography variant="h6">Create Study Plan</Typography>

      <Typography variant="body2" color="text.secondary">
        {step === 0 && "Set up your plan and decide how you want to learn."}

        {step === 1 && "Choose what you want to learn."}

        {step === 2 && "Tell us when you are available to study."}
      </Typography>
    </Box>
  );

  return (
    <ReusableModal
      open={open}
      onClose={handleClose}
      maxWidth="md"
      heading={heading}
      actions={
        <>
          {step > 0 && (
            <Button
              variant="outlined"
              startIcon={<ArrowBackRoundedIcon />}
              onClick={() => setStep((current) => current - 1)}
            >
              Back
            </Button>
          )}

          {step < 2 ? (
            <Button
              variant="contained"
              endIcon={<ArrowForwardRoundedIcon />}
              disabled={!canContinue()}
              onClick={() => setStep((current) => current + 1)}
            >
              Continue
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<CheckRoundedIcon />}
              disabled={!canContinue()}
              onClick={handleCreate}
            >
              Generate Plan
            </Button>
          )}
        </>
      }
    >
      {/* Step Indicator */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
        }}
      >
        {["Basics", "Learning", "Availability"].map((label, index) => (
          <Box
            key={label}
            sx={{
              display: "flex",
              alignItems: "center",
              flex: index !== 2 ? 1 : "unset",
            }}
          >
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: index <= step ? "primary.main" : "action.hover",
                color:
                  index <= step ? "primary.contrastText" : "text.secondary",
              }}
            >
              <Typography variant="caption">{index + 1}</Typography>
            </Box>

            <Typography
              variant="caption"
              sx={{
                ml: 1,
                color: index <= step ? "text.primary" : "text.secondary",
              }}
            >
              {label}
            </Typography>

            {index !== 2 && (
              <Box
                sx={{
                  flex: 1,
                  height: 1,
                  mx: 2,
                  bgcolor: theme.palette.divider,
                }}
              />
            )}
          </Box>
        ))}
      </Box>

      {/* STEP 1 */}
      {step === 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <TextField
            label="Plan Name"
            placeholder="e.g. FAANG Frontend Preparation"
            value={form.name}
            onChange={(event) => updateForm("name", event.target.value)}
            fullWidth
          />

          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              How long do you want to prepare?
            </Typography>

            <RadioGroup
              row
              value={form.duration}
              onChange={(event) =>
                updateForm("duration", Number(event.target.value))
              }
            >
              {PLAN_DURATIONS.map((item) => (
                <FormControlLabel
                  key={item.value}
                  value={item.value}
                  control={<Radio />}
                  label={item.label}
                />
              ))}
            </RadioGroup>
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              How should we organize your plan?
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 1.5,
              }}
            >
              {PLANNING_STYLES.map((item) => {
                const selected = form.planningStyle === item.value;

                return (
                  <Box
                    key={item.value}
                    onClick={() =>
                      updateForm(
                        "planningStyle",
                        item.value as CreatePlanData["planningStyle"],
                      )
                    }
                    sx={{
                      p: 2,
                      border: `1px solid ${
                        selected
                          ? theme.palette.primary.main
                          : theme.palette.divider
                      }`,
                      borderRadius: 2,
                      cursor: "pointer",
                      bgcolor: selected ? "action.hover" : "transparent",
                    }}
                  >
                    <Typography variant="subtitle2">{item.label}</Typography>

                    <Typography variant="caption" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      )}

      {/* STEP 2 */}
      {step === 1 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Learning Track</InputLabel>

            <Select
              value={form.track}
              label="Learning Track"
              onChange={(event) => handleTrackChange(event.target.value)}
            >
              {TRACKS.map((track) => (
                <MenuItem key={track.value} value={track.value}>
                  {track.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {form.track !== "custom" && (
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1.5 }}>
                Choose your specialization
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 1.5,
                }}
              >
                {options.map((option) => {
                  const selected = form.subjects.includes(option);

                  return (
                    <Box
                      key={option}
                      onClick={() => toggleSubject(option)}
                      sx={{
                        p: 1.5,
                        border: `1px solid ${
                          selected
                            ? theme.palette.primary.main
                            : theme.palette.divider
                        }`,
                        borderRadius: 2,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        bgcolor: selected ? "action.hover" : "transparent",
                      }}
                    >
                      <Checkbox checked={selected} size="small" sx={{ p: 0 }} />

                      <Typography variant="body2">{option}</Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}

          {form.track === "custom" && (
            <Box>
              <FormControl fullWidth>
                <FormLabel sx={{ mb: 1 }}>Select subjects</FormLabel>

                <FormGroup
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                  }}
                >
                  {[
                    "JavaScript",
                    "React",
                    "TypeScript",
                    "Node.js",
                    "Express.js",
                    "MongoDB",
                    "DSA",
                    "System Design",
                    "SQL",
                    "Git",
                  ].map((subject) => (
                    <FormControlLabel
                      key={subject}
                      control={
                        <Checkbox
                          checked={form.subjects.includes(subject)}
                          onChange={() => toggleSubject(subject)}
                        />
                      }
                      label={subject}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </Box>
          )}

          {form.subjects.length > 0 && (
            <Box>
              <Typography variant="caption" color="text.secondary">
                Selected subjects
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  mt: 1,
                }}
              >
                {form.subjects.map((subject) => (
                  <Chip
                    key={subject}
                    label={subject}
                    onDelete={() => toggleSubject(subject)}
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>
      )}

      {/* STEP 3 */}
      {step === 2 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1.5 }}>
              Which days are you available?
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <Button
                size="small"
                variant="outlined"
                onClick={() =>
                  selectDays([
                    "monday",
                    "tuesday",
                    "wednesday",
                    "thursday",
                    "friday",
                  ])
                }
              >
                Weekdays
              </Button>

              <Button
                size="small"
                variant="outlined"
                onClick={() => selectDays(["saturday", "sunday"])}
              >
                Weekend
              </Button>

              <Button
                size="small"
                variant="outlined"
                onClick={() => selectDays(DAYS.map((day) => day.value))}
              >
                Every Day
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 1,
            }}
          >
            {DAYS.map((day) => {
              const selected = form.days.includes(day.value);

              return (
                <Box
                  key={day.value}
                  onClick={() => toggleDay(day.value)}
                  sx={{
                    p: 1.5,
                    textAlign: "center",
                    border: `1px solid ${
                      selected
                        ? theme.palette.primary.main
                        : theme.palette.divider
                    }`,
                    borderRadius: 2,
                    cursor: "pointer",
                    bgcolor: selected ? "action.hover" : "transparent",
                  }}
                >
                  <Typography variant="body2">{day.label}</Typography>
                </Box>
              );
            })}
          </Box>

          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1.5 }}>
              When are you free?
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
              }}
            >
              <TextField
                label="Available From"
                type="time"
                value={form.startTime}
                onChange={(event) =>
                  updateForm("startTime", event.target.value)
                }
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />

              <TextField
                label="Available Until"
                type="time"
                value={form.endTime}
                onChange={(event) => updateForm("endTime", event.target.value)}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "action.hover",
            }}
          >
            <Typography variant="subtitle2">Your schedule</Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {form.days.length} days/week · {form.startTime} – {form.endTime}
            </Typography>
          </Box>
        </Box>
      )}
    </ReusableModal>
  );
};

export default CreatePlanModal;
