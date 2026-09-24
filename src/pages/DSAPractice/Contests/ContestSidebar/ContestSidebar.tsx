import podiumImage from "@assets/troffy-logo.png";
import {
  ArrowDownwardRounded,
  ArrowUpwardRounded,
  EmojiEventsOutlined,
  InsightsRounded,
  KeyboardArrowDownRounded,
  LanguageRounded,
  LightbulbOutlined,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { parseYMD } from "../ContestsUtils";
import {
  card,
  chartBoxStyle,
  contestWrapperStyle,
  deltaStyle,
  iconStyle,
  ratingCardStyle,
  statBoxWrapper,
} from "../style";
import { MONTHS, type RatingCardProps } from "../types";

import BarChart from "@/components/ChartComponent/BarChart";
import { useGetContestAnalyticsQuery } from "@/services/contestsApi";
import { formatDate, formatNumber } from "@/utils/DateUtilityFunctions";

const PeriodPill = () => {
  const theme = useTheme();

  return (
    <Box
      component="span"
      sx={{
        ...contestWrapperStyle,
        bgcolor: theme.palette.white.main,
        border: `1px solid ${theme.palette.border.main}`,
        color: theme.palette.appText.secondary,
      }}
    >
      This Month
      <KeyboardArrowDownRounded sx={{ fontSize: 15 }} />
    </Box>
  );
};

const CardHeader = ({ title }: { title: string }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        variant="p-bold"
        sx={{
          color: theme.palette.appText.main,
        }}
      >
        {title}
      </Typography>

      <PeriodPill />
    </Box>
  );
};

const RING_PROGRESS = 0.8;

