import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  AccountCircle,
  ArrowForwardIos,
  Edit,
  Home,
  Lock,
  Logout,
  ShoppingBag,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import {
  fetchProfile,
  updateProfile,
  changePassword,
  logout,
} from "../../features/auth/authSlice";

const ROLE_LABELS = {
  CUSTOMER: "Customer",
  RESTAURANT_OWNER: "Restaurant Owner",
  DELIVERY_PARTNER: "Delivery Partner",
  ADMIN: "Admin",
};

function getInitials(user) {
  if (!user) return "";

  const firstInitial = user.firstName?.charAt(0) || "";
  const lastInitial = user.lastName?.charAt(0) || "";

  return `${firstInitial}${lastInitial}`.toUpperCase();
}

function formatDate(date) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    user,
    profileLoading,
    profileError,
    profileUpdating,
    profileUpdateError,
    passwordChanging,
    passwordChangeError,
    passwordChangeSuccess,
  } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);

  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordValidationError, setPasswordValidationError] = useState("");

  /*
   * Fetch profile when page opens.
   */
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  /*
   * Fill form whenever user data changes.
   */
  useEffect(() => {
    if (!user) return;

    setProfileForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phone: user.phone || "",
    });
  }, [user]);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfileForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleProfileCancel = () => {
    setProfileForm({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: user?.phone || "",
    });

    setIsEditing(false);
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();

    const result = await dispatch(updateProfile(profileForm));

    if (updateProfile.fulfilled.match(result)) {
      setIsEditing(false);
    }
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswordForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setPasswordValidationError("");
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();

    setPasswordValidationError("");

    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      setPasswordValidationError("Please fill in all password fields.");

      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordValidationError("New password must be at least 8 characters.");

      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordValidationError(
        "New password and confirm password do not match.",
      );

      return;
    }

    const result = await dispatch(
      changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      }),
    );

    if (changePassword.fulfilled.match(result)) {
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  const handleLogout = async () => {
    await dispatch(logout());

    navigate("/login");
  };

  if (profileLoading && !user) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (profileError && !user) {
    return (
      <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
        <Alert severity='error'>{profileError}</Alert>
      </Box>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Box
      sx={{
        maxWidth: 1100,
        mx: "auto",
        px: { xs: 2, md: 3 },
        py: { xs: 3, md: 5 },
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant='h4' fontWeight={700}>
          My Profile
        </Typography>

        <Typography variant='body1' color='textSecondary' sx={{ mt: 0.5 }}>
          Manage your personal information, security and account.
        </Typography>
      </Box>

      {/* ------------------------------------------------ */}
      {/* Profile Header                                   */}
      {/* ------------------------------------------------ */}

      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            sx={{ alignItems: { xs: "flex-start", sm: "center" } }}
          >
            <Avatar
              sx={{
                width: 88,
                height: 88,
                fontSize: 32,
                fontWeight: 700,
              }}
            >
              {getInitials(user)}
            </Avatar>

            <Box sx={{ flex: 1 }}>
              <Typography variant='h5' fontWeight={700}>
                {user.firstName} {user.lastName}
              </Typography>

              <Typography color='textSecondary' sx={{ mt: 0.5 }}>
                {user.email}
              </Typography>

              <Stack
                direction='row'
                spacing={1}
                flexWrap='wrap'
                sx={{ mt: 1.5, gap: 1 }}
              >
                {user.roles?.map((role) => (
                  <Chip
                    key={role}
                    label={ROLE_LABELS[role] || role}
                    size='small'
                  />
                ))}

                <Chip label={user.status} size='small' variant='outlined' />
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* ------------------------------------------------ */}
      {/* Personal Information                             */}
      {/* ------------------------------------------------ */}

      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
          <Stack
            direction='row'
            sx={{
              mb: 3,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant='h6' fontWeight={700}>
                Personal Information
              </Typography>

              <Typography variant='body2' color='textSecondary'>
                Update your basic account information.
              </Typography>
            </Box>

            {!isEditing && (
              <Button
                variant='outlined'
                startIcon={<Edit />}
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            )}
          </Stack>

          {profileUpdateError && (
            <Alert severity='error' sx={{ mb: 3 }}>
              {profileUpdateError}
            </Alert>
          )}

          {isEditing ? (
            <Box component='form' onSubmit={handleProfileSubmit}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label='First Name'
                    name='firstName'
                    value={profileForm.firstName}
                    onChange={handleProfileChange}
                    required
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label='Last Name'
                    name='lastName'
                    value={profileForm.lastName}
                    onChange={handleProfileChange}
                    required
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label='Email'
                    value={user.email || ""}
                    disabled
                    helperText='Email address cannot be changed.'
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label='Phone Number'
                    name='phone'
                    value={profileForm.phone}
                    onChange={handleProfileChange}
                    inputProps={{
                      maxLength: 10,
                    }}
                  />
                </Grid>
              </Grid>

              <Stack
                direction='row'
                spacing={1.5}
                sx={{ mt: 3, justifyContent: "flex-end" }}
              >
                <Button
                  variant='outlined'
                  onClick={handleProfileCancel}
                  disabled={profileUpdating}
                >
                  Cancel
                </Button>

                <Button
                  type='submit'
                  variant='contained'
                  disabled={profileUpdating}
                >
                  {profileUpdating ? (
                    <CircularProgress size={22} />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </Stack>
            </Box>
          ) : (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant='body2' color='textSecondary'>
                  First Name
                </Typography>

                <Typography fontWeight={500} sx={{ mt: 0.5 }}>
                  {user.firstName || "-"}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant='body2' color='textSecondary'>
                  Last Name
                </Typography>

                <Typography fontWeight={500} sx={{ mt: 0.5 }}>
                  {user.lastName || "-"}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant='body2' color='textSecondary'>
                  Email
                </Typography>

                <Typography fontWeight={500} sx={{ mt: 0.5 }}>
                  {user.email || "-"}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant='body2' color='textSecondary'>
                  Phone
                </Typography>

                <Typography fontWeight={500} sx={{ mt: 0.5 }}>
                  {user.phone || "-"}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Typography variant='body2' color='textSecondary'>
                  Member Since
                </Typography>

                <Typography fontWeight={500} sx={{ mt: 0.5 }}>
                  {formatDate(user.createdAt)}
                </Typography>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>

      {/* ------------------------------------------------ */}
      {/* Security                                        */}
      {/* ------------------------------------------------ */}

      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant='h6' fontWeight={700}>
              Security
            </Typography>

            <Typography variant='body2' color='textSecondary' sx={{ mt: 0.5 }}>
              Manage your password and account security.
            </Typography>
          </Box>

          {passwordChangeSuccess && (
            <Alert severity='success' sx={{ mb: 3 }}>
              Password changed successfully. Please log in again.
            </Alert>
          )}

          {(passwordChangeError || passwordValidationError) && (
            <Alert severity='error' sx={{ mb: 3 }}>
              {passwordValidationError || passwordChangeError}
            </Alert>
          )}

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{ mb: 3, alignItems: { xs: "stretch", md: "center" } }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flex: 1,
              }}
            >
              <Avatar>
                <Lock />
              </Avatar>

              <Box>
                <Typography fontWeight={600}>Password</Typography>

                <Typography variant='body2' color='textSecondary'>
                  Keep your account secure with a strong password.
                </Typography>
              </Box>
            </Box>
          </Stack>

          <Divider sx={{ mb: 3 }} />

          <Box component='form' onSubmit={handleChangePassword}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label='Current Password'
                  name='currentPassword'
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={() =>
                            setShowCurrentPassword((previous) => !previous)
                          }
                          edge='end'
                        >
                          {showCurrentPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label='New Password'
                  name='newPassword'
                  type={showNewPassword ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  helperText='Minimum 8 characters'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={() =>
                            setShowNewPassword((previous) => !previous)
                          }
                          edge='end'
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label='Confirm New Password'
                  name='confirmPassword'
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword((previous) => !previous)
                          }
                          edge='end'
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Stack direction='row' justifyContent='flex-end' sx={{ mt: 3 }}>
              <Button
                type='submit'
                variant='contained'
                startIcon={<Lock />}
                disabled={passwordChanging}
              >
                {passwordChanging ? (
                  <CircularProgress size={22} />
                ) : (
                  "Change Password"
                )}
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      {/* ------------------------------------------------ */}
      {/* Account Shortcuts                               */}
      {/* ------------------------------------------------ */}

      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
          <Typography variant='h6' fontWeight={700}>
            Account
          </Typography>

          <Typography
            variant='body2'
            color='textSecondary'
            sx={{ mt: 0.5, mb: 3 }}
          >
            Quickly access your account-related sections.
          </Typography>

          <Stack divider={<Divider flexItem />}>
            <Button
              onClick={() => navigate("/addresses")}
              sx={{
                py: 2,
                px: 0,
                justifyContent: "space-between",
                textTransform: "none",
                color: "inherit",
              }}
            >
              <Stack direction='row' spacing={2} sx={{ alignItems: "center" }}>
                <Avatar variant='rounded'>
                  <Home />
                </Avatar>

                <Box sx={{ textAlign: "left" }}>
                  <Typography fontWeight={600}>My Addresses</Typography>

                  <Typography variant='body2' color='textSecondary'>
                    Manage your saved delivery addresses.
                  </Typography>
                </Box>
              </Stack>

              <ArrowForwardIos fontSize='small' />
            </Button>

            <Button
              onClick={() => navigate("/orders")}
              sx={{
                py: 2,
                px: 0,
                justifyContent: "space-between",
                textTransform: "none",
                color: "inherit",
              }}
            >
              <Stack direction='row' spacing={2} sx={{ alignItems: "center" }}>
                <Avatar variant='rounded'>
                  <ShoppingBag />
                </Avatar>

                <Box sx={{ textAlign: "left" }}>
                  <Typography fontWeight={600}>My Orders</Typography>

                  <Typography variant='body2' color='text.Secondary'>
                    View your food order history.
                  </Typography>
                </Box>
              </Stack>

              <ArrowForwardIos fontSize='small' />
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* ------------------------------------------------ */}
      {/* Logout                                          */}
      {/* ------------------------------------------------ */}

      <Card
        sx={{
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              alignItems: { xs: "stretch", sm: "center" },
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography fontWeight={600}>Sign out of your account</Typography>

              <Typography variant='body2' color='text.secondary'>
                You can sign in again at any time.
              </Typography>
            </Box>

            <Button
              variant='outlined'
              color='error'
              startIcon={<Logout />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ProfilePage;
