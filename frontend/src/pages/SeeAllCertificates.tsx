import { Grid, AppBar, Typography, Button } from '@mui/material';
import styled from 'styled-components';
import React from 'react';
import { Link } from 'react-router-dom';
import Certificates from './Certificates';
import NavBar from '../components/NavBar';

const SeeAllCertificates = () => {
  return (
    <div className="App">
      <div className="body-container" style={{ height: '100vh' }}>
        <Grid className="frontpage-grid" container spacing={2}>
          {/* NAV BAR */}
          <Grid item xs={12}>
            <NavBar user={'LaboSem'} />
          </Grid>

          <Grid item xs={12} style={{ paddingTop: '0px' }}>
            <div className="main" style={{ padding: '10px' }}>
              <Grid item xs={12} sx={{ paddingTop: '0px' }}>
                <div className="front-certificate">
                  <Typography variant="h5" sx={{ pb: '30px' }}>
                    All certificates
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12}>
                <Certificates />
              </Grid>
            </div>
          </Grid>
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

export default SeeAllCertificates;
