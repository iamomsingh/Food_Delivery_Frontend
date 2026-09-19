import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

function OrderCustomerCard({ customer }) {
  if (!customer) {
    return null;
  }

  const fullName =
    `${customer.firstName ?? ""} ${customer.lastName ?? ""}`.trim();

  const initials =
    `${customer.firstName?.[0] ?? ""}${customer.lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: 1,
        borderColor: "divider",
        boxShadow: "none",
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
        <Stack spacing={2}>
          <Stack direction='row' spacing={1} sx={{ alignItems: "center" }}>
            <PersonOutlineOutlinedIcon fontSize='small' color='action' />

            <Typography variant='h6' fontWeight={600}>
              Customer
            </Typography>
          </Stack>

          <Divider />

          <Stack direction='row' spacing={2} sx={{ alignItems: "center" }}>
            <Avatar
              src={customer.profileImageUrl ?? undefined}
              sx={{
                width: 52,
                height: 52,
              }}
            >
              {initials}
            </Avatar>

            <Stack spacing={0.5}>
              <Typography variant='body1' fontWeight={700}>
                {fullName || "Unknown Customer"}
              </Typography>

              <Typography variant='body2' color='textSecondary'>
                Customer ID: {customer.id}
              </Typography>
            </Stack>
          </Stack>

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={4}
          >
            <Stack
              direction='row'
              spacing={1}
              sx={{ alignItems: "center" }}
              flex={1}
            >
              <EmailOutlinedIcon fontSize='small' color='action' />

              <Typography variant='body2'>{customer.email || "—"}</Typography>
            </Stack>

            <Stack
              direction='row'
              spacing={1}
              sx={{ alignItems: "center" }}
              flex={1}
            >
              <PhoneOutlinedIcon fontSize='small' color='action' />

              <Typography variant='body2'>{customer.phone || "—"}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default OrderCustomerCard;
