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
import IUser from '../interfaces/IUser';
import CertificateServices from '../backendServices/CertificateServices';
import UserServices from '../backendServices/UserService';
import IAccount from '../interfaces/IAccount';

interface InputUser {
  firstname: string;
  middlename: string;
  lastname: string;
  phoneno: string;
  username: string;
  password: string;
  admin: boolean;
  organization: string;
}

const RegisterUser = ({ userData }: { userData: IUser | undefined }) => {
  const [registered, setRegistered] = useState<boolean>(false);
  const {
    register, 
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstname: '',
      middlename: '',
      lastname: '',
      phoneno: '',
      username: '',
      password: '',
      admin: false,
      organization: ''
    }
  });

  useEffect(() => {}, [registered]);

  const handleOnSubmit = (data: InputUser) => {
    console.log('xx data', data);

    const role = data.admin ? 'admin' : '';
    const user: IUser = {
      phoneno: data.phoneno,
      role: role,
      org: data.organization
    };
    const account: IAccount = {
      username: data.username,
      password: data.password
    };

    UserServices.create({ userData: user, userCreds: account }).then((data) => {
      setRegistered(true);
    });
  };

  return (
    <div
      className="body-container"
      style={{ height: '100vh', overflow: 'hidden' }}
    >
      <Grid className="frontpage-grid" container spacing={2}>
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
                          required: 'Firstname is required',
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
                    {/* <Grid item xs={4}>
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
                    {/* <Grid item xs={4}>
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
                    </Grid>{' '}  */}
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
                        {...register('organization', {})}
                        value={userData?.org}
                        label="Organization"
                        InputLabelProps={{ shrink: true }}
                        disabled
                        fullWidth
                      />
                      <ErrorMsg>
                        {errors.organization?.message ||
                          (errors.organization?.type === 'pattern' &&
                            errors.organization?.message)}
                      </ErrorMsg>
                    </Grid>
                  </Grid>

                  {/* Admin? */}
                  <Grid container>
                    <Grid item xs={4}>
                      <Typography sx={{ marginTop: '0px' }}>Admin?</Typography>
                    </Grid>
                    <Grid item sx={{ textAlign: 'right', pt: 1, pr: 2 }}>
                      Yes
                    </Grid>
                    <Grid item xs={2} sx={{ textAlign: 'left' }}>
                      <Checkbox
                        {...register('admin', {
                          required: 'Role is required'
                        })}
                        sx={{ padding: '0px', pt: '8px' }}
                      />
                      <ErrorMsg>{errors.admin?.message}</ErrorMsg>
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
  );
};

const ErrorMsg = styled.span`
  color: red;
  font-size: 0.8em;
`;

export default RegisterUser;
