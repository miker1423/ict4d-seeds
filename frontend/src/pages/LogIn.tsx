import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Navigate, Link, Route } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from 'react-oidc-context';

import styled from 'styled-components';

const LogIn = () => {
  const [username, setusername] = useState<string>();
  const [pw, setPw] = useState<string>();
  const [wrongCreds, setWrongCreds] = useState<boolean>(false);
  const [labosemUser, setLabosemUser] = useState<boolean>(false);
  const [unionUser, setUnionUser] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  });

  if (labosemUser) return <Navigate to="/labosem" />;
  if (unionUser) return <Navigate to="/union" />;

  const handleFormSubmit = () => {
    const inputusername = username;
    const inputPw = pw;

    if (inputusername === 'labosemUser' && inputPw === 'labosem') {
      setWrongCreds(false);
      setLabosemUser(true);
      console.log('xx LABOSEM LOGIN!!!!!');
    } else if (inputusername === 'unionUser' && inputPw === 'union') {
      setWrongCreds(false);
      setUnionUser(true);
      console.log('xx UNION LOGIN!!!!!');
    } else {
      console.log('xx try again, or ask your contact person for credentials');
      setWrongCreds(true);
    }
    console.log('xx username %s and pw %s', username, pw);
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
                  id="signin-textfield"
                  component="form"
                  className="signin-form"
                  sx={{ mt: 1 }}
                  onSubmit={handleSubmit((data) => {
                    console.log(data);
                  })}
                >
                  <SignInTextFields>
                    <TextField
                      {...register('username', {
                        required: 'username is required',
                        minLength: 5,
                        pattern: /^[A-Za-z0-9\_\-.]{5,30}$/i
                        // message: 'Please write a valid username' more for when registering
                      })}
                      margin="normal"
                      value={username}
                      fullWidth
                      label="Username"
                      autoComplete="username"
                      autoFocus
                      onChange={(e) => {
                        setusername(e.target.value);
                      }}
                    />
                    <span>{errors.username?.message}</span>
                    <TextField
                      {...register('password', {
                        required: 'Password is required',
                        minLength: 8,
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                      })}
                      margin="normal"
                      fullWidth
                      label="Password"
                      type="password"
                      value={pw}
                      onChange={(e) => {
                        setPw(e.target.value);
                      }}
                    />
                    <span>{errors.password?.message}</span>
                  </SignInTextFields>

                  <Button
                    sx={{ marginTop: '10px' }}
                    fullWidth
                    type="submit"
                    variant="contained"
                    onClick={handleFormSubmit}
                  >
                    Sign in
                  </Button>
                  <Grid container sx={{ marginTop: '10px' }}>
                    <Grid item xs>
                      <span
                        style={{
                          display: wrongCreds ? 'block' : 'none',
                          color: 'red'
                        }}
                      >
                        <p>
                          The password or username you put in might be wrong.
                        </p>
                        <p>
                          Try again, or ask your contact person for credentials.
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

  & > * > span {
    text-align: left;
    float: left;
    padding-left: 2px;
    color: red;
  }
`;

const SignInTextFields = styled.div``;
export default LogIn;
