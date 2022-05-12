import { Grid, AppBar, Typography, Button } from '@mui/material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import React from 'react';

const LaboSemUser = () => {
  return (
    <div className="App">
      <div
        className="body-container"
        style={{ height: '100vh', overflow: 'hidden' }}
      >
        <Grid className="frontpage-grid" container spacing={2}>
          {/* NAV BAR */}
          <Grid item xs={12}>
            <NavBar user={'LaboSem'} />
          </Grid>

          <Grid item xs={12} style={{ paddingTop: '0px' }}>
            <div className="front">
              <div className="title-container2">
                <Typography variant="h1" sx={{ color: 'hsla(0, 0%, 15%);' }}>
                  Welcome
                </Typography>
                <br />
                <Typography sx={{ width: '300px' }}>
                  Press on a button to start registering a new certificate or to
                  see a list of existing certificates.
                </Typography>
                <ButtonContainer>
                  <Grid item xs={4}>
                    <Link id="link" to="/registercertificate">
                      <Button variant="contained">
                        Register new certificate
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item xs={4}>
                    <Link id="link" to="/seeallcertificates">
                      <Button variant="contained">See all certificates</Button>
                    </Link>
                  </Grid>
                </ButtonContainer>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const ButtonContainer = styled.div`
  justify-content: center;
  display: flex;

  & > * {
    color: white;
    padding-top: 30px;
    padding-bottom: 20px;
  }
`;

export default LaboSemUser;
