import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

interface LogoProps {
  size?: number;
  color?: string;
}

const Logo = ({ size = 45, color = "primary.main" }: LogoProps) => {
  return (
    <Link
      to="/"
      style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
    >
      <img src={logo} alt="PrepVerse" width={size} height={size} />
      <Typography variant="h6" sx={{ fontWeight: "bold", color: { color } }}>
        PrepVerse
      </Typography>
    </Link>
  );
};

export default Logo;
