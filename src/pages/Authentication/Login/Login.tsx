import LoginIntroImage from "@assets/login-intro-image.png";
import Logo from "@components/Logo";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { styles } from "../style";

import {
  useGoogleLoginMutation,
  useLoginMutation,
  type LoginRequest,
} from "@/services/authApi";
import { saveAuth } from "@/utils/authMethods";

const LoginForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [login, { isLoading }] = useLoginMutation();
  const [googleLogin] = useGoogleLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      const response = await login(data).unwrap();

      if (!response.success) return;

      if (response.success) {
        saveAuth(response);
        await navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleSuccess = async (response: CredentialResponse) => {
    if (!response.credential) {
      console.warn("Google credential missing");
      return;
    }

    try {
      const result = await googleLogin({
        token: response.credential,
      }).unwrap();

      localStorage.setItem("accessToken", result.data.accessToken);
      localStorage.setItem("refreshToken", result.data.refreshToken);

      await navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card sx={styles.card}>
      <Box sx={styles.headingContainer}>
        <Typography
          variant="p-secondary-bold"
          color={theme.palette.black.main100}
        >
          Login to your account
        </Typography>
        <GoogleLogin
          onSuccess={(res) => void handleGoogleSuccess(res)}
          onError={() => console.warn("Failed")}
        />
        <Typography
          sx={{
            color: theme.palette.black.secondary,
          }}
          variant="body1-medium"
        >
          Or Continue with email
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

          <Box sx={styles.formField}>
            <Typography variant="body-medium">Password</Typography>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                  message:
                    "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, and a number",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((prev) => !prev)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              )}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            <Controller
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  label="Remember me"
                  control={
                    <Checkbox
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                />
              )}
            />

            <Button
              variant="text"
              size="medium"
              onClick={() => void navigate("/forgot-password")}
              sx={{ textTransform: "none", fontWeight: 700 }}
            >
              Forgot password?
            </Button>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="small"
            disabled={isLoading}
            sx={{ mt: 2, fontWeight: "bold", fontSize: "14px", mb: 2 }}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </Button>
        </form>

        <Typography
          variant="body1-medium"
          color={theme.palette.black.secondary}
        >
          Don't have an account?
          <Button
            variant="borderless"
            onClick={() => void navigate("/signup")}
            sx={styles.alreadyHaveAcount}
          >
            Signup
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
          Welcome back! 👋
        </Typography>

        <Typography
          sx={{
            maxWidth: "250px",
            color: "black.secondary",
            fontWeight: "bold",
          }}
        >
          Login to continue your preparation journey.
        </Typography>
      </Box>

      <Box sx={styles.basicStyles}>
        <Box
          component="img"
          src={LoginIntroImage}
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

const Login = () => {
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
          <LoginForm />
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

export default Login;
