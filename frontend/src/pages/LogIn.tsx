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
  const handleSubmit = () => {
    // labosem or union user?
  };

  return (
    <SignInContainer>
      <Container>
        <Overlay></Overlay>
        <ContainerBox
          sx={{
            marginTop: '95px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: '10'
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
        </ContainerBox>
      </Container>
    </SignInContainer>
  );
};

const ContainerBox = styled(Box)`
  margin-top: 95px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > h5 {
    z-index: 10;
  }
`;

const SignInForm = styled(Box)`
  display: grid;

  & > div {
    width: 400px;
  }

  & > h5 {
    margin-bottom: 10px;
  }
  z-index: 10;
`;

const SignInContainer = styled.div`
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
  overflow: hidden;
  height: 100vh;
`;

const Overlay = styled.div`
  height: 100vh;
  background-color: white;
  width: 500px;
  left: 24pc;
  opacity: 0.5;
  top: 0px;
  position: absolute;
  z-index: 1;
`;

export default LogIn;
