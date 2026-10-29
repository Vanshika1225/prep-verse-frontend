import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import RouteRoundedIcon from "@mui/icons-material/RouteRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  TextareaAutosize,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

import {
  actionContentInnerBox,
  actionContentWrapper,
  addAnotherMileStone,
  basicInfoStyle,
  cancelButton,
  cancelButtonStyle,
  chipStyle,
  createRoadMapButtonStyle,
  createYourRoadmapStyle,
  deleteButtonIcon,
  fieldSx,
  flexColumn,
  formDataInnerBox,
  formDataMapStyle,
  headingOuterBox,
  iconOuterBox,
  innerCommonStyle,
  learningMileStoneStyle,
  loadSampleButton,
  mileStoneChip,
  newSchedule,
  noTopic,
  scheduleIconStyle,
  sectionTitleSx,
  sliderStyle,
  textAreaStyle,
  weeklyCommitmentWrapper,
} from "../style";
import type { CreateMilestoneInput, CreateRoadmapPayload } from "../type";

import ReusableModal from "@/components/ModalBox/ModalBox";

interface CreateRoadmapModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateRoadmapPayload) => Promise<void>;
  isLoading?: boolean;
}

const samplePayload: CreateRoadmapPayload = {
  title: "Frontend Developer Roadmap",
  description: "Complete frontend development preparation",
  category: "Frontend",
  difficulty: "Intermediate",
  topics: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
  hoursPerWeek: 7,
  milestones: [
    {
      title: "HTML and CSS Fundamentals",
      description: "Learn HTML structure and CSS styling",
      estimatedHours: 10,
    },
    {
      title: "JavaScript Fundamentals",
      description: "Learn ES6+, closures and promises",
      estimatedHours: 15,
    },
    {
      title: "React Fundamentals",
      description: "Learn components, hooks and state management",
      estimatedHours: 20,
    },
    {
      title: "Next.js",
      description: "Learn routing and rendering",
      estimatedHours: 15,
    },
  ],
};

