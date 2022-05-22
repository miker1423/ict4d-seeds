import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import React, { useState, useEffect, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import LaboSemUser from './LaboSemUser';
import styled from 'styled-components';
import IAccount from '../interfaces/IAccount';
import IUser from '../interfaces/IUser';
import UserServices from '../backendServices/UserService';
import UnionUser from './UnionUser';
import LoadingComp from '../components/LoadingComp';

const LogIn = () => {
  const [username, setusername] = useState<string>();
  const [pw, setPw] = useState<string>();
  const [wrongCreds, setWrongCreds] = useState<boolean>(false);
  const [loginToken, setLoginToken] = useState<string>('');
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUser>();
  // Either user is logged in as labosem user, any union user, or is not a valid login

  // get session items
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role');
    const org = sessionStorage.getItem('organization');

    if (token && role && org && (token && role && org) !== '') {
      setLoginToken(token);
      setUserData({
        org: org,
        role: role
      });
    }
  }, []);

  // set session items
  useEffect(() => {
    console.log('xx user', userData);
    if (userData && userData && loginToken && loginToken !== '') {
      sessionStorage.setItem('token', loginToken);
      sessionStorage.setItem('role', userData.role);
      sessionStorage.setItem('organization', userData.org);
      setisLoggedIn(true);
    }
  }, [userData, loginToken]);

  useEffect(() => {
    if (loginToken !== null && loginToken !== '' && loginToken.length > 10)
      setisLoggedIn(true);
    else {
      setisLoggedIn(false);
    }
  }, [loginToken]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const regExCheck = () => {
    const usernameRegex = /^[A-Za-z0-9\-\_.]{4,}$/i;
    // const pwRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\_\W]).{8,}/i;
    const pwRegex = /[A-Za-z0-9]+/i;

    console.log('xx credentials:', username, pw);

    if (username?.match(usernameRegex) && pw?.match(pwRegex)) {
      setWrongCreds(false);
    } else {
      setWrongCreds(true);
    }
  };

  const handleFormSubmit = () => {
    regExCheck();

    if (!wrongCreds) {
      const credentials: IAccount = {
        username: username ? username : '',
        password: pw ? pw : ''
      };

      UserServices.Login(credentials).then((data) => {
        if (data.data.token === '') {
          setWrongCreds(true);
        } else {
          setWrongCreds(false);
          console.log('xx userdata from api call', data.data);
          setUserData(data.data);
          setLoginToken(data.data.token);
        }
      });
    }
  };

  return (
    <div className="App">
      {!loginToken && userData && <LoadingComp />}
      {loginToken &&
        isLoggedIn &&
        userData &&
        userData.org.toLowerCase() === 'labosem' && (
          <LaboSemUser userData={userData} />
        )}

      {loginToken &&
        isLoggedIn &&
        userData &&
        userData.org.toLowerCase() !== 'labosem' &&
        userData.org !== '' && <UnionUser userData={userData} />}
      {!loginToken && !userData && (
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
                      setusername(data.username);
                      setPw(data.password);
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
                      <span>
                        {errors.username?.type === 'required' &&
                          errors.username?.message}
                      </span>
                      <TextField
                        {...register('password', {
                          required: 'Password is required',
                          minLength: 8,
                          pattern:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{70}$/
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
                      <span>
                        {errors.password?.type === 'required' &&
                          errors.password?.message}
                      </span>
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
                            Try again, or ask your contact person for
                            credentials.
                          </p>
                        </span>
                      </Grid>
                    </Grid>
                  </SignInForm>
                </ContainerBox>
              </div>
            </Grid>
          </Grid>
        </div>
      )}
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
