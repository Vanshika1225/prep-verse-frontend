import { Box, Typography } from "@mui/material";
import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { CHART_COLORS, getChartColor } from "./ChartColors";
import ChartContainer from "./ChartContainer";

interface PieChartData {
  name: string;
  value: number;
}

interface PieChartProps {
  data: PieChartData[];
  title?: string;
  height?: number;
  colors?: string[];
  showLegend?: boolean;
  showTooltip?: boolean;
  legendLimit?: number;
  onViewMore?: () => void;
}

const PieChart = ({
  data,
  title,
  height = 280,
  colors = CHART_COLORS,
  showLegend = true,
  showTooltip = true,
  legendLimit = 10,
  onViewMore,
}: PieChartProps) => {
  const visibleLegendData = data.slice(0, legendLimit);
  const hasMore = data.length > legendLimit;

  return (
    <ChartContainer {...(title === undefined ? {} : { title })} height={height}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",
            flex: 1,
            minHeight: 0,
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              {showTooltip && <Tooltip />}

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="35%"
                outerRadius="75%"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`pie-${index}`}
                    fill={getChartColor(index, colors) ?? "#8884d8"}
                  />
                ))}
              </Pie>
            </RechartsPieChart>
          </ResponsiveContainer>
        </Box>

        {showLegend && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 0.5,
              ml: 3,
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(100px, 150px))",
                columnGap: 2,
                rowGap: 0.6,
                justifyContent: "center",
              }}
            >
              {visibleLegendData.map((item, index) => (
                <Box
                  key={item.name}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    gap: 0.6,
                    minWidth: 0,
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "2px",
                      flexShrink: 0,
                      bgcolor: getChartColor(index, colors) ?? "#8884d8",
                    }}
                  />

                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: "10px",
                      fontWeight: 500,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.name}
                  </Typography>
                </Box>
              ))}
            </Box>

            {hasMore && onViewMore && (
              <Typography
                variant="caption"
                onClick={onViewMore}
                sx={{
                  mt: 0.8,
                  color: "primary.main",
                  fontWeight: 600,
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                View more
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </ChartContainer>
  );
};

export default PieChart;
