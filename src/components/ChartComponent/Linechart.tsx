import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { CHART_COLORS } from "./ChartColors";
import ChartContainer from "./ChartContainer";

interface LineChartData {
  name: string;
  value: number;
}

interface LineChartProps {
  data: LineChartData[];
  title?: string;
  height?: number;
  color?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
}

const LineChart = ({
  data,
  title,
  height = 280,
  color = CHART_COLORS[0],
  showGrid = false,
  showTooltip = true,
}: LineChartProps) => {
  const lineColor = color ?? CHART_COLORS[0] ?? "#000000";

  return (
    <ChartContainer {...(title === undefined ? {} : { title })} height={height}>
      {" "}
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}

          <XAxis dataKey="name" />

          <YAxis />

          {showTooltip && <Tooltip />}

          <Line
            type="monotone"
            dataKey="value"
            stroke={lineColor}
            strokeWidth={3}
            dot={{
              fill: lineColor,
              r: 4,
            }}
            activeDot={{
              r: 6,
            }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default LineChart;
