import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Box, Button, TextField, Typography } from "@mui/material";

import { register } from "../features/auth/authSlice";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { loading, error } = useSelector((state) => state.auth);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const result = await dispatch(register(formData));

    if (register.fulfilled.match(result)) {
      navigate("/login");
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
        Create Account
      </Typography>

      <Typography
        color='text.secondary'
        sx={{
          mt: 1,
          mb: 4,
          textAlign: "center",
        }}
      >
        Create your account to start ordering food.
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
          label='First Name'
          name='firstName'
          fullWidth
          value={formData.firstName}
          onChange={handleChange}
        />

        <TextField
          label='Last Name'
          name='lastName'
          fullWidth
          value={formData.lastName}
          onChange={handleChange}
        />

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
          {loading ? "Creating Account..." : "Register"}
        </Button>
      </Box>

      <Typography textAlign='center' sx={{ mt: 3 }}>
        Already have an account?{" "}
        <Typography
          component={Link}
          to='/login'
          color='primary'
          sx={{
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Login
        </Typography>
      </Typography>
    </>
  );
}

export default RegisterPage;
