import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Stack,
} from "@mui/material";

import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";

import { fetchRestaurantOwnerApplications } from "../../features/admin/adminRestaurantOwnerSlice";

function getStatusColor(status) {
  switch (status) {
    case "PENDING":
      return "warning";
    case "APPROVED":
      return "success";
    case "REJECTED":
      return "error";
    default:
      return "default";
  }
}

function RestaurantOwnerApplicationsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { applications, loading, error } = useSelector(
    (state) => state.adminRestaurantOwner,
  );

  useEffect(() => {
    dispatch(fetchRestaurantOwnerApplications());
  }, [dispatch]);

  if (loading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='300px'
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Stack spacing={3}>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: {
              xs: "stretch",
              sm: "center",
            },
          }}
        >
          <Box>
            <Typography variant='h5' fontWeight={600}>
              Restaurant Owner Applications
            </Typography>

            <Typography variant='body2' color='textSecondary' mt={0.5}>
              Review users who want to become restaurant owners.
            </Typography>
          </Box>

          <Button
            variant='outlined'
            startIcon={<RefreshOutlinedIcon />}
            onClick={() => dispatch(fetchRestaurantOwnerApplications())}
          >
            Refresh
          </Button>
        </Stack>

        {error && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Applicant</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Submitted</TableCell>
                <TableCell align='right'>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {applications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align='center'>
                    No restaurant owner applications found.
                  </TableCell>
                </TableRow>
              ) : (
                applications.map((application) => (
                  <TableRow key={application.id} hover>
                    <TableCell>
                      {`${application.user?.firstName} ${application.user?.lastName}` ||
                        "—"}
                    </TableCell>

                    <TableCell>{application.user?.email || "—"}</TableCell>

                    <TableCell>
                      <Typography
                        variant='body2'
                        sx={{
                          maxWidth: 300,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {application.reason}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={application.status}
                        color={getStatusColor(application.status)}
                        size='small'
                      />
                    </TableCell>

                    <TableCell>
                      {new Date(application.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell align='right'>
                      <Button
                        size='small'
                        variant='outlined'
                        onClick={() =>
                          navigate(`/admin/restaurant-owners/${application.id}`)
                        }
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
}

export default RestaurantOwnerApplicationsPage;
