import { Box, Button, Typography, useTheme } from "@mui/material";
import { useState } from "react";

import { ApplicationModal } from "./ApplicationModal/ApplicationModal";
import { DeleteConfirmModal } from "./ApplicationModal/DeleteConfirmModal";
import { FilterBar } from "./FilterBar/FilterBar";
import { KanbanBoard } from "./KanbanBoard/KanbanBoard";
import { RecentActivity } from "./RecentActivity/RecentActivity";
import { RightSection } from "./RightSection/RightSection";
import {
  addNewApplicationButton,
  flexColumn,
  jobTrackerInnerBox,
  kanbanBoardInnerStyle,
  kanbanBoardMainStyle,
  rightSectionMainBox,
} from "./style";
import type { ApplicationItem, JobFilterParams } from "./types";

import {
  useDeleteApplicationMutation,
  useGetApplicationsQuery,
  useUpdateApplicationStatusMutation,
} from "@/services/jobTrackerApi";

const JobTracker = () => {
  const theme = useTheme();

  const [filters, setFilters] = useState<JobFilterParams>({
    category: "",
    location: "",
    status: "",
    search: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] =
    useState<ApplicationItem | null>(null);
  const [defaultStatusForNew, setDefaultStatusForNew] =
    useState<string>("Applied");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] =
    useState<ApplicationItem | null>(null);

  const { data: applicationsResponse, isLoading } =
    useGetApplicationsQuery(filters);
  const [updateStatus] = useUpdateApplicationStatusMutation();
  const [deleteApp, { isLoading: isDeleting }] = useDeleteApplicationMutation();

  const handleOpenNewModal = (initialStatus = "Applied") => {
    setDefaultStatusForNew(initialStatus);
    setEditingApplication(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (app: ApplicationItem) => {
    setEditingApplication(app);
    setModalOpen(true);
  };

  const handlePromptDelete = (app: ApplicationItem) => {
    setApplicationToDelete(app);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!applicationToDelete) return;
    const response = await deleteApp(applicationToDelete._id);
    if (!response?.error) {
      setDeleteModalOpen(false);
      setApplicationToDelete(null);
    }
  };

  const handleUpdateStatus = (app: ApplicationItem, newStatus: string) => {
    updateStatus({ id: app._id, status: newStatus });
  };

  return (
    <Box
      sx={{
        bgcolor: theme.palette.white.main300,
        minHeight: "100vh",
      }}
    >
      <Box sx={jobTrackerInnerBox}>
        <Box sx={flexColumn}>
          <Typography variant="h4-bold">Job Tracker</Typography>
          <Typography
            variant="body-medium"
            sx={{ color: theme.palette.black.secondary, mt: 0.2 }}
          >
            Track your job applications and stay organized
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="medium"
          onClick={() => handleOpenNewModal("Applied")}
          sx={addNewApplicationButton}
        >
          + Add New Application
        </Button>
      </Box>

      <FilterBar filters={filters} onFilterChange={setFilters} />

      <Box sx={kanbanBoardMainStyle}>
        <Box sx={kanbanBoardInnerStyle}>
          <KanbanBoard
            columns={
              applicationsResponse?.data?.columns ??
              ({} as NonNullable<
                typeof applicationsResponse
              >["data"]["columns"])
            }
            isLoading={isLoading}
            onAddNew={handleOpenNewModal}
            onEdit={handleOpenEditModal}
            onDelete={handlePromptDelete}
            onUpdateStatus={handleUpdateStatus}
          />

          <RecentActivity />
        </Box>

        <Box sx={rightSectionMainBox}>
          <RightSection />
        </Box>
      </Box>

      <ApplicationModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingApplication(null);
        }}
        initialData={editingApplication}
        defaultStatus={defaultStatusForNew}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        applicationTitle={
          applicationToDelete
            ? `${applicationToDelete.company} - ${applicationToDelete.role}`
            : ""
        }
        isLoading={isDeleting}
        onClose={() => {
          setDeleteModalOpen(false);
          setApplicationToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
};

export default JobTracker;
