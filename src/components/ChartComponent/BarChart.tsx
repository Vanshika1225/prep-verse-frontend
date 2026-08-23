import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { CHART_COLORS } from "./ChartColors";
import ChartContainer from "./ChartContainer";

interface BarChartData {
  name: string;
  value: number;
}

interface BarChartProps {
  data: BarChartData[];
  title?: string;
  height?: number;
  color?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
}

const BarChart = ({
  data,
  title,
  height = 280,
  color = CHART_COLORS[0],
  showGrid = false,
  showTooltip = true,
}: BarChartProps) => {
  return (
    <ChartContainer {...(title === undefined ? {} : { title })} height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}

          <XAxis dataKey="name" />

          <YAxis />

          {showTooltip && <Tooltip />}

          <Bar dataKey="value" fill={color} radius={[6, 6, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default BarChart;
