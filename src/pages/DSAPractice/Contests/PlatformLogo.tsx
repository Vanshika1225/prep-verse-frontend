import { Box, useTheme } from "@mui/material";

import { logoImageStyle } from "./style";

import codechefLogo from "@/assets/codechef-contest-logo.png";
import codeforcesLogo from "@/assets/codeforces-contest-logo.png";
import leetcodeLogo from "@/assets/leetcode-contest-logo.png";

interface Props {
  platform: string;
  size?: number;
}

const LOGOS: Record<string, string> = {
  LeetCode: leetcodeLogo,
  Codeforces: codeforcesLogo,
  CodeChef: codechefLogo,
};

const PlatformLogo = ({ platform, size = 48 }: Props) => {
  const theme = useTheme();
  const logo = LOGOS[platform];

  if (!logo) {
    return (
      <Box
        sx={{
          width: size,
          height: size,
          borderRadius: size < 36 ? "6px" : "12px",
          bgcolor: theme.palette.white.main300,
          color: theme.palette.appText.secondary,
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
          fontWeight: 700,
          fontSize: size * 0.5,
        }}
      >
        {platform.charAt(0).toUpperCase()}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: size < 36 ? "6px" : "12px",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <Box
        component="img"
        src={logo}
        alt={`${platform} logo`}
        sx={logoImageStyle}
      />
    </Box>
  );
};

export default PlatformLogo;
