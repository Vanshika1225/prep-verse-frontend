import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Logo from "@/components/Logo";

const navItems = ["Features", "Roadmap", "Testimonials", "Pricing", "Resources"];

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          width: "95%",
          mx: "auto",
          py: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Logo />

        <Box sx={{ display: "flex", gap: 4 }}>
          {navItems.map((item) => (
            <Typography
              key={item}
              sx={{
                cursor: "pointer",
                fontWeight: 500,
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            sx={{ px: 2, color: "#1e1923", fontWeight: "bold" }}
            onClick={() => {
              void navigate("/login");
            }}
          >
            Log in
          </Button>
          <Button
            variant="contained"
            sx={{ px: 4 }}
            onClick={() => {
              void navigate("/signup");
            }}
          >
            Get Started
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
