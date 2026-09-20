import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

function DeliveryPersonalInfoCard({ profile }) {
  const user = profile?.user;

  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  return (
    <Card
      sx={{
        height: "100%",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Typography variant='h6' fontWeight={700}>
          Personal Information
        </Typography>

        <Typography
          variant='body2'
          color='textSecondary'
          sx={{ mt: 0.5, mb: 2.5 }}
        >
          Your account information.
        </Typography>

        <Stack spacing={2}>
          <Stack direction='row' spacing={1.5}>
            <PersonOutlinedIcon color='action' />

            <Stack spacing={0.25}>
              <Typography variant='caption' color='textSecondary'>
                Name
              </Typography>

              <Typography variant='body1' fontWeight={600}>
                {fullName || "Not available"}
              </Typography>
            </Stack>
          </Stack>

          <Divider />

          <Stack direction='row' spacing={1.5}>
            <EmailOutlinedIcon color='action' />

            <Stack spacing={0.25}>
              <Typography variant='caption' color='textSecondary'>
                Email
              </Typography>

              <Typography
                variant='body1'
                fontWeight={600}
                sx={{ wordBreak: "break-word" }}
              >
                {user?.email || "Not available"}
              </Typography>
            </Stack>
          </Stack>

          <Divider />

          <Stack direction='row' spacing={1.5}>
            <PhoneOutlinedIcon color='action' />

            <Stack spacing={0.25}>
              <Typography variant='caption' color='textSecondary'>
                Phone
              </Typography>

              <Typography variant='body1' fontWeight={600}>
                {user?.phone || "Not provided"}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default DeliveryPersonalInfoCard;
