import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { Box, Button, TextField, Typography } from "@mui/material";
import { login } from "../../features/auth/authSlice";

function LoginPage() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loading, error } = useSelector((state) => state.auth);

  // Handle change
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const result = await dispatch(login(formData));

    if (login.fulfilled.match(result)) {
      Navigate("/register");
    }
  }

  return (
    <>
      <Typography
        variant='h4'
        component='h4'
        sx={{
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        Welcome Back
      </Typography>

      <Typography
        color='text.secondary'
        sx={{ mt: 1, mb: 4, textAlign: "center" }}
      >
        Login to continue ordering your favorite food.
      </Typography>

      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
        }}
      >
        <TextField
          label='Email'
          name='email'
          type='email'
          fullWidth
          value={formData.email}
          onChange={handleChange}
        />

        <TextField
          label='Password'
          name='password'
          type='password'
          fullWidth
          value={formData.password}
          onChange={handleChange}
        />

        {error && <Typography color='error'>{error}</Typography>}

        <Button
          type='submit'
          variant='contained'
          size='large'
          disabled={loading}
        >
          {loading ? "Logging in ..." : "Login"}
        </Button>
      </Box>

      <Typography textAlign='center' sx={{ mt: 3 }}>
        Don't have an account?{" "}
        <Typography
          component={Link}
          to='/register'
          color='primary'
          sx={{
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Register
        </Typography>
      </Typography>
    </>
  );
}

export default LoginPage;
