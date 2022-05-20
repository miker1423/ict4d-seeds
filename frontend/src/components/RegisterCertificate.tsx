import { Grid, Typography, Button, TextField, Box } from '@mui/material';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ICertificate from '../interfaces/ICertificate';
import CertificateServices from '../backendServices/CertificateServices';

const RegisterCertificate = () => {
  const [registered, setRegistered] = useState<boolean>(false);
  const [validToken, setValidToken] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      phoneno: '',
      seedvar: '',
      certper: '',
      varpur: null,
      gerfac: null,
      batchno: null,
      certified: false
    }
  });

  useEffect(() => {
    // console.log('xx registered?', registered);
  }, [registered]);

  useEffect(() => {
    const currToken = sessionStorage.getItem('token');
    if (currToken !== '' && currToken !== null) setToken(currToken);
    if (token !== '' && token !== null) setValidToken(true);
  }, [validToken, token]);

  const handleOnSubmit = (data: { phoneno: string }) => {
    console.log('xx data', data);
    setRegistered(true);

    // const newCertificate: ICertificate = {
    //   phoneno: data.phoneno,
    //   dateCreated: data.dateCreated; // manually create
    //   lastChanged: data.lastChanged; // manually create
    //   status: data.status;
    //   farmerId: data.farmerId; // manually GET from logged in user
    // };

    // CertificateServices.create(newCertificate);
  };

  return (
    <>
      {validToken && (
        <div
          className="body-container"
          style={{ height: '100vh', overflow: 'hidden' }}
        >
          <Grid className="frontpage-grid" container spacing={2}>
            {/* NAV BAR */}
            {/* <Grid item xs={12}>
              <NavBar user={'LaboSem'} />
            </Grid> */}
            <div className="main">
              <Grid item xs={12} sx={{ paddingTop: '0px' }}>
                {registered && (
                  <div className="front-certificate">
                    <Typography variant="h5">
                      Certificate has been registered
                    </Typography>
                  </div>
                )}
                <div className="front-certificate">
                  <Typography variant="h5" sx={{ pb: '50px' }}>
                    Register new certificate{' '}
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
                    <Grid container xs={10} spacing={2} sx={{ gap: 1 }}>
                      <Grid container>
                        <Grid item xs={4}>
                          <Typography> Farmer's phone number:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            {...register('phoneno', {
                              required: 'Phone number is required',
                              pattern: {
                                value: /^[0-9]+$/i,
                                message: 'Please write a valid phone number'
                              }
                            })}
                            label="Farmer Phone Number"
                            fullWidth
                          />
                          <ErrorMsg>
                            {errors.phoneno?.message ||
                              (errors.phoneno?.type === 'pattern' &&
                                errors.phoneno?.message)}
                          </ErrorMsg>
                        </Grid>
                      </Grid>

                      {/* <Grid container>
                      <Grid item xs={4}>
                        <Typography>Seed Variety:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          {...register('seedvar', {
                            required: 'Seed variety is required',
                            minLength: 5,
                            pattern: {
                              value: /^[A-Z,a-z,0-9\-/. ]+$/i,
                              message: 'Please write a valid name'
                            }
                          })}
                          type="text"
                          label="Seed Variety Name"
                          fullWidth
                        />
                        <ErrorMsg>
                          {errors.seedvar?.message ||
                            (errors.seedvar?.type === 'pattern' &&
                              errors.seedvar?.message)}
                        </ErrorMsg>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={4}>
                        <Typography>Certification Period:</Typography>
                      </Grid>
                      <div style={{ display: 'inline-flex' }}>
                        <Grid item xs={6}>
                          <ToandFrom>From</ToandFrom>
                          <TextField
                            {...register('certper', {
                              required: 'Certification period is required',
                              pattern: {
                                value: /^[0-9\- ]+$/i,
                                message: 'Please write a period'
                              }
                            })}
                            type="date"
                            label="From"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                          />
                        </Grid>

                        <Grid item xs={6} sx={{ pl: 1 }}>
                          <ToandFrom>To</ToandFrom>
                          <TextField
                            {...register('certper', {
                              required: 'Certification period is required',
                              pattern: {
                                value: /^[0-9\- ]+$/i,
                                message: 'Please write a period'
                              }
                            })}
                            type="date"
                            label="To"
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                          />
                        </Grid>
                      </div>
                      {/* <div>
                          {' '}
                          <ErrorMsg>
                            {errors.certper?.message ||
                              (errors.certper?.type === 'pattern' &&
                                errors.certper?.message)}
                          </ErrorMsg>
                        </div> */}
                      {/* </Grid>

                    <Grid container>
                      <Grid item xs={4}>
                        <Typography>Varietal Purity:</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          {...register('varpur', {
                            required: 'Varietal Purity is required',
                            pattern: {
                              value: /^[0-9]+$/i,
                              message: 'Please input a percentage number'
                            }
                          })}
                          type="number"
                          label="Percentage %"
                          fullWidth
                        />
                        <ErrorMsg>
                          {errors.varpur?.message ||
                            (errors.varpur?.type === 'pattern' &&
                              errors.varpur?.message)}
                        </ErrorMsg>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={4}>
                        <Typography>Germinative Faculty:</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          {...register('gerfac', {
                            required: 'Germinative faculty is required',
                            pattern: {
                              value: /^[0-9]+$/i,
                              message: 'Please input a percentage number'
                            }
                          })}
                          type="number"
                          label="Percentage %"
                          fullWidth
                        />
                        <ErrorMsg>
                          {errors.gerfac?.message ||
                            (errors.gerfac?.type === 'pattern' &&
                              errors.gerfac?.message)}
                        </ErrorMsg>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={4}>
                        <Typography>Batch Number:</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <TextField
                          {...register('batchno', {
                            required: 'Batch number is required',
                            pattern: {
                              value: /^[0-9]+$/i,
                              message: 'Please input a percentage number'
                            }
                          })}
                          type="number"
                          label="Batch number"
                          fullWidth
                        />
                        <ErrorMsg>
                          {errors.batchno?.message ||
                            (errors.batchno?.type === 'pattern' &&
                              errors.batchno?.message)}
                        </ErrorMsg>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid item xs={4}>
                        <Typography sx={{ marginTop: '0px' }}>
                          Certified:
                        </Typography>
                      </Grid>
                      <Grid item xs={2} sx={{ textAlign: 'left' }}>
                        <Checkbox
                          {...register('certified', {
                            required: 'Certification is required'
                          })}
                          sx={{ padding: '0px', pt: '8px' }}
                        />
                        <ErrorMsg>{errors.certified?.message}</ErrorMsg>
                      </Grid>
                    </Grid>  */}
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
      )}
    </>
    // </div>
  );
};

const ErrorMsg = styled.span`
  color: red;
  font-size: 0.8em;
`;

const ToandFrom = styled.p`
  font-weight: 400;
  font-size: 0.9em;
  float: left;
  margin-top: 2px;
`;

export default RegisterCertificate;
