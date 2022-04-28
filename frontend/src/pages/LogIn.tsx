import {
  Container,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LogIn = () => {
  const handleSubmit = () => {};

  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography variant="h5">Sign in to TéléCiden</Typography>
        <SignInForm
          component="form"
          className="signin-form"
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            sx={{ marginTop: '10px' }}
            type="submit"
            fullWidth
            variant="contained"
          >
            Sign In
          </Button>
          <Grid container sx={{ marginTop: '10px' }}>
            <Grid item xs>
              {/* <a href="#">Forgot password?</a> */}
            </Grid>
          </Grid>
        </SignInForm>
      </Box>
    </Container>
  );
};

const SignInForm = styled(Box)`
  display: grid;

  & > div {
    width: 400px;
  }

  & > h5 {
    margin-bottom: 10px;
  }
`;

export default LogIn;
