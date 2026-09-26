import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowLeftRounded from "@mui/icons-material/KeyboardArrowLeftRounded";
import KeyboardArrowRightRounded from "@mui/icons-material/KeyboardArrowRightRounded";
import SearchRounded from "@mui/icons-material/SearchRounded";
import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

import PlatformLogo from "../PlatformLogo";
import {
  badgeStyle,
  chipStyleWRapper,
  contestInModalWrapper,
  innerBoxSidebarModal,
  outerBoxSidebarModal,
  paginationInModal,
  selectStyle,
  upcommingContestModalLabel,
} from "../style";
import {
  DURATIONS,
  PLATFORMS,
  type ContestFilterState,
  type upcommingContest,
} from "../types";

import contestTipImage from "@/assets/upcomming-contest-modal.png";
import ReusableModal from "@/components/ModalBox/ModalBox";
import { formatDuration, formatTime } from "@/utils/DateUtilityFunctions";

const COLUMNS = "2.6fr 1.1fr 1.1fr 1.1fr 0.9fr";

const Chip = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => {
  const theme = useTheme();

  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        ...upcommingContestModalLabel,
        border: `1px solid ${
          active ? theme.palette.primary.main : theme.palette.border.main
        }`,
        bgcolor: active ? theme.palette.primary.main : theme.palette.white.main,
        color: active ? theme.palette.white.main : theme.palette.appText.main,
      }}
    >
      {label}
    </Box>
  );
};

const HeaderCell = ({ children }: { children: string }) => {
  const theme = useTheme();

  return (
    <Typography
      variant="body1-medium"
      sx={{
        fontSize: 12,
        color: theme.palette.appText.label,
      }}
    >
      {children}
    </Typography>
  );
};

