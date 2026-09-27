import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  useTheme,
} from "@mui/material";
import type { ReactNode } from "react";

interface ReusableModalProps {
  open: boolean;
  onClose: () => void;
  heading: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg";
}

const ReusableModal = ({
  open,
  onClose,
  heading,
  children,
  actions,
  maxWidth = "sm",
}: ReusableModalProps) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            overflow: "hidden",
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ flex: 1 }}>{heading}</Box>

        <IconButton onClick={onClose} size="small">
          <CloseRoundedIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 3 }}>{children}</DialogContent>

      {actions && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
            px: 3,
            py: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          {actions}
        </Box>
      )}
    </Dialog>
  );
};

export default ReusableModal;
