import { Box, Button, Typography, useTheme } from "@mui/material";

import { deleteButtonStyle } from "../style";
import type { DeleteConfirmModalProps } from "../types";

import ReusableModal from "@/components/ModalBox/ModalBox";

export const DeleteConfirmModal = ({
  open,
  applicationTitle,
  isLoading,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) => {
  const theme = useTheme();

  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      maxWidth="xs"
      heading={<Typography variant="h6-bold">Delete Application</Typography>}
      actions={
        <>
          <Button
            variant="outlined"
            onClick={onClose}
            disabled={isLoading}
            sx={{
              borderColor: theme.palette.divider,
              color: theme.palette.black.secondary,
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={onConfirm}
            disabled={isLoading}
            sx={deleteButtonStyle}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </>
      }
    >
      <Box sx={{ py: 1 }}>
        <Typography variant="body-medium">
          Are you sure you want to delete{" "}
          <Typography component="span" variant="body-bold">
            {applicationTitle}
          </Typography>
          ? This action cannot be undone.
        </Typography>
      </Box>
    </ReusableModal>
  );
};
