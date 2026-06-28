import SignUpIntroImage from "@assets/signup-intro-image.png";
import Logo from "@components/Logo";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { styles } from "./style";

import { useSignupMutation, type SignupRequest } from "@/services/authApi";

const PasswordRule = ({ valid, text }: { valid: boolean; text: string }) => {
  const theme = useTheme();

  return (
    <Box sx={styles.passwordRule}>
      <Typography
        component="span"
        sx={{
          color: valid ? theme.palette.success.main : theme.palette.black.main,
          fontSize: 16,
          lineHeight: 1,
        }}
      >
        {valid ? "✓" : "○"}
      </Typography>

      <Typography
        variant="body1-medium"
        color={valid ? theme.palette.success.main : theme.palette.black.main}
      >
        {text}
      </Typography>
    </Box>
  );
};

const SignupForm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const password = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
  };

  const onSubmit = async (data: SignupRequest) => {
    try {
      const response = await signup(data).unwrap();
      localStorage.setItem("token", response.token);
      await navigate("/login");
    } catch (err: unknown) {
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
          Create your account
        </Typography>
        <Button>Continue With Google</Button>
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
            <Typography variant="body-medium">Full Name</Typography>
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Full Name is required",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Enter your full name"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Box>

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
                  placeholder="Enter your password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
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
            sx={{ mt: 2, fontWeight: "bold", fontSize: "14px", mb: 2 }}
          >
            {isLoading ? "Signing in..." : "Sign Up"}
          </Button>
        </form>

        <Typography
          variant="body1-medium"
          color={theme.palette.black.secondary}
        >
          Already have an account?
          <Button
            variant="borderless"
            onClick={() => void navigate("/login")}
            sx={styles.alreadyHaveAcount}
          >
            Login
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
          Create your account 🚀
        </Typography>

        <Typography
          sx={{
            maxWidth: "250px",
            color: "black.secondary",
            fontWeight: "bold",
          }}
        >
          Starts your journey towards your dream career.
        </Typography>
      </Box>

      <Box sx={styles.basicStyles}>
        <Box
          component="img"
          src={SignUpIntroImage}
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

const Signup = () => {
  return (
    <Box sx={{ p: 0.5 }}>
      <Logo />
      <Box sx={styles.signUpSectionContainer}>
        <Box>
          <IntroductionSection />
        </Box>
        <Box>
          <SignupForm />
        </Box>
      </Box>
      <Box
        sx={{
          ...styles.basicStyles,
          gap: 0.7,
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

export default Signup;
