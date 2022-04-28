import {
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
    <div className="App">
      <div className="body-container">
        <Grid className="frontpage-grid" container spacing={2}>
          <Grid item xs={12}>
            <div className="front">
              <ContainerBox>
                <Typography variant="h5">Sign in to TéléCiden</Typography>
                <SignInForm
                  component="form"
                  className="signin-form"
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    // required
                    fullWidth
                    label="Email Address"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    // required
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
                    <Link to="/labosem" id="link">
                      Sign in
                    </Link>
                  </Button>
                  <Grid container sx={{ marginTop: '10px' }}>
                    <Grid item xs>
                      {/* <a href="#">Forgot password?</a> */}
                    </Grid>
                  </Grid>
                </SignInForm>
              </ContainerBox>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const ContainerBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: -webkit-center;
  padding-bottom: 10px;
  background-color: hsla(0, 0%, 100%, 0.5);
  width: 90%;
  padding: 20px;
  height: 65vh;

  & > * {
    color: hsla(0, 0%, 30%);
    font-size: 0.8em;
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

export default LogIn;
