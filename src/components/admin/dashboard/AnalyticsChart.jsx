import { Card, CardContent, Typography } from "@mui/material";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AnalyticsChart({ title, data, dataKey }) {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' fontWeight={600} mb={2}>
          {title}
        </Typography>

        {!data?.length ? (
          <Typography color='text.secondary'>No data available.</Typography>
        ) : (
          <ResponsiveContainer width='100%' height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray='3 3' />

              <XAxis dataKey='date' />

              <YAxis />

              <Tooltip />

              <Line type='monotone' dataKey={dataKey} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

export default AnalyticsChart;
