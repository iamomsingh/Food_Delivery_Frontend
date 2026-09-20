import {
  Card,
  CardContent,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";

function formatCurrency(value) {
  return `₹${Number(value ?? 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

const cards = [
  {
    key: "orders",
    title: "Orders",
    icon: <ShoppingBagOutlinedIcon />,
  },
  {
    key: "revenue",
    title: "Revenue",
    icon: <PaymentsOutlinedIcon />,
  },
  {
    key: "users",
    title: "New Users",
    icon: <PersonAddOutlinedIcon />,
  },
];

function AnalyticsSummaryCards({ orders, revenue, users, loading = false }) {
  const values = {
    orders,
    revenue,
    users,
  };

  return (
    <Grid container spacing={2}>
      {cards.map((card) => (
        <Grid
          key={card.key}
          size={{
            xs: 12,
            sm: 4,
          }}
        >
          <Card
            sx={{
              height: "100%",
              borderRadius: 3,
              border: 1,
              borderColor: "divider",
              boxShadow: "none",
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack spacing={2}>
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

                  <Stack
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "action.hover",
                    }}
                  >
                    {card.icon}
                  </Stack>
                </Stack>

                {loading ? (
                  <Skeleton variant='text' width={100} height={42} />
                ) : (
                  <Typography variant='h4' fontWeight={700}>
                    {card.key === "revenue"
                      ? formatCurrency(values[card.key])
                      : (values[card.key] ?? 0).toLocaleString("en-IN")}
                  </Typography>
                )}

                <Typography variant='caption' color='textSecondary'>
                  Last 7 days
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default AnalyticsSummaryCards;
