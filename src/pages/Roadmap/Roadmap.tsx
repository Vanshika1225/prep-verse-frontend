import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  Skeleton,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type {
  CreateRoadmapPayload,
  Milestone,
  RoadmapItem,
} from "../Roadmap/type";

import CreateRoadmapModal from "./CreateRoadmapModal/CreateRoadmapModal";
import MilestoneActionModal from "./MilestoneActionModal/MilestoneActionModal";
import OverallProgress from "./OverallProgress/OverallProgress";
import { QuickActionsWidget } from "./QuickActions/QuickActions";
import Recommendation from "./Recommendation/Recommendation";
import RoadmapCard from "./RoadmapCard/RoadmapCard";
import RoadmapCardSkeleton from "./RoadmapCard/RoadmapCardSkeleton";
import UpcomingMilestonesWidget from "./UpcommingMilestones/UpcommingMilestones";
import {
  allButton,
  cancelButton,
  commonPadding,
  containerRefStyle,
  createRoadmapButton,
  deleteButtonStyle,
  flexColumn,
  headerRowStyle,
  mainContentStyle,
  menuItem,
  moreButtonStyle,
  moreOptionSTyle,
  myRoadmapStyle,
  noDataFoundBox,
  roadmapTabsStyle,
  startButton,
  startRoadMapInnerBox,
  startRoadmapLoading,
} from "./style";

