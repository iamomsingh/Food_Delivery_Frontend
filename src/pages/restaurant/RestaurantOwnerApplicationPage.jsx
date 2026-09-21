import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { applyRestaurantOwner } from "../../features/restaurant/restaurantOwnerApplicationSlice";

function RestaurantOwnerApplicationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { application, applicationSubmitting, applicationSubmitError } =
    useSelector((state) => state.restaurantOwnerApplication);

  const [formData, setFormData] = useState({
    reason: "",
    experience: "",
    additionalInfo: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await dispatch(
      applyRestaurantOwner({
        reason: formData.reason.trim(),
        experience: formData.experience.trim() || null,
        additionalInfo: formData.additionalInfo.trim() || null,
      }),
    );

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/restaurant-owner/application");
    }
  };

  /*
   * If an application already exists and is not rejected,
   * don't allow submitting another application.
   */
  if (application && application.status !== "REJECTED") {
    return (
      <Box sx={{ maxWidth: 650, mx: "auto" }}>
        <Card>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Stack spacing={2.5}>
              <Typography variant='h5' fontWeight={700}>
                Restaurant Owner Application
              </Typography>

              <Alert severity='info'>
                You already have a {application.status.toLowerCase()}{" "}
                application.
              </Alert>

              <Button
                variant='contained'
                onClick={() => navigate("/restaurant-owner/application")}
              >
                View Application
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 650, mx: "auto" }}>
      <Card>
        <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant='h5' fontWeight={700}>
                Become a Restaurant Owner
              </Typography>

              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ mt: 0.75 }}
              >
                Submit your application to become a restaurant owner on our
                platform.
              </Typography>
            </Box>

            {applicationSubmitError && (
              <Alert severity='error'>{applicationSubmitError}</Alert>
            )}

            <Box component='form' onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <TextField
                  name='reason'
                  label='Why do you want to become a restaurant owner?'
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  fullWidth
                  multiline
                  minRows={4}
                  inputProps={{
                    maxLength: 1000,
                  }}
                  helperText={`${formData.reason.length}/1000`}
                />

                <TextField
                  name='experience'
                  label='Restaurant / Business Experience'
                  value={formData.experience}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  minRows={4}
                  inputProps={{
                    maxLength: 2000,
                  }}
                  helperText={`${formData.experience.length}/2000`}
                />

                <TextField
                  name='additionalInfo'
                  label='Additional Information'
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  minRows={4}
                  inputProps={{
                    maxLength: 2000,
                  }}
                  helperText={`${formData.additionalInfo.length}/2000`}
                />

                <Button
                  type='submit'
                  variant='contained'
                  size='large'
                  disabled={applicationSubmitting || !formData.reason.trim()}
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

export default RestaurantOwnerApplicationPage;
