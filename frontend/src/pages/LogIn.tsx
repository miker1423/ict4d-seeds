import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid
} from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const LogIn = () => {
  const [email, setEmail] = useState<string>();
  const [pw, setPw] = useState<string>();
  const [wrongCreds, setWrongCreds] = useState<boolean>(false);
  const [errorAnimate, setErrorAnimate] = useState<string>('');

  /**
   * name: labosemUser, pw = labosem
   * name: unionUser, pw = union
   */

  const handleSubmit = () => {
    const inputEmail = email;
    const inputPw = pw;

    if (inputEmail === 'labosemUser' && inputPw === 'labosem') {
      setWrongCreds(false);
      console.log('xx LABOSEM LOGIN!!!!!');
      // direct to labosem homepage
    } else if (inputEmail === 'unionUser' && inputPw === 'union') {
      setWrongCreds(false);
      console.log('xx UNION LOGIN!!!!!');
      // direct to union homepage
    } else {
      console.log('xx try again, or ask your contact person for credentials');
      setWrongCreds(true);
      setErrorAnimate(`keyframes {40%, 60%, 80% {
        transform: translateX(8px);
      }
      50%,
      70%,
      90% {
        transform: translateX(-8px);
      }}`);
      console.log('xx animte', errorAnimate);
    }

    console.log('xx email %s and pw %s', email, pw);
  };

  const SignInTextFields = styled.div`
    animation-name: ${errorAnimate};
    animation-duration: 0.7s, 0.35s;
    animation-iteration-count: 1;
  `;

  return (
    <div className="App">
      <div className="body-container">
        <Grid className="frontpage-grid" container spacing={2}>
          <Grid item xs={12}>
            <div className="front">
              <ContainerBox>
                <Typography variant="h5">Sign in to TéléCiden</Typography>
                <SignInForm
                  id="signin-textfield"
                  component="form"
                  className="signin-form"
                  sx={{ mt: 1 }}
                >
                  <SignInTextFields>
                    <TextField
                      margin="normal"
                      value={email}
                      required
                      fullWidth
                      label="Email Address"
                      autoComplete="email"
                      autoFocus
                      onChange={(e) => {
                        setEmail(e.target.value);
                        console.log('xx email', e.target.value);
                      }}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Password"
                      type="password"
                      value={pw}
                      onChange={(e) => {
                        setPw(e.target.value);
                        console.log('xx pw', pw);
                      }}
                    />
                  </SignInTextFields>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    sx={{ marginTop: '10px' }}
                    fullWidth
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Sign in
                  </Button>
                  <Grid container sx={{ marginTop: '10px' }}>
                    <Grid item xs>
                      <span style={{ display: wrongCreds ? 'block' : 'none' }}>
                        <p>
                          The password or username you put in might be wrong.
                        </p>
                        <p>
                          Try again, or ask your contact person for credentials
                        </p>
                      </span>
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
