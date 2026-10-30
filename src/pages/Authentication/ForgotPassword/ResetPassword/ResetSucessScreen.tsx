import PasswordResetSuccessImage from "@assets/forgot-password-success-sreen.png";
import Logo from "@components/Logo";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { styles } from "../../style";

const ResetSuccessScreen = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        p: 2,
        boxSizing: "border-box",
      }}
    >
      <Logo />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 450,
            maxWidth: "100%",
            p: 5,
            borderRadius: 4,
            textAlign: "center",
            boxShadow: "0px 12px 40px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={PasswordResetSuccessImage}
            alt="Password Updated"
            sx={{
              width: 200,
              mb: 3,
            }}
          />

          <Typography variant="h4-bold" color="black.main100" sx={{ mb: 1 }}>
            Password Updated!
          </Typography>

          <Typography variant="body-medium" color="black.secondary">
            Your password has been changed successfully.
          </Typography>
          <Typography
            variant="body-medium"
            color="black.secondary"
            sx={{
              mb: 4,
            }}
          >
            You can now login using your new password.
          </Typography>

          <Button
            fullWidth
            variant="contained"
            size="medium"
            onClick={() => void navigate("/login")}
            sx={{
              fontWeight: "bold",
            }}
          >
            Go to Login
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          ...styles.basicStyles,
          gap: 0.7,
          mt: "auto",
          py: 1,
        }}
      >
        <VerifiedUserIcon sx={{ color: "success.main", fontSize: 20 }} />
        <Typography variant="p-medium" color="black.secondary">
          Your data is 100% secure and protected
        </Typography>
      </Box>
    </Box>
  );
};

export default ResetSuccessScreen;
