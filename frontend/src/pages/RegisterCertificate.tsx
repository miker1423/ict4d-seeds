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

const RegisterCertificate = () => {
  const [registered, setRegistered] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
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
    console.log('xx watch', watch());
    setRegistered(false);
  }, []);

  const handleOnSubmit = () => {
    setRegistered(true);
  };

  return (
    <div className="App">
      <div className="body-container" style={{ height: '100vh' }}>
        <Grid className="frontpage-grid" container spacing={2}>
          {/* NAV BAR */}
          <Grid item xs={12}>
            <NavBar user={'LaboSem'} active={'regcer'} />
          </Grid>

          <div className="main">
            <Grid item xs={12} sx={{ paddingTop: '0px' }}>
              {registered && (
                <div className="front-certificate">
                  <Typography variant="h3">
                    Certificate has been registered
                  </Typography>
                </div>
              )}
              {!registered && (
                <div className="front-certificate">
                  <Typography variant="h5" sx={{ pb: '50px' }}>
                    Register new certificate{' '}
                  </Typography>
                  <Box
                    id="certificate-form"
                    component="form"
                    autoComplete="off"
                    sx={{ padding: '10px' }}
                    onSubmit={handleSubmit((data) => {
                      console.log('xx data', data);
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
                              minLength: 5,
                              pattern: {
                                value: /^[0-9]{5,}$/i,
                                message: 'Please write a valid phone number'
                              }
                            })}
                            label="Farmer Phone Number"
                            fullWidth
                          />
                        </Grid>
                      </Grid>

                      <Grid container>
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
                        </Grid>
                      </Grid>

                      <Grid container>
                        <Grid item xs={4}>
                          <Typography>Certification Period:</Typography>
                        </Grid>
                        <div style={{ display: 'inline-flex' }}>
                          <Grid item>
                            <span>From</span>
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
                          <Grid item sx={{ pl: 1 }}>
                            <span>To</span>
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
                      </Grid>

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
                        </Grid>
                      </Grid>
                    </Grid>

                    <Button variant="contained" type="submit">
                      Register
                    </Button>
                  </Box>
                </div>
              )}
            </Grid>
          </div>
        </Grid>
      </div>
    </div>
  );
};

const ToolbarText = styled.span`
  width: 100%;
  height: 100%;
  display: inline-flex;

  & > p {
    position: absolute;
    font-size: 0.9em;
  }
`;

export default RegisterCertificate;
