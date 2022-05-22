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
import { useForm } from 'react-hook-form';
import ICertificate from '../interfaces/ICertificate';
import CertificateServices from '../backendServices/CertificateServices';
import FarmerServices from '../backendServices/FarmerServices';
import IFarmer from '../interfaces/IFarmer';

interface InputCert {
  phoneno: string;
  seedvar: string;
  certperTo: string;
  certperFrom: string;
  varpur: number;
  gerfac: number;
  batchno: number;
  certified: boolean;
}

const RegisterCertificate = () => {
  const [registered, setRegistered] = useState<boolean>(false);
  const [validToken, setValidToken] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [validFarmer, setValidFarmer] = useState<boolean>(false);
  const [showInvalidFarmerMsg, setshowInvalidFarmerMsg] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      phoneno: '',
      seedvar: '',
      certperTo: '',
      certperFrom: '',
      varpur: 0,
      gerfac: 0,
      batchno: 0,
      certified: false
      /**
       * isValid,
       * dateCreated,
       *
       */
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

  const handleOnSubmit = (input: InputCert) => {
    console.log('xx data', input);

    const phonenumber = input.phoneno;
    console.log('xx phone', phonenumber);

    FarmerServices.getFarmer(phonenumber).then((data) => {
      console.log('xx validfarmer?', data);
      if ((data.data.id || data.data.phoneno) === undefined) {
        setValidFarmer(false);

        // CREATE NEW FARMER INNIT
        FarmerServices.create({
          phoneno: phonenumber,
          organization: 'union',
          name: 'name'
        }).then((data) => {
          console.log('xx new farmer created', data);
        });
      }
      setValidFarmer(true);
    });

    if (validFarmer) {
      console.log('xx valid!');

      // create variables
      const stat = input.certified ? 0 : 1;
      const dateCreated = new Date().toISOString().split('T')[0];
      const certper = `${input.certperFrom.split('T')[0]} - ${
        input.certperTo.split('T')[0]
      }`;

      console.log('xx date created', dateCreated);
      console.log('xx certper', certper);

      const newCertificate: ICertificate = {
        phoneno: input.phoneno,
        status: stat,
        dateCreated: dateCreated,
        certper: certper,
        seedvar: input.seedvar,
        varpur: input.varpur,
        gerfac: input.gerfac,
        batchno: input.batchno
      };

      CertificateServices.create(newCertificate).then((data) => {
        console.log('xx created cert', data);
        setRegistered(true);
      });
    }
  };

  return (
    <>
      {validToken && (
        <div
          className="body-container"
          style={{ height: '100vh', overflow: 'hidden' }}
        >
          <Grid className="frontpage-grid" container spacing={2}>
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
                    <div className="form-container">
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
                                {...register('certperFrom', {
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
                                {...register('certperTo', {
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
                          <div>
                            {' '}
                            <ErrorMsg>
                              {errors.certperTo?.message ||
                                errors.certperFrom?.message ||
                                ((errors.certperTo?.type === 'pattern' ||
                                  errors.certperFrom?.type === 'pattern') &&
                                  errors.certperTo?.message) ||
                                errors.certperFrom?.message}
                            </ErrorMsg>
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
                        </Grid>
                      </Grid>

                      <Button variant="contained" type="submit">
                        Register
                      </Button>
                    </div>
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
