import ForgotPasswordImage from "@assets/forgot-password-image.png";
import Logo from "@components/Logo";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { styles } from "../../style";

import {
  useForgotPasswordMutation,
  type ForgotPasswordRequest,
} from "@/services/authApi";

const introText =
  "Enter the email address associated with your account and we'll send you a link to reset your password";

const ResetForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordRequest>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordRequest) => {
    try {
      const res = await forgotPassword(data).unwrap();

      if (res.success) {
        await navigate("/check-your-email", {
          state: {
            email: data.email,
          },
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card sx={styles.card}>
      <Box sx={{ ...styles.headingContainer, alignItems: "center" }}>
        <Box
          sx={{
            ...styles.emailIconStyle,
            background: `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
          }}
        >
          <EmailOutlinedIcon
            sx={{
              fontSize: 30,
              color: theme.palette.primary.dark,
            }}
          />
        </Box>
        <Typography variant="h5-bold">Forgot password</Typography>
        <Typography
          sx={{
            color: theme.palette.black.secondary,
            maxWidth: 250,
          }}
          variant="body1-medium"
        >
          {introText}
        </Typography>
      </Box>

      <Box>
        <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
          <Box sx={styles.formField}>
            <Typography variant="body-medium">Email</Typography>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Enter your email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="small"
            disabled={isLoading}
            sx={{ mt: 2, fontWeight: "bold", fontSize: "14px", mb: 2 }}
          >
            {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
          </Button>
        </form>

        <Typography
          variant="body-secondary-medium"
          color={theme.palette.black.secondary}
        >
          <Button
            variant="borderless"
            onClick={() => void navigate("/login")}
            sx={styles.alreadyHaveAcount}
          >
            Back to Login
          </Button>
        </Typography>
      </Box>
    </Card>
  );
};

const IntroductionSection = () => {
  const theme = useTheme();

  return (
    <Box sx={styles.introSectionContainer}>
      <Box>
        <Typography variant="h4-bold" color={theme.palette.black.main100}>
          Forgot Password
        </Typography>

        <Typography
          sx={{
            maxWidth: "300px",
            color: "black.secondary",
            fontWeight: "bold",
          }}
        >
          {introText}
        </Typography>
      </Box>

      <Box sx={styles.basicStyles}>
        <Box
          component="img"
          src={ForgotPasswordImage}
          alt="Signup"
          sx={{
            width: {
              xs: 250,
              sm: 320,
              md: 420,
              lg: 500,
            },
            filter: `
        drop-shadow(0px 30px 40px rgba(109,78,255,.18))
        drop-shadow(0px 80px 120px rgba(109,78,255,.15))
      `,
          }}
        />
      </Box>
    </Box>
  );
};

const ForgotPassword = () => {
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
          ...styles.signUpSectionContainer,
          flex: 1,
          alignItems: "center",
        }}
      >
        <Box>
          <IntroductionSection />
        </Box>
        <Box>
          <ResetForm />
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

export default ForgotPassword;