import NoDataFound from "@/components/NoDataFound/NoDataFound";
import {
  useCreateRoadmapMutation,
  useDeleteRoadmapMutation,
  useGetOverallProgressQuery,
  useGetRecommendedRoadmapsQuery,
  useGetRoadmapsQuery,
  useGetUpcomingMilestonesQuery,
  useStartRoadmapMutation,
  useUpdateMilestoneStatusMutation,
} from "@/services/roadmapApi";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const Roadmap = () => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  const [searchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState<number>(100);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [startRoadmapModalOpen, setStartRoadmapModalOpen] = useState(false);
  const [moreAnchorEl, setMoreAnchorEl] = useState<null | HTMLElement>(null);
  const [roadmapToDelete, setRoadmapToDelete] = useState<RoadmapItem | null>(
    null,
  );
  const [startingRoadmapId, setStartingRoadmapId] = useState<string | null>(
    null,
  );
  const [selectedMilestone, setSelectedMilestone] = useState<{
    milestone: Milestone;
    roadmap: RoadmapItem;
  } | null>(null);

  const { data: roadmapsData, isLoading: isRoadmapsLoading } =
    useGetRoadmapsQuery();
  const { data: overallProgressData, isLoading: isOverallProgressLoading } =
    useGetOverallProgressQuery();
  const { data: recommendedData, isLoading: isRecommendedLoading } =
    useGetRecommendedRoadmapsQuery();
  const { data: upcomingData, isLoading: isUpcomingLoading } =
    useGetUpcomingMilestonesQuery();
  const [createRoadmapMutation, { isLoading: isCreating }] =
    useCreateRoadmapMutation();
  const [updateMilestoneMutation, { isLoading: isUpdatingMilestone }] =
    useUpdateMilestoneStatusMutation();
  const [startRoadmapMutation, { isLoading: isStartingRoadmap }] =
    useStartRoadmapMutation();
  const [deleteRoadmapMutation, { isLoading: isDeletingRoadmap }] =
    useDeleteRoadmapMutation();

  const rawRoadmaps: RoadmapItem[] = useMemo(() => {
    if (
      roadmapsData?.data &&
      Array.isArray(roadmapsData.data) &&
      roadmapsData.data.length > 0
    ) {
      return roadmapsData.data;
    }
    return [];
  }, [roadmapsData]);

  const allCategories = useMemo(() => {
    const categories = rawRoadmaps
      .map((roadmap) => roadmap.category)
      .filter(Boolean);
    return Array.from(new Set(categories));
  }, [rawRoadmaps]);

  const orderedCategories = useMemo(() => {
    if (
      activeCategory &&
      activeCategory !== "All" &&
      allCategories.includes(activeCategory)
    ) {
      return [
        activeCategory,
        ...allCategories.filter((cat) => cat !== activeCategory),
      ];
    }
    return allCategories;
  }, [allCategories, activeCategory]);

  const calculateVisible = useCallback(() => {
    if (!containerRef.current || !measureRef.current) return;
    const containerWidth = containerRef.current.clientWidth;
    if (!containerWidth) return;

    const children = Array.from(measureRef.current.children) as HTMLElement[];
    if (children.length < 2) return;

    const allBtnWidth = children[0]?.offsetWidth ?? 0;
    const moreBtnWidth = children[children.length - 1]?.offsetWidth ?? 0;
    const catElements = children.slice(1, -1);
    const gap = 9.6;

    let totalWidth = allBtnWidth;
    catElements.forEach((chip) => {
      totalWidth += gap + chip.offsetWidth;
    });

    if (totalWidth <= containerWidth) {
      setVisibleCount(catElements.length);
      return;
    }

    let usedWidth = allBtnWidth + gap + moreBtnWidth;
    let count = 0;

    for (const chip of catElements) {
      const requiredWidth = gap + chip.offsetWidth;
      if (usedWidth + requiredWidth <= containerWidth) {
        usedWidth += requiredWidth;
        count++;
      } else {
        break;
      }
    }

    setVisibleCount(Math.max(1, count));
  }, []);

  useIsomorphicLayoutEffect(() => {
    calculateVisible();
  }, [orderedCategories, calculateVisible]);

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      calculateVisible();
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [calculateVisible]);

  const visibleCategories = useMemo(
    () => orderedCategories.slice(0, visibleCount),
    [orderedCategories, visibleCount],
  );
  const moreCategories = useMemo(
    () => orderedCategories.slice(visibleCount),
    [orderedCategories, visibleCount],
  );

  const filteredRoadmaps = useMemo(() => {
    return rawRoadmaps.filter((item) => {
      if (activeTab === 1 && item.status !== "In Progress") return false;
      if (activeTab === 2 && item.status !== "Completed") return false;

      if (activeCategory !== "All") {
        const itemCat = item.category.toLowerCase();
        const selectedCat = activeCategory.toLowerCase();
        if (!itemCat.includes(selectedCat) && !selectedCat.includes(itemCat)) {
          return false;
        }
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = item.title.toLowerCase().includes(q);
        const inDesc = item.description.toLowerCase().includes(q);
        const inTopics =
          item.topics?.some((t) => t.toLowerCase().includes(q)) ?? false;
        return inTitle || inDesc || inTopics;
      }

      return true;
    });
  }, [rawRoadmaps, activeTab, activeCategory, searchQuery]);

  const notStartedRoadmaps = useMemo(() => {
    return rawRoadmaps.filter((r) => r.status === "Not Started");
  }, [rawRoadmaps]);

  const handleCreateRoadmap = async (payload: CreateRoadmapPayload) => {
    const res = await createRoadmapMutation(payload).unwrap();
    if (res.success) {
      setCreateModalOpen(false);
    }
  };

  const handleUpdateMilestone = async (
    roadmapId: string,
    milestoneId: string,
  ) => {
    await updateMilestoneMutation({
      id: roadmapId,
      milestoneId,
      body: { status: "Completed" },
    }).unwrap();
  };

  const handleStartRoadmap = async (roadmap: RoadmapItem) => {
    try {
      setStartingRoadmapId(roadmap._id);
      await startRoadmapMutation(roadmap._id).unwrap();
      setStartRoadmapModalOpen(false);
    } catch (err) {
      console.error("Failed to start roadmap:", err);
    } finally {
      setStartingRoadmapId(null);
    }
  };

  const handleDeleteRoadmapConfirm = async () => {
    if (!roadmapToDelete) return;
    try {
      await deleteRoadmapMutation(roadmapToDelete._id).unwrap();
      setRoadmapToDelete(null);
    } catch (err) {
      console.error("Failed to delete roadmap:", err);
    }
  };

  const handleQuickStartRoadmap = () => {
    if (notStartedRoadmaps.length === 1) {
      const roadmap = notStartedRoadmaps[0];
      if (roadmap) handleStartRoadmap(roadmap);
    } else {
      setStartRoadmapModalOpen(true);
    }
  };

  const handleQuickUpdateMilestone = () => {
    const inProgressRoadmap = rawRoadmaps.find(
      (r) => r.status === "In Progress",
    );
    const currentMilestone = inProgressRoadmap?.milestones?.find(
      (m) => m.state === "Current",
    );

    if (inProgressRoadmap && currentMilestone) {
      setSelectedMilestone({
        milestone: currentMilestone,
        roadmap: inProgressRoadmap,
      });
      return;
    }

    if (upcomingData?.data && upcomingData.data.length > 0) {
      const firstUpcoming = upcomingData.data[0];
      const targetRoadmap = rawRoadmaps.find(
        (r) => r._id === firstUpcoming?.roadmapId,
      );
      if (targetRoadmap && typeof firstUpcoming?.milestoneId === "string") {
        setSelectedMilestone({
          milestone: {
            _id: firstUpcoming.milestoneId,
            title: firstUpcoming?.title ?? "",
            description: firstUpcoming?.description ?? "",
            estimatedHours: firstUpcoming?.estimatedHours ?? 0,
            state: "Current",
          },
          roadmap: targetRoadmap,
        });
      }
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: theme.palette.white.main300,
      }}
    >
      <Box ref={measureRef} aria-hidden="true" sx={moreOptionSTyle}>
        <Button size="small" sx={commonPadding}>
          All
        </Button>
        {orderedCategories.map((cat) => (
          <Button key={cat} size="small" sx={commonPadding}>
            {cat}
          </Button>
        ))}
        <Button size="small" sx={commonPadding}>
          More
        </Button>
      </Box>

      <Box sx={mainContentStyle}>
        <Box sx={{ minWidth: 0 }}>
          <Box sx={headerRowStyle}>
            <Box sx={flexColumn}>
              <Typography
                variant="h5-bold"
                sx={{
                  color: theme.palette.black.main,
                }}
              >
                Roadmap
              </Typography>
              <Typography
                variant="body-medium"
                sx={{ color: theme.palette.black.secondary, mt: 0.4 }}
              >
                Step-by-step guides to help you achieve your goals
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={() => setCreateModalOpen(true)}
              sx={createRoadmapButton}
            >
              Create Roadmap
            </Button>
          </Box>

          <Box
            sx={{
              borderBottom: `1px solid ${theme.palette.white.main}`,
              mb: 2,
            }}
          >
            <Tabs
              value={activeTab}
              onChange={(_, val) => setActiveTab(val)}
              sx={roadmapTabsStyle}
            >
              <Tab label="All Roadmaps" />
              <Tab label="In Progress" />
              <Tab label="Completed" />
            </Tabs>
          </Box>

          <Box ref={containerRef} sx={containerRefStyle}>
            <Button
              size="small"
              onClick={() => setActiveCategory("All")}
              sx={allButton(activeCategory === "All", theme)}
            >
              All
            </Button>

            {visibleCategories.map((cat) => (
              <Button
                key={cat}
                size="small"
                onClick={() => setActiveCategory(cat)}
                sx={allButton(activeCategory === cat, theme)}
              >
                {cat}
              </Button>
            ))}

            {moreCategories.length > 0 && (
              <>
                <Button
                  size="small"
                  onClick={(e) => setMoreAnchorEl(e.currentTarget)}
                  endIcon={
                    <ExpandMoreRoundedIcon
                      sx={{ fontSize: "16px !important" }}
                    />
                  }
                  sx={moreButtonStyle}
                >
                  More
                </Button>

                <Menu
                  anchorEl={moreAnchorEl}
                  open={Boolean(moreAnchorEl)}
                  onClose={() => setMoreAnchorEl(null)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                  slotProps={{
                    paper: {
                      sx: {
                        mt: 0.8,
                        minWidth: 160,
                        maxHeight: 260,
                        borderRadius: "12px",
                        boxShadow:
                          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
                        border: theme.palette.border.main,
                        p: 0.5,
                      },
                    },
                  }}
                >
                  {moreCategories.map((cat) => (
                    <MenuItem
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setMoreAnchorEl(null);
                      }}
                      sx={menuItem}
                    >
                      {cat}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>

          <Typography
            variant="h6-bold"
            sx={{
              color: theme.palette.black.main,
              mb: 2,
            }}
          >
            My Roadmaps
          </Typography>

          {isRoadmapsLoading ? (
            <Box>
              {Array.from({ length: 3 }).map((_, index) => (
                <RoadmapCardSkeleton key={index} />
              ))}
            </Box>
          ) : filteredRoadmaps.length === 0 ? (
            <Box sx={{ ...noDataFoundBox, minHeight: "400px" }}>
              <NoDataFound message="No roadmaps found matching your filters. Try selecting another tab or category." />
            </Box>
          ) : (
            <Box sx={myRoadmapStyle}>
              {filteredRoadmaps.map((roadmap) => (
                <RoadmapCard
                  key={roadmap._id}
                  roadmap={roadmap}
                  isStarting={startingRoadmapId === roadmap._id}
                  onMilestoneClick={(milestone, rMap) =>
                    setSelectedMilestone({ milestone, roadmap: rMap })
                  }
                  onStartRoadmap={handleStartRoadmap}
                  onDeleteRoadmap={(rMap) => setRoadmapToDelete(rMap)}
                />
              ))}
            </Box>
          )}
        </Box>

        <Box
          sx={{
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <OverallProgress
            {...(overallProgressData?.data
              ? { progress: overallProgressData.data }
              : {})}
            isLoading={isOverallProgressLoading}
          />
          <Recommendation
            {...(recommendedData?.data ? { items: recommendedData.data } : {})}
            onSelectRoadmap={() => setCreateModalOpen(true)}
            isLoading={isRecommendedLoading}
          />
          <UpcomingMilestonesWidget
            {...(upcomingData?.data ? { milestones: upcomingData.data } : {})}
            onMilestoneSelect={(upcoming) => {
              const targetRoadmap = rawRoadmaps.find(
                (r) => r._id === upcoming.roadmapId,
              );
              if (targetRoadmap) {
                setSelectedMilestone({
                  milestone: {
                    _id: upcoming.milestoneId,
                    title: upcoming.title,
                    description: upcoming.description,
                    estimatedHours: upcoming.estimatedHours,
                    state: "Current",
                  },
                  roadmap: targetRoadmap,
                });
              }
            }}
            isLoading={isUpcomingLoading}
          />
          <QuickActionsWidget
            onCreateRoadmap={() => setCreateModalOpen(true)}
            onStartRoadmap={handleQuickStartRoadmap}
            onUpdateMilestone={handleQuickUpdateMilestone}
          />
        </Box>
      </Box>

      <CreateRoadmapModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateRoadmap}
        isLoading={isCreating}
      />

      <MilestoneActionModal
        open={Boolean(selectedMilestone)}
        onClose={() => setSelectedMilestone(null)}
        milestone={selectedMilestone?.milestone ?? null}
        roadmap={selectedMilestone?.roadmap ?? null}
        onMarkCompleted={handleUpdateMilestone}
        isLoading={isUpdatingMilestone}
      />

      <Dialog
        open={startRoadmapModalOpen}
        onClose={() => !isStartingRoadmap && setStartRoadmapModalOpen(false)}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "16px",
              p: 1.5,
              maxWidth: "460px",
              width: "100%",
            },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: "18px", pb: 1 }}>
          Start a Roadmap
        </DialogTitle>
        <DialogContent>
          {isRoadmapsLoading ? (
            <Box sx={startRoadmapLoading}>
              {Array.from({ length: 3 }).map((_, index) => (
                <Box key={index} sx={startRoadMapInnerBox}>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Skeleton
                      variant="text"
                      width="70%"
                      height={22}
                      animation="wave"
                    />
                    <Skeleton
                      variant="text"
                      width="45%"
                      height={18}
                      animation="wave"
                    />
                  </Box>

                  <Skeleton
                    variant="rounded"
                    width={76}
                    height={32}
                    animation="wave"
                    sx={{ borderRadius: "8px", flexShrink: 0 }}
                  />
                </Box>
              ))}
            </Box>
          ) : notStartedRoadmaps.length === 0 ? (
            <Typography
              sx={{ color: theme.palette.black.secondary, fontSize: "14px" }}
            >
              All of your roadmaps are already in progress or completed!
            </Typography>
          ) : (
            <Box sx={startRoadmapLoading}>
              {notStartedRoadmaps.map((r) => (
                <Box key={r._id} sx={startRoadMapInnerBox}>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="p-bold">{r.title}</Typography>
                    <Typography
                      variant="body-medium"
                      sx={{
                        color: theme.palette.black.secondary,
                      }}
                    >
                      {r.category} • {r.totalMilestones} Milestones
                    </Typography>
                  </Box>

                  <Button
                    size="small"
                    variant="contained"
                    disabled={startingRoadmapId === r._id}
                    startIcon={
                      startingRoadmapId === r._id ? (
                        <CircularProgress
                          size={14}
                          sx={{ color: theme.palette.white.main }}
                        />
                      ) : (
                        <PlayArrowRoundedIcon sx={{ fontSize: 16 }} />
                      )
                    }
                    onClick={() => handleStartRoadmap(r)}
                    sx={startButton}
                  >
                    Start
                  </Button>
                </Box>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setStartRoadmapModalOpen(false)}
            sx={{ textTransform: "none", color: theme.palette.black.secondary }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={Boolean(roadmapToDelete)}
        onClose={() => !isDeletingRoadmap && setRoadmapToDelete(null)}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "16px",
              p: 1.5,
              maxWidth: "420px",
              width: "100%",
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: "18px",
            color: theme.palette.black.main,
          }}
        >
          Delete Roadmap
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="p-medium"
            sx={{ color: theme.palette.black.main200 }}
          >
            Are you sure you want to delete{" "}
            <strong>{roadmapToDelete?.title}</strong>? This action cannot be
            undone and all progress will be removed.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 1.5, gap: 1 }}>
          <Button
            onClick={() => setRoadmapToDelete(null)}
            disabled={isDeletingRoadmap}
            sx={cancelButton}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteRoadmapConfirm}
            disabled={isDeletingRoadmap}
            startIcon={
              isDeletingRoadmap ? (
                <CircularProgress
                  size={16}
                  sx={{ color: theme.palette.white.main }}
                />
              ) : (
                <DeleteOutlineRoundedIcon />
              )
            }
            sx={deleteButtonStyle}
          >
            {isDeletingRoadmap ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Roadmap;
