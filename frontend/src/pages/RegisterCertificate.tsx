import {
  Grid,
  AppBar,
  Typography,
  Button,
  FormControl,
  TextField,
  Input,
  Box,
  InputLabel
} from '@mui/material';
import styled from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';

const RegisterCertificate = () => {
  return (
    <div className="App">
      <div
        className="body-container"
        style={{ height: '100vh', overflow: 'hidden' }}
      >
        <Grid className="frontpage-grid" container spacing={2}>
          {/* NAV BAR */}
          <Grid item xs={12}>
            <AppBar
              className="appbar"
              position="static"
              style={{
                color: 'white',
                backgroundColor: '#3ca341',
                height: '15vh',
                paddingLeft: 16,
                alignContent: 'bottom'
              }}
            >
              <ToolbarText>
                <Typography variant="h4" align="left" sx={{ mt: '30px' }}>
                  TéléCiden
                </Typography>

                <Typography
                  align="right"
                  sx={{
                    mt: '45px',
                    mr: '20px',
                    right: '10px'
                  }}
                >
                  <b>Signed in as</b>: LaboSem user
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ top: '5px', right: '25px', position: 'absolute' }}
                >
                  <Link id="link" to="/">
                    Sign out
                  </Link>
                </Button>
              </ToolbarText>
            </AppBar>
          </Grid>

          <Grid item xs={12} style={{ paddingTop: '0px' }}>
            <div className="front">
              <Typography variant="h5" sx={{ mb: '20px' }}>
                Register new certificate{' '}
              </Typography>
              <Box
                id="certificate-form"
                component="form"
                autoComplete="off"
                sx={{ padding: '10px' }}
              >
                <Grid container xs={10} spacing={2}>
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
                      <TextField type="date" fullWidth />
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={4}>
                      <Typography>Varietal Purity:</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        type="number"
                        label="Percentage number"
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
                        label="Percentage number"
                        fullWidth
                      />
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={4}>
                      <Typography>Batch Number:</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField type="number" label="Number" fullWidth />
                    </Grid>
                  </Grid>

                  <Grid item xs>
                    <TextField
                      sx={{ border: '0px' }}
                      type="checkbox"
                      label="Certified"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Box>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

// -	certificate id
// -	phone number x
// -	certification period (years) x
// -	date created (date)
// -	varietal purity (percentage) x
// -	batch number x
// -	germinative faculty (percentage) x
// -	last changed (date) - automatic
// -	certified (Boolean)
// -	seed variety (name) x

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
