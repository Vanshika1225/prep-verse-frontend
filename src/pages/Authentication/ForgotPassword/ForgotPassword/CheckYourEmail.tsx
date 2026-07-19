import ForgotPasswordSuccessImage from "@assets/forgot-password-success-sreen.png";
import GmailIcon from "@assets/gmail.png";
import Logo from "@components/Logo";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Box, Button, Link, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { styles } from "../../style";

import { useForgotPasswordMutation } from "@/services/authApi";

interface CheckYourEmailIntroProps {
  email: string;
}

const CheckYourEmailIntro = ({ email }: CheckYourEmailIntroProps) => {
  const theme = useTheme();

  return (
    <Box sx={styles.introSectionContainer}>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h4-bold" color={theme.palette.black.main100}>
            Check your Email
          </Typography>
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
        </Box>
        <Typography
          sx={{
            maxWidth: "300px",
            color: "black.secondary",
            fontWeight: "bold",
          }}
        >
          We have sent a password reset link to {email} Please check you imbox
          and click link to reset your password.
        </Typography>
      </Box>

      <Box sx={styles.basicStyles}>
        <Box
          component="img"
          src={ForgotPasswordSuccessImage}
          alt="Signup"
          sx={{
            width: {
              xs: 250,
              sm: 320,
              md: 420,
              lg: 430,
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

const OpenGmail = ({ email }: CheckYourEmailIntroProps) => {
  const theme = useTheme();

  const [seconds, setSeconds] = useState(59);

  const [forgotPassword] = useForgotPasswordMutation();

  useEffect(() => {
    if (seconds === 0) return;

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  const handleResendEmail = async () => {
    try {
      const res = await forgotPassword({ email }).unwrap();

      if (res.success) {
        setSeconds(59);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        ...styles.card,
        width: 430,
        px: 5,
        py: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: 1.6,
          borderRadius: 2,
          background: theme.palette.primary.light,
          color: theme.palette.primary.main,
          mb: 4,
        }}
      >
        <InfoOutlinedIcon sx={{ fontSize: 20 }} />

        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
          }}
        >
          The link will expire in 15 minutes.
        </Typography>
      </Box>
      <Button
        fullWidth
        variant="contained"
        startIcon={
          <Box
            component="img"
            src={GmailIcon}
            alt="Gmail"
            sx={{
              width: 35,
              height: 25,
              background:theme.palette.white.main,
              borderRadius:1
            }}
          />
        }
        onClick={() => window.open("https://mail.google.com", "_blank")}
        sx={{mb:2}}
      >
        Open Gmail
      </Button>
      <Typography
        sx={{
          textAlign: "center",
          color: "text.secondary",
          mb: 2,
        }}
      >
        {seconds > 0 ? (
          <>
            Resend Email{" "}
            <Typography
              component="span"
              color="primary"
              sx={{ fontWeight: 700 }}
            >
              ({seconds}s)
            </Typography>
          </>
        ) : (
          <Link
            component="button"
            underline="hover"
            onClick={() => void handleResendEmail()}
            sx={{ fontWeight: 700 }}
          >
            Resend Email
          </Link>
        )}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link
          underline="hover"
          href="/login"
          sx={{
            fontWeight: 600,
            color: theme.palette.primary.main,
            cursor: "pointer",
          }}
        >
          Back to login
        </Link>
      </Box>
    </Box>
  );
};

const CheckYourEmail = () => {
  const location = useLocation();

  const state = location.state as CheckYourEmailIntroProps | null;

  const email = state?.email ?? "";

  return (
    <Box>
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
            <CheckYourEmailIntro email={email} />
          </Box>
          <Box>
            <OpenGmail email={email} />
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
    </Box>
  );
};

export default CheckYourEmail;
