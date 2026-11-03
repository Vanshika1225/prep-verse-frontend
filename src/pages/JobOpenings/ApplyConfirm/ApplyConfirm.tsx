import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Box, Button, Typography, useTheme } from "@mui/material";

import { appliedConfirm, applyURLStyle, flexColumn, notYet } from "../style";
import type { ApplyConfirmModalProps } from "../types";

import ReusableModal from "@/components/ModalBox/ModalBox";

const ApplyConfirmModal = ({
  open,
  job,
  applyUrl,
  isConfirming,
  onClose,
  onConfirmApplied,
}: ApplyConfirmModalProps) => {
  const theme = useTheme();

  if (!job) return null;

  return (
    <ReusableModal
      open={open}
      onClose={onClose}
      maxWidth="xs"
      heading={
        <Typography variant="h6-bold" sx={{ color: theme.palette.black.main }}>
          Confirm Application
        </Typography>
      }
      actions={
        <>
          <Button variant="outlined" onClick={onClose} sx={notYet}>
            Not Yet
          </Button>

          <Button
            variant="contained"
            onClick={onConfirmApplied}
            disabled={isConfirming}
            startIcon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
            sx={appliedConfirm}
          >
            {isConfirming ? "Confirming..." : "Yes, I Applied"}
          </Button>
        </>
      }
    >
      <Box sx={flexColumn}>
        <Typography
          variant="body-medium"
          sx={{ color: theme.palette.black.secondary, mb: 2 }}
        >
          We opened the application page for <strong>{job.title}</strong> at{" "}
          <strong>{job.company}</strong> in a new tab.
        </Typography>

        {applyUrl && (
          <Box
            component="a"
            href={applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={applyURLStyle}
          >
            <span>Re-open application link</span>
            <OpenInNewIcon sx={{ fontSize: 14 }} />
          </Box>
        )}

        <Typography
          variant="p-bold"
          sx={{ color: theme.palette.black.main, fontSize: 14 }}
        >
          Did you finish submitting your application?
        </Typography>
      </Box>
    </ReusableModal>
  );
};

export default ApplyConfirmModal;
