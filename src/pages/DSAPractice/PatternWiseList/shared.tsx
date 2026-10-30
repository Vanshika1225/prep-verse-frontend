import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

export const LinearBar = ({
  percent,
  color,
}: {
  percent: number;
  color: string;
}) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    <Box
      sx={{
        flex: 1,
        height: 6,
        borderRadius: 4,
        bgcolor: `${color}1F`,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: `${percent}%`,
          height: "100%",
          bgcolor: color,
          borderRadius: 4,
        }}
      />
    </Box>
    <Typography
      variant="caption"
      sx={{ fontWeight: 600, minWidth: 30, textAlign: "right" }}
    >
      {percent}%
    </Typography>
  </Box>
);

export const IconBadge = ({
  icon: Icon,
  color,
  bg,
  size = 36,
}: {
  icon: React.ElementType;
  color: string;
  bg: string;
  size?: number;
}) => (
  <Box
    sx={{
      width: size,
      height: size,
      minWidth: size,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "9px",
      bgcolor: bg,
      color,
    }}
  >
    <Icon sx={{ fontSize: size * 0.5 }} />
  </Box>
);

export const CircularGauge = ({
  value,
  size = 140,
  thickness = 10,
  color,
  track = "#ECECF3",
  sweep = 270,
  children,
}: {
  value: number;
  size?: number;
  thickness?: number;
  color: string;
  track?: string;
  sweep?: number;
  children?: ReactNode;
}) => {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const sweepLen = (sweep / 360) * c;
  const progressLen = (Math.min(Math.max(value, 0), 100) / 100) * sweepLen;
  const rotate = 180 - sweep / 2 + 90;

  return (
    <Box sx={{ position: "relative", width: size, height: size }}>
      <svg
        width={size}
        height={size}
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={track}
          strokeWidth={thickness}
          strokeDasharray={`${sweepLen} ${c}`}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeDasharray={`${progressLen} ${c}`}
        />
      </svg>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
