import {
  Legend,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  Cell,
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
}

const PieChart = ({
  data,
  title,
  height = 280,
  colors = CHART_COLORS,
  showLegend = true,
  showTooltip = true,
}: PieChartProps) => {
  return (
    <ChartContainer {...(title === undefined ? {} : { title })} height={height}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          {showTooltip && <Tooltip />}

          {showLegend && (
            <Legend
              verticalAlign="middle"
              align="right"
              layout="vertical"
              formatter={(value) => (
                <span
                  style={{ color: "#000", fontSize: "10px", fontWeight: 500 }}
                >
                  {value}
                </span>
              )}
            />
          )}
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="40%"
            cy="50%"
            innerRadius="35%"
            outerRadius="85%"
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
    </ChartContainer>
  );
};

export default PieChart;
