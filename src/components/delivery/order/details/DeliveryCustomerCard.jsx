import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";

function DeliveryCustomerCard({ customer }) {
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack spacing={2}>
          <Stack direction='row' spacing={1.5} sx={{ alignItems: "center" }}>
            <PersonOutlineOutlinedIcon color='primary' />

            <Typography variant='h6' fontWeight={700}>
              Customer
            </Typography>
          </Stack>

          <Divider />

          <Stack spacing={1}>
            <Typography variant='body1' fontWeight={600}>
              {customer?.name}
            </Typography>

            <Stack direction='row' spacing={1} sx={{ alignItems: "center" }}>
              <PhoneOutlinedIcon fontSize='small' color='action' />

              <Typography variant='body2' color='textSecondary'>
                {customer?.phone || "Phone not available"}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default DeliveryCustomerCard;
