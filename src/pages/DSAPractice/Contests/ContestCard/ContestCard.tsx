import { AccessTimeOutlined, CalendarMonthOutlined } from "@mui/icons-material";
import { Box, Button, Typography, useTheme } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

import PlatformLogo from "../PlatformLogo";
import {
  badgeStyle,
  badgeStylingNew,
  cardNameWrapper,
  contestCardInnerBox,
  contestCardOuterBox,
  livebUtton,
} from "../style";
import type { Contest } from "../types";

import {
  formatDate,
  formatDuration,
  formatTime,
} from "@/utils/DateUtilityFunctions";

interface Props {
  contest: Contest;
  live?: boolean;
}

const COLUMNS = "3fr 1.2fr 1.2fr 1.3fr 0.2fr";

const Column = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  const theme = useTheme();

  return (
    <Box>
      <Typography
        variant="body1-medium"
        sx={{
          color: theme.palette.appText.label,
        }}
      >
        {label}
      </Typography>

      <Box
        sx={{
          mt: "8px",
          fontSize: 13,
          fontWeight: 600,
          lineHeight: "20px",
          color: theme.palette.appText.main,
          minHeight: 22,
          display: "flex",
          alignItems: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

const MetaLine = ({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "7px",
        height: 20,
        color: theme.palette.appText.muted,
        "& svg": { fontSize: 14 },
      }}
    >
      {icon}
      <Typography variant="body1-medium" sx={{ color: "inherit" }}>
        {children}
      </Typography>
    </Box>
  );
};

const ContestCard = ({ contest, live }: Props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...contestCardOuterBox,
        gridTemplateColumns: { xs: "1fr 1fr", md: COLUMNS },
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box sx={contestCardInnerBox}>
        <PlatformLogo platform={contest.platform} size={48} />

        <Box sx={{ minWidth: 0 }}>
          <Box sx={cardNameWrapper}>
            <Typography
              variant="body-bold"
              sx={{
                color: theme.palette.appText.main,
              }}
            >
              {contest.name}
            </Typography>

            {contest.badge && (
              <Box
                component="span"
                sx={{
                  ...(
                    badgeStyle as unknown as (
                      theme: Theme,
                      badge: string,
                    ) => Record<string, string | number>
                  )(theme, contest.badge),
                  ...badgeStylingNew,
                }}
              >
                {contest.badge}
              </Box>
            )}

            {live && (
              <Box component="span" sx={livebUtton}>
                LIVE
              </Box>
            )}
          </Box>

          <MetaLine icon={<CalendarMonthOutlined />}>
            {formatDate(contest.startTime)}
          </MetaLine>

          <MetaLine icon={<AccessTimeOutlined />}>
            {formatTime(contest.startTime)}
          </MetaLine>
        </Box>
      </Box>

      <Column label="Start Time">{formatTime(contest.startTime)}</Column>
      <Column label="End Time">{formatTime(contest.endTime)}</Column>
      <Column label="Duration">{formatDuration(contest.duration)}</Column>
      <Button
        variant="contained"
        disableElevation
        href={contest.registrationUrl ?? contest.url}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          width: 74,
          height: 34,
          minWidth: 0,
          p: 0,
          justifySelf: { xs: "start", md: "end" },
          bgcolor: theme.palette.primary.main,
          borderRadius: "6px",
          fontSize: 12.5,
          fontWeight: 600,
          textTransform: "none",
          "&:hover": { bgcolor: theme.palette.primary.dark },
        }}
      >
        {live ? "Enter" : "Register"}
      </Button>
    </Box>
  );
};

export default ContestCard;