const Donut = ({ value }: { value: number }) => {
  const theme = useTheme();

  const size = 111;
  const stroke = 11;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <Box sx={{ position: "relative", width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)", display: "block" }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#ece6ff"
          strokeWidth={stroke}
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={theme.palette.primary.main}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference * RING_PROGRESS} ${circumference}`}
        />
      </svg>

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          textAlign: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h5-bold"
            sx={{
              lineHeight: 1.1,
              color: theme.palette.appText.main,
            }}
          >
            {value}
          </Typography>

          <Typography
            variant="body1-medium"
            sx={{
              color: theme.palette.appText.muted,
              mt: "2px",
            }}
          >
            Contests
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const Stat = ({ label, value }: { label: string; value: string | number }) => {
  const theme = useTheme();

  return (
    <Box sx={statBoxWrapper}>
      <Typography
        variant="body1-medium"
        sx={{ color: theme.palette.appText.muted }}
      >
        {label}
      </Typography>

      <Typography
        variant="body1-bold"
        sx={{
          color: theme.palette.appText.main,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

const Delta = ({ value }: { value: number }) => {
  const theme = useTheme();
  const up = value >= 0;
  const Icon = up ? ArrowUpwardRounded : ArrowDownwardRounded;

  return (
    <Box
      component="span"
      sx={{
        ...deltaStyle,
        color: up ? theme.palette.success.main : theme.palette.error.main,
      }}
    >
      <Icon sx={{ fontSize: 13 }} />
      {formatNumber(Math.abs(value))}
    </Box>
  );
};

function RatingCard({
  icon,
  iconBg,
  label,
  value,
  footer,
  inline,
  fullWidth,
}: RatingCardProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...ratingCardStyle,
        border: `1px solid ${theme.palette.divider}`,
        gridColumn: fullWidth ? "1 / -1" : "auto",
        bgcolor: theme.palette.white.main,
      }}
    >
      <Box
        sx={{
          ...iconStyle,
          bgcolor: iconBg,
        }}
      >
        {icon}
      </Box>

      <Typography
        variant="body1-medium"
        sx={{ color: theme.palette.appText.secondary }}
      >
        {label}
      </Typography>

      <Box sx={{ gridColumn: 2, mt: "8px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            gap: "12px",
          }}
        >
          <Typography
            variant="h6-bold"
            sx={{
              lineHeight: "28px",
              color: theme.palette.appText.main,
            }}
          >
            {value}
          </Typography>

          {inline && footer}
        </Box>

        {!inline && footer && (
          <Box sx={{ mt: "6px", minHeight: 16 }}>{footer}</Box>
        )}
      </Box>
    </Box>
  );
}

const ContestSidebar = () => {
  const theme = useTheme();
  const { data } = useGetContestAnalyticsQuery();

  if (!data?.data) {
    return null;
  }

  const { performance, ratings, activity } = data.data;

  const Card = { ...card, p: "16px" };

  const activityChartData = activity.map((item) => {
    const { day, month } = parseYMD(item.date);

    return {
      name: `${day} ${MONTHS[month]}`,
      value: item.count,
    };
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box sx={{ ...Card, pb: "22px" }}>
        <CardHeader title="Contest Performance" />

        <Box sx={chartBoxStyle}>
          <Donut value={performance.participated} />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <Stat label="Participated" value={performance.participated} />
            <Stat label="Won" value={performance.won} />
            <Stat label="Top 10 Finishes" value={performance.top10Finishes} />
            <Stat
              label="Win Rate"
              value={`${Number(performance.winRate.toFixed(1))}%`}
            />
          </Box>
        </Box>
      </Box>

      <Box sx={Card}>
        <CardHeader title="Ratings Overview" />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "14px",
            mt: "16px",
          }}
        >
          <RatingCard
            icon={
              <InsightsRounded
                sx={{ fontSize: 18, color: theme.palette.primary.main }}
              />
            }
            iconBg={theme.palette.secondary.main100}
            label="Contest Rating"
            value={ratings.contestRating ?? "-"}
            footer={
              ratings.latestRatingChange !== null &&
              ratings.latestRatingChange !== undefined ? (
                <Delta value={ratings.latestRatingChange} />
              ) : undefined
            }
          />

          <RatingCard
            icon={
              <EmojiEventsOutlined
                sx={{ fontSize: 18, color: theme.palette.warning.main }}
              />
            }
            iconBg={theme.palette.secondary.main100}
            label="Highest Rating"
            value={ratings.highestRating ?? "-"}
            footer={
              ratings.highestRatingDate ? (
                <Typography
                  sx={{
                    fontSize: 11.5,
                    color: theme.palette.appText.muted,
                  }}
                >
                  {formatDate(ratings.highestRatingDate, false)}
                </Typography>
              ) : undefined
            }
          />

          <RatingCard
            fullWidth
            inline
            icon={
              <LanguageRounded
                sx={{ fontSize: 18, color: theme.palette.primary.light }}
              />
            }
            iconBg={theme.palette.secondary.main100}
            label="Global Rank"
            value={
              ratings.globalRank ? `#${formatNumber(ratings.globalRank)}` : "-"
            }
            footer={
              ratings.globalRankChange !== null &&
              ratings.globalRankChange !== undefined ? (
                <Delta value={ratings.globalRankChange} />
              ) : undefined
            }
          />
        </Box>
      </Box>

      <Box sx={{ ...Card, pb: "18px" }}>
        <CardHeader title="Contest Activity" />

        <Box sx={{ mt: "16px" }}>
          <BarChart
            data={activityChartData}
            height={220}
            color={theme.palette.primary.main}
            showGrid={false}
            showTooltip
          />
        </Box>
      </Box>

      {/* Tips */}
      <Box
        sx={{
          ...Card,
          position: "relative",
          overflow: "hidden",
          minHeight: 142,
          bgcolor: theme.palette.primary.main100,
          borderColor: theme.palette.primary.main100,
          display: "flex",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              mb: 1.5,
            }}
          >
            <LightbulbOutlined
              sx={{ fontSize: 20, color: theme.palette.primary.main }}
            />

            <Typography
              variant="body-bold"
              sx={{
                color: theme.palette.appText.main,
              }}
            >
              Tips
            </Typography>
          </Box>

          <Typography
            variant="body1-medium"
            sx={{
              maxWidth: 190,
              color: theme.palette.appText.muted,
            }}
          >
            Regularly participating in contests helps you improve speed,
            accuracy and climb the leaderboard.
          </Typography>
        </Box>

        <Box
          component="img"
          src={podiumImage}
          alt="Contest tips"
          sx={{
            width: 112,
            height: 96,
            objectFit: "contain",
          }}
        />
      </Box>
    </Box>
  );
};

export default ContestSidebar;
