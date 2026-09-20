import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
}

function formatValue(value, currency) {
  if (currency) {
    return `₹${Number(value ?? 0).toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    })}`;
  }

  return Number(value ?? 0).toLocaleString("en-IN");
}

function AnalyticsLineChart({
  title,
  subtitle,
  data = [],
  dataKey,
  valueLabel,
  currency = false,
  loading = false,
}) {
  const width = 900;
  const height = 300;

  const padding = {
    top: 25,
    right: 30,
    bottom: 55,
    left: 55,
  };

  const chartWidth = width - padding.left - padding.right;

  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(
    ...data.map((item) => Number(item[dataKey] ?? 0)),
    1,
  );

  const points = data.map((item, index) => {
    const x =
      data.length === 1
        ? padding.left + chartWidth / 2
        : padding.left + (index / (data.length - 1)) * chartWidth;

    const value = Number(item[dataKey] ?? 0);

    const y = padding.top + chartHeight - (value / maxValue) * chartHeight;

    return {
      x,
      y,
      value,
      date: item.date,
    };
  });

  const polylinePoints = points
    .map((point) => `${point.x},${point.y}`)
    .join(" ");

  const gridLines = [0, 0.25, 0.5, 0.75, 1];

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: 1,
        borderColor: "divider",
        boxShadow: "none",
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack spacing={2}>
          <Box>
            <Typography variant='h6' fontWeight={600}>
              {title}
            </Typography>

            <Typography variant='body2' color='textSecondary' sx={{ mt: 0.5 }}>
              {subtitle}
            </Typography>
          </Box>

          {loading ? (
            <Box
              sx={{
                height: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography color='text.secondary'>
                Loading analytics...
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                overflowX: "auto",
              }}
            >
              <svg
                viewBox={`0 0 ${width} ${height}`}
                width='100%'
                height='300'
                preserveAspectRatio='none'
              >
                {/* Horizontal grid */}
                {gridLines.map((line) => {
                  const y = padding.top + chartHeight - line * chartHeight;

                  const value = maxValue * line;

                  return (
                    <g key={line}>
                      <line
                        x1={padding.left}
                        y1={y}
                        x2={width - padding.right}
                        y2={y}
                        stroke='currentColor'
                        strokeOpacity='0.1'
                      />

                      <text
                        x={padding.left - 10}
                        y={y + 4}
                        textAnchor='end'
                        fontSize='11'
                        fill='currentColor'
                        opacity='0.6'
                      >
                        {formatValue(value, currency)}
                      </text>
                    </g>
                  );
                })}

                {/* Line */}
                {points.length > 1 && (
                  <polyline
                    points={polylinePoints}
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='3'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                )}

                {/* Points */}
                {points.map((point) => (
                  <g key={point.date}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r='5'
                      fill='currentColor'
                    />

                    <title>
                      {formatDate(point.date)} —{" "}
                      {formatValue(point.value, currency)}
                    </title>

                    <text
                      x={point.x}
                      y={height - 18}
                      textAnchor='middle'
                      fontSize='11'
                      fill='currentColor'
                      opacity='0.65'
                    >
                      {formatDate(point.date)}
                    </text>
                  </g>
                ))}
              </svg>
            </Box>
          )}

          <Typography variant='caption' color='textSecondary'>
            {valueLabel}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default AnalyticsLineChart;