const CreateRoadmapModal = ({
  open,
  onClose,
  onSubmit,
  isLoading = false,
}: CreateRoadmapModalProps) => {
  const theme = useTheme();

  const purple = theme.palette.primary.main;
  const mutedText = theme.palette.black.secondary;

  const [formData, setFormData] = useState<CreateRoadmapPayload>({
    title: "",
    description: "",
    category: "Frontend",
    difficulty: "Intermediate",
    topics: [],
    hoursPerWeek: 10,
    milestones: [{ title: "", description: "", estimatedHours: 10 }],
  });

  const [topicInput, setTopicInput] = useState("");

  const handleFillSample = () => {
    setFormData(JSON.parse(JSON.stringify(samplePayload)));
    setTopicInput("");
  };

  const handleAddTopic = () => {
    const topic = topicInput.trim();

    if (!topic) return;

    if (
      !formData.topics.some(
        (existing) => existing.toLowerCase() === topic.toLowerCase(),
      )
    ) {
      setFormData((prev) => ({
        ...prev,
        topics: [...prev.topics, topic],
      }));
    }

    setTopicInput("");
  };

  const handleRemoveTopic = (topicToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics.filter((topic) => topic !== topicToRemove),
    }));
  };

  const handleAddMilestone = () => {
    setFormData((prev) => ({
      ...prev,
      milestones: [
        ...prev.milestones,
        { title: "", description: "", estimatedHours: 10 },
      ],
    }));
  };

  const handleUpdateMilestone = (
    index: number,
    field: keyof CreateMilestoneInput,
    value: string | number,
  ) => {
    setFormData((prev) => {
      const milestones = [...prev.milestones];
      const milestone = milestones[index];

      if (!milestone) return prev;

      milestones[index] = { ...milestone, [field]: value };

      return { ...prev, milestones };
    });
  };

  const handleRemoveMilestone = (index: number) => {
    if (formData.milestones.length <= 1) return;

    setFormData((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index),
    }));
  };

  const totalHours = formData.milestones.reduce(
    (total, milestone) => total + (Number(milestone.estimatedHours) || 0),
    0,
  );

  const estimatedWeeks =
    formData.hoursPerWeek > 0
      ? Math.ceil(totalHours / formData.hoursPerWeek)
      : 0;

  const handleSubmit = async () => {
    if (
      !formData.title.trim() ||
      isLoading ||
      formData.milestones.some((milestone) => !milestone.title.trim())
    ) {
      return;
    }

    await onSubmit(formData);
    onClose();
  };

  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      maxWidth="md"
      heading={
        <Box sx={{ px: { xs: 0, sm: 0.5 }, pt: 0.5 }}>
          <Box sx={headingOuterBox}>
            <Box sx={{ display: "flex", gap: 1.5, minWidth: 0 }}>
              <Box sx={iconOuterBox}>
                <RouteRoundedIcon sx={{ fontSize: 23 }} />
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <Typography sx={createYourRoadmapStyle}>
                  Create your roadmap
                </Typography>

                <Typography
                  variant="body1-medium"
                  sx={{
                    mt: 0.5,
                    lineHeight: 1.6,
                    color: mutedText,
                    maxWidth: 340,
                  }}
                >
                  Build your learning journey, one milestone at a time.
                </Typography>
              </Box>
            </Box>

            <Button
              size="small"
              variant="outlined"
              onClick={handleFillSample}
              startIcon={<AutoAwesomeRoundedIcon sx={{ fontSize: 16 }} />}
              sx={loadSampleButton}
            >
              <Box
                component="span"
                sx={{ display: { xs: "none", sm: "inline" } }}
              >
                Load Sample
              </Box>
              <Box
                component="span"
                sx={{ display: { xs: "inline", sm: "none" } }}
              >
                Sample
              </Box>
            </Button>
          </Box>
        </Box>
      }
      actions={
        <Box sx={actionContentWrapper}>
          <Box sx={actionContentInnerBox}>
            <Box sx={scheduleIconStyle}>
              <ScheduleRoundedIcon sx={{ fontSize: 19 }} />
            </Box>

            <Box sx={flexColumn}>
              <Typography
                variant="body1-bold"
                sx={{
                  color: theme.palette.black.main400,
                }}
              >
                {totalHours} learning hours
              </Typography>
              <Typography variant="body1-medium" sx={{ color: mutedText }}>
                Approximately {estimatedWeeks} weeks at your pace
              </Typography>
            </Box>
          </Box>

          <Box sx={cancelButton}>
            <Button
              variant="outlined"
              onClick={onClose}
              disabled={isLoading}
              sx={cancelButtonStyle}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={
                isLoading ||
                !formData.title.trim() ||
                formData.milestones.some((milestone) => !milestone.title.trim())
              }
              startIcon={
                !isLoading ? (
                  <AddRoundedIcon sx={{ fontSize: 18 }} />
                ) : undefined
              }
              sx={createRoadMapButtonStyle}
            >
              {isLoading ? "Creating..." : "Create Roadmap"}
            </Button>
          </Box>
        </Box>
      }
    >
      <Box sx={basicInfoStyle}>
        <Box sx={innerCommonStyle}>
          <Box sx={{ mb: 2 }}>
            <Typography sx={sectionTitleSx}>01. Roadmap details</Typography>
            <Typography
              variant="body1-medium"
              sx={{ color: mutedText, mt: 0.4 }}
            >
              Give your learning journey a clear direction.
            </Typography>
          </Box>

          <Box sx={{ ...flexColumn, gap: 1.8 }}>
            <TextField
              label="Roadmap title"
              placeholder="e.g. Frontend Developer Roadmap"
              fullWidth
              size="small"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              sx={fieldSx}
            />

            <TextareaAutosize
              minRows={3}
              maxRows={4}
              placeholder="Description — Describe what you want to learn and what you aim to achieve..."
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              style={{ ...textAreaStyle }}
            />

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 1.5,
              }}
            >
              <FormControl fullWidth size="small" sx={fieldSx}>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                >
                  {[
                    "Frontend",
                    "Backend",
                    "Full Stack",
                    "DSA",
                    "System Design",
                    "Machine Learning",
                    "DevOps",
                  ].map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth size="small" sx={fieldSx}>
                <InputLabel>Difficulty level</InputLabel>
                <Select
                  label="Difficulty level"
                  value={formData.difficulty}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      difficulty: e.target.value,
                    }))
                  }
                >
                  {["Beginner", "Intermediate", "Advanced"].map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>

        <Box sx={innerCommonStyle}>
          <Box sx={{ mb: 1.7 }}>
            <Typography sx={sectionTitleSx}>
              02. Key topics & tech stack
            </Typography>
            <Typography
              variant="body1-medium"
              sx={{ color: mutedText, mt: 0.4 }}
            >
              Add the skills and technologies you want to master.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "stretch",
              mb: 1.5,
            }}
          >
            <TextField
              size="small"
              placeholder="Type a topic, e.g. React"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTopic();
                }
              }}
              fullWidth
              sx={fieldSx}
            />

            <Button
              variant="outlined"
              onClick={handleAddTopic}
              disabled={!topicInput.trim()}
              startIcon={<AddRoundedIcon sx={{ fontSize: 17 }} />}
              sx={loadSampleButton}
            >
              Add
            </Button>
          </Box>

          {formData.topics.length > 0 ? (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
              {formData.topics.map((topic) => (
                <Chip
                  key={topic}
                  label={topic}
                  size="small"
                  onDelete={() => handleRemoveTopic(topic)}
                  deleteIcon={<CloseRoundedIcon sx={{ fontSize: 15 }} />}
                  sx={chipStyle}
                />
              ))}
            </Box>
          ) : (
            <Box sx={noTopic}>
              <Typography variant="body1-medium" sx={{ color: mutedText }}>
                No topics added yet. Start by adding your first skill.
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={weeklyCommitmentWrapper}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              mb: 1.5,
            }}
          >
            <Box sx={newSchedule}>
              <ScheduleRoundedIcon sx={{ fontSize: 21 }} />
            </Box>

            <Box sx={{ ...flexColumn,flex: 1 }}>
              <Typography
                variant="body1-bold"
                sx={{
                  color: theme.palette.primary.main600,
                }}
              >
                Weekly commitment
              </Typography>
              <Typography
                variant="body1-medium"
                sx={{
                  color: theme.palette.primary.main500,
                  mt: 0.3,
                }}
              >
                Set a realistic learning pace.
              </Typography>
            </Box>

            <Box sx={{ textAlign: "right", flexShrink: 0 }}>
              <Typography
                variant="h6-bold"
                sx={{
                  lineHeight: 1.2,
                  color: purple,
                }}
              >
                {formData.hoursPerWeek}
                <Box
                  component="span"
                  sx={{ fontSize: "11px", fontWeight: 600, ml: 0.5 }}
                >
                  hrs/wk
                </Box>
              </Typography>
            </Box>
          </Box>

          <Slider
            value={formData.hoursPerWeek}
            min={1}
            max={40}
            step={1}
            valueLabelDisplay="auto"
            aria-label="Weekly learning hours"
            onChange={(_, value) =>
              setFormData((prev) => ({
                ...prev,
                hoursPerWeek: Array.isArray(value) ? (value[0] ?? 1) : value,
              }))
            }
            sx={sliderStyle}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: -0.5,
            }}
          >
            <Typography
              variant="body1-medium"
              sx={{ color: theme.palette.secondary.main }}
            >
              1 hr / week
            </Typography>
            <Typography
              variant="body1-medium"
              sx={{ color: theme.palette.secondary.main }}
            >
              40 hrs / week
            </Typography>
          </Box>

          <Divider
            sx={{ borderColor: theme.palette.primary.main100, my: 1.5 }}
          />

          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
            <FlagRoundedIcon sx={{ fontSize: 16, color: purple }} />
            <Typography
              variant="body1-medium"
              sx={{ color: theme.palette.primary.light }}
            >
              Estimated completion
            </Typography>
            <Box sx={{ flex: 1 }} />
            <Typography
              variant="body1-bold"
              sx={{
                color: theme.palette.primary.main700,
              }}
            >
              {estimatedWeeks} {estimatedWeeks === 1 ? "week" : "weeks"}
            </Typography>
          </Box>
        </Box>

        <Box sx={{p:1}}>
          <Box sx={learningMileStoneStyle}>
            <Box>
              <Typography sx={sectionTitleSx}>
                03. Learning milestones
              </Typography>
              <Typography
                variant="body1-medium"
                sx={{ color: mutedText, mt: 0.4 }}
              >
                Break your goal into achievable steps.
              </Typography>
            </Box>

            <Chip
              size="small"
              label={`${formData.milestones.length} ${
                formData.milestones.length === 1 ? "milestone" : "milestones"
              }`}
              sx={mileStoneChip}
            />
          </Box>

          <Box sx={{ ...flexColumn, gap: 1.2 }}>
            {formData.milestones.map((milestone, index) => (
              <Box key={index} sx={formDataMapStyle}>
                <Box sx={formDataInnerBox}>
                  {String(index + 1).padStart(2, "0")}
                </Box>

                <Box
                  sx={{
                    ...flexColumn,
                    flex: 1,
                    minWidth: 0,
                    gap: 1.2,
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "minmax(0, 1fr) 100px",
                      },
                      gap: 1,
                    }}
                  >
                    <TextField
                      size="small"
                      placeholder="Milestone title"
                      value={milestone.title}
                      onChange={(e) =>
                        handleUpdateMilestone(index, "title", e.target.value)
                      }
                      fullWidth
                      sx={fieldSx}
                    />

                    <TextField
                      size="small"
                      label="Hours"
                      type="number"
                      value={milestone.estimatedHours}
                      onChange={(e) =>
                        handleUpdateMilestone(
                          index,
                          "estimatedHours",
                          e.target.value === ""
                            ? 0
                            : Math.max(0, Number(e.target.value)),
                        )
                      }
                      slotProps={{
                        htmlInput: { min: 0 },
                      }}
                      sx={fieldSx}
                    />
                  </Box>

                  <TextField
                    size="small"
                    placeholder="What will you learn in this milestone?"
                    value={milestone.description}
                    onChange={(e) =>
                      handleUpdateMilestone(
                        index,
                        "description",
                        e.target.value,
                      )
                    }
                    fullWidth
                    sx={fieldSx}
                  />
                </Box>

                <Button
                  size="small"
                  aria-label={`Remove milestone ${index + 1}`}
                  onClick={() => handleRemoveMilestone(index)}
                  disabled={formData.milestones.length <= 1}
                  sx={deleteButtonIcon}
                >
                  <DeleteOutlineRoundedIcon sx={{ fontSize: 18 }} />
                </Button>
              </Box>
            ))}
          </Box>

          <Button
            fullWidth
            onClick={handleAddMilestone}
            startIcon={<AddRoundedIcon sx={{ fontSize: 18 }} />}
            sx={addAnotherMileStone}
          >
            Add another milestone
          </Button>
        </Box>
      </Box>
    </ReusableModal>
  );
};

export default CreateRoadmapModal;
