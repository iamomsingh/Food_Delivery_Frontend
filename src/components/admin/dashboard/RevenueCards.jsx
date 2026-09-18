import {
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";

const revenueCards = [
  {
    key: "todayRevenue",
    title: "Today",
    icon: <TodayOutlinedIcon />,
  },
  {
    key: "thisMonthRevenue",
    title: "This Month",
    icon: <CalendarMonthOutlinedIcon />,
  },
  {
    key: "totalRevenue",
    title: "Total Revenue",
    icon: <AccountBalanceWalletOutlinedIcon />,
  },
];

function formatCurrency(value) {
  return `₹${Number(value ?? 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function RevenueCards({ revenue, loading = false }) {
  return (
    <Grid container spacing={2}>
      {revenueCards.map((card) => (
        <Grid
          key={card.key}
          size={{
            xs: 12,
            sm: 6,
            lg: 4,
          }}
        >
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,

              transition: "box-shadow 0.2s, transform 0.2s",

              "&:hover": {
                boxShadow: 4,
                transform: "translateY(-2px)",
              },
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack spacing={2}>
                {/* Header */}
                <Stack
                  direction='row'
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    fontWeight={600}
                  >
                    {card.title}
                  </Typography>

                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,

                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",

                      bgcolor: "action.hover",

                      "& svg": {
                        fontSize: 22,
                        color: "text.secondary",
                      },
                    }}
                  >
                    {card.icon}
                  </Box>
                </Stack>

                {/* Revenue value */}
                {loading ? (
                  <Skeleton variant='text' width={150} height={40} />
                ) : (
                  <Typography variant='h5' fontWeight={700}>
                    {formatCurrency(revenue?.[card.key])}
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default RevenueCards;
