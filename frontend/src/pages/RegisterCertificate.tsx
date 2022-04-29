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

const RegisterCertificate = () => {
  const [registered, setRegistered] = useState<boolean>(false);

  useEffect(() => {
    setRegistered(false);
  }, []);

  const handleSubmit = () => {
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
                  >
                    <Grid container xs={10} spacing={2} sx={{ gap: 1 }}>
                      <Grid container>
                        <Grid item xs={4}>
                          <Typography> Farmer's phone number:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <TextField label="Farmer Phone Number" fullWidth />
                        </Grid>
                      </Grid>

                      <Grid container>
                        <Grid item xs={4}>
                          <Typography>Seed Variety:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
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
                        <Grid item xs={4}>
                          <TextField
                            type="year"
                            label="Valid certificate years"
                            fullWidth
                          />
                        </Grid>
                      </Grid>

                      <Grid container>
                        <Grid item xs={4}>
                          <Typography>Varietal Purity:</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
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
                          <Checkbox sx={{ padding: '0px', pt: '8px' }} />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Button variant="contained" onClick={handleSubmit}>
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
