import { Stack } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useDispatch, useSelector } from "react-redux";

import { removeAlert } from "@/redux/slices/toastSlice";
import type { RootState, AppDispatch } from "@/redux/store";

const FloatingAlerts = () => {
  const alerts = useSelector((state: RootState) => state.toast.alerts);
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => {
    dispatch(removeAlert());
  };

  return (
    <Stack spacing={2}>
      {alerts.map((alert) => (
        <Snackbar
          key={alert.key}
          open
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity={alert.severity}
            onClose={handleClose}
            sx={{
              width: 350,
              wordBreak: "break-word",
            }}
          >
            {alert.title && <strong>{alert.title}</strong>}
            {alert.title && ": "}
            {alert.message}
          </MuiAlert>
        </Snackbar>
      ))}
    </Stack>
  );
};

export default FloatingAlerts;