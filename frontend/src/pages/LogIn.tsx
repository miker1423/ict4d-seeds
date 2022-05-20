import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import LaboSemUser from './LaboSemUser';
import styled from 'styled-components';
import IAccount from '../interfaces/IAccount';
import IUser from '../interfaces/IUser';
import UserServices from '../backendServices/UserService';

const LogIn = () => {
  const [username, setusername] = useState<string>();
  const [pw, setPw] = useState<string>();
  const [wrongCreds, setWrongCreds] = useState<boolean>(false);
  const [unionUser, setUnionUser] = useState<boolean>(false);
  const [loginToken, setLoginToken] = useState<string>('');
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUser>();

  useEffect(() => {
    sessionStorage.setItem('token', loginToken);
  }, [loginToken, userData]);

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

  if (unionUser) return <Navigate to="/union" />;

  const regExCheck = () => {
    const usernameRegex = /^[A-Za-z0-9\-\_.]{4,}$/i;
    const pwRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\_\W]).{8,}/i;

    console.log('xx credentials:', username, pw);

    if (username?.match(usernameRegex) && pw?.match(pwRegex)) {
      setWrongCreds(false);
    } else {
      setWrongCreds(true);
    }
  };

  const handleFormSubmit = () => {
    const inputusername = username;
    const inputPw = pw;
    if (inputusername === 'unionUser' && inputPw === 'union') {
      setWrongCreds(false);
      setUnionUser(true);
    }
    regExCheck();
    const credentials: IAccount = {
      username: username ? username : '',
      password: pw ? pw : ''
    };

    UserServices.Login(credentials).then((data) => {
      console.log('xx userdata', data);
      setUserData(data.data);
      setLoginToken(data.data.token);
    });
  };

  return (
    <div className="App">
      {loginToken && isLoggedIn && userData && (
        <LaboSemUser userData={userData} />
      )}
      {!loginToken && (
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
                        {/* <a href="#">Forgot password?</a> */}
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
