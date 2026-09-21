import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  applyDeliveryPartner,
  fetchDeliveryApplication,
} from "../../features/delivery/deliverySlice";

const VEHICLE_TYPES = ["BIKE", "SCOOTER", "BICYCLE", "VAN", "CAR"];

function DeliveryPartnerApplicationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { application, applicationSubmitting, applicationError } = useSelector(
    (state) => state.delivery,
  );

  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await dispatch(
      applyDeliveryPartner({
        vehicleType,
        vehicleNumber: vehicleNumber.trim(),
      }),
    );

    if (result.meta.requestStatus === "fulfilled") {
      await dispatch(fetchDeliveryApplication());
      navigate("/delivery/application");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
      <Card>
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant='h5' fontWeight={700}>
                Become a Delivery Partner
              </Typography>

              <Typography
                variant='body2'
                color='textSecondary'
                sx={{ mt: 0.75 }}
              >
                Submit your vehicle details to apply as a delivery partner job
                role.
              </Typography>
            </Box>

            {applicationError && (
              <Alert severity='error'>{applicationError}</Alert>
            )}

            <Box component='form' onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <FormControl fullWidth required>
                  <InputLabel>Vehicle Type</InputLabel>

                  <Select
                    value={vehicleType}
                    label='Vehicle Type'
                    onChange={(event) => setVehicleType(event.target.value)}
                  >
                    {VEHICLE_TYPES.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  required
                  label='Vehicle Number'
                  value={vehicleNumber}
                  onChange={(event) => setVehicleNumber(event.target.value)}
                  inputProps={{ maxLength: 30 }}
                />

                <Button
                  type='submit'
                  variant='contained'
                  size='large'
                  disabled={
                    applicationSubmitting ||
                    !vehicleType ||
                    !vehicleNumber.trim()
                  }
                >
                  {applicationSubmitting
                    ? "Submitting..."
                    : "Submit Application"}
                </Button>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DeliveryPartnerApplicationPage;
