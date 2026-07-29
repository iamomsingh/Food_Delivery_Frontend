import { useState } from "react";
import { Link } from "react-router";

import { Box, Button, TextField, Typography } from "@mui/material";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle change
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
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

        <Button type='submit' variant='contained' size='large'>
          Login
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
