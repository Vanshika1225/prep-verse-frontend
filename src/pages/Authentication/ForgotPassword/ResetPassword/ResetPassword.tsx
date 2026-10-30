import ForgotPasswordImage from "@assets/forgot-password-image.png";
import Logo from "@components/Logo";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Card,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { styles } from "../../style";
import { PasswordRule } from "../PasswordRule/PasswordRule";

import {
  useResetPasswordMutation,
  type ResetPasswordRequest,
} from "@/services/authApi";

const ResetPasswordIntroSection = () => {
  const theme = useTheme();

  return (
    <Box sx={styles.introSectionContainer}>
      <Box>
        <Typography variant="h4-bold" color={theme.palette.black.main100}>
          Reset Your Password 🔒
        </Typography>

        <Typography
          sx={{
            color: "black.secondary",
            fontWeight: "bold",
          }}
        >
          Create the new password for your PrepVerse account.
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

const ResetForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ResetPasswordRequest>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  const onSubmit = async (data: ResetPasswordRequest) => {
    try {
      if (!token) {
        console.error("Reset token is missing");
        return;
      }
      const res = await resetPassword({
        ...data,
        token,
      }).unwrap();

      if (res.success) {
        await navigate("/password-updated");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
  };

  return (
    <Card sx={styles.card}>
      <Box sx={{ mt: 4 }}>
        <form onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
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

          <Box sx={styles.formField}>
            <Typography variant="body-medium">Confirm Password</Typography>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Confirm Password is required",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter your confirm password"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword((prev) => !prev)
                            }
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              )}
            />
          </Box>

          <Box sx={{ mt: 1 }}>
            <PasswordRule
              valid={passwordChecks.length}
              text="At least 8 characters"
            />

            <PasswordRule
              valid={passwordChecks.uppercase}
              text="Contains an uppercase letter"
            />

            <PasswordRule
              valid={passwordChecks.lowercase}
              text="Contains a lowercase letter"
            />

            <PasswordRule
              valid={passwordChecks.number}
              text="Contains a number"
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
            {isLoading ? "Resetting Password..." : "Reset Password"}
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

const ResetPassword = () => {
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
          <ResetPasswordIntroSection />
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

export default ResetPassword;
