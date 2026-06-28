import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

interface LogoProps {
  size?: number;
  showText?: boolean;
}

const Logo = ({ size = 45}: LogoProps) => {
  return (
    <Link
      to="/"
      style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
    >
      <img src={logo} alt="PrepVerse" width={size} height={size} />
      <Typography variant="h6" color="primary.main" sx={{ fontWeight: "bold" }}>
        PrepVerse
      </Typography>
    </Link>
  );
};

export default Logo;