const UpcomingContestsModal = ({
  open,
  onClose,
  contests,
  filters,
  onFiltersChange,
  page,
  totalPages,
  totalCount,
  onPageChange,
  onSelectContest,
  title,
}: upcommingContest) => {
  const theme = useTheme();

  const [draftState, setDraftState] = useState({
    open,
    filters,
    draft: filters,
  });

  if (draftState.open !== open || draftState.filters !== filters) {
    setDraftState({
      open,
      filters,
      draft: open ? filters : draftState.draft,
    });
  }

  const { draft } = draftState;

  const setDraft = (next: ContestFilterState) => {
    setDraftState((current) => ({
      ...current,
      draft: next,
    }));
  };

  const set = (patch: Partial<ContestFilterState>) => {
    onFiltersChange({
      ...filters,
      ...patch,
    });
  };

  const applyFilters = () => {
    onFiltersChange(draft);
    onPageChange(1);
  };

  const clearAll = () => {
    const cleared: ContestFilterState = {
      search: "",
      platform: "",
      level: "",
      duration: "",
    };

    setDraft(cleared);
    onFiltersChange(cleared);
    onPageChange(1);
  };

  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      maxWidth="lg"
      heading={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "10px",
              bgcolor: theme.palette.primary.main100,
              display: "grid",
              placeItems: "center",
            }}
          >
            <CalendarMonthRounded
              sx={{
                color: theme.palette.primary.main,
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6-bold"
              sx={{
                color: theme.palette.appText.main,
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="body1-medium"
              sx={{
                color: theme.palette.appText.muted,
              }}
            >
              {title === "Upcoming Contests"
                ? "Stay ahead and never miss an important contest. Prepare, practice and improve!"
                : title === "Ongoing Contests"
                  ? "Track contests that are currently live."
                  : "View contests that have already been completed."}
            </Typography>
          </Box>
        </Box>
      }
    >
      <Box
        sx={{
          display: "flex",
          maxHeight: "70vh",
        }}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              mb: 2,
            }}
          >
            <TextField
              placeholder="Search contest name or platform..."
              value={filters.search}
              onChange={(e) =>
                set({
                  search: e.target.value,
                })
              }
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRounded
                        sx={{
                          fontSize: 18,
                          color: theme.palette.appText.secondary,
                        }}
                      />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  height: 38,
                  borderRadius: "6px",
                  fontSize: 13,
                  bgcolor: theme.palette.white.main,
                },
              }}
            />

            <Select
              displayEmpty
              value={filters.platform}
              onChange={(e) =>
                set({
                  platform: e.target.value,
                })
              }
              IconComponent={KeyboardArrowDownRounded}
              sx={selectStyle}
            >
              <MenuItem value="">All Platforms</MenuItem>

              {PLATFORMS.slice(1).map((platform) => (
                <MenuItem key={platform} value={platform}>
                  {platform}
                </MenuItem>
              ))}
            </Select>

            <Select
              displayEmpty
              value={filters.duration}
              onChange={(e) =>
                set({
                  duration: e.target.value,
                })
              }
              IconComponent={KeyboardArrowDownRounded}
              sx={selectStyle}
            >
              {DURATIONS.map((duration) => (
                <MenuItem key={duration.label} value={duration.value}>
                  {duration.value === "" ? "All Durations" : duration.label}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box
            sx={{
              border: `1px solid ${theme.palette.border.main}`,
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: COLUMNS,
                px: "16px",
                py: "10px",
                borderBottom: `1px solid ${theme.palette.divider}`,
                bgcolor: theme.palette.white.main300,
              }}
            >
              <HeaderCell>Contest</HeaderCell>
              <HeaderCell>Platform</HeaderCell>
              <HeaderCell>Start Time</HeaderCell>
              <HeaderCell>End Time</HeaderCell>
              <HeaderCell>Duration</HeaderCell>
            </Box>

            {contests.length === 0 ? (
              <Typography
                sx={{
                  py: 6,
                  textAlign: "center",
                  color: theme.palette.appText.muted,
                }}
              >
                No contests match your filters
              </Typography>
            ) : (
              contests.map((contest) => (
                <Box
                  key={contest._id}
                  onClick={() => onSelectContest?.(contest)}
                  sx={{
                    ...contestInModalWrapper,
                    gridTemplateColumns: COLUMNS,

                    cursor: onSelectContest ? "pointer" : "default",
                    borderBottom: `1px solid ${theme.palette.divider}`,

                    "&:hover": {
                      bgcolor: theme.palette.white.main300,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      minWidth: 0,
                    }}
                  >
                    <PlatformLogo platform={contest.platform} size={32} />

                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        variant="body1-bold"
                        sx={{
                          color: theme.palette.appText.main,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {contest.name}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          gap: "6px",
                          mt: "4px",
                        }}
                      >
                        {contest.badge && (
                          <Box
                            component="span"
                            sx={{
                              ...(
                                badgeStyle as unknown as (
                                  t: typeof theme,
                                  b: string,
                                ) => Record<string, string>
                              )(theme, contest.badge),
                              border: "1px solid",
                              borderRadius: "4px",
                              px: "6px",
                              fontSize: 10.5,
                              fontWeight: 600,
                            }}
                          >
                            {contest.badge}
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>

                  <Typography
                    variant="body1-medium"
                    sx={{
                      color: theme.palette.appText.main,
                    }}
                  >
                    {contest.platform}
                  </Typography>

                  <Typography
                    variant="body1-medium"
                    sx={{
                      color: theme.palette.appText.main,
                    }}
                  >
                    {formatTime(contest.startTime)}
                  </Typography>

                  <Typography
                    variant="body1-medium"
                    sx={{
                      color: theme.palette.appText.main,
                    }}
                  >
                    {formatTime(contest.endTime)}
                  </Typography>

                  <Typography
                    variant="body1-medium"
                    sx={{
                      color: theme.palette.appText.main,
                    }}
                  >
                    {formatDuration(contest.duration)}
                  </Typography>
                </Box>
              ))
            )}
          </Box>

          <Box sx={paginationInModal}>
            <Typography
              variant="body1-medium"
              sx={{
                color: theme.palette.appText.muted,
              }}
            >
              Showing {contests.length ? (page - 1) * 6 + 1 : 0}-
              {(page - 1) * 6 + contests.length} of {totalCount} contests
            </Typography>

            <Pagination
              page={page}
              count={totalPages || 1}
              onChange={(_, value) => onPageChange(value)}
              shape="rounded"
              renderItem={(item) => (
                <Box
                  component="button"
                  onClick={item.onClick}
                  disabled={item.disabled}
                  sx={{
                    width: 30,
                    height: 30,
                    display: "grid",
                    placeItems: "center",
                    border: `1px solid ${theme.palette.border.main}`,
                    borderRadius: "6px",
                    bgcolor: item.selected
                      ? theme.palette.primary.main
                      : theme.palette.white.main,
                    color: item.selected
                      ? theme.palette.white.main
                      : theme.palette.appText.main,
                    cursor: item.disabled ? "default" : "pointer",
                    opacity: item.disabled ? 0.4 : 1,
                  }}
                >
                  {item.type === "previous" ? (
                    <KeyboardArrowLeftRounded sx={{ fontSize: 16 }} />
                  ) : item.type === "next" ? (
                    <KeyboardArrowRightRounded sx={{ fontSize: 16 }} />
                  ) : (
                    item.page
                  )}
                </Box>
              )}
            />
          </Box>
        </Box>

        <Box sx={outerBoxSidebarModal}>
          <Box
            component="img"
            src={contestTipImage}
            alt="Contest illustration"
            sx={innerBoxSidebarModal}
          />

          <Typography
            variant="body-bold"
            sx={{
              color: theme.palette.appText.main,
              mb: "14px",
            }}
          >
            Filters
          </Typography>

          <Typography
            variant="body1-medium"
            sx={{
              color: theme.palette.appText.label,
              mb: "8px",
            }}
          >
            Platform
          </Typography>

          <Box sx={chipStyleWRapper}>
            {PLATFORMS.map((platform) => {
              const value = platform === "All" ? "" : platform;

              return (
                <Chip
                  key={platform}
                  label={platform}
                  active={draft.platform === value}
                  onClick={() =>
                    setDraft({
                      ...draft,
                      platform: value,
                    })
                  }
                />
              );
            })}
          </Box>

          <Typography
            variant="body1-medium"
            sx={{
              color: theme.palette.appText.label,
              mb: "8px",
            }}
          >
            Duration
          </Typography>

          <Box sx={chipStyleWRapper}>
            {DURATIONS.map((duration) => (
              <Chip
                key={duration.label}
                label={duration.label}
                active={draft.duration === duration.value}
                onClick={() =>
                  setDraft({
                    ...draft,
                    duration: duration.value,
                  })
                }
              />
            ))}
          </Box>

          <Button
            variant="contained"
            disableElevation
            onClick={applyFilters}
            sx={{
              height: 40,
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
              bgcolor: theme.palette.primary.main,

              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },

              mb: "10px",
            }}
          >
            Apply Filters
          </Button>

          <Button
            variant="outlined"
            onClick={clearAll}
            sx={{
              height: 40,
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
              color: theme.palette.appText.main,
              borderColor: theme.palette.border.main,
            }}
          >
            Clear All
          </Button>
        </Box>
      </Box>
    </ReusableModal>
  );
};

export default UpcomingContestsModal;
