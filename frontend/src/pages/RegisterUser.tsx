import {
  Grid,
  Typography,
  Button,
  TextField,
  Box,
  Checkbox
} from '@mui/material';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useForm } from 'react-hook-form';
import ICertificate from '../interfaces/ICertificate';
import CertificateServices from '../backendServices/CertificateServices';

const RegisterUser = () => {
  const [registered, setRegistered] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstname: '',
      middlename: '',
      lastname: '',
      phoneno: '',
      username: '',
      password: '',
      organization: ''
    }
  });

  useEffect(() => {
    console.log('xx registered?', registered);
  }, [registered]);

  const handleOnSubmit = (data: { phoneno: string }) => {
    console.log('xx data', data);
    setRegistered(true);
  };

  return (
    <div className="App">
      <div className="body-container" style={{ height: '100vh' }}>
        <Grid className="frontpage-grid" container spacing={2}>
          {/* NAV BAR */}
          <Grid item xs={12}>
            {/* ADMIN USER REGISTERATION... BUT LABOSEM OR UNION?? */}
            {/* MAYBE ADMIN NEEDS TO BE A STATE... slik at man alltid kan sjekke om admin finnes eller ikke */}
            {/* //////////////////////////--HUSK--////////////////////////////// */}
            <NavBar user={'labosem'} active={'reguser'} admin={true} />
          </Grid>
          <div className="main">
            <Grid item xs={12} sx={{ paddingTop: '0px' }}>
              {registered && (
                <div className="front-certificate">
                  <Typography variant="h5">User has been registered</Typography>
                </div>
              )}
              <div className="front-certificate">
                <Typography variant="h5" sx={{ pb: '50px' }}>
                  Register new user{' '}
                </Typography>
                <Box
                  id="certificate-form"
                  component="form"
                  autoComplete="off"
                  sx={{
                    padding: '10px',
                    '& span': { float: 'left', mb: 1 }
                  }}
                  onSubmit={handleSubmit((data) => {
                    handleOnSubmit(data);
                  })}
                >
                  <Grid container xs={10} spacing={2} sx={{ gap: 1, mb: 2 }}>
                    <Grid container sx={{ gap: 1 }}>
                      <Grid item xs={4}>
                        {/* First name */}
                        <Typography> First name:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          {...register('firstname', {
                            // required: 'Firstname is required',
                            pattern: {
                              value:
                                /^[A-Za-zÁÀÈÉÊÂÒÖÏÌÍÓéèêëäâáàîïíìôöóò\- .]{2,}$/i,
                              message: 'Please write a valid firstname'
                            }
                          })}
                          label="First Name"
                          fullWidth
                        />
                        <ErrorMsg>
                          {errors.firstname?.message ||
                            (errors.firstname?.type === 'pattern' &&
                              errors.firstname?.message)}
                        </ErrorMsg>
                      </Grid>
                      {/* Middle name */}
                      <Grid item xs={4}>
                        <Typography> Middle name:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          {...register('middlename', {
                            pattern: {
                              value:
                                /^[A-Za-zÁÀÈÉÊÂÒÖÏÌÍÓéèêëäâáàîïíìôöóò\- .]{2,}$/i,
                              message: 'Please write a valid middlename'
                            }
                          })}
                          label="Middle Name"
                          fullWidth
                        />
                        <ErrorMsg>
                          {errors.middlename?.type === 'pattern' &&
                            errors.middlename?.message}
                        </ErrorMsg>
                      </Grid>
                      {/* lastname */}
                      <Grid item xs={4}>
                        {/* Last Name */}
                        <Typography> Last Name:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          {...register('lastname', {
                            // required: 'Lastname is required',
                            pattern: {
                              value:
                                /^[A-Za-zÁÀÈÉÊÂÒÖÏÌÍÓéèêëäâáàîïíìôöóò\- .]{2,}$/i,
                              message: 'Please write a valid lastname'
                            }
                          })}
                          label="Last Name"
                          fullWidth
                        />
                        <ErrorMsg>
                          {errors.lastname?.message ||
                            (errors.lastname?.type === 'pattern' &&
                              errors.lastname?.message)}
                        </ErrorMsg>
                      </Grid>{' '}
                      {/* Username */}{' '}
                      <Grid item xs={4}>
                        <Typography> Username:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          {...register('username', {
                            required: 'Username is required',
                            pattern: {
                              value: /^[A-Za-z0-9\-\_.]{4,}$/i,
                              message:
                                'Please write a valid username. It must be at least 4 characters and can contain only letters, numbers and the characters -, _ and .'
                            }
                          })}
                          label="Username"
                          fullWidth
                        />
                        <ErrorMsg>
                          {errors.username?.message ||
                            (errors.username?.type === 'pattern' &&
                              errors.username?.message)}
                        </ErrorMsg>
                      </Grid>
                      {/* Password */}{' '}
                      <Grid item xs={4}>
                        <Typography> Password:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          {...register('password', {
                            required: 'Password is required',
                            pattern: {
                              value:
                                /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\_\W]).{8,}/i,
                              message:
                                'Passoword must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one special character and one number'
                            }
                          })}
                          type="password"
                          label="Password"
                          fullWidth
                        />
                        <ErrorMsg>
                          {errors.password?.message ||
                            (errors.password?.type === 'pattern' &&
                              errors.password?.message)}
                        </ErrorMsg>
                      </Grid>
                      {/* Organization */}
                      {/* Any checks for existing organizations? */}
                      <Grid item xs={4}>
                        <Typography> Organization:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          {...register('organization', {
                            // required: 'Organization is required',
                            pattern: {
                              value:
                                /^[A-Za-z0-9ÁÀÈÉÊÂÒÖÏÌÍÓéèêëäâáàîïíìôöóò\- .]{5,}$/i,
                              message: 'Please enter a valid Organization'
                            }
                          })}
                          label="Organization"
                          fullWidth
                        />
                        <ErrorMsg>
                          {errors.organization?.message ||
                            (errors.organization?.type === 'pattern' &&
                              errors.organization?.message)}
                        </ErrorMsg>
                      </Grid>
                    </Grid>
                    {/* grid container */}
                  </Grid>

                  <Button variant="contained" type="submit">
                    Register
                  </Button>
                </Box>
              </div>
            </Grid>
          </div>
        </Grid>
      </div>
    </div>
  );
};

const ErrorMsg = styled.span`
  color: red;
  font-size: 0.8em;
`;

export default RegisterUser;
